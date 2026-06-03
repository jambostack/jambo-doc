---
title: رفع أصل
description: رفع ملف إلى مكتبة وسائط المشروع.
---

```http
POST /api/{projectId}/files
```

```bash
curl -X POST https://your-domain.com/api/{projectId}/files \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -F "file=@/path/to/image.jpg"
```

ترجع HTTP `201 Created` عند النجاح مع بيانات الأصل المرفوع.
