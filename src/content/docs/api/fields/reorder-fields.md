---
title: Reorder Fields
description: Change the display order of fields in the content editor.
---

Updates the display order of fields in the content editor form.

```http
POST /api/projects/{projectId}/collections/{slug}/fields/reorder
```

## Request body

```json
{
  "slugs": ["title", "featured_image", "body", "author", "published_at"]
}
```

## Status codes

| Status | Description |
|--------|-------------|
| `200` | Reordered |
| `422` | Invalid field slugs |
