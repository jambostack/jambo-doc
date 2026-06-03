---
title: حذف أصل
description: حذف ملف وسائط نهائياً من مكتبة المشروع.
---

```http
DELETE /api/{projectId}/files/{uuid}
```

:::caution
هذا الإجراء **نهائي**. يُحذف الملف من التخزين ولا يمكن استرداده.
:::

ترجع HTTP `204 No Content` عند النجاح.
