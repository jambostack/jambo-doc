---
title: MCP Server
description: Model Context Protocol server for AI agent integration -- endpoint, tools, resources, and authentication.
---

The JamboApi CMS exposes a **Model Context Protocol (MCP)** server, allowing AI assistants (Claude Desktop, Cursor, VS Code, custom agents) to interact with your CMS content, schema, and media through a standardized tool interface.

The server implements the [MCP specification (2024-11-05)](https://modelcontextprotocol.io) using JSON-RPC 2.0 over HTTP POST.

## Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/mcp` | POST | Global MCP endpoint (requires Auth) |
| `/mcp` | GET | Server info and discovery |
| `/api/projects/{uuid}/mcp` | POST | Project-scoped MCP endpoint |

### Server Info

```
GET /mcp
```

Returns server metadata without authentication:

```json
{
  "name": "JamboApi MCP Server",
  "version": "2.0.0",
  "protocolVersion": "2024-11-05",
  "vendor": "JamboApi CMS",
  "endpoints": {
    "http": "/mcp",
    "project": "/api/projects/{uuid}/mcp"
  },
  "authentication": {
    "type": "bearer_token",
    "description": "Use a JamboApi API token in the Authorization header: Bearer token"
  },
  "capabilities": {
    "tools": true,
    "resources": true
  }
}
```

## Authentication

The global `/mcp` endpoint supports two authentication methods:

1. **Session auth** (logged-in admin via the Studio web interface)
2. **Bearer token** (API token in the `Authorization` header)

The project-scoped `/api/projects/{uuid}/mcp` endpoint does not enforce authentication at the controller level -- it trusts the route-level configuration.

**Rate limiting:** The global endpoint is rate-limited to **60 requests per minute per IP**. Returns HTTP 429 when exceeded.

## Protocol Flow

The MCP server uses standard JSON-RPC 2.0 messages:

1. **Initialize** -- Client sends `initialize` to negotiate protocol version and capabilities
2. **Initialized** -- Server confirms with `notifications/initialized`
3. **Tool calls** -- Client sends `tools/list` and `tools/call` as needed
4. **Resource reads** -- Client sends `resources/list` and `resources/read` as needed

## Tools

The server exposes **26 tools** organized into 6 categories:

### Exploration Tools (3)

| Tool | Parameters | Description |
|------|-----------|-------------|
| `list_projects` | `search` (optional) | List all accessible projects |
| `list_collections` | `project_uuid` (required), `include_fields` | List collections in a project |
| `get_collection_schema` | `project_uuid`, `collection_slug` (required) | Get full schema of a collection |

### Content Tools (7)

| Tool | Parameters | Description |
|------|-----------|-------------|
| `list_entries` | `project_uuid`, `collection_slug` (required), `locale`, `status`, `limit` (max 200), `offset` | List entries with filters and pagination |
| `get_entry` | `project_uuid`, `collection_slug`, `entry_uuid` (required) | Get a single entry by UUID |
| `create_entry` | `project_uuid`, `collection_slug`, `data` (required), `locale` | Create a new entry |
| `update_entry` | `project_uuid`, `collection_slug`, `entry_uuid`, `data` (required), `status` | Update an existing entry |
| `delete_entry` | `project_uuid`, `collection_slug`, `entry_uuid` (required) | Soft-delete an entry |
| `publish_entry` | `project_uuid`, `collection_slug`, `entry_uuid` (required) | Publish an entry (set status to "published") |
| `search_content` | `project_uuid`, `query` (required), `collection`, `locale`, `limit` (max 100) | Full-text search across content |

### Schema Tools (5)

| Tool | Parameters | Description |
|------|-----------|-------------|
| `create_collection` | `project_uuid`, `name` (required), `slug`, `description`, `is_singleton` | Create a new collection |
| `add_field` | `project_uuid`, `collection_slug`, `name`, `type` (required), `slug`, `is_required`, `options` | Add a field to a collection |
| `apply_template` | `template_id`, `project_name` (required) | Apply a project template |

**Supported field types:** `text`, `longtext`, `richtext`, `number`, `boolean`, `date`, `datetime`, `email`, `slug`, `color`, `json`, `enumeration`, `media`, `relation`

### Media Tools (3)

| Tool | Parameters | Description |
|------|-----------|-------------|
| `list_media` | `project_uuid` (required), `search`, `limit` (max 200), `offset` | List media files |
| `get_media_info` | `media_uuid` (required) | Get detailed media information |
| `transform_image` | `media_uuid` (required), `width`, `height`, `fit`, `format`, `quality` | Get a transformed image URL |

### Users Tools (2)

| Tool | Parameters | Description |
|------|-----------|-------------|
| `list_end_users` | `project_uuid` (required), `status`, `limit`, `offset` | List project end-users |
| `get_end_user_schema` | `project_uuid` (required) | Get custom end-user fields schema |

### AI Tools (6)

| Tool | Parameters | Description |
|------|-----------|-------------|
| `ai_generate_content` | `project_uuid`, `collection_slug`, `brief` (required), `locale` | Generate content from a natural language brief |
| `ai_translate_content` | `content` (required JSON), `target_locale` (required) | Translate JSON content to another locale |
| `ai_summarize_text` | `text` (required), `max_words` (default 80) | Summarize text |
| `ai_generate_seo` | `content` (required JSON) | Generate SEO metadata (metaTitle, metaDescription, slug, keywords) |
| `ai_suggest_schema` | `project_uuid`, `collection_slug` (required) | Suggest schema improvements for a collection |
| `search_content_semantic` | `project_uuid`, `query` (required), `limit` | Semantic/full-text search |

### Versioning Tools (2)

| Tool | Parameters | Description |
|------|-----------|-------------|
| `create_version` | `project_uuid`, `collection_slug`, `entry_uuid` (required), `label` | Create a version snapshot of an entry |
| `list_versions` | `project_uuid`, `collection_slug`, `entry_uuid` (required) | List versions of an entry |

## Resources

| URI | Name | MIME | Description |
|-----|------|------|-------------|
| `jamboapi://server/info` | Server Info | `application/json` | Server version, status, capabilities |

## JSON-RPC Examples

### Initialize

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "initialize",
  "params": {
    "protocolVersion": "2024-11-05",
    "capabilities": {},
    "clientInfo": {
      "name": "my-agent",
      "version": "1.0.0"
    }
  }
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "protocolVersion": "2024-11-05",
    "capabilities": {
      "tools": { "listChanged": false },
      "resources": { "subscribe": false, "listChanged": false }
    },
    "serverInfo": {
      "name": "JamboApi CMS",
      "version": "2.0.0"
    }
  }
}
```

### List Tools

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/list"
}
```

### Call a Tool

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "list_entries",
    "arguments": {
      "project_uuid": "550e8400-e29b-41d4-a716-446655440000",
      "collection_slug": "articles",
      "limit": 10
    }
  }
}
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "[{\"uuid\": \"...\", \"title\": \"...\"}]"
      }
    ]
  }
}
```

### Error Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32601,
    "message": "Unknown method: invalid_tool"
  }
}
```

## Error Codes

| Code | Meaning |
|------|---------|
| `-32700` | Parse error |
| `-32600` | Invalid request |
| `-32601` | Method not found |
| `-32602` | Invalid params |
| `-32603` | Internal error |
| `-32000` | Tool execution error |
| `-32001` | Tool not available in current context |

## Client Configuration

### Claude Desktop

```json
{
  "mcpServers": {
    "jamboapi": {
      "type": "http",
      "url": "https://your-domain.com/mcp",
      "headers": {
        "Authorization": "Bearer your-api-token"
      }
    }
  }
}
```

### VS Code / Cursor

```json
{
  "mcp": {
    "servers": {
      "jamboapi": {
        "type": "http",
        "url": "https://your-domain.com/mcp",
        "headers": {
          "Authorization": "Bearer your-api-token"
        }
      }
    }
  }
}
```

## Audit Logging

All MCP tool calls are logged to the `audit_log` table with:
- Tool name and parameters
- Project identifier
- Response status (success/failure)
- Error messages (if any)
- The authenticated user or token
- Execution duration in milliseconds

Sensitive parameters (`password`, `token`, `secret`, `api_key`, `authorization`) are automatically redacted from logs. Outputs larger than 10 KB are truncated.

## Studio Configuration

Navigate to **Project > Settings > MCP Access** in the Studio to:
- View the project-scoped MCP endpoint URL
- See all available tools organized by category
- Get pre-built configuration snippets for Claude Desktop and Cursor/VS Code
- Copy example curl commands for testing
