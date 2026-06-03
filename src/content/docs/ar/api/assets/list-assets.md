---
title: عرض الأصول
description: استرداد قائمة من الملفات الإعلامية من مكتبة المشروع.
---

```http
GET /api/{projectId}/files
```

```bash
curl https://your-domain.com/api/{projectId}/files \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

## الاستجابة

```json
{
  "data": [
    {
      "uuid": "img-uuid-1234",
      "filename": "hero.jpg",
      "mime_type": "image/jpeg",
      "size": 204800,
      "url": "/uploads/media/abc123/hero.jpg"
    }
  ],
  "total": 24,
  "current_page": 1
}
```
