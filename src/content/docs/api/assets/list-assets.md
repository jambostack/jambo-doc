---
title: List Assets
description: Retrieve a list of media files from the project library.
---

Retrieves a paginated list of media files (images, documents, videos) from the project library.

```http
GET /api/{projectId}/files
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `projectId` | uuid | Your project UUID |

### Query

| Parameter | Default | Description |
|-----------|---------|-------------|
| `page` | `1` | Page number |
| `per_page` | `15` | Items per page (max `100`) |
| `type` | — | Filter by MIME type prefix: `image`, `video`, `application` |
| `search` | — | Search by filename |

## Request

```bash
curl https://your-domain.com/api/{projectId}/files \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## Response

```json
{
  "data": [
    {
      "uuid": "img-uuid-1234",
      "filename": "hero.jpg",
      "original_filename": "hero-image.jpg",
      "mime_type": "image/jpeg",
      "size": 204800,
      "url": "/uploads/media/abc123/hero.jpg",
      "created_at": "2024-01-15T10:00:00+00:00"
    }
  ],
  "total": 24,
  "current_page": 1,
  "last_page": 2,
  "per_page": 15
}
```

## Status codes

| Status | Description |
|--------|-------------|
| `200` | Success |
| `403` | Public API disabled or insufficient permissions |
