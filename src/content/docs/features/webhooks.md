---
title: Webhooks
description: Outgoing event-driven webhooks and incoming automation-triggered webhooks with HMAC signing and async delivery.
---

Jambo CMS has two separate webhook subsystems: **outgoing webhooks** for content lifecycle events (asynchronous via Symfony Messenger) and **incoming webhooks** for triggering automations from external services.

## Outgoing Webhooks

Outgoing webhooks are triggered by content lifecycle events and delivered asynchronously with HMAC signing.

### Architecture

```
Content created/updated/deleted
        │
        ▼
ContentEvent dispatched (CREATED/UPDATED/DELETED)
        │
        ▼
DispatchProjectWebhooksSubscriber::onContentEvent()
        │
        ├── Finds matching webhooks for (project, event, collection)
        ├── Formats payload
        └── Dispatches SendWebhookMessage to Messenger async bus
                │
                ▼
        SendWebhookMessageHandler::__invoke()
                │
                ├── Builds HTTP headers
                ├── Signs payload (HMAC-SHA256 if secret configured)
                ├── POST to webhook URL (10s timeout)
                └── Logs result to WebhookLog
```

### Events

Webhooks fire on these content events:

| Event constant | Value | Description |
|---|---|---|
| `ContentEvent::CREATED` | `content.created` | Entry created |
| `ContentEvent::UPDATED` | `content.updated` | Entry updated |
| `ContentEvent::DELETED` | `content.deleted` | Entry deleted |

### Payload format

```json
{
  "event": "content.created",
  "project": "550e8400-e29b-41d4-a716-446655440000",
  "data": {
    "uuid": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "title": "My Article",
    "status": "published",
    "...": "..."
  }
}
```

The `data` is the full entry content formatted by `EavDataFormatterService`.

### Delivery

- **Method:** POST to the configured webhook URL
- **Timeout:** 10 seconds
- **Headers:**
  - `Content-Type: application/json`
  - `X-JamboApi-Event: content.created | content.updated | content.deleted`
  - `X-JamboApi-Signature: sha256=<HMAC-SHA256 of body>` (if secret configured)

- **Retry:** Via Symfony Messenger (max 3 retries, exponential backoff: ~2s, ~4s, ~8s). The message transport is Doctrine-based.

### Signing

If a webhook has a configured secret, the payload is signed with HMAC-SHA256:

```bash
# Verify on the consumer side:
expected=$(echo -n "$body" | openssl dgst -sha256 -hmac "$your_secret" | awk '{print $2}')
received=$(echo "$signature_header" | sed 's/^sha256=//')
if [ "$expected" = "$received" ]; then echo "Valid signature"; fi
```

Secrets are stored encrypted at rest using libsodium `crypto_secretbox` (XSalsa20-Poly1305). The encryption key comes from the `APP_WEBHOOK_SECRET_KEY` environment variable.

### Collection filtering

Webhooks can be restricted to specific collections. If the webhook has collections configured, it only fires when the entry belongs to one of those collections. If no collections are configured, the webhook fires for all collections.

### Delivery logs

Each delivery attempt creates a `WebhookLog` record:

| Field | Type | Description |
|---|---|---|
| `event` | string | The event that triggered (e.g. `content.created`) |
| `statusCode` | int (nullable) | HTTP response status from target |
| `requestPayload` | text | Full JSON payload sent |
| `responseBody` | text | Truncated to first 2000 characters |
| `status` | string | `succeeded` or `failed` |
| `errorMessage` | string (nullable) | Exception details on failure |

### REST API

All endpoints under `/api/projects/{projectUuid}/webhooks`:

| Method | Path | Description |
|---|---|---|
| `GET` | `/webhooks` | List webhooks |
| `POST` | `/webhooks` | Create webhook |
| `GET` | `/webhooks/{uuid}` | Show webhook |
| `PUT/PATCH` | `/webhooks/{uuid}` | Update webhook |
| `DELETE` | `/webhooks/{uuid}` | Delete webhook |
| `GET` | `/webhooks/{uuid}/logs` | Paginated delivery logs |

### Create a webhook

```bash
curl -X POST /api/projects/{uuid}/webhooks \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Deploy site",
    "url": "https://example.com/deploy-hook",
    "events": ["content.created", "content.updated"],
    "secret": "my-shared-secret",
    "is_active": true,
    "collection_slugs": ["posts", "pages"]
  }'
```

### Webhook entity

| Field | Type | Description |
|---|---|---|
| `uuid` | uuid (unique) | Generated on persist |
| `name` | string | Human-readable label |
| `url` | string (500) | Target URL for POST |
| `events` | json | Array of event strings |
| `secret` | text (nullable) | Encrypted HMAC secret |
| `isActive` | bool | Enabled/disabled |
| `project` | relation | Owning project (cascade delete) |
| `collections` | ManyToMany | Filter by collections (optional) |

## Incoming Webhooks

Incoming webhooks allow external services to trigger automation flows.

### Endpoint

```
POST /api/webhooks/inbound/{automationUuid}
```

This is a public endpoint (no authentication). The automation is identified by its UUID in the URL.

### Flow

1. Automation is looked up by UUID
2. Validated: must exist, must be active, must have a flow graph with a `trigger.webhook.inbound` node
3. Optional secret verification via `X-Webhook-Secret` header (timing-safe comparison via `hash_equals`)
4. Body is parsed as JSON
5. Payload is enriched with metadata:
   - `trigger: "webhook.inbound"`
   - `project_uuid`: the automation's project UUID
   - `timestamp`: current Unix timestamp
   - `headers`: filtered safe headers only
   - `method`: HTTP method of the request
   - `query_params`: query string parameters
6. The automation flow is executed via `AutomationEngine::execute()`

### Safety

Only safe headers are forwarded to the flow payload:
- `content-type`, `user-agent`, `accept`, `accept-language`
- `x-forwarded-for`, `x-real-ip`, `x-request-id`

Sensitive headers are explicitly excluded: `authorization`, `cookie`, `x-api-key`, `x-webhook-secret`, `x-csrf-token`, `proxy-authorization`.

### Trigger an automation via webhook

```bash
curl -X POST https://jambo.test/api/webhooks/inbound/{automation-uuid} \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: my-secret" \
  -d '{"action": "publish", "entry_id": "abc-123"}'
```

Response:

```json
{
  "success": true,
  "run_id": 42,
  "status": "success"
}
```

## Configuration

| Variable | Purpose |
|---|---|
| `APP_WEBHOOK_SECRET_KEY` | Encryption key for stored webhook secrets (libsodium) |
| `MESSENGER_TRANSPORT_DSN` | Doctrine DSN for the async message queue |

Messenger retry configuration: max 3 retries, multiplier 2, Doctrine transport.

## Key files

| File | Purpose |
|---|---|
| `src/Entity/Webhook.php` | Outgoing webhook entity |
| `src/Entity/WebhookLog.php` | Delivery log entity |
| `src/Controller/WebhookController.php` | CRUD REST API for outgoing webhooks |
| `src/Controller/WebhookInboundController.php` | Public POST endpoint for incoming webhooks |
| `src/Message/SendWebhookMessage.php` | Async message for outgoing delivery |
| `src/MessageHandler/SendWebhookMessageHandler.php` | Handler performing the HTTP POST |
| `src/EventSubscriber/DispatchProjectWebhooksSubscriber.php` | Listens to ContentEvent and dispatches messages |
| `src/Event/ContentEvent.php` | Content lifecycle event with constants |
| `src/Service/WebhookSecretService.php` | Libsodium encrypt/decrypt for secrets |
| `src/Service/Flow/Handlers/Trigger/WebhookInboundHandler.php` | Flow trigger node for incoming webhooks |
