---
title: تحديث حقل
description: تحديث اسم أو خيارات حقل. لا يمكن تغيير الـ slug.
---

```http
PATCH /api/projects/{projectId}/collections/{collectionSlug}/fields/{fieldSlug}
```

```json
{ "name": "اسم عرض جديد", "isRequired": true }
```
