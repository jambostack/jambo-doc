---
title: List Collections
description: Retrieve all collections for a project.
---

Retrieves all collections defined in a project.

```http
GET /api/{projectId}/collections
```

## Request

```bash
curl https://your-domain.com/api/{projectId}/collections \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## Response

```json
{
  "data": [
    {
      "uuid": "coll-uuid",
      "name": "Posts",
      "slug": "posts",
      "description": "Blog articles",
      "is_singleton": false,
      "fields": [
        { "name": "Title", "slug": "title", "type": "text", "required": true },
        { "name": "Body", "slug": "body", "type": "richtext", "required": false },
        { "name": "Featured Image", "slug": "featured_image", "type": "media", "required": false }
      ]
    }
  ]
}
```

## Field types

| Type | Description |
|------|-------------|
| `text` | Short text |
| `longtext` | Multi-line text |
| `richtext` | HTML rich text |
| `slug` | URL-safe string |
| `email` | Email address |
| `number` | Integer or decimal |
| `boolean` | True/false |
| `date` / `datetime` | Date or date+time |
| `media` | Reference to a media asset |
| `relation` | Reference to another collection's entry |
| `enumeration` | One value from a predefined list |
| `json` | Raw JSON object |
