---
title: List Entries
description: Retrieve a paginated list of content entries from a collection.
---

Retrieves a paginated list of content entries from a collection.

```http
GET /api/{projectId}/{collectionSlug}
```

## Parameters

### Path

| Parameter | Type | Description |
|-----------|------|-------------|
| `projectId` | uuid | Your project UUID |
| `collectionSlug` | string | The collection slug (e.g. `posts`) |

### Query

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | `1` | Page number |
| `per_page` | integer | `15` | Items per page (max `100`) |
| `locale` | string | project default | Filter by locale (e.g. `en`, `fr`) |
| `status` | string | `published` | Filter by status: `published` or `draft` |

## Request

```bash
curl https://your-domain.com/api/{projectId}/posts \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

With filters:

```bash
curl "https://your-domain.com/api/{projectId}/posts?page=2&per_page=10&locale=fr" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## Response

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
        "body": "<p>Full content here...</p>"
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

## Status codes

| Status | Description |
|--------|-------------|
| `200` | Success |
| `403` | Public API disabled for this project |
| `404` | Project or collection not found |
