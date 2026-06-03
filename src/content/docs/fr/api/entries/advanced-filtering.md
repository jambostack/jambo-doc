---
title: GraphQL
description: Interrogez votre contenu avec GraphQL.
---

## Endpoint

```
POST /api/{project-uuid}/graphql
```

## Exemple de requête

```graphql
query {
  articles(locale: "fr", status: "published") {
    uuid
    title
    slug
    created_at
  }
}
```

## Introspection

Utilisez n'importe quel client GraphQL (Insomnia, Postman, GraphiQL) avec l'endpoint ci-dessus pour explorer votre schéma automatiquement.
