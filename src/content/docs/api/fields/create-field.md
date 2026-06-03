---
title: Create a Field
description: Add a new field to a collection.
---

Adds a new field to an existing collection.

```http
POST /api/projects/{projectId}/collections/{slug}/fields
```

## Request body

```json
{
  "name": "Published At",
  "slug": "published_at",
  "type": "datetime",
  "isRequired": false,
  "options": {}
}
```

### Enumeration field

```json
{
  "name": "Status",
  "slug": "status",
  "type": "enumeration",
  "isRequired": true,
  "options": {
    "values": ["draft", "published", "archived"]
  }
}
```

### Relation field

```json
{
  "name": "Author",
  "slug": "author",
  "type": "relation",
  "isRequired": false,
  "options": {
    "targetCollection": "end_users"
  }
}
```

## Status codes

| Status | Description |
|--------|-------------|
| `201` | Created |
| `409` | A field with this slug already exists |
| `422` | Invalid field type or missing required options |
