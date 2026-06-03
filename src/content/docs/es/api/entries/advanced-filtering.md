---
title: GraphQL
description: Consulta tu contenido con GraphQL.
---

## Endpoint

```
POST /api/{project-uuid}/graphql
```

## Ejemplo de consulta

```graphql
query {
  articles(locale: "es", status: "published") {
    uuid
    title
    slug
    created_at
  }
}
```

## Introspección

Usa cualquier cliente GraphQL (Insomnia, Postman, GraphiQL) con el endpoint anterior para explorar tu esquema automáticamente.
