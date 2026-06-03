---
title: الترجمات
description: إدارة إدخالات المحتوى متعددة اللغات في Jambo.
---

يدير Jambo المحتوى متعدد اللغات على **مستوى الإدخال** — كل إدخال له خاصية `locale` واحدة.

## إنشاء إدخال مترجم

```bash
curl -X POST https://your-domain.com/api/{projectId}/posts \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"locale":"ar","status":"published","fields":{"title":"مرحباً بالعالم"}}'
```

## جلب الإدخالات حسب اللغة

```bash
GET /api/{projectId}/posts?locale=ar
GET /api/{projectId}/posts?locale=en
```
