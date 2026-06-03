---
title: حذف حقل
description: إزالة حقل من مجموعة وحذف جميع قيمه المخزنة.
---

```http
DELETE /api/projects/{projectId}/collections/{collectionSlug}/fields/{fieldSlug}
```

:::caution
تُحذف جميع القيم المخزنة في هذا الحقل عبر جميع الإدخالات بشكل نهائي.
:::
