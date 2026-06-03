---
title: Environment Variables (.env)
description: Complete reference for Jambo environment variables.
---

Copy `.env.example` to `.env` and edit the values before your first run.

```bash
cp .env.example .env
```

## Application

| Variable | Required | Description |
|----------|----------|-------------|
| `APP_ENV` | ✅ | `dev` for development, `prod` for production |
| `APP_SECRET` | ✅ | 32-character random string. Generate with: `openssl rand -hex 32` |
| `APP_NAME` | — | Display name shown in the admin UI (default: `JamboApi`) |
| `APP_HOSTNAME` | ✅ | Your domain, e.g. `api.example.com` (without `https://`) |
| `DEFAULT_URI` | — | Full base URL used in absolute links (e.g. `https://api.example.com`) |

```ini
APP_ENV=prod
APP_SECRET=a1b2c3d4e5f6...   # openssl rand -hex 32
APP_NAME="My CMS"
APP_HOSTNAME=api.example.com
DEFAULT_URI=https://api.example.com
```

## Database

Jambo supports MySQL, PostgreSQL, and SQLite.

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Full DSN including driver, host, port, database name |

```ini
# MySQL (recommended for production)
DATABASE_URL="mysql://user:password@127.0.0.1:3306/jambo?serverVersion=8.0.32&charset=utf8mb4"

# PostgreSQL
DATABASE_URL="postgresql://user:password@127.0.0.1:5432/jambo?serverVersion=14&charset=utf8"

# SQLite (development only)
DATABASE_URL="sqlite:///%kernel.project_dir%/var/data.db"
```

## Mailer

Used for password resets and user invitation emails.

| Variable | Description |
|----------|-------------|
| `MAILER_DSN` | Transport DSN. Use `null://null` to disable. |

```ini
# Disable (default)
MAILER_DSN=null://null

# SMTP
MAILER_DSN=smtp://user:password@smtp.example.com:587
```

## Async Queue (Messenger)

Webhooks and heavy background tasks run through Symfony Messenger. For production, use a persistent transport.

| Variable | Description |
|----------|-------------|
| `MESSENGER_TRANSPORT_DSN` | Queue transport. `doctrine://default` uses the database. |

```ini
# Database transport (reliable, no extra service)
MESSENGER_TRANSPORT_DSN=doctrine://default?auto_setup=0

# In-memory (development only — tasks lost on restart)
MESSENGER_TRANSPORT_DSN=in-memory://
```

:::note
Run `php bin/console messenger:consume async` (or a Supervisor process) to process queued jobs. See [Webhook Setup](/deployment/webhook-setup/) for the full setup.
:::

## Full-text Search (Meilisearch)

Optional. Enables fast full-text search in the media library and content.

| Variable | Description |
|----------|-------------|
| `MEILISEARCH_HOST` | URL of your Meilisearch instance (default: `http://localhost:7700`) |
| `MEILISEARCH_KEY` | Meilisearch master key |

```ini
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_KEY=your_master_key
```

## Webhooks

| Variable | Description |
|----------|-------------|
| `APP_WEBHOOK_SECRET_KEY` | Secret used to sign webhook payloads (HMAC-SHA256) |

```ini
APP_WEBHOOK_SECRET_KEY=change-me-random-secret
```

## AI Providers

AI API keys can be set here as fallback values. The primary configuration is in **Admin → Settings → AI Studio**, which takes precedence over these variables.

```ini
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
DEEPSEEK_API_KEY=sk-...
```

:::tip
Configuring AI providers via the admin panel avoids redeployment when rotating keys.
:::

## Storage (S3 / S3-compatible)

By default, uploaded files are stored locally in `public/uploads/`. To use S3 or an S3-compatible service, see [AWS S3 Configuration](/configuration/aws-s3/).
