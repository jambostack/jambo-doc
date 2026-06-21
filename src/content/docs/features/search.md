---
title: Search
description: Full-text search via Meilisearch with real-time indexing, atomic rebuild, and highlighted results.
---

The Search feature provides full-text search across all project content using Meilisearch. It supports real-time indexing via Doctrine lifecycle events and zero-downtime index rebuilds.

## Architecture

```
Content entry created/updated/deleted
        │
        ▼
SearchIndexSubscriber (Doctrine onFlush/postFlush)
        │
        ├── indexEntry() ──► Meilisearch: addDocuments()
        └── removeEntry() ──► Meilisearch: deleteDocument()

API endpoints:
  GET  /api/projects/{uuid}/search?q=...  ──► Meilisearch: search()
  POST /api/projects/{uuid}/search/reindex ──► Meilisearch: swapIndexes()
```

## Configuration

**Environment variables:**

```
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_KEY=
```

**Service wiring** (in `config/services.yaml`):

```yaml
App\Service\SearchService:
    arguments:
        $meilisearchHost: '%env(MEILISEARCH_HOST)%'
        $meilisearchKey: '%env(MEILISEARCH_KEY)%'
```

If both host and key are empty, the search service is gracefully disabled (all methods return empty results).

## Index Structure

Each project has its own Meilisearch index named `jambo_p_<8-char-md5-of-uuid>` (e.g. `jambo_p_a1b2c3d4`).

**Primary key:** `uuid` (the ContentEntry UUID).

### Document fields

| Field | Type | Source |
|---|---|---|
| `id` | integer | Doctrine ID |
| `uuid` | string | Entry UUID |
| `locale` | string | e.g. `en`, `fr`, `es` |
| `status` | string | `draft`, `published`, etc. |
| `collection` | string | Collection slug |
| `created_at` | string (ISO 8601) | Creation timestamp |
| `updated_at` | string (ISO 8601) | Last update |
| `{field_slug}` | varies | One key per EAV field value |
| `_collection` | string | Duplicate for filtering |
| `_project` | string | Project UUID |

### EAV field type mapping

| Field type | Indexed value |
|---|---|
| `text`, `textarea`, `richtext`, `email`, `url`, `slug` | `textValue` (string) |
| `number`, `decimal`, `rating` | `numberValue` (float) |
| `boolean`, `checkbox` | `booleanValue` (bool) |
| `date` | `dateValue` (`Y-m-d`) |
| `datetime` | `datetimeValue` (ATOM) |
| `json`, `repeater`, `media`, `relation` | `jsonValue` (raw JSON) |

### Reserved key collision handling

If a field slug matches a system key (`id`, `uuid`, `locale`, `status`, `collection`, `created_at`, `updated_at`, `deleted_at`, `published_at`, `scheduled_at`, `creator`, `updater`, `assigned_to`), it is automatically prefixed with `field_` (e.g. a field named `status` becomes `field_status`).

### Filterable attributes

Set during rebuild: `_collection`, `status`, `locale`.

### Sortable attributes

Set during rebuild: `created_at`, `updated_at` (default sort: `updated_at:desc`).

## Search API

### Search across project content

```
GET /api/projects/{uuid}/search?q=hello&limit=10&collection=articles&locale=fr
```

**Parameters:**

| Parameter | Required | Default | Description |
|---|---|---|---|
| `q` | Yes | -- | Search query text |
| `limit` | No | 20 | Max results (capped at 100) |
| `offset` | No | 0 | Pagination offset |
| `collection` | No | none | Filter by collection slug |
| `locale` | No | none | Filter by locale |

**Authorization:** Requires `project.view` permission.

**Example response:**

```json
{
  "hits": [
    {
      "uuid": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      "title": "Hello World",
      "status": "published",
      "_collection": "articles",
      "_formatted": {
        "title": "<mark>Hello</mark> World"
      }
    }
  ],
  "query": "hello",
  "processingTimeMs": 3,
  "estimatedTotalHits": 1
}
```

Search results include highlighted fields (`_formatted`) with `<mark>` tags by default.

### Rebuild index

```
POST /api/projects/{uuid}/search/reindex
```

**Authorization:** Requires `project.manage` permission.

Rebuilds the entire search index using an atomic swap pattern (zero downtime):

1. Fetch all non-deleted entries for the project
2. Create a temporary index (`jambo_p_{hash}_tmp_{timestamp}`)
3. Add all documents to the temporary index
4. Configure filterable and sortable attributes
5. Atomic swap via Meilisearch's `swapIndexes` API
6. Delete the old index

**Response:**

```json
{
  "indexed": 42,
  "success": true
}
```

## Real-Time Indexing

The `SearchIndexSubscriber` listens to Doctrine `onFlush` and `postFlush` events:

- **New entries**: added to index
- **Updated entries**: re-indexed (or removed if soft-deleted)
- **Deleted entries**: removed from index

Changes are batched: accumulated during `onFlush`, committed in `postFlush` (after the database flush is complete).

## Search via MCP

The MCP server exposes two search tools:

- `search_content` -- full-text search with collection/locale filters
- `search_content_semantic` -- same full-text search (not vector-based despite the name)

## Meilisearch version

Uses `meilisearch/meilisearch-php` (version `*` from `composer.json`).

## Key files

| File | Purpose |
|---|---|
| `src/Service/SearchService.php` | Meilisearch client, indexing, search, atomic rebuild |
| `src/Service/EavDataFormatterService.php` | Flattens EAV fields into search documents |
| `src/Controller/SearchController.php` | REST endpoints for search and reindex |
| `src/EventSubscriber/SearchIndexSubscriber.php` | Doctrine subscriber for real-time index sync |
| `src/Mcp/JamboApiMcpServer.php` | MCP search tools |
