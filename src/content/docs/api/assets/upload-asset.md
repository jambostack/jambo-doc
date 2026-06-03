---
title: Upload an Asset
description: Upload a file to the project media library.
---

Uploads a file to the project media library.

```http
POST /api/{projectId}/files
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `projectId` | uuid | Your project UUID |

## Request

Send a `multipart/form-data` request with the file in the `file` field:

```bash
curl -X POST https://your-domain.com/api/{projectId}/files \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -F "file=@/path/to/image.jpg"
```

From JavaScript:

```js
const form = new FormData();
form.append('file', fileInput.files[0]);

const res = await fetch(`/api/${projectId}/files`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: form,
});
const asset = await res.json();
```

## Response

Returns the uploaded asset with HTTP `201 Created`:

```json
{
  "uuid": "new-asset-uuid",
  "filename": "image.jpg",
  "original_filename": "image.jpg",
  "mime_type": "image/jpeg",
  "size": 102400,
  "url": "/uploads/media/new-asset-uuid/image.jpg",
  "created_at": "2024-01-15T12:00:00+00:00"
}
```

## Status codes

| Status | Description |
|--------|-------------|
| `201` | Uploaded successfully |
| `400` | No file provided or invalid file |
| `403` | Insufficient permissions |
