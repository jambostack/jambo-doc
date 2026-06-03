---
title: Advanced Filtering
description: Use GraphQL for complex queries, sorting, and field-level filtering.
---

The REST API supports basic filtering by `status` and `locale`. For complex queries, use the **GraphQL endpoint**.

## GraphQL endpoint

```
POST /api/projects/{projectId}/graphql
```

Authentication is the same as the REST API — pass `Authorization: Bearer YOUR_TOKEN`.

## Basic query

```graphql
query {
  posts {
    data {
      uuid
      fields {
        title
        slug
        created_at
      }
    }
    total
    current_page
    last_page
  }
}
```

## Filter by field value

```graphql
query {
  posts(filter: { title: { contains: "jambo" } }) {
    data {
      uuid
      fields { title }
    }
  }
}
```

## Sort results

```graphql
query {
  posts(sort: [{ field: "created_at", direction: DESC }]) {
    data {
      uuid
      fields { title }
    }
  }
}
```

## Pagination

```graphql
query {
  posts(page: 2, perPage: 10) {
    data {
      uuid
      fields { title }
    }
    total
    current_page
    last_page
  }
}
```

## Available filter operators

| Operator | Description |
|----------|-------------|
| `eq` | Equal to |
| `neq` | Not equal to |
| `contains` | String contains (case-insensitive) |
| `startsWith` | String starts with |
| `gt` / `gte` | Greater than / greater than or equal |
| `lt` / `lte` | Less than / less than or equal |
| `in` | Value is in array |
| `isNull` | Field is null |

## Fetch the schema

```bash
curl -X GET https://your-domain.com/api/{projectId}/graphql \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

This returns the auto-generated GraphQL schema based on your collections.
