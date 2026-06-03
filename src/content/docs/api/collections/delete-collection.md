---
title: Delete a Collection
description: Delete a collection and all its entries.
---

Permanently deletes a collection, all its fields, and all its content entries.

```http
DELETE /api/projects/{projectId}/collections/{slug}
```

:::caution
This is permanent. All entries in the collection are immediately and irreversibly deleted.
:::

## Request

```bash
curl -X DELETE https://your-domain.com/api/projects/{projectId}/collections/posts \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

## Status codes

| Status | Description |
|--------|-------------|
| `204` | Deleted |
| `404` | Collection not found |
