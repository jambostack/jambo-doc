---
title: Delete a Field
description: Remove a field from a collection and delete all its stored values.
---

Permanently removes a field from a collection and deletes all stored values for that field.

```http
DELETE /api/projects/{projectId}/collections/{collectionSlug}/fields/{fieldSlug}
```

:::caution
All values stored in this field across all entries are permanently deleted.
:::

## Status codes

| Status | Description |
|--------|-------------|
| `204` | Deleted |
| `404` | Field not found |
