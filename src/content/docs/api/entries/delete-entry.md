---
title: Delete an Entry
description: Soft-delete a content entry (moves it to trash).
---

Moves a content entry to the trash (soft delete). The entry can be restored from the admin panel or force-deleted permanently.

```http
DELETE /api/{projectId}/{collectionSlug}/{uuid}
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `projectId` | uuid | Your project UUID |
| `collectionSlug` | string | The collection slug |
| `uuid` | uuid | The entry UUID |

## Request

```bash
curl -X DELETE https://your-domain.com/api/{projectId}/posts/550e8400-... \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## Response

Returns HTTP `204 No Content` on success (empty body).

## Status codes

| Status | Description |
|--------|-------------|
| `204` | Deleted (moved to trash) |
| `403` | Insufficient permissions |
| `404` | Entry not found |

:::note
This performs a **soft delete** — the entry moves to trash and is no longer returned by list/get endpoints. To permanently delete, use the admin panel.
:::
