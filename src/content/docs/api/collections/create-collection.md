---
title: Create a Collection
description: Create a new collection with fields via the Jambo API.
---

Creates a new collection in a project.

```http
POST /api/projects/{projectId}/collections
```

:::note
This endpoint requires an API token with `admin` scope.
:::

## Request body

```json
{
  "name": "Products",
  "slug": "products",
  "description": "Product catalog",
  "isSingleton": false,
  "fields": [
    { "name": "Name", "slug": "name", "type": "text", "isRequired": true },
    { "name": "Price", "slug": "price", "type": "decimal", "isRequired": true },
    { "name": "Description", "slug": "description", "type": "richtext" },
    { "name": "Image", "slug": "image", "type": "media" }
  ]
}
```

## Response

```json
{
  "uuid": "coll-uuid",
  "name": "Products",
  "slug": "products",
  "description": "Product catalog",
  "is_singleton": false,
  "fields": [
    { "name": "Name", "slug": "name", "type": "text", "required": true, "order": 1 },
    { "name": "Price", "slug": "price", "type": "decimal", "required": true, "order": 2 }
  ]
}
```

## Status codes

| Status | Description |
|--------|-------------|
| `201` | Created |
| `409` | A collection with this slug already exists |
| `422` | Validation error |
