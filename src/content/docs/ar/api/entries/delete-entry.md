---
title: حذف إدخال
description: حذف مؤقت لإدخال محتوى (ينقله إلى سلة المهملات).
---

```http
DELETE /api/{projectId}/{collectionSlug}/{uuid}
```

## مثال

```bash
curl -X DELETE https://your-domain.com/api/{projectId}/posts/550e8400-... \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

ترجع HTTP `204 No Content` عند النجاح.

:::note
هذا **حذف مؤقت** — ينتقل الإدخال إلى سلة المهملات. للحذف النهائي، استخدم لوحة الإدارة.
:::
