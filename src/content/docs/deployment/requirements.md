---
title: Requirements
description: Server requirements for running Jambo CMS — PHP 8.4, database, Node.js, and required PHP extensions.
---

Jambo CMS is built on Symfony 8.0 and requires a modern server stack. This page lists all software dependencies and system requirements.

## PHP

| Requirement | Minimum | Recommended |
|---|---|---|
| PHP version | 8.4 | 8.4+ |
| Memory limit | 256 MB | 512 MB |
| Execution time (CLI) | 120 s | 300 s |
| Execution time (web) | 60 s | 120 s |

### Required PHP Extensions

The following extensions are required as declared in `composer.json`:

- `ext-ctype`
- `ext-iconv`
- `ext-json`
- `ext-mbstring`
- `ext-pdo` (with the driver matching your database)
- `ext-xml`
- `ext-zip`
- `ext-gd` or `ext-imagick` (for image processing via Intervention Image)
- `ext-intl`
- `ext-curl`
- `ext-openssl`
- `ext-fileinfo`

### Recommended PHP Extensions

- `ext-apcu` — local cache backend (recommended over filesystem cache)
- `ext-redis` — Redis adapter for cache, sessions, and Messenger transport
- `ext-amqp` — AMQP transport for async jobs (alternative to Doctrine)
- `ext-exif` — EXIF metadata support for uploaded images

## Database

Jambo supports three database drivers via Doctrine ORM 3.6:

| Database | Minimum Version | Notes |
|---|---|---|
| MySQL | 8.0 | Primary driver, full support |
| MariaDB | 10.11 | Tested, works with MySQL driver |
| PostgreSQL | 16 | Full support via dedicated driver |
| SQLite | 3.45 | Development only, not recommended for production |

The required `DATABASE_URL` format is documented in the [Configuration](/deployment/configuration) page.

## Web Server

### Apache

- `mod_rewrite` enabled
- AllowOverride `All` in the document root
- The provided `.htaccess` file (in `public/`) handles URL rewriting

### Nginx

- PHP-FPM configured for the `public/` directory as document root
- The following rewrite rule is required:

```nginx
location / {
    try_files $uri /index.php$is_args$args;
}
```

## Node.js

Required only for building frontend assets. The production server does not need Node.js at runtime.

| Tool | Version |
|---|---|
| Node.js | 20 LTS or later |
| npm | 10 or later |

Build command:

```bash
npm ci
npm run build
```

The built assets are output to `public/build/` and can be deployed with the rest of the application.

## Composer

```bash
php -d memory_limit=-1 /usr/local/bin/composer install --no-dev --optimize-autoloader
```

The `--no-dev` flag removes development dependencies. The `--optimize-autoloader` flag generates a classmap for faster autoloading in production.

## Mercure Hub (Real-time)

Jambo uses Mercure for real-time content updates and live preview. In production you need a running Mercure hub server:

- **Docker**: Provided via the `dunglas/mercure` image in `compose.yaml`
- **Binary**: Download from [mercure.rocks](https://mercure.rocks)
- **Managed**: Use a hosted Mercure service

See the [Docker](/deployment/docker) page for the container setup.

## Meilisearch (Full-text Search)

Optional. Required if you use the full-text search feature.

| Requirement | Value |
|---|---|
| Meilisearch version | Latest stable |
| Host | Configurable via `MEILISEARCH_HOST` |
| API Key | Configurable via `MEILISEARCH_KEY` |

## Summary

```yaml
# php
php: ">=8.4"
extensions: ctype, iconv, json, mbstring, pdo, xml, zip, gd, intl, curl, openssl, fileinfo

# database
mysql: ">=8.0"      # or postgresql >=16, or mariadb >=10.11

# build tools (not required at runtime)
node.js: ">=20"
npm: ">=10"

# optional but recommended
redis: ">=6.0"
meilisearch: latest
mercure: latest
```
