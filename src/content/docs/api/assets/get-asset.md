---
title: Get an Asset
description: Retrieve a single media file by its UUID.
---

Retrieves a single media file by its UUID or filename.

```http
GET /api/{projectId}/files/{identifier}
```

The `identifier` can be either the asset's **UUID** or its **filename**.

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `projectId` | uuid | Your project UUID |
| `identifier` | string | Asset UUID or filename |

## Request

```bash
# By UUID
curl https://your-domain.com/api/{projectId}/files/img-uuid-1234 \
  -H "Authorization: Bearer YOUR_API_TOKEN"

# By filename
curl https://your-domain.com/api/{projectId}/files/hero.jpg \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## Response

```json
{
  "uuid": "img-uuid-1234",
  "filename": "hero.jpg",
  "original_filename": "hero-image.jpg",
  "mime_type": "image/jpeg",
  "size": 204800,
  "url": "/uploads/media/abc123/hero.jpg",
  "created_at": "2024-01-15T10:00:00+00:00"
}
```

## Status codes

| Status | Description |
|--------|-------------|
| `200` | Success |
| `404` | Asset not found |
