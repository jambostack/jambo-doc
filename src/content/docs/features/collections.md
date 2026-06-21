---
title: Collections
description: Content type definitions — schema, fields, singletons, and lifecycle management.
---

## Overview

A **Collection** in Jambo defines a content type. It groups a set of **Fields** (the schema) and produces **Content Entries** (the data). Collections are scoped to a Project and are uniquely identified by a slug.

## Entity structure

The `Collection` entity (`src/Entity/Collection.php`) holds the following properties:

| Property | Type | Description |
|---|---|---|
| `id` | `int` | Auto-generated primary key |
| `uuid` | `uuid` | Unique UUIDv4, auto-generated |
| `name` | `string` | PascalCase display name, e.g. `BlogPosts` |
| `slug` | `string` | snake_case machine name, e.g. `blog_posts` |
| `description` | `text|null` | Human-readable description |
| `isSingleton` | `bool` | When true, only one entry is allowed (default false) |
| `order` | `int` | Sort order in the Studio sidebar |
| `settings` | `json|null` | Extended configuration, including custom workflow statuses |
| `deletedAt` | `datetime|null` | Soft-delete timestamp |

## Naming conventions

Jambo enforces automatic naming conventions via `src/Service/NamingConvention.php`:

- **Collection names** are normalized to **PascalCase** (e.g. `"blog posts"` becomes `BlogPosts`)
- **Slugs** are normalized to **snake_case** (e.g. `"BlogPosts"` becomes `blog_posts`)
- Reserved field slugs: `id`, `uuid`, `status`, `locale`, `created_at`, `updated_at`, `deleted_at`

## Singleton collections

When `isSingleton` is `true`, the collection can only contain a single non-deleted content entry. Attempting to create a second entry returns `409 Conflict`. This is useful for one-off pages like "Homepage" or "Site Settings".

## API endpoints

All collection management is done through the Studio API. The collection slug is used to reference a collection in URL paths.

### Studio API

Base URL: `/api/projects/{projectUuid}/collections`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `` | List all collections |
| `POST` | `` | Create a new collection |
| `POST` | `/reorder` | Batch reorder collections |
| `GET` | `/{slug}` | Get a single collection |
| `PUT/PATCH` | `/{slug}` | Update a collection |
| `DELETE` | `/{slug}` | Remove a collection |

#### Create a collection

```json
// POST /api/projects/{projectUuid}/collections
{
  "name": "BlogPosts",
  "slug": "blog_posts",
  "description": "Blog content type",
  "is_singleton": false,
  "order": 1
}
```

#### Update a collection

```json
// PUT /api/projects/{projectUuid}/collections/blog_posts
{
  "name": "Articles",
  "description": "Renamed blog type"
}
```

### Public API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/public-api/collections` | List all collections (paginated) |
| `GET` | `/public-api/collections/{slug}` | Get a single collection with fields and workflow config |

The public API response includes the collection schema (fields with their types and options) and workflow configuration (custom statuses, default status).

```json
// GET /public-api/collections/blog_posts
{
  "name": "BlogPosts",
  "slug": "blog_posts",
  "description": "Blog posts collection",
  "isSingleton": false,
  "fields": [
    {
      "name": "title",
      "slug": "title",
      "type": "text",
      "isRequired": true,
      "options": null
    }
  ],
  "workflow": {
    "statuses": [
      {"slug": "draft", "label": "Draft", "color": "#6b7280", "published": false},
      {"slug": "review", "label": "In Review", "color": "#f59e0b", "published": false},
      {"slug": "published", "label": "Published", "color": "#10b981", "published": true}
    ],
    "defaultStatus": "draft"
  }
}
```

## Collection templates

Jambo allows saving a collection's field schema as a reusable template via `/api/collection-templates`. Templates store the field structure and can be applied when creating new collections.

## See also

- [Fields](/features/fields/) — defining the schema within a collection
- [Content](/features/content/) — entries created from a collection schema
- [Workflows](/features/workflows/) — custom statuses per collection
