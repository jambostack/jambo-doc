---
title: الحصول على المشروع
description: استرداد معلومات المشروع وإعداداته.
---

```http
GET /api/{projectId}/project
```

```bash
curl https://your-domain.com/api/{projectId}/project \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

```json
{
  "uuid": "f99cb038-...",
  "name": "My Blog",
  "default_locale": "ar",
  "locales": ["ar", "en", "fr"],
  "collections": [
    { "slug": "posts", "name": "Posts", "is_singleton": false }
  ]
}
```
