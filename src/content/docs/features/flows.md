---
title: Flows (Automations)
description: Visual DAG-based automation engine with 46 node handlers across 9 categories.
---

The Flows feature (also called Automations at the database level) lets you build visual directed-acyclic-graph (DAG) automation pipelines. Each flow is composed of nodes connected by edges, executed topologically by the flow interpreter.

## Architecture

```
React FlowBuilder (@xyflow/react)
        │ POST /api/projects/{uuid}/automations
        ▼
AutomationController ──► AutomationEngine
                                │
                        FlowInterpreter
                                │
                    ┌───────────┴───────────┐
                    │                       │
              FlowValidator          NodeRegistry
                                         │
                              ┌──────────┴──────────┐
                              │                     │
                    Trigger/Action/Logic     46 handler classes
                    Ai/Http/Database        (FlowNodeHandler interface)
                    File/Transform/Utility
```

## Handler Interface

Every node handler implements `FlowNodeHandler`:

```php
interface FlowNodeHandler
{
    public function execute(array $input, FlowContext $ctx): NodeOutput;
    public static function getCategory(): string;
    public static function getType(): string;
    public static function getFullType(): string;
    public static function getLabel(): string;
    public static function getDescription(): string;
    public static function getIcon(): string;
    public static function getConfigSchema(): array;
    public static function getOutputPorts(): array;
}
```

## Handler Catalog

The API exposes a catalog at `GET /api/automations/node-catalog`. Here is the full inventory.

### Trigger (6 handlers)

| Type | Handler | Description |
|---|---|---|
| `trigger.content.created` | `ContentCreatedHandler` | Fires when a content entry is created in a collection |
| `trigger.content.updated` | `ContentUpdatedHandler` | Fires when a content entry is updated |
| `trigger.content.deleted` | `ContentDeletedHandler` | Fires when a content entry is deleted |
| `trigger.content.status_changed` | `ContentStatusChangedHandler` | Fires on status transitions (e.g. draft to published) |
| `trigger.schedule.cron` | `ScheduleCronHandler` | Scheduled execution via cron expression |
| `trigger.webhook.inbound` | `WebhookInboundHandler` | Triggered by external POST to `/api/webhooks/inbound/{uuid}` |

### Action (7 handlers)

| Type | Handler | Description |
|---|---|---|
| `action.create_entry` | `CreateEntryHandler` | Creates a content entry in a collection with field values |
| `action.update_entry` | `UpdateEntryHandler` | Updates fields and/or status of an entry by UUID |
| `action.delete_entry` | `DeleteEntryHandler` | Permanently deletes a content entry by UUID |
| `action.publish_entry` | `PublishEntryHandler` | Sets entry status to `published` |
| `action.send_email` | `SendEmailHandler` | Sends an email via the project mailer |
| `action.send_notification` | `SendNotificationHandler` | Creates an internal system notification |
| `action.call_webhook` | `CallWebhookHandler` | Makes an outbound HTTP call (SSRF-protected) |

### Logic (7 handlers)

| Type | Handler | Description |
|---|---|---|
| `logic.condition` | `ConditionHandler` | If/else branching: eq, neq, in, contains, gt, gte, lt, lte, empty, notEmpty |
| `logic.switch` | `SwitchHandler` | Multi-branch routing by field value |
| `logic.and` | `AndHandler` | Logical AND of incoming boolean values |
| `logic.or` | `OrHandler` | Logical OR of incoming boolean values |
| `logic.not` | `NotHandler` | Boolean negation |
| `logic.delay` | `DelayHandler` | Pauses execution for N milliseconds (`usleep`) |
| `logic.loop` | `LoopHandler` | Iterates over array items (for-each pattern) |

### AI (5 handlers)

| Type | Handler | Description |
|---|---|---|
| `ai.llm_call` | `LlmCallHandler` | Generic LLM call with prompt, model, system prompt, temperature |
| `ai.generate_text` | `GenerateTextHandler` | Content generation from a brief |
| `ai.summarize` | `SummarizeHandler` | Text summarization with configurable max length |
| `ai.translate` | `TranslateHandler` | Text translation to a target language (supports 12 languages) |
| `ai.classify` | `ClassifyHandler` | Classifies text into predefined categories via LLM |

All AI handlers use `AiContentService` which supports 11 LLM providers. Default model: `claude-sonnet-4-6`.

### Database (3 handlers)

| Type | Handler | Description |
|---|---|---|
| `db.find_entries` | `FindEntriesHandler` | Searches entries in a collection by status (max 100) |
| `db.count_entries` | `CountEntriesHandler` | Counts entries in a collection by status |
| `db.raw_query` | `RawQueryHandler` | Disabled for security; always throws `RuntimeException` |

### File (3 handlers)

| Type | Handler | Description |
|---|---|---|
| `file.read` | `ReadFileHandler` | Stub -- not yet implemented |
| `file.upload` | `UploadFileHandler` | Stub -- not yet implemented |
| `file.delete` | `DeleteFileHandler` | Stub -- not yet implemented |

### HTTP (2 handlers)

| Type | Handler | Description |
|---|---|---|
| `http.request` | `HttpRequestHandler` | Makes HTTP requests (GET/POST/PUT/PATCH/DELETE) with SSRF protection |
| `http.response_to_json` | `ResponseToJsonHandler` | Parses HTTP response body string into JSON |

### Transform (9 handlers)

| Type | Handler | Description |
|---|---|---|
| `transform.map` | `MapHandler` | Applies transformation to each element of an array |
| `transform.filter` | `FilterHandler` | Filters array items by key-value equality |
| `transform.reduce` | `ReduceHandler` | Reduces array to a single numeric value |
| `transform.flatten` | `FlattenHandler` | Flattens nested arrays one level |
| `transform.pick` | `PickHandler` | Extracts specified keys from an object |
| `transform.omit` | `OmitHandler` | Removes specified keys from an object |
| `transform.pluck` | `PluckHandler` | Extracts a single key from an array of objects |
| `transform.set` | `SetHandler` | Writes a value into flow context variables |
| `transform.template` | `TemplateHandler` | Renders `{{ key }}` placeholders from input data |

### Utility (6 handlers)

| Type | Handler | Description |
|---|---|---|
| `util.merge` | `MergeHandler` | Merges data from all incoming branches |
| `util.split` | `SplitHandler` | Splits an array into batches |
| `util.log` | `LogHandler` | Writes input data to the execution step log |
| `util.wait` | `WaitHandler` | Pauses execution (max 30 seconds) |
| `util.noop` | `NoopHandler` | Pass-through, does nothing |
| `util.comment` | `CommentHandler` | Cosmetic documentation node, passes data through |

## Flow Interpreter

The `FlowInterpreter` executes a flow graph using Kahn's topological sort algorithm.

```php
$result = $interpreter->executeFlow($graph, $triggerPayload, $context);
```

Execution flow:
1. **Validate** the graph (acyclic, known types, at least one trigger, no orphans)
2. **Initialize** flow variables from the graph
3. **Topological sort** the nodes
4. **Execute** each node sequentially:
   - Collect inputs from predecessor nodes, respecting branch filtering
   - Branch routing: `skipped` and `error` branches propagate downstream
   - Each step is logged with timing to `FlowContext.stepLog`
5. **Return** a `FlowResult` with status, total duration, and step log

Branch-aware edge routing rules:
- `sourceOutput->branch === 'skipped'` -- connection is ignored
- `sourceOutput->branch === 'error'` -- connection is ignored (flow stops)
- Edge specifies `sourceBranch` -- only matching branches accepted
- Otherwise -- connection is accepted

## Entity Model

The `Automation` entity stores the flow definition:

| Field | Type | Description |
|---|---|---|
| `id` | int | Auto-generated primary key |
| `uuid` | uuid (unique) | Generated on persist |
| `name` | string | User-defined name |
| `isActive` | bool | Whether the automation is active |
| `debugMode` | bool | Enables verbose logging when true |
| `flowGraph` | json | `{ nodes: [...], edges: [...], variables: {...} }` |
| `project` | relation (ManyToOne) | Owning project (cascade delete) |

The `AutomationRun` entity records execution history:

| Field | Type | Description |
|---|---|---|
| `status` | string | `running`, `success`, or `failed` |
| `triggerPayload` | json | Full trigger input (debug only) |
| `durationMs` | int | Execution time in milliseconds |
| `errorMessage` | text | Error details on failure |

## REST API

All endpoints under `/api/projects/{projectUuid}/automations`:

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/projects/{uuid}/automations` | List automations |
| `POST` | `/api/projects/{uuid}/automations` | Create automation |
| `GET` | `/api/projects/{uuid}/automations/{id}` | Show automation |
| `PUT/PATCH` | `/api/projects/{uuid}/automations/{id}` | Update automation |
| `DELETE` | `/api/projects/{uuid}/automations/{id}` | Delete automation |
| `POST` | `/api/projects/{uuid}/automations/{id}/dry-run` | Dry-run with custom payload |
| `POST` | `/api/projects/{uuid}/automations/{id}/run` | Production run |
| `POST` | `/api/projects/{uuid}/automations/{id}/test-node` | Test a single node handler |
| `GET` | `/api/projects/{uuid}/automations/{id}/runs` | Paginated run history |

Plus: `GET /api/automations/node-catalog` returns the full handler catalog.

### Create a flow

```bash
curl -X POST /api/projects/{uuid}/automations \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Publish notification",
    "is_active": true,
    "flow_graph": {
      "nodes": [
        {"id": "1", "type": "trigger.content.published", "position": {"x": 0, "y": 0}, "data": {"label": "Content published", "config": {}}},
        {"id": "2", "type": "action.send_notification", "position": {"x": 200, "y": 0}, "data": {"label": "Notify admin", "config": {"message": "Entry was published"}}}
      ],
      "edges": [
        {"id": "e1-2", "source": "1", "target": "2"}
      ],
      "variables": {}
    }
  }'
```

## FlowBuilder (React)

The visual FlowBuilder lives at `assets/js/pages/Automations/FlowBuilder/` and uses `@xyflow/react` (React Flow).

### Components

| Component | Description |
|---|---|
| `FlowBuilderPage` | Root page with header, three-column layout, save button |
| `FlowCanvas` | ReactFlow canvas with all 46 node types registered |
| `NodePanel` | Left sidebar with categorized node catalog, search, drag-to-add |
| `InspectorPanel` | Right sidebar for node configuration (dynamic form from `configSchema`) |
| `FlowToolbar` | Bottom toolbar: undo/redo, zoom, validate, dry-run, save |
| `FlowDryRun` | Dialog for testing flows with a custom JSON payload |
| `CommandPalette` | Cmd+K / Ctrl+K quick node search and insertion |
| `FlowStore` | Zustand state store for nodes, edges, variables |
| `SchemaForm` | Dynamic form renderer from JSON Schema |
| `FlowValidation` | Client-side DAG validation (cycle detection, trigger check, orphan check) |
| `FlowHistory` | Undo/redo history stack (max 50 states) |

### Key features

- **Drag-and-drop** nodes from NodePanel onto the canvas
- **Snap-to-grid** (15px)
- **Minimap** and zoom controls
- **Branch-aware edges** with conditional routing (`true`/`false` from ConditionHandler)
- **Inline validation** with cycle detection (DFS 3-color marking)
- **Dry-run** execution with step-by-step results
- **Template fields** support `{{ variable }}` syntax with autocomplete
