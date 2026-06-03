---
title: Deploy on Shared Hosting
description: Deploy Jambo on shared hosting with cPanel or DirectAdmin.
---

Jambo can run on shared hosting if your host provides **PHP 8.4+** with the required extensions and shell access via SSH.

## Requirements

Before starting, verify your host supports:

- PHP 8.4+ with `ctype`, `iconv`, `sodium`, `pdo_mysql` extensions
- MySQL 8+ or PostgreSQL 14+
- SSH access (for Composer and migrations)
- Node.js 18+ (for building frontend assets — run locally then upload `public/build/`)

:::caution
Many shared hosts only provide PHP 8.0–8.2. Check your hosting control panel before purchasing.
:::

## Deployment steps

### 1. Prepare locally

On your local machine, install dependencies and build frontend assets:

```bash
composer install --no-dev --optimize-autoloader
npm ci && npm run build
```

### 2. Upload files

Upload the project files to your hosting `public_html` parent directory (not inside `public_html`). Your folder structure should be:

```
~/
├── jambo/              ← project files (all except public/)
│   ├── bin/
│   ├── config/
│   ├── src/
│   ├── var/
│   └── vendor/
└── public_html/        ← only the contents of public/
    ├── index.php
    ├── build/
    └── uploads/
```

### 3. Point `public_html` to Jambo's public folder

Copy the contents of `public/` into your `public_html` folder. Then edit `public_html/index.php` to adjust the path to the Symfony kernel:

```php
// Change this line to point to your project root
require_once dirname(__DIR__).'/jambo/vendor/autoload_runtime.php';
```

### 4. Configure `.env`

Create `.env` in the project root (not in `public_html`):

```ini
APP_ENV=prod
APP_SECRET=your-secret-key
DATABASE_URL="mysql://user:pass@localhost/dbname?serverVersion=8.0"
```

### 5. Run migrations via SSH

```bash
ssh your-host
cd ~/jambo
php bin/console doctrine:migrations:migrate
php bin/console app:setup
php bin/console cache:warmup
```

### 6. Set permissions

```bash
chmod -R 755 var/
chmod -R 755 public/uploads/
```

## Troubleshooting

**500 error** — check `var/log/prod.log` for details. Most common causes: wrong `DATABASE_URL`, missing PHP extensions, or incorrect file paths.

**Blank page** — set `APP_DEBUG=1` temporarily to see the error, then set it back to `0`.

**Assets not loading** — verify that `public/build/` was uploaded and the paths in `public/index.php` are correct.
