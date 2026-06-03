---
title: Get Project
description: Retrieve project information and configuration.
---

Retrieves information about a project including its name, locales, and collection list.

```http
GET /api/{projectId}/project
```

## Request

```bash
curl https://your-domain.com/api/{projectId}/project \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## Response

```json
{
  "uuid": "f99cb038-6611-44d3-b1c7-46cf62c1e232",
  "name": "My Blog",
  "slug": "my-blog",
  "default_locale": "en",
  "locales": ["en", "fr", "es"],
  "collections": [
    {
      "slug": "posts",
      "name": "Posts",
      "is_singleton": false
    },
    {
      "slug": "settings",
      "name": "Settings",
      "is_singleton": true
    }
  ]
}
```

## Status codes

| Status | Description |
|--------|-------------|
| `200` | Success |
| `403` | Invalid token or public API disabled |
| `404` | Project not found |
