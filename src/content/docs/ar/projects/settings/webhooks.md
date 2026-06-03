---
title: Webhooks
description: Configure webhooks to receive notifications when content changes in Jambo.
---

:::note
هذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.
:::


Webhooks send HTTP POST requests to your endpoint when content events occur. Go to **Project Settings → Webhooks** to manage them.

## Creating a webhook

1. Click **+ New Webhook**
2. Fill in the details:

| Field | Description |
|-------|-------------|
| **URL** | Your endpoint URL (e.g. `https://your-site.com/api/revalidate`) |
| **Events** | Which events trigger this webhook |
| **Active** | Toggle on/off without deleting |

3. Click **Save**

## Events

| Event | Triggered when |
|-------|----------------|
| `entry.created` | A content entry is created |
| `entry.updated` | A content entry is updated |
| `entry.deleted` | A content entry is soft-deleted |
| `entry.published` | An entry's status changes to `published` |
| `entry.unpublished` | An entry's status changes to `draft` |
| `media.uploaded` | A file is uploaded to the media library |
| `media.deleted` | A file is deleted from the media library |

## Payload

Each webhook sends a JSON payload:

```json
{
  "event": "entry.updated",
  "project": "f99cb038-...",
  "collection": "posts",
  "entry": {
    "uuid": "550e8400-...",
    "status": "published",
    "locale": "en"
  },
  "timestamp": "2024-01-15T12:00:00+00:00"
}
```

## Signature verification

Each request includes an `X-Jambo-Signature` header for security:

```
X-Jambo-Signature: sha256=abc123...
```

Verify it using the `APP_WEBHOOK_SECRET_KEY` from your `.env`:

```js
const crypto = require('crypto');
const sig = 'sha256=' + crypto.createHmac('sha256', secret)
  .update(rawBody).digest('hex');
if (sig !== req.headers['x-jambo-signature']) {
  return res.status(401).send('Invalid signature');
}
```

## Requirements

Webhooks are processed asynchronously via the Symfony Messenger queue. Make sure a worker is running — see [Webhook Setup](/deployment/webhook-setup/).
