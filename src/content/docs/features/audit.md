---
title: Audit
description: Immutable audit logging for all MCP and AI operations with buffered writes and REST API access.
---

The audit system records every MCP tool call and AI operation in an immutable audit log. Logging is explicit (not automatic via Doctrine subscribers) and uses a buffered flush strategy for performance.

## Architecture

```
MCP tool call / AI operation
        │
        ▼
AuditService::log() or AuditService::logAiAction()
        │
        ├── Creates AuditLog entity
        ├── Sanitizes sensitive input (redacts passwords, tokens)
        ├── Truncates large output (>10KB)
        ├── Persists entity (no flush yet)
        └── Accumulates in buffer
                │
                ▼
        Auto-flush at 10 entries
        or flush() on KernelEvents::TERMINATE
                │
                ▼
        Database (audit_log table)
                │
                ▼
        API: GET /api/projects/{uuid}/audit-logs
```

## AuditService

At `src/Service/AuditService.php`. The core service accepts these parameters:

| Parameter | Type | Description |
|---|---|---|
| `toolName` | string | Identifier for the action (e.g. `collection_create`, `ai_translate`) |
| `project` | ?Project | The project context (nullable for system-level actions) |
| `input` | ?array | Input arguments/parameters |
| `output` | mixed | Result/response data |
| `status` | string | `success` (default), `error`, or `failed` |
| `errorMessage` | ?string | Error details |
| `createdBy` | ?string | User identifier (email or "system") |
| `source` | string | Origin: `mcp` (default), `ai`, or custom |
| `durationMs` | ?int | Execution time in milliseconds |

### Data sanitization

Sensitive input keys are automatically redacted before storage:

```php
$sensitive = ['password', 'token', 'secret', 'api_key', 'authorization'];
// Replaced with '[REDACTED]'
```

### Output truncation

If the JSON-encoded output exceeds 10,000 bytes, it is replaced with:

```json
{
  "_truncated": true,
  "_original_size": 15420,
  "preview": "{\"uuid\": \"...\"..."
}
```

### AI-specific logging

```php
$auditService->logAiAction(
    action: 'translate',
    project: $project,
    input: ['text' => 'Hello', 'locale' => 'fr'],
    output: ['translated' => 'Bonjour'],
    createdBy: 'user@example.com',
    durationMs: 1200,
);
// Automatically sets toolName = "ai_translate" and source = "ai"
```

## Database Schema

Table: `audit_log`

| Column | Type | Description |
|---|---|---|
| `uuid` | uuid (unique) | Generated on persist |
| `project_id` | int (nullable, FK) | Project reference (no cascade delete) |
| `tool_name` | varchar(100) | Action identifier (indexed) |
| `input` | json (nullable) | Sanitized input parameters |
| `output` | json (nullable) | Truncated if >10KB |
| `status` | varchar(20) | `success`, `error`, or `failed` |
| `error_message` | longtext (nullable) | Error details |
| `created_by` | varchar(100) (nullable) | User email or "system" (indexed) |
| `source` | varchar(50) (nullable) | `mcp`, `ai`, or custom |
| `duration_ms` | int (nullable) | Execution time |
| `created_at` | datetime | Set on creation |

**Indexes:**
- Composite: `(project_id, created_at)` for efficient per-project listing
- Single: `(tool_name)` for filtering by action type
- Single: `(created_by)` for filtering by user

## Buffering and Flush Strategy

1. Each `log()` call persists the entity to Doctrine's UnitOfWork (no flush)
2. When the buffer reaches 10 entries, an automatic flush is triggered
3. On `KernelEvents::TERMINATE`, `AuditFlushSubscriber` calls `flush()` to persist remaining entries

This batches database writes while ensuring no entries are lost at the end of a request.

## API Endpoints

### List audit logs for a project

```
GET /api/projects/{uuid}/audit-logs?limit=100&offset=0
```

**Parameters:** `limit` (default 100, max 500), `offset` (default 0).

**Authorization:** Requires `project.view` permission.

**Response:**

```json
{
  "logs": [
    {
      "uuid": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      "toolName": "entry_create",
      "status": "success",
      "errorMessage": null,
      "createdBy": "user@example.com",
      "source": "mcp",
      "durationMs": 45,
      "createdAt": "2025-01-01T00:00:00+00:00",
      "input": { "collection": "articles", "title": "Hello" },
      "output": { "uuid": "..." }
    }
  ],
  "total_today": 128
}
```

### List recent error logs (admin only)

```
GET /api/admin/audit-logs/errors
```

**Authorization:** Requires `ROLE_SUPER_ADMIN`.

Returns the last 50 error entries across all projects: `uuid`, `toolName`, `errorMessage`, `source`, `createdAt`.

## What Gets Logged

| toolName | source | Triggered by |
|---|---|---|
| Any MCP tool name (e.g. `collection_create`, `entry_update`) | `mcp` | MCP tool call via `JamboApiMcpServer` |
| `ai_generate_content` | `ai` | AI content generation |
| `ai_translate` | `ai` | AI content translation |
| `ai_summarize` | `ai` | AI text summarization |
| `ai_seo` | `ai` | AI SEO metadata generation |
| `ai_suggest_schema` | `ai` | AI schema suggestions |
| `ai_alt_text` | `ai` | AI alt text generation |

## Frontend Viewer

The audit log viewer is in the Studio settings as the "Audit" tab (`AuditLogsPage.tsx`). It shows each entry as a card with success/error icon, tool name, source badge, duration, timestamp, and user. Clicking a card opens a detail modal with full JSON for input and output.

## Key files

| File | Purpose |
|---|---|
| `src/Service/AuditService.php` | Core logging service with buffering and sanitization |
| `src/Entity/AuditLog.php` | Doctrine entity defining the audit_log table |
| `src/Repository/AuditLogRepository.php` | Query methods for audit logs |
| `src/Controller/AuditController.php` | REST API endpoints |
| `src/EventSubscriber/AuditFlushSubscriber.php` | Flushes buffered logs at request end |
| `assets/js/pages/Projects/Settings/Studio/AuditLogsPage.tsx` | React audit log viewer |
