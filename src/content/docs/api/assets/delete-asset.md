---
title: Delete an Asset
description: Permanently delete a media file from the project library.
---

Permanently deletes a media file from the project library.

```http
DELETE /api/{projectId}/files/{uuid}
```

:::caution
This action is **permanent**. The file is deleted from storage and cannot be recovered. Any content entries referencing this asset will have an empty media field.
:::

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `projectId` | uuid | Your project UUID |
| `uuid` | uuid | The asset UUID |

## Request

```bash
curl -X DELETE https://your-domain.com/api/{projectId}/files/img-uuid-1234 \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## Response

Returns HTTP `204 No Content` on success.

## Status codes

| Status | Description |
|--------|-------------|
| `204` | Deleted successfully |
| `403` | Insufficient permissions |
| `404` | Asset not found |
