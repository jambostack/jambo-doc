---
title: إعادة ترتيب الحقول
description: تغيير ترتيب عرض الحقول في محرر المحتوى.
---

```http
POST /api/projects/{projectId}/collections/{slug}/fields/reorder
```

```json
{ "slugs": ["title", "featured_image", "body", "author"] }
```
