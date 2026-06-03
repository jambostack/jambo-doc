---
title: Update a Collection
description: Update an existing collection's name or description.
---

Updates a collection's metadata. Field changes require separate field endpoints.

```http
PUT   /api/projects/{projectId}/collections/{slug}
PATCH /api/projects/{projectId}/collections/{slug}
```

## Request body

```json
{
  "name": "Updated name",
  "description": "New description"
}
```

## Status codes

| Status | Description |
|--------|-------------|
| `200` | Updated |
| `404` | Collection not found |
