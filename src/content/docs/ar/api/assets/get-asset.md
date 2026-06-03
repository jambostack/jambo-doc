---
title: الحصول على أصل
description: استرداد ملف وسائط واحد بواسطة UUID.
---

```http
GET /api/{projectId}/files/{identifier}
```

يمكن أن يكون المعرّف `identifier` هو **UUID** أو **اسم الملف**.

```bash
curl https://your-domain.com/api/{projectId}/files/img-uuid-1234 \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```
