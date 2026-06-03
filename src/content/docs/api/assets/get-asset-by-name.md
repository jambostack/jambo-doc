---
title: Get an Asset by Name
description: Retrieve a media file using its original filename.
---

Retrieve a media file using its original filename. This is a convenience alias for [Get an Asset](/api/assets/get-asset/) — the `identifier` parameter accepts both UUIDs and filenames.

```http
GET /api/{projectId}/files/{filename}
```

## Example

```bash
curl https://your-domain.com/api/{projectId}/files/hero.jpg \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

See [Get an Asset](/api/assets/get-asset/) for the full response format and status codes.
