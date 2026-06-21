---
title: GraphQL API
description: GraphQL queries, mutations, subscriptions, and schema generation for JamboApi CMS.
---

The JamboApi CMS GraphQL API provides a flexible, type-safe alternative to the REST API. The schema is **dynamically generated** from your project's collections and fields, ensuring it always matches your content model.

The GraphQL implementation uses [webonyx/graphql-php](https://github.com/webonyx/graphql-php) v15 and is built programmatically (no annotations or bundles).

## Endpoint

```
POST /api/projects/{uuid}/graphql
GET  /api/projects/{uuid}/graphql
```

Both `POST` (JSON body) and `GET` (query parameter) methods are supported.

**Authentication:** Requires project view permission. Use the same authentication methods as the REST API (ApiToken or session).

**Query Depth Limit:** Maximum query depth is 15 levels.

## Schema Generation

The schema is built dynamically by `App\GraphQL\SchemaGenerator`. Each collection in your project generates:

- A **type** named after the collection (e.g. `Articles`)
- An **input type** (e.g. `ArticlesInput`)
- **Query fields** for reading entries
- **Mutation fields** for creating, updating, and deleting entries
- **Subscription fields** for real-time events

### Base Fields

Every collection type includes these system fields:

| Field | Type | Description |
|-------|------|-------------|
| `uuid` | `String!` | Entry UUID |
| `locale` | `String` | Entry locale |
| `status` | `String` | Workflow status |
| `createdAt` | `String` | Creation timestamp |
| `updatedAt` | `String` | Update timestamp |

Plus all custom fields defined in the collection, mapped to GraphQL types:

| Field DB Type | GraphQL Type |
|--------------|--------------|
| `number`, `decimal`, `rating` | `Float` |
| `boolean`, `checkbox` | `Boolean` |
| `json`, `array`, `repeater` | `String` |
| `enumeration`, `media`, `relation`, `tags` | `String` |
| `date`, `time`, `datetime` | `String` |
| `text`, `longtext`, `richtext`, `email`, `url`, `slug`, `color`, `code`, `markdown`, `password` | `String` |

## Queries

### Ping

```graphql
query {
  _ping
}
```

Always available. Returns `"pong"`.

### Single Entry

```graphql
query {
  articles(uuid: "550e8400-e29b-41d4-a716-446655440000") {
    uuid
    title
    body
    status
    createdAt
  }
}
```

### Paginated List

```graphql
query {
  articlesList(locale: "en", status: "published", limit: 10, offset: 0) {
    uuid
    title
    status
  }
}
```

**Arguments:**

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `locale` | `String` | - | Locale filter |
| `status` | `String` | - | Status filter |
| `limit` | `Int` | 50 | Maximum results |
| `offset` | `Int` | 0 | Result offset |

## Mutations

### Create Entry

```graphql
mutation {
  createArticles(input: {
    title: "Hello World"
    body: "Content body"
    status: "draft"
    locale: "en"
  }) {
    uuid
    title
    status
  }
}
```

### Update Entry

```graphql
mutation {
  updateArticles(
    uuid: "550e8400-e29b-41d4-a716-446655440000"
    input: {
      title: "Updated Title"
      status: "published"
    }
  ) {
    uuid
    title
    status
  }
}
```

### Delete Entry

```graphql
mutation {
  deleteArticles(uuid: "550e8400-e29b-41d4-a716-446655440000")
}
```

Returns `true` on successful soft-delete.

## Naming Convention

Collection slugs are converted to camelCase for query and mutation names:

| Collection Slug | Query Field | Mutation Names |
|----------------|-------------|----------------|
| `articles` | `articles`, `articlesList` | `createArticles`, `updateArticles`, `deleteArticles` |
| `blog_post` | `blogPost`, `blogPostList` | `createBlogPost`, `updateBlogPost`, `deleteBlogPost` |

If a naming collision is detected (e.g. `blog_post` and `blogpost` both resolving to `blogPost`), the original slug is appended to disambiguate.

## Subscriptions

Subscriptions are implemented using **Mercure** (Server-Sent Events). Rather than maintaining a persistent WebSocket connection, the subscription endpoint returns a Mercure hub URL and JWT token for the client to connect via SSE.

### Subscription Fields

| Field | Type | Arguments | Description |
|-------|------|-----------|-------------|
| `projectEvents` | `[ProjectEvent]` | `uuid: String!` | All project events |
| `{collectionCamelCase}` | `ContentEvent` | `uuid: String!`, `actions: [String]` | Per-collection content events |

### Project Event Type

```graphql
type ProjectEvent {
  event: String!
  data: String
  projectId: String!
  timestamp: String!
}
```

### Content Event Type

```graphql
type ContentEvent {
  action: String!       # "create", "update", "delete", "publish", "unpublish"
  uuid: String!
  locale: String
  status: String
  title: String
  timestamp: String!
}
```

### Connecting to Subscriptions

```graphql
subscription {
  articles(uuid: "project-uuid", actions: ["create", "update"]) {
    action
    uuid
    title
    timestamp
  }
}
```

**Response:**

```json
{
  "data": {
    "subscription": {
      "topics": ["projects/{projectUuid}/content"],
      "hub_url": "http://127.0.0.1:8080/.well-known/mercure",
      "token": "eyJ..."
    }
  }
}
```

The client then connects to the Mercure hub URL using the provided token, subscribing to the returned topics. The subscription JWT is valid for **1 hour**.

**Event fallback:** If Mercure is not configured, events are stored in JSONL files at `{projectDir}/var/realtime/{projectUuid}.jsonl`. A short-polling fallback endpoint is available at:

```
GET /api/projects/{projectUuid}/realtime
```

### Topic Naming

| Topic | Triggered By |
|-------|-------------|
| `projects/{uuid}` | Any project-level event |
| `projects/{uuid}/content` | Content entry create, update, delete |
| `projects/{uuid}/media` | Media upload, delete |
| `projects/{uuid}/status` | Workflow status changes |

## Schema Caching

The generated schema is cached in memory per project. The cache is automatically invalidated when:

- A **Project** is modified
- A **Collection** is added, updated, or deleted
- A **Field** is added, updated, or deleted

## Real-time Token

For direct Mercure access without GraphQL, use:

```
GET /api/projects/{projectUuid}/realtime/token
```

Generates a Mercure subscription JWT valid for 1 hour.

## Studio GraphQL Explorer

In the Studio UI, navigate to **Settings > Studio > GraphQL** to see the GraphQL endpoint URL, an example query, and hints for using external GraphQL clients (Altair, Insomnia, Postman).

## Testing

You can test your GraphQL API with any GraphQL client. The endpoint URL format is:

```
POST https://your-domain.com/api/projects/{project-uuid}/graphql
```

Set the `Authorization` header to `Bearer <api-token>` and send standard GraphQL queries in the request body:

```json
{
  "query": "query { articlesList(limit: 5) { uuid title status } }",
  "variables": {}
}
```
