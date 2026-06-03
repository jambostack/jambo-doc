---
title: أمثلة التصفية
description: أمثلة عملية لتصفية إدخالات المحتوى عبر API.
---

## التصفية حسب الحالة

```bash
GET /api/{projectId}/posts              # منشور (افتراضي)
GET /api/{projectId}/posts?status=draft # مسودة
```

## التصفية حسب اللغة

```bash
GET /api/{projectId}/posts?locale=ar    # عربي
GET /api/{projectId}/posts?locale=en    # إنجليزي
```

## ترقيم الصفحات

```bash
GET /api/{projectId}/posts?page=2&per_page=25
```

## دمج المرشحات

```bash
GET /api/{projectId}/posts?locale=ar&status=published&page=1&per_page=10
```
