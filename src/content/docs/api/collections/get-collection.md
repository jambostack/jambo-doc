---
title: Get a Collection
description: Retrieve a single collection by its slug.
---

Retrieves a single collection by its slug, including all field definitions.

```http
GET /api/{projectId}/collections/{slug}
```

## Request

```bash
curl https://your-domain.com/api/{projectId}/collections/posts \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## Response

```json
{
  "uuid": "coll-uuid",
  "name": "Posts",
  "slug": "posts",
  "description": "Blog articles",
  "is_singleton": false,
  "fields": [
    { "name": "Title", "slug": "title", "type": "text", "required": true, "order": 1 },
    { "name": "Body", "slug": "body", "type": "richtext", "required": false, "order": 2 }
  ]
}
```

## Status codes

| Status | Description |
|--------|-------------|
| `200` | Success |
| `404` | Collection not found |
