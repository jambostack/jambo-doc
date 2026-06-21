---
title: Shared Hosting
description: Deploying Jambo CMS on shared hosting environments with limited server access.
---

Shared hosting imposes constraints that make Jambo CMS deployment more challenging. This guide covers the most common scenarios and workarounds.

## Requirements Check

Before proceeding, verify that your hosting plan supports:

- **PHP 8.4** or at minimum PHP 8.3
- **MySQL 8.0** or MariaDB 10.11+
- **mod_rewrite** (Apache) or equivalent Nginx rewrite rules
- **SSH access** with `composer` available
- **Cron jobs** for the Messenger consumer
- **Sufficient memory**: at least 256 MB PHP memory limit

Most shared hosts using cPanel, Plesk, or ISPConfig with PHP 8.4 support should work.

## Step 1: Prepare Locally

Build frontend assets on your local machine:

```bash
npm ci
npm run build
```

This creates `public/build/` with compiled CSS and JavaScript.

## Step 2: Upload Files

Upload the entire project to your hosting document root (usually `public_html/` or `www/`):

```bash
rsync -avz --exclude node_modules --exclude .git --exclude var/cache \
  ./ jprud67@your-server:~/public_html/
```

Alternatively, use Git:

```bash
git clone https://github.com/jambostack/jambo-api.git public_html
```

## Step 3: Configure the Document Root

Most shared hosts expect the document root to be the project root. Jambo's entry point is in `public/`.

### Apache (with .htaccess)

Create or edit `public_html/.htaccess` to rewrite to the `public/` directory:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

### cPanel / Plesk

If the control panel allows setting a custom document root, point it to `public/` directly.

## Step 4: Environment Configuration

Create `.env.local` via the hosting file manager or SSH:

```bash
APP_ENV=prod
APP_SECRET=<generated-random-hex-32>
DATABASE_URL="mysql://user:password@localhost/jambo_database?serverVersion=8.0.32&charset=utf8mb4"
APP_HOSTNAME=your-domain.com
MAILER_DSN=smtp://user:pass@smtp.example.com:587
MESSENGER_TRANSPORT_DSN=doctrine://default
```

## Step 5: Database

Create a MySQL database and user through your hosting control panel (phpMyAdmin, cPanel MySQL wizard, etc.). Then run migrations:

```bash
php bin/console doctrine:migrations:migrate --no-interaction
```

## Step 6: File Permissions

Shared hosts often run PHP as a different user. Ensure write permissions on:

```bash
chmod -R 775 var/
chmod -R 775 public/uploads/
```

## Step 7: Cron Job (Messenger)

Add a cron job through your hosting panel to run every minute:

```cron
* * * * * php /home/user/public_html/bin/console messenger:consume async --time-limit=60 --memory-limit=256M > /dev/null 2>&1
```

## Step 8: Mercure (Real-time)

Shared hosting typically cannot run a Mercure hub as a persistent service. Fallback options:

1. **Use a managed Mercure service** (e.g., Mercure.rocks Cloud)
2. **Disable Mercure** and rely on polling (set `MERCURE_URL` to empty)
3. **Run Mercure on a cheap VPS** pointed at your shared host domain

When Mercure is unavailable, the system falls back to JSONL files in `var/realtime/` (see `MercurePublisher`).

## Limitations

| Feature          | Shared Hosting   | Notes                               |
|------------------|------------------|-------------------------------------|
| Mercure hub      | Not available    | Use managed service or disable      |
| Redis            | Rarely available  | Falls back to filesystem cache      |
| Async Messenger  | Via cron         | Slower than dedicated process       |
| Image processing | Usually available | Requires GD or Imagick extension    |
| Background jobs  | Via cron only    | 1-minute granularity                |

## Troubleshooting

### 500 Internal Server Error

Check the PHP error log (usually in `~/logs/` or configured in cPanel). Common issues:

- Missing PHP extensions: `ext-json`, `ext-zip`, `ext-intl`
- Insufficient memory: increase `memory_limit` via `.user.ini`
- File permissions: ensure `var/` is writable

### Blank Page

Enable error display temporarily in `.env.local`:

```bash
APP_ENV=dev
APP_DEBUG=true
```

Do not leave this enabled in production.
