---
title: تحديث إدخال
description: تحديث إدخال محتوى موجود.
---

```http
PUT   /api/{projectId}/{collectionSlug}/{uuid}
PATCH /api/{projectId}/{collectionSlug}/{uuid}
```

استخدم `PATCH` لتحديث حقول محددة فقط.

## مثال

```bash
curl -X PATCH https://your-domain.com/api/{projectId}/posts/550e8400-... \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"fields":{"title":"عنوان محدث"}}'
```

## رموز الحالة

| الحالة | الوصف |
|--------|-------|
| `200` | تم التحديث |
| `404` | الإدخال غير موجود |
