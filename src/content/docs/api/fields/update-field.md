---
title: Update a Field
description: Update a field's name or options. The slug cannot be changed.
---

Updates a field's display name, required status, or options. **The slug cannot be changed** after creation.

```http
PATCH /api/projects/{projectId}/collections/{collectionSlug}/fields/{fieldSlug}
```

## Request body

```json
{
  "name": "New display name",
  "isRequired": true
}
```

## Status codes

| Status | Description |
|--------|-------------|
| `200` | Updated |
| `404` | Field not found |
