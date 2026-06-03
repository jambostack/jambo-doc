---
title: Update an Entry
description: Update an existing content entry.
---

Updates an existing content entry. Supports full replacement (`PUT`) or partial update (`PATCH`).

```http
PUT  /api/{projectId}/{collectionSlug}/{uuid}
PATCH /api/{projectId}/{collectionSlug}/{uuid}
```

Use `PATCH` when you only want to update specific fields without affecting others.

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `projectId` | uuid | Your project UUID |
| `collectionSlug` | string | The collection slug |
| `uuid` | uuid | The entry UUID |

## Request body

```json
{
  "status": "published",
  "fields": {
    "title": "Updated title",
    "body": "<p>Updated content</p>"
  }
}
```

## Request

```bash
curl -X PATCH https://your-domain.com/api/{projectId}/posts/550e8400-... \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "fields": {
      "title": "Updated title"
    }
  }'
```

## Response

Returns the updated entry:

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "status": "published",
  "locale": "en",
  "updated_at": "2024-01-15T14:00:00+00:00",
  "fields": {
    "title": "Updated title",
    "slug": "my-post",
    "body": "<p>Updated content</p>"
  }
}
```

## Status codes

| Status | Description |
|--------|-------------|
| `200` | Updated successfully |
| `403` | Insufficient permissions |
| `404` | Entry not found |
| `422` | Invalid locale or field values |
