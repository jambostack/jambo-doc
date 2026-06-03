---
title: REST API
description: مرجع كامل لنقاط نهاية REST API الخاصة بـ Jambo API.
---

## الرابط الأساسي

```
https://نطاقك.com/api/{project-uuid}
```

## المصادقة

تتطلب جميع الطلبات رمز Bearer:

```
Authorization: Bearer رمز_API_الخاص_بك
```

## نقاط النهاية

### سرد الإدخالات

```
GET /{collection}?locale=ar&limit=20&offset=0&status=published
```

| المعامل | الافتراضي | الوصف |
|---|---|---|
| `locale` | افتراضي المشروع | لغة المحتوى |
| `limit` | 20 | النتائج لكل صفحة (الحد الأقصى 100) |
| `offset` | 0 | إزاحة التصفح |
| `status` | `published` | `draft` أو `published` |

### جلب إدخال واحد

```
GET /{collection}/{uuid}
```

### تنسيق الرد

```json
{
  "data": [
    {
      "uuid": "a1b2c3d4-...",
      "locale": "ar",
      "status": "published",
      "created_at": "2026-01-01T00:00:00+00:00",
      "updated_at": "2026-01-15T12:00:00+00:00",
      "title": "إدخال تجريبي",
      "slug": "ادخال-تجريبي"
    }
  ],
  "meta": {
    "total": 42,
    "limit": 20,
    "offset": 0
  }
}
```
