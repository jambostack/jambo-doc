---
title: الحصول على إدخال
description: استرداد إدخال محتوى واحد بواسطة UUID.
---

```http
GET /api/{projectId}/{collectionSlug}/{uuid}
```

## مثال

```bash
curl https://your-domain.com/api/{projectId}/posts/550e8400-... \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## رموز الحالة

| الحالة | الوصف |
|--------|-------|
| `200` | نجاح |
| `404` | الإدخال غير موجود |
