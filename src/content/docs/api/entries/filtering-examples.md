---
title: Filtering Examples
description: Practical examples for filtering content entries via the API.
---

The Jambo Content API supports filtering entries by **status** and **locale** via query parameters. More advanced filtering can be done client-side or via GraphQL.

## Filter by status

By default, only `published` entries are returned. Pass `?status=draft` to get drafts:

```bash
# Published entries (default)
GET /api/{projectId}/posts

# Draft entries
GET /api/{projectId}/posts?status=draft

# All entries (no status filter)
GET /api/{projectId}/posts?status=
```

## Filter by locale

```bash
# English entries (default if en is the project default)
GET /api/{projectId}/posts?locale=en

# French entries
GET /api/{projectId}/posts?locale=fr
```

## Pagination

```bash
# Page 2, 25 items per page
GET /api/{projectId}/posts?page=2&per_page=25
```

## Combining filters

```bash
GET /api/{projectId}/posts?locale=fr&status=published&page=1&per_page=10
```

## Advanced filtering with GraphQL

For complex queries (filter by field value, sort, range filters), use the GraphQL endpoint instead:

```graphql
query {
  posts(
    filter: { status: { eq: "published" }, locale: { eq: "fr" } }
    sort: { field: "created_at", order: DESC }
    page: 1
    perPage: 10
  ) {
    data {
      uuid
      fields {
        title
        slug
      }
    }
    total
  }
}
```

See the [GraphQL API](/api/graphql/) for the full reference.
