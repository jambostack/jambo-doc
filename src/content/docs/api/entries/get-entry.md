---
title: Get an Entry
description: Retrieve a single content entry by its UUID.
---

Retrieves a single content entry by its UUID.

```http
GET /api/{projectId}/{collectionSlug}/{uuid}
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `projectId` | uuid | Your project UUID |
| `collectionSlug` | string | The collection slug |
| `uuid` | uuid | The entry UUID |

## Request

```bash
curl https://your-domain.com/api/{projectId}/posts/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## Response

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "status": "published",
  "locale": "en",
  "created_at": "2024-01-15T10:30:00+00:00",
  "updated_at": "2024-01-15T12:00:00+00:00",
  "fields": {
    "title": "My first post",
    "slug": "my-first-post",
    "body": "<p>Full content here...</p>",
    "author": {
      "uuid": "author-uuid",
      "fields": { "name": "Alice" }
    }
  }
}
```

## Status codes

| Status | Description |
|--------|-------------|
| `200` | Success |
| `404` | Entry not found |
