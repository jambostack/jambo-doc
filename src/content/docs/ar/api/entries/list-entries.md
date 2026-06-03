---
title: عرض الإدخالات
description: استرداد قائمة مقسمة إلى صفحات من إدخالات المحتوى من مجموعة.
---

```http
GET /api/{projectId}/{collectionSlug}
```

## المعاملات

| المعامل | النوع | الافتراضي | الوصف |
|---------|-------|----------|-------|
| `page` | integer | `1` | رقم الصفحة |
| `per_page` | integer | `15` | عناصر في الصفحة (الحد الأقصى `100`) |
| `locale` | string | افتراضي المشروع | التصفية حسب اللغة |
| `status` | string | `published` | `published` أو `draft` |

## مثال

```bash
curl https://your-domain.com/api/{projectId}/posts \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## الاستجابة

```json
{
  "data": [
    {
      "uuid": "550e8400-...",
      "status": "published",
      "locale": "ar",
      "fields": { "title": "مقالتي الأولى" }
    }
  ],
  "total": 42,
  "current_page": 1,
  "last_page": 3,
  "per_page": 15
}
```
