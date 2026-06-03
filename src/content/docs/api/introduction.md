---
title: Content API — Introduction
description: Overview of the Jambo REST API — base URLs, authentication, and response format.
---

The Jambo Content API is a **REST API** that gives public or authenticated access to your project's content, collections, and media files.

## Base URL

```
https://your-domain.com/api/{project-uuid}/
```

Replace `{project-uuid}` with your project's UUID, visible in **Project Settings → API Access**.

### Endpoints overview

| Resource | Base path |
|----------|-----------|
| Content entries | `/api/{projectId}/{collectionSlug}` |
| Files / assets | `/api/{projectId}/files` |
| GraphQL | `/api/projects/{projectId}/graphql` |
| OpenAPI spec | `/api/{projectId}/openapi.json` |

## Authentication

All API requests require a **Bearer token** in the `Authorization` header.

```http
Authorization: Bearer YOUR_API_TOKEN
```

API tokens are managed in **Project Settings → API Access**. Each token can be scoped to specific permissions (read, write, delete).

### Example

```bash
curl https://your-domain.com/api/{project-uuid}/posts \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

:::caution
Keep your API tokens secret. Never expose them in client-side code or public repositories.
:::

## Response format

All responses are JSON. Successful list responses include pagination metadata:

```json
{
  "data": [
    {
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "status": "published",
      "locale": "en",
      "created_at": "2024-01-15T10:30:00+00:00",
      "updated_at": "2024-01-15T12:00:00+00:00",
      "fields": {
        "title": "My first post",
        "slug": "my-first-post",
        "body": "<p>Hello world</p>"
      }
    }
  ],
  "total": 42,
  "current_page": 1,
  "last_page": 3,
  "per_page": 15,
  "from": 1,
  "to": 15
}
```

## Error responses

| Status | Meaning |
|--------|---------|
| `400` | Bad request — invalid parameters |
| `401` | Missing or invalid token |
| `403` | Forbidden — insufficient permissions or public API disabled |
| `404` | Project, collection, or entry not found |
| `409` | Conflict — e.g. singleton already has an entry |
| `422` | Validation error — invalid field values |
| `500` | Server error |

Error responses always include an `error` field:

```json
{ "error": "Collection not found." }
```

## Localization

Pass `?locale=fr` to any list or single-entry endpoint to filter by locale:

```bash
GET /api/{projectId}/posts?locale=fr
```

If no locale is specified, the project's **default locale** is used for read operations.

## Pagination

List endpoints support `page` and `per_page` query parameters:

| Parameter | Default | Max |
|-----------|---------|-----|
| `page` | `1` | — |
| `per_page` | `15` | `100` |

## OpenAPI / Swagger

Every project exposes a live OpenAPI spec at:

```
GET /api/{projectId}/openapi.json
```

Load it in Swagger UI or Postman to explore and test all endpoints automatically.
