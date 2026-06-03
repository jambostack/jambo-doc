---
title: MCP Server
description: Expose your Jambo project as an MCP server for AI agents and Claude.
---

Jambo includes a built-in **MCP (Model Context Protocol) server** that exposes your project's content and collections as tools for AI agents. This lets Claude, Cursor, or any MCP-compatible client interact directly with your CMS.

## What is MCP?

MCP is an open protocol that lets AI models call tools to read and write data in external systems. When you enable the Jambo MCP server, AI agents can:

- List and read your collections and entries
- Create, update, and delete content
- Upload files to the media library
- Query your GraphQL API

## Enabling the MCP server

1. Go to **Project Settings → MCP Server**
2. Toggle **Enable MCP Server**
3. Copy the generated MCP endpoint URL and API key

## Connecting to Claude Desktop

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "jambo": {
      "command": "npx",
      "args": ["-y", "@jambostack/mcp-client"],
      "env": {
        "JAMBO_URL": "https://your-domain.com",
        "JAMBO_PROJECT": "your-project-uuid",
        "JAMBO_TOKEN": "your-api-token"
      }
    }
  }
}
```

## Available tools

Once connected, the AI has access to these tools:

| Tool | Description |
|------|-------------|
| `list_collections` | Get all collections and their field schemas |
| `list_entries` | Fetch entries from a collection with filters |
| `get_entry` | Get a single entry by UUID |
| `create_entry` | Create a new content entry |
| `update_entry` | Update an existing entry |
| `delete_entry` | Soft-delete an entry |
| `upload_file` | Upload a file to the media library |
| `graphql_query` | Run a GraphQL query |

## Use cases

- **AI content generation** — ask Claude to write and publish blog posts directly
- **Data import** — "Here's a CSV of 50 products, create entries for all of them"
- **Content audits** — "List all draft posts older than 30 days"
- **Bulk updates** — "Update the status of all posts in the 'news' category to published"
