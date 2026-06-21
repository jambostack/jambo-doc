---
title: Core Concepts
description: Understanding the fundamental building blocks of Jambo — projects, collections, entries, fields, and content modeling.
---

Jambo is built around five core concepts that map directly to how you model and deliver content.

## Projects

A **project** is an isolated workspace. Each project has its own:

- Collections and content entries
- Media library and storage profiles
- API tokens and end-user authentication
- Members with role-based permissions
- Localization settings (locales, fallback)
- Workflow statuses
- Webhooks and automations

Projects are identified by a UUID v4. All content-related API calls include the project UUID as a path parameter.

```bash
# List your projects
curl "https://jamboapicms.test/api/projects" \
  -H "Authorization: Bearer <admin-jwt>"

# Create a new project
curl -X POST "https://jamboapicms.test/api/projects" \
  -H "Authorization: Bearer <admin-jwt>" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Blog", "defaultLocale": "en"}'
```

A single Jambo instance can host unlimited projects, making it fully multi-tenant.

## Collections

A **collection** is a content type definition — analogous to a database table. Each collection:

- Has a unique name and slug within its project
- Contains a set of **fields** that define its schema
- Can be a **standard collection** (multiple entries) or a **singleton** (single entry)
- Supports custom workflow statuses
- Can be soft-deleted

```bash
# List collections
curl "https://jamboapicms.test/api/projects/{uuid}/collections"

# Create a singleton collection
curl -X POST "https://jamboapicms.test/api/projects/{uuid}/collections" \
  -H "Authorization: Bearer <admin-jwt>" \
  -H "Content-Type: application/json" \
  -d '{"name": "Site Settings", "slug": "site-settings", "isSingleton": true}'
```

## Fields

**Fields** define the data shape of a collection. Jambo supports the following field types:

| Type | Description | Value type |
|---|---|---|
| `text` | Short or long text | `string` |
| `number` | Numeric value (integer or decimal) | `number` |
| `boolean` | True/false toggle | `boolean` |
| `date` | Date only (no time) | `string` (ISO 8601) |
| `datetime` | Date with time | `string` (ISO 8601) |
| `json` | Structured JSON data | `object` |
| `media` | Reference to a media file | Media UUID |
| `relation` | Reference to another entry | Entry UUID |

Fields can be:

- **Required** — validation enforced at the API level
- **Conditional** — visible only when another field matches a condition (requires v1.10+)
- **Ordered** — drag-and-drop field ordering
- **Repeated** — repeatable field groups (repeater fields)

```bash
# Add a field
curl -X POST "https://jamboapicms.test/api/projects/{uuid}/collections/{slug}/fields" \
  -H "Authorization: Bearer <admin-jwt>" \
  -H "Content-Type: application/json" \
  -d '{"name": "Author", "slug": "author", "type": "text", "isRequired": true}'

# Reorder fields
curl -X POST "https://jamboapicms.test/api/projects/{uuid}/collections/{slug}/fields/reorder" \
  -H "Authorization: Bearer <admin-jwt>" \
  -H "Content-Type: application/json" \
  -d '{"order": ["title", "author", "body"]}'
```

Field metadata is stored as `Field` entities with options and validation rules in JSON columns. Content values use an **EAV (Entity-Attribute-Value)** pattern via `ContentFieldValue`, which stores typed values across dedicated columns (`textValue`, `numberValue`, `booleanValue`, `dateValue`, `datetimeValue`, `jsonValue`).

## Entries

An **entry** is a single content object within a collection. Each entry:

- Belongs to exactly one collection and one project
- Has a **locale** (defaults to the project's default locale)
- Has a **status** (`draft`, `published`, or custom workflow statuses)
- Stores field values as a flat JSON object
- Supports **versioning** — every update creates a snapshot
- Can be **scheduled** for future publication
- Can be **soft-deleted** (moved to trash) or **force-deleted**

```bash
# Create an entry
curl -X POST "https://jamboapicms.test/api/projects/{uuid}/collections/articles/entries" \
  -H "Authorization: Bearer <admin-jwt>" \
  -H "Content-Type: application/json" \
  -d '{
    "locale": "en",
    "status": "draft",
    "fieldValues": {
      "title": "Draft article",
      "author": "Jane Doe"
    }
  }'

# Update status to published
curl -X PATCH "https://jamboapicms.test/api/projects/{uuid}/collections/articles/entries/{entryUuid}" \
  -H "Authorization: Bearer <admin-jwt>" \
  -H "Content-Type: application/json" \
  -d '{"status": "published"}'
```

### Status lifecycle

- **draft** — initial state, not publicly visible
- **published** — visible via the public API
- Custom statuses — defined per-collection in collection settings

When an entry transitions to `published`, the `publishedAt` timestamp is set automatically.

## API layer

Jambo exposes content through two auto-generated API surfaces:

### REST API

All CRUD operations for collections, entries, media, and settings are available via REST endpoints under `/api/projects/{uuid}/...`.

### Public API (read-only)

When enabled per project, collection structure and published content are available at `/public-api/collections` without authentication.

### GraphQL

Each project gets a dynamic GraphQL schema at `/api/{uuid}/graphql`. The schema mirrors the project's collections and fields, with queries for listing and single-entry retrieval and mutations for create, update, and delete.

## Relationship diagram

```
Project (multi-tenant)
  ├── Collection (content type)
  │   ├── Field (schema definition)
  │   └── ContentEntry (content object)
  │       └── ContentFieldValue (EAV value storage)
  ├── Media (file assets)
  │   └── MediaFolder (folder tree)
  ├── Automation (flow engine)
  └── EndUser (frontend user)
```

## See also

- [Quick Start](./quick-start/) — walkthrough of the basic workflow
- [Collections](/features/collections/) — collection management API
- [Fields](/features/fields/) — field types, conditions, and validation
- [Content](/features/content/) — entries, versioning, and scheduling
