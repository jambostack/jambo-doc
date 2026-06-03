---
title: حذف مجموعة
description: حذف مجموعة وجميع إدخالاتها.
---

```http
DELETE /api/projects/{projectId}/collections/{slug}
```

:::caution
هذا الإجراء دائم. تُحذف جميع إدخالات المجموعة فوراً وبشكل لا رجعة فيه.
:::

ترجع HTTP `204 No Content` عند النجاح.
