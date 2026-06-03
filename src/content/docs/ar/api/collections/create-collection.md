---
title: إنشاء مجموعة
description: إنشاء مجموعة جديدة مع حقول عبر Jambo API.
---

```http
POST /api/projects/{projectId}/collections
```

```json
{
  "name": "Products",
  "slug": "products",
  "isSingleton": false,
  "fields": [
    { "name": "Name", "slug": "name", "type": "text", "isRequired": true }
  ]
}
```

| الحالة | الوصف |
|--------|-------|
| `201` | تم الإنشاء |
| `409` | يوجد مجموعة بهذا الـ slug |
