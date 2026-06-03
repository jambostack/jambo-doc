---
title: Reorder Collections
description: Change the display order of collections in the sidebar.
---

Updates the display order of collections in the admin sidebar.

```http
POST /api/projects/{projectId}/collections/reorder
```

## Request body

Pass an array of collection slugs in the desired order:

```json
{
  "slugs": ["pages", "posts", "products", "categories"]
}
```

## Status codes

| Status | Description |
|--------|-------------|
| `200` | Reordered |
| `422` | Invalid slugs |
