---
title: AI Agent
description: Autonomous AI agent for bulk content operations -- create, update, delete, translate, and explore content at scale.
---

The AI Agent (v3) is an autonomous plan executor embedded in the Studio. Unlike the per-entry AI Assistant toolbar, the Agent operates at **project scale** -- it can create multiple collections, generate dozens of entries, translate content across locales, and execute bulk operations from a single natural language instruction.

## Endpoint

```
POST /api/projects/{uuid}/studio/ai-execute
```

The agent receives an array of action objects from the Studio AI chat interface and executes them sequentially. All operations are gated by the `project.manage` permission.

## How It Works

1. You describe what you want in natural language through the Studio AI chat panel
2. The LLM translates your request into a structured **plan** of tool calls
3. The plan is sent to the `ai-execute` endpoint which runs each tool in sequence
4. Operations that modify or delete data require **confirmation** before proceeding
5. The agent reports results (successes, warnings, and errors) for each step

## Available Tools

The agent can perform **8 types of operations**:

### Create Collections

```json
{
  "tool": "create_collections",
  "params": {
    "collections": [
      {
        "name": "Articles",
        "slug": "articles",
        "description": "Blog articles",
        "fields": [
          { "name": "Title", "slug": "title", "type": "text", "required": true },
          { "name": "Body", "slug": "body", "type": "richtext" },
          { "name": "Category", "slug": "category", "type": "enumeration", "options": ["Tech", "Design", "Business"] }
        ]
      }
    ]
  }
}
```

Creates collections and their fields in two passes (persist collections first, then add fields with relations).

### Create Entries

```json
{
  "tool": "create_entries",
  "params": {
    "collection": "articles",
    "entries": [
      { "title": "Getting Started", "body": "Content here...", "status": "draft", "locale": "en" }
    ]
  }
}
```

Creates multiple content entries at once. Also supports creating end-user records when the `collection` is set to `end_users`.

### Update Entries

```json
{
  "tool": "update_entries",
  "params": {
    "collection": "articles",
    "entries": [
      { "uuid": "550e8400-e29b-41d4-a716-446655440000", "data": { "status": "published" } }
    ]
  }
}
```

Patches specific fields on existing entries by UUID.

**Requires confirmation** unless `auto_confirm` is set.

### Delete Entries

```json
{
  "tool": "delete_entries",
  "params": {
    "collection": "articles",
    "uuids": ["550e8400-e29b-41d4-a716-446655440000"]
  }
}
```

Soft-deletes entries.

**Requires confirmation** unless `auto_confirm` is set.

### Generate Images

```json
{
  "tool": "generate_images",
  "params": {
    "descriptions": [
      { "prompt": "A modern office workspace with natural lighting", "filename": "office-workspace" }
    ]
  }
}
```

Generates images via AI (DALL-E 3) and uploads them to the project's media library. Each description must include at minimum a `prompt` string.

### Read Entries

```json
{
  "tool": "read_entries",
  "params": {
    "collection": "articles",
    "uuids": [],
    "locale": "en",
    "limit": 50,
    "offset": 0
  }
}
```

Reads entries with optional filtering. If `uuids` is empty, returns the first `limit` entries for the given locale.

### Translate Entries

```json
{
  "tool": "translate_entries",
  "params": {
    "collection": "articles",
    "source_locale": "en",
    "target_locales": ["fr", "es", "de"],
    "uuids": []
  }
}
```

Bulk translates entries from a source locale into one or more target locales. If no UUIDs are specified, the agent reads the first **200 entries** from the source locale. Each entry creates a **new entry** in the target locale with translated text fields, preserving non-text fields (numbers, relations, media) from the source.

See [AI Translation](/studio/ai-translation) for detailed behavior.

### Explore Schema

```json
{
  "tool": "explore_schema",
  "params": {}
}
```

Returns all collections and their fields for the current project. Used by the agent to understand the content model before making changes.

## Safety Features

### Confirmation Gates

Operations that modify or delete data are gated behind a confirmation step:

- `update_entries` -- requires confirmation
- `delete_entries` -- requires confirmation

When a tool requires confirmation, the agent **halts execution** after that step and waits for your approval. Set `"auto_confirm": true` in the parameters to bypass.

### Permission Check

All agent operations require the `project.manage` permission. This prevents unauthorized bulk operations by project viewers or editors.

### Error Handling

Each tool call is wrapped in a try-catch. Execution errors are:
1. Logged with full context to the audit log
2. Sanitized (no raw exception exposure in responses)
3. Reported as warnings rather than halting the entire plan (unless critical)

## Studio AI Chat Interface

The AI Agent is accessed through the Studio AI chat panel, which supports multiple modes:

| Mode | Description |
|------|-------------|
| Schema | Design and modify your content model |
| Data | Create, read, update, delete content entries |
| Writing | Generate and refine content |
| Agent | Execute multi-step plans across schema and data |

### Commands

From the schema chat panel, you can use special commands:

- `/schema` -- Focus on schema design
- `/data` -- Focus on content operations
- `/all` -- Full context (schema + data)

## Audit Trail

All agent actions are logged to the `audit_log` table with:

- Tool name (e.g., `create_collections`, `create_entries`)
- Source set to `'ai'`
- Complete input parameters
- Execution results
- Status (success/failure)
- Duration in milliseconds
- User who triggered the operation

The **Studio > Audit** tab provides a searchable log of all agent operations with expandable detail views.

## Use Cases

| Scenario | Agent Approach |
|----------|---------------|
| Site migration | Import existing content structure, then batch-create entries |
| Multi-language launch | Create content in one locale, then translate to 5+ locales in one request |
| Content restructuring | Explore schema, create new collections, migrate entries |
| SEO audit | Read all entries, analyze schema, suggest improvements |
| Bulk publishing | Update status of 100+ draft entries to published in one operation |
