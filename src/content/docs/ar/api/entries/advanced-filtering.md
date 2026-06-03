---
title: GraphQL
description: استعلم عن المحتوى الخاص بك باستخدام GraphQL.
---

## نقطة النهاية

```
POST /api/{project-uuid}/graphql
```

## مثال على الاستعلام

```graphql
query {
  articles(locale: "ar", status: "published") {
    uuid
    title
    slug
    created_at
  }
}
```

## الاستبطان

استخدم أي عميل GraphQL (Insomnia، Postman، GraphiQL) مع نقطة النهاية أعلاه لاستكشاف الهيكل تلقائياً.
