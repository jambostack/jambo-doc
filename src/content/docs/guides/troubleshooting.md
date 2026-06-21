---
title: Troubleshooting
description: Common issues and solutions when running Jambo CMS.
---

## Installation

### Composer Install Fails

**Problem**: `composer install` fails with memory-related errors.

**Solution**:

```bash
php -d memory_limit=-1 /usr/local/bin/composer install
```

**Problem**: Missing PHP extensions.

**Solution**: Verify required extensions:

```bash
php -m | grep -E 'ctype|iconv|json|mbstring|pdo|xml|zip|gd|intl|curl|openssl|fileinfo'
```

Install missing extensions:

```bash
# Ubuntu/Debian
sudo apt install php8.4-{xml,mbstring,curl,zip,gd,intl}
```

### Database Migration Fails

**Problem**: `doctrine:migrations:migrate` throws an error.

**Common causes**:

- Wrong database credentials in `DATABASE_URL`
- Database server version mismatch in the DSN (always set `serverVersion`)
- Missing database — run `doctrine:database:create --if-not-exists` first
- Insufficient permissions — verify the user has `CREATE`, `ALTER`, `INDEX` privileges

**Solution**:

```bash
# Check the connection
php bin/console doctrine:query:sql "SELECT 1"

# Verify the DSN format
# MySQL: mysql://user:pass@host:3306/db?serverVersion=8.0.32&charset=utf8mb4
# PostgreSQL: postgresql://user:pass@host:5432/db?serverVersion=16&charset=utf8
```

### Admin User Creation Fails

**Problem**: `app:create-admin` produces an error.

**Solution**: Ensure the database is migrated first:

```bash
php bin/console doctrine:migrations:migrate --no-interaction
php bin/console app:create-admin email@example.com
```

## Runtime

### 500 Internal Server Error

**Problem**: Every page returns a 500 error.

**Steps to diagnose**:

1. Check the Symfony log:

```bash
tail -f var/log/prod.log
```

2. Temporarily enable error display in `.env.local` (do not leave this on):

```bash
APP_ENV=dev
APP_DEBUG=true
```

3. Verify file permissions:

```bash
chmod -R 775 var/
chmod -R 775 public/uploads/
```

**Common causes**:

- Missing `.env` or `.env.local` file
- Invalid `APP_SECRET` (must be 32+ hex characters)
- Database connection refused
- Missing `var/` directory (cache cannot be written)

### Blank Page

**Problem**: No output at all, HTTP 200 with empty body.

**Solution**: Enable the Symfony debug page:

```bash
# In .env.local
APP_ENV=dev
APP_DEBUG=true
```

Then check `var/log/prod.log` for the underlying error.

### Login Page Not Loading (CSS/JS Missing)

**Problem**: The login page loads without styling.

**Solution**: Rebuild frontend assets:

```bash
npm ci
npm run build
```

Verify the assets exist:

```bash
ls public/build/
# Should contain: app.js, app.css, runtime.js, etc.
```

## Mercure / Real-time

### Live Preview Not Working

**Problem**: The live preview iframe shows "Connection error" or stays blank.

**Checklist**:

1. Is `previewEnabled` set to `true` in Project Settings?
2. Is `previewUrl` correctly configured? (Must be the full URL of your frontend)
3. Is the Mercure hub running?

```bash
curl -f http://127.0.0.1:8080/healthz
```

4. Do the Mercure JWT secrets match between `.env.local` and the Mercure hub config?
5. Is the iframe URL reachable? Open the preview URL directly in a browser
6. Check the browser console for `postMessage` errors (cross-origin issues)

### Mercure Connection Failed

**Problem**: Mercure hub returns 401 or connection refused.

**Solutions**:

```bash
# Check if Mercure is running
docker compose ps mercure
docker compose logs mercure

# Verify JWT secret matches
# .env.local: MERCURE_JWT_SECRET=xxx
# compose.yaml: MERCURE_PUBLISHER_JWT_KEY must match

# Check CORS configuration
# MERCURE_EXTRA_DIRECTIVES must include the frontend domain
```

### Real-time Updates Not Received

**Problem**: Content changes are not reflected in real time.

**Causes and fixes**:

- Mercure hub is not running: Start the container (`docker compose up -d mercure`)
- Mercure cookie not set: Ensure `MercureCookieSubscriber` is enabled and you are logged in
- Wrong topic format: Topics follow the pattern `projects/{uuid}`, `projects/{uuid}/content`
- Fallback to JSONL: If `MERCURE_URL` is empty, the system writes JSONL to `var/realtime/` — this is not real time

## Email

### Emails Not Sending

**Problem**: Emails are not delivered.

**Solution**: Check the mailer configuration:

```bash
# In .env.local
MAILER_DSN=smtp://user:pass@smtp.example.com:587

# Test the mailer
php bin/console mailer:test email@example.com
```

If `MAILER_DSN` is set to `null://null`, all emails are disabled.

## Search

### Meilisearch Not Indexing

**Problem**: Content search returns no results.

**Solutions**:

1. Ensure Meilisearch is running:

```bash
curl http://localhost:7700/health
```

2. Verify `MEILISEARCH_HOST` and `MEILISEARCH_KEY` in `.env.local`

3. Manually trigger indexing:

```bash
php bin/console app:search:index
```

4. Check Meilisearch logs:

```bash
docker compose logs meilisearch
```

## Async Jobs

### Messenger Consumer Not Processing

**Problem**: Jobs (email, webhooks) stay in the `messenger_messages` table.

**Solution**:

1. Verify the cron job is running:

```bash
crontab -l
# Should include: * * * * * php bin/console messenger:consume async --time-limit=60
```

2. Run the consumer manually to see errors:

```bash
php bin/console messenger:consume async -vvv
```

3. Check for failed messages:

```bash
php bin/console messenger:failed:show
php bin/console messenger:failed:retry
```

## File Uploads

### Upload Fails

**Problem**: Media upload returns a server error.

**Checklist**:

- PHP `upload_max_filesize` and `post_max_size` settings (default is 8 MB)
- Write permissions on `public/uploads/`
- PHP extension `fileinfo` must be enabled
- For large files, the `tus-js-client` (resumable upload) is configured in the frontend

### Image Processing Fails

**Problem**: Thumbnails or image manipulations return errors.

**Solution**: Verify the image processing library:

```bash
php -m | grep -E 'gd|imagick'
```

Install if missing:

```bash
sudo apt install php8.4-gd
```

## Environment-Specific

### Windows (Development)

**Known issues**:

- Symfony's filesystem cache path may contain characters incompatible with Windows paths
- Use the `php8.4` binary explicitly if multiple PHP versions are installed
- File permission issues: `var/` directory must be writable by the web server user

### Shared Hosting

See the [Shared Hosting](/deployment/shared) page for common issues with file permissions, missing extensions, and cron jobs.

## Getting Help

If the troubleshooting steps above do not resolve your issue:

1. Check `var/log/prod.log` for detailed error messages
2. Enable Symfony debug mode temporarily: `APP_ENV=dev APP_DEBUG=true`
3. Review the [Configuration](/deployment/configuration) page to ensure all environment variables are set
4. Visit the [Jambo API GitHub repository](https://github.com/jambostack/jambo-api) for issues and discussions
