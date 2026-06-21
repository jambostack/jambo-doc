---
title: Realtime
description: Layered realtime event system with Mercure SSE, JSONL fallback, short-polling, and GraphQL subscriptions.
---

The realtime system uses a layered fallback chain to deliver content events to connected clients. The primary transport is Mercure (SSE), with a JSONL file buffer serving both the polling API and GraphQL subscription resolvers.

## Architecture

```
Content change (create/update/delete)
        │
        ▼
MercureEntitySubscriber (Doctrine events)
  ┌─ postPersist ──► entry.created
  ├─ postUpdate  ──► entry.updated
  ├─ preRemove   ──► entry.deleted / media.deleted
  ├─ onFlush     ──► status.changed (accumulated)
  └─ postFlush   ──► status.changed (published after DB flush)
        │
        ▼
   MercurePublisher
        │
   ┌────┴────┐
   │         │
   ▼         ▼
 Mercure    JSONL fallback
 (SSE)      var/realtime/{uuid}.jsonl
                │
        ┌───────┴───────┐
        │               │
        ▼               ▼
  Polling API      GraphQL Subscriptions
  GET /realtime    subscription resolvers
```

## Transport Layers

### Layer 1: Mercure (SSE) -- Primary

The `MercurePublisher` (at `src/Service/MercurePublisher.php`) publishes events to a Symfony Mercure hub. The hub runs as a standalone Docker service (`dunglas/mercure` image on port 8080).

**Topic convention:**

| Event prefix | Mercure topic |
|---|---|
| `entry.*` | `projects/{uuid}/content` |
| `media.*` | `projects/{uuid}/media` |
| `status.*` | `projects/{uuid}/status` |
| (anything else) | `projects/{uuid}` |

Each update is published to both the specific topic and the wildcard topic `projects/{uuid}`. Updates are marked as `private`, requiring a valid JWT for subscription.

**Mercure JWT token endpoint:**

```
GET /api/projects/{projectUuid}/realtime/token
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "hub_url": "https://jambo.test/.well-known/mercure",
  "topics": [
    "projects/{uuid}",
    "projects/{uuid}/content",
    "projects/{uuid}/media",
    "projects/{uuid}/status"
  ]
}
```

The token is valid for 1 hour, subscribe-only (no publish claim), scoped to the project's topics.

**Admin cookie:** On login, `MercureCookieSubscriber` sets a `mercureAuthorization` cookie (HttpOnly, SameSite=Strict, 24-hour expiry) with full admin access (`subscribe: ['*'], publish: ['*']`). This is automatically sent by the browser on EventSource connections to the Mercure hub.

### Layer 2: JSONL File Buffer

When the Mercure hub is unavailable or throws an error, events are written to a JSONL file at `{projectDir}/var/realtime/{projectUuid}.jsonl`. Each line is a JSON event object.

This file is the data source for both the polling API and GraphQL subscription resolvers.

The file is auto-trimmed to 200 lines when it exceeds 500 entries (atomic write-then-rename).

### Layer 3: Short-Polling

```
GET /api/projects/{projectUuid}/realtime?since=0
```

Returns events from the JSONL buffer since the given line index:

```json
{
  "events": [
    {
      "event": "entry.created",
      "data": { "action": "created", "uuid": "...", "title": "...", "time": 1718000000 },
      "_id": 0
    }
  ],
  "since": 1,
  "time": 1718000001
}
```

The client passes the last `since` value on each subsequent poll to receive only new events.

### Layer 4: GraphQL Subscriptions

GraphQL subscriptions provide a push-like interface but are backed by the JSONL file on the server side.

**Subscription fields:**

```graphql
type Subscription {
  projectEvents(uuid: String!): [ProjectEvent!]
  articles(actions: [String]): ContentEvent   # dynamic per collection
}
```

**Protocol (two-step):**

1. Client sends a subscription query to `POST /api/projects/{uuid}/graphql`
2. Server detects the `subscription` operation and responds with Mercure connection details:

```json
{
  "mercure": {
    "hub_url": "https://jambo.test/.well-known/mercure",
    "token": "eyJ...",
    "topics": ["projects/{uuid}/content"]
  }
}
```

3. Client connects to the Mercure hub via EventSource using the provided JWT

**Resolvers** read from the JSONL file, returning the last 50 events within the last hour, filtered by action if specified.

## Event Types

### Content events

Published automatically by `MercureEntitySubscriber` on Doctrine lifecycle events:

| Event | Triggered when |
|---|---|
| `entry.created` | Content entry is persisted |
| `entry.updated` | Content entry is updated |
| `entry.deleted` | Content entry is removed |
| `status.changed` | Content entry status field changes (e.g. draft -> published) |

### Media events

Published explicitly from controllers:

| Event | Triggered when |
|---|---|
| `media.uploaded` | File upload completes (via `MediaController` or `TusController`) |
| `media.deleted` | Media entity is removed |

## Publishing helpers

The `MercurePublisher` service provides typed methods:

```php
$mercure->contentChanged($projectUuid, 'created', ['uuid' => '...'], 'My entry');
$mercure->mediaUploaded($projectUuid, $serializedMedia);
$mercure->mediaDeleted($projectUuid, 'photo.jpg');
$mercure->statusChanged($projectUuid, 'My entry', 'draft', 'published');
```

All methods produce a consistent payload:

```json
{
  "event": "entry.created",
  "data": {
    "action": "created",
    "entry": { "uuid": "..." },
    "title": "My entry",
    "time": 1718000000
  }
}
```

## Configuration

**Environment variables:**

```
MERCURE_URL=http://127.0.0.1:8080/.well-known/mercure
MERCURE_PUBLIC_URL=https://jambo.test/.well-known/mercure
MERCURE_JWT_SECRET=<your-secret-here>
```

**Docker service** (`compose.yaml`):

```yaml
mercure:
  image: dunglas/mercure
  ports: ["8080:8080"]
  environment:
    MERCURE_PUBLISHER_JWT_KEY: ${MERCURE_JWT_SECRET}
    MERCURE_SUBSCRIBER_JWT_KEY: ${MERCURE_JWT_SECRET}
```

## Key files

| File | Purpose |
|---|---|
| `src/Service/MercurePublisher.php` | Core publisher with Mercure + JSONL fallback |
| `src/Controller/RealtimeController.php` | Polling endpoint and JWT token endpoint |
| `src/EventSubscriber/MercureCookieSubscriber.php` | Sets Mercure auth cookie on admin login |
| `src/EventSubscriber/MercureEntitySubscriber.php` | Doctrine event listener for automatic publishing |
| `src/Controller/GraphQLController.php` | Subscription detection and Mercure handshake |
| `src/GraphQL/SchemaGenerator.php` | Builds Subscription types with JSONL-based resolvers |
| `config/packages/mercure.yaml` | Mercure bundle configuration |
| `compose.yaml` | Mercure Docker service definition |
