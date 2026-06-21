---
title: Quick Start
description: Create your first Jambo project, define a collection, and add content via the API in under 10 minutes.
---

This guide walks through the essential workflow: creating a project, defining a content model, inserting data, and querying it.

## Prerequisites

A running Jambo instance (see [Installation](./installation/)) with an admin account.

## 1. Create a project

Projects are isolated workspaces. Each project has its own collections, entries, media library, API tokens, and access control.

```bash
curl -X POST "https://your-domain.com/api/projects" \
  -H "Authorization: Bearer <admin-jwt>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Blog",
    "description": "Personal blog project",
    "defaultLocale": "en"
  }'
```

Response:

```json
{
  "uuid": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "name": "My Blog",
  "description": "Personal blog project",
  "defaultLocale": "en",
  "locales": ["en"]
}
```

The returned `uuid` identifies your project in all subsequent API calls.

## 2. Create a collection

Collections define a content type. Each collection has a unique slug and a set of fields.

```bash
curl -X POST "https://your-domain.com/api/projects/{uuid}/collections" \
  -H "Authorization: Bearer <admin-jwt>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Articles",
    "slug": "articles",
    "isSingleton": false
  }'
```

### 3. Add fields

Fields define the shape of your content. Available types include `text`, `number`, `boolean`, `date`, `datetime`, `json`, `media`, and `relation`.

```bash
curl -X POST "https://your-domain.com/api/projects/{uuid}/collections/articles/fields" \
  -H "Authorization: Bearer <admin-jwt>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Title",
    "slug": "title",
    "type": "text",
    "isRequired": true
  }'
```

Add a few more:

```bash
curl -X POST "https://your-domain.com/api/projects/{uuid}/collections/articles/fields" \
  -H "Authorization: Bearer <admin-jwt>" \
  -H "Content-Type: application/json" \
  -d '{"name": "Body", "slug": "body", "type": "json"}'

curl -X POST "https://your-domain.com/api/projects/{uuid}/collections/articles/fields" \
  -H "Authorization: Bearer <admin-jwt>" \
  -H "Content-Type: application/json" \
  -d '{"name": "Published", "slug": "published", "type": "boolean"}'
```

## 4. Add content entries

Entries are the actual content objects. Field values are sent as a flat JSON object keyed by field slug.

```bash
curl -X POST "https://your-domain.com/api/projects/{uuid}/collections/articles/entries" \
  -H "Authorization: Bearer <admin-jwt>" \
  -H "Content-Type: application/json" \
  -d '{
    "locale": "en",
    "status": "published",
    "fieldValues": {
      "title": "Hello World",
      "body": "This is my first article.",
      "published": true
    }
  }'
```

Response:

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "locale": "en",
  "status": "published",
  "fieldValues": {
    "title": "Hello World",
    "body": "This is my first article.",
    "published": true
  },
  "createdAt": "2026-06-21T10:00:00+00:00",
  "publishedAt": "2026-06-21T10:00:00+00:00"
}
```

## 5. Query content

### REST API

List entries:

```bash
curl "https://your-domain.com/api/{uuid}/articles?locale=en&status=published"
```

Get a single entry by UUID:

```bash
curl "https://your-domain.com/api/{uuid}/articles/550e8400-e29b-41d4-a716-446655440000"
```

### Public API (read-only)

If the project has the public API enabled, collections and content are available without authentication:

```bash
curl "https://your-domain.com/public-api/collections"
curl "https://your-domain.com/public-api/collections/articles"
```

### GraphQL

Each project gets an auto-generated GraphQL schema based on its collections:

```graphql
query {
  articles(locale: "en", status: "published") {
    items {
      title: fieldValue(slug: "title")
      body: fieldValue(slug: "body")
    }
  }
}
```

```bash
curl -X POST "https://your-domain.com/api/{uuid}/graphql" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ articles(locale: \"en\", status: \"published\") { items { title: fieldValue(slug: \"title\") } } }"}'
```

## 6. Next steps

- Upload media via the [Media API](/features/media/)
- Set up [workflows](/features/workflows/) for custom publishing workflows
- Enable [localization](/features/localization/) to support multiple languages
- Configure [webhooks](/features/webhooks/) for content change notifications

## See also

- [Core Concepts](./concepts/) — projects, collections, entries, and field types
- [Collections](/features/collections/) — full collection management reference
- [Content](/features/content/) — entry creation, versioning, and scheduling
