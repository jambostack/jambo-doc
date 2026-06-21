---
title: Installation
description: System requirements and step-by-step setup for a Jambo CMS instance.
---

Jambo requires PHP 8.4+, Symfony 8.0+, a MySQL 8.0 database, and Node.js for the admin frontend build.

## System requirements

| Component | Requirement |
|---|---|
| PHP | >= 8.4 (with `ext-ctype`, `ext-iconv`, `ext-intl`, `ext-pdo`, `ext-gd` or `ext-imagick`) |
| Database | MySQL 8.0+ (MariaDB 10.6+ compatible) |
| Web server | Nginx or Apache (with `mod_rewrite`) |
| Composer | >= 2.7 |
| Node.js | >= 20 (for asset build) |
| Additional | Meilisearch (optional, for full-text search), Mercure (optional, for real-time) |

## Step-by-step

### 1. Clone the repository

```bash
git clone https://github.com/jambostack/jambo-api.git
cd jambo-api
```

### 2. Install PHP dependencies

```bash
composer install --no-dev -o
```

### 3. Configure environment

Copy the environment file and adjust values:

```bash
cp .env .env.local
```

Key variables to set:

| Variable | Description | Default |
|---|---|---|
| `APP_ENV` | Environment mode (`prod`, `dev`) | `prod` |
| `APP_SECRET` | 64-char hex Symfony app secret | (auto-generated) |
| `DATABASE_URL` | MySQL DSN | `mysql://root:@127.0.0.1:3306/jamboapicms` |
| `MAILER_DSN` | SMTP DSN for transactional emails | `null://null` |
| `APP_HOSTNAME` | Public hostname | `jamboapicms.test` |
| `ANTHROPIC_API_KEY` | API key for Claude AI features | (optional) |
| `OPENAI_API_KEY` | API key for OpenAI features | (optional) |
| `MEILISEARCH_HOST` | Meilisearch server URL | `http://localhost:7700` |

### 4. Create the database

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

### 5. Run the setup wizard

```bash
php bin/console app:setup
```

This interactive command creates the admin user and configures your first project.

### 6. Build frontend assets

```bash
npm install
npm run build
```

### 7. Serve

#### Development

```bash
php -S localhost:8000 -t public/
```

#### Production (Nginx)

```nginx
server {
    listen 80;
    server_name jamboapicms.test;
    root /path/to/jambo-api/public;

    location / {
        try_files $uri /index.php$is_args$args;
    }

    location ~ ^/index\.php(/|$) {
        fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
        fastcgi_split_path_info ^(.+\.php)(/.*)$;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;
        internal;
    }
}
```

## Docker

A `docker-compose.yml` is included in the repository:

```bash
docker compose up -d
```

This starts PHP-FPM, MySQL 8.0, Meilisearch, and Mercure hub with sensible defaults.

## Post-install checklist

- [ ] Admin user created and login works at `/login`
- [ ] Database migrations are up-to-date (`php bin/console doctrine:migrations:status`)
- [ ] App secret is unique (not the default from `.env`)
- [ ] HTTPS is configured in production
- [ ] CORS origins are configured in `config/packages/nelmio_cors.yaml`

## See also

- [Quick Start](./quick-start/) — create your first project and collection
- [Core Concepts](./concepts/) — projects, collections, entries explained
