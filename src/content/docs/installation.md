---
title: Installation
description: Install Jambo on your server or locally in minutes.
---

## Requirements

- **PHP 8.4+** with extensions: `ctype`, `iconv`, `sodium`
- **Composer**
- **MySQL 8+**, PostgreSQL 14+, or SQLite
- **Node.js 18+** + npm (for frontend assets)
- Optional: **Meilisearch** (full-text search), **Symfony CLI**

## Install via Composer (recommended)

```bash
composer create-project jambostack/jambo-api my-project
cd my-project
```

This creates a fresh project with all dependencies installed. Skip to [Configure](#configure).

## Install via Git

```bash
git clone https://github.com/jambostack/jambo-api.git
cd jambo-api

composer install --no-dev --optimize-autoloader
npm install && npm run build
```

## Configure

```bash
cp .env.example .env
```

Edit `.env` with your database credentials and application settings — see [Environment Variables](/configuration/environment-variables/) for the full reference. Then run:

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console app:setup
```

The `app:setup` command initializes your admin account, generates API keys, and displays your login credentials. **Save them before closing the terminal.**

:::caution
Change the default admin password immediately after first login. Click your avatar (top right) → **Settings → Security**.
:::

## Verify

Start the Symfony local server:

```bash
symfony serve -d
```

Open `https://localhost:8000` and log in. Your API is ready at `https://localhost:8000/api/{project-uuid}`.

## Next steps

- [Configuration](/configuration/environment-variables/) — Environment variables reference
- [Deploy on a VPS](/deployment/vps/) — Production deployment guide
- [Content API](/api/introduction/) — Start fetching data from your frontend
