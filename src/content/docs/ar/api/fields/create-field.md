---
title: إنشاء حقل
description: إضافة حقل جديد إلى مجموعة.
---

```http
POST /api/projects/{projectId}/collections/{slug}/fields
```

```json
{
  "name": "Published At",
  "slug": "published_at",
  "type": "datetime",
  "isRequired": false
}
```

| الحالة | الوصف |
|--------|-------|
| `201` | تم الإنشاء |
| `409` | يوجد حقل بهذا الـ slug |
