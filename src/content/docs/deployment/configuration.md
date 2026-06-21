---
title: Configuration
description: Complete reference of all environment variables used by Jambo CMS.
---

Jambo CMS uses Symfony's environment variable system. Configuration is loaded from `.env` (committed defaults) and `.env.local` (uncommitted overrides), with real environment variables taking precedence.

## Application

| Variable | Description | Default | Required |
|---|---|---|---|
| `APP_ENV` | Application environment (`dev`, `prod`, `test`) | `dev` | Yes |
| `APP_SECRET` | Cryptography secret (32+ hex characters) | — | Yes |
| `APP_NAME` | Application display name | `JamboApi` | No |
| `APP_HOSTNAME` | Server hostname for routing | `jambo.test` | Yes |
| `DEFAULT_URI` | Base URI for CLI command URL generation | `http://localhost` | No |
| `APP_SHARE_DIR` | Shared directory path | `var/share` | No |
| `APP_WEBHOOK_SECRET_KEY` | Secret key for webhook signature verification | — | Yes |

### APP_SECRET

Generate a secure secret:

```bash
php -r "echo bin2hex(random_bytes(32));"
```

Do not reuse this value across environments.

## Database

| Variable | Description | Default | Required |
|---|---|---|---|
| `DATABASE_URL` | Doctrine DBAL connection URL | — | Yes |

Supported driver formats:

```
# MySQL / MariaDB
DATABASE_URL="mysql://user:password@127.0.0.1:3306/jambo?serverVersion=8.0.32&charset=utf8mb4"

# PostgreSQL
DATABASE_URL="postgresql://user:password@127.0.0.1:5432/jambo?serverVersion=16&charset=utf8"

# SQLite (development only)
DATABASE_URL="sqlite:///%kernel.project_dir%/var/data_prod.db"
```

The `serverVersion` parameter is mandatory in production to avoid Doctrine version-detection queries.

## Messenger (Async Queue)

| Variable | Description | Default | Required |
|---|---|---|---|
| `MESSENGER_TRANSPORT_DSN` | Transport DSN for async message queue | `doctrine://default?auto_setup=0` | No |

Alternative transports:

```
# Doctrine (default)
MESSENGER_TRANSPORT_DSN=doctrine://default

# Redis
MESSENGER_TRANSPORT_DSN=redis://localhost:6379/messages

# AMQP (RabbitMQ)
MESSENGER_TRANSPORT_DSN=amqp://guest:guest@localhost:5672/%2f/messages
```

## Mailer

| Variable | Description | Default | Required |
|---|---|---|---|
| `MAILER_DSN` | Mailer transport DSN | `null://null` | No |

Examples:

```
# Disable email (default)
MAILER_DSN=null://null

# SMTP
MAILER_DSN=smtp://user:pass@smtp.example.com:587

# Sendmail
MAILER_DSN=sendmail://default
```

## Mercure (Real-time Updates)

| Variable | Description | Default | Required |
|---|---|---|---|
| `MERCURE_URL` | Internal Mercure hub URL (used by the app) | `http://127.0.0.1:8080/.well-known/mercure` | No |
| `MERCURE_PUBLIC_URL` | Public Mercure URL (used by browsers) | — | No |
| `MERCURE_JWT_SECRET` | JWT signing key for Mercure authentication | — | Yes (if using Mercure) |

The `MERCURE_JWT_SECRET` must match the key configured in the Mercure hub's `MERCURE_PUBLISHER_JWT_KEY` and `MERCURE_SUBSCRIBER_JWT_KEY`.

## Meilisearch (Full-text Search)

| Variable | Description | Default | Required |
|---|---|---|---|
| `MEILISEARCH_HOST` | Meilisearch server URL | `http://localhost:7700` | No |
| `MEILISEARCH_KEY` | Meilisearch API key | — | No |

Leave `MEILISEARCH_KEY` empty if authentication is not configured on the Meilisearch instance.

## AI Providers

AI providers can be configured via the Admin interface (Settings > AI Studio). They can also be set as fallback environment variables:

| Variable | Provider |
|---|---|
| `ANTHROPIC_API_KEY` | Anthropic Claude |
| `OPENAI_API_KEY` | OpenAI GPT |
| `DEEPSEEK_API_KEY` | DeepSeek |

These keys are used by the AI Assistant, AI Agent, and AI Translation features.

## Full .env Example

```bash
# ─── Application ──────────────────────────────────────────────────────
APP_ENV=prod
APP_SECRET=change-me-generate-with-openssl-rand-hex-32
APP_NAME="JamboApi"
APP_HOSTNAME=jambo.test
DEFAULT_URI=http://localhost
APP_SHARE_DIR=var/share

# ─── Database ─────────────────────────────────────────────────────────
DATABASE_URL="mysql://root:@127.0.0.1:3306/jamboapicms?serverVersion=8.0.32&charset=utf8mb4"

# ─── Messenger (async queue) ──────────────────────────────────────────
MESSENGER_TRANSPORT_DSN=doctrine://default?auto_setup=0

# ─── Mailer ───────────────────────────────────────────────────────────
MAILER_DSN=null://null

# ─── Meilisearch (full-text search) ───────────────────────────────────
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_KEY=

# ─── Webhooks ─────────────────────────────────────────────────────────
APP_WEBHOOK_SECRET_KEY=change-me-random-secret

# ─── AI Providers ─────────────────────────────────────────────────────
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
DEEPSEEK_API_KEY=

# ─── Mercure (real-time updates) ──────────────────────────────────────
MERCURE_URL=http://127.0.0.1:8080/.well-known/mercure
MERCURE_PUBLIC_URL=http://jamboapicms.test/.well-known/mercure
MERCURE_JWT_SECRET=change-me-strong-secret
```
