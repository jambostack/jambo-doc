---
title: Webhook Setup (Queues)
description: Configure background workers to process webhooks and async tasks.
---

:::note
هذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.
:::


Jambo uses **Symfony Messenger** to process webhooks and other async tasks (image processing, bulk operations) in the background. Without a worker running, these tasks queue up but are never executed.

## How it works

1. An event occurs (content created, updated, deleted)
2. Jambo pushes a message to the queue (`MESSENGER_TRANSPORT_DSN`)
3. A worker process consumes the queue and triggers webhook HTTP calls

## Configure the transport

In `.env`:

```ini
# Recommended for production: database transport (reliable, no extra service)
MESSENGER_TRANSPORT_DSN=doctrine://default?auto_setup=0

# Redis (faster, requires Redis server)
MESSENGER_TRANSPORT_DSN=redis://localhost:6379/messages

# Development only (tasks lost on restart)
MESSENGER_TRANSPORT_DSN=in-memory://
```

For the `doctrine` transport, create the queue table:

```bash
php bin/console messenger:setup-transports
```

## Running the worker

Start a worker process manually:

```bash
php bin/console messenger:consume async --time-limit=3600
```

The `--time-limit` flag restarts the worker every hour to free memory.

## Production: Supervisor

Use **Supervisor** to keep workers running permanently:

```ini
# /etc/supervisor/conf.d/jambo-worker.conf
[program:jambo-worker]
command=php /var/www/jambo-api/bin/console messenger:consume async --time-limit=3600
directory=/var/www/jambo-api
user=www-data
numprocs=2
autostart=true
autorestart=true
stdout_logfile=/var/log/supervisor/jambo-worker.log
stderr_logfile=/var/log/supervisor/jambo-worker-error.log
```

```bash
supervisorctl reread
supervisorctl update
supervisorctl start jambo-worker:*
```

## Production: Systemd

```ini
# /etc/systemd/system/jambo-worker.service
[Unit]
Description=Jambo Messenger Worker
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/jambo-api
ExecStart=php bin/console messenger:consume async --time-limit=3600
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
systemctl enable jambo-worker
systemctl start jambo-worker
```

## Webhook configuration

Webhooks are configured per-project in **Project Settings → Webhooks**. Each webhook specifies:

- **URL** — the endpoint to call
- **Events** — which events trigger the webhook (`entry.created`, `entry.updated`, `entry.deleted`)
- **Secret** — HMAC-SHA256 signature key (set `APP_WEBHOOK_SECRET_KEY` in `.env`)

## Verifying webhook signatures

Each webhook request includes an `X-Jambo-Signature` header:

```
X-Jambo-Signature: sha256=abc123...
```

Verify it in your receiver:

```php
$signature = 'sha256=' . hash_hmac('sha256', $rawBody, $secret);
if (!hash_equals($signature, $request->headers->get('X-Jambo-Signature'))) {
    // Invalid signature — reject the request
}
```
