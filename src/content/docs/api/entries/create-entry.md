---
title: Create an Entry
description: Create a new content entry in a collection.
---

Creates a new content entry in a collection.

```http
POST /api/{projectId}/{collectionSlug}
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `projectId` | uuid | Your project UUID |
| `collectionSlug` | string | The collection slug |

## Request body

```json
{
  "status": "published",
  "locale": "en",
  "fields": {
    "title": "My new post",
    "slug": "my-new-post",
    "body": "<p>Content here...</p>"
  }
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `status` | string | `draft` | `draft` or `published` |
| `locale` | string | project default | Entry locale |
| `fields` | object | `{}` | Field values keyed by field slug |

## Request

```bash
curl -X POST https://your-domain.com/api/{projectId}/posts \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "published",
    "locale": "en",
    "fields": {
      "title": "My new post",
      "slug": "my-new-post"
    }
  }'
```

## Response

Returns the created entry with HTTP `201 Created`:

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "status": "published",
  "locale": "en",
  "created_at": "2024-01-15T10:30:00+00:00",
  "updated_at": "2024-01-15T10:30:00+00:00",
  "fields": {
    "title": "My new post",
    "slug": "my-new-post"
  }
}
```

## Status codes

| Status | Description |
|--------|-------------|
| `201` | Created successfully |
| `403` | Insufficient permissions |
| `404` | Collection not found |
| `409` | Singleton collection already has an entry |
| `422` | Invalid locale or field values |
