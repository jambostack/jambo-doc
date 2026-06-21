---
title: Docker
description: Deploying Jambo CMS using Docker and Docker Compose with Mercure hub and database services.
---

Jambo CMS ships with a `compose.yaml` file that provides two primary services: the database (PostgreSQL) and the Mercure hub. This page explains how to use Docker for development and production.

## Prerequisites

- Docker Engine 24+
- Docker Compose v2+

## Services Overview

The `compose.yaml` defines:

```yaml
services:
  database:
    image: postgres:${POSTGRES_VERSION:-16}-alpine
    environment:
      POSTGRES_DB: ${POSTGRES_DB:-app}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-!ChangeMe!}
      POSTGRES_USER: ${POSTGRES_USER:-app}
    volumes:
      - database_data:/var/lib/postgresql/data:rw
    healthcheck:
      test: ["CMD", "pg_isready", "-d", "${POSTGRES_DB:-app}", "-U", "${POSTGRES_USER:-app}"]

  mercure:
    image: dunglas/mercure
    restart: unless-stopped
    environment:
      SERVER_NAME: ':8080'
      MERCURE_PUBLISHER_JWT_KEY: '%env(MERCURE_JWT_SECRET)%'
      MERCURE_SUBSCRIBER_JWT_KEY: '%env(MERCURE_JWT_SECRET)%'
      MERCURE_EXTRA_DIRECTIVES: |
        cors_origins http://your-domain.com http://localhost:8000
    command: /usr/bin/caddy run --config /etc/caddy/dev.Caddyfile
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/healthz"]
    volumes:
      - mercure_data:/data
      - mercure_config:/config
```

## Quick Start

1. Clone the repository:

```bash
git clone https://github.com/jambostack/jambo-api.git
cd jambo-api
```

2. Start the services:

```bash
docker compose up -d
```

This starts PostgreSQL 16 Alpine and the Mercure hub.

3. Configure the database URL in `.env.local`:

```bash
DATABASE_URL="postgresql://app:!ChangeMe!@127.0.0.1:5432/app?serverVersion=16&charset=utf8"
```

4. Install dependencies and initialize:

```bash
composer install
php bin/console doctrine:database:create --if-not-exists
php bin/console doctrine:migrations:migrate --no-interaction
```

## Mercure Configuration

The Mercure hub listens on port 8080 internally. Key environment variables:

| Variable | Purpose | Default |
|---|---|---|
| `MERCURE_JWT_SECRET` | Signing key for publisher/subscriber JWTs | Required |
| `MERCURE_URL` | Internal URL used by the PHP app | `http://127.0.0.1:8080/.well-known/mercure` |
| `MERCURE_PUBLIC_URL` | Public URL sent to browsers | `http://your-domain.com/.well-known/mercure` |

### CORS Configuration

The `cors_origins` directive in `MERCURE_EXTRA_DIRECTIVES` must include all domains that connect to Mercure from the browser:

```bash
cors_origins http://localhost:8000 https://your-domain.com
```

### Production Mercure

For production, run the Mercure hub with a proper Caddyfile instead of the dev Caddyfile:

```yaml
services:
  mercure:
    image: dunglas/mercure
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      SERVER_NAME: ':8080'
      MERCURE_PUBLISHER_JWT_KEY: '<your-production-secret>'
      MERCURE_SUBSCRIBER_JWT_KEY: '<your-production-secret>'
      MERCURE_EXTRA_DIRECTIVES: |
        cors_origins https://your-domain.com
```

## Using MySQL Instead of PostgreSQL

Replace the `database` service with MySQL. In `compose.yaml`:

```yaml
services:
  database:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: jambo
      MYSQL_USER: jambo
      MYSQL_PASSWORD: !ChangeMe!
      MYSQL_ROOT_PASSWORD: root
    volumes:
      - database_data:/var/lib/mysql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping"]
```

Update `DATABASE_URL` accordingly:

```bash
DATABASE_URL="mysql://jambo:!ChangeMe!@127.0.0.1:3306/jambo?serverVersion=8.0.32&charset=utf8mb4"
```

## Docker Compose for Production

For a production stack, extend the compose file with the PHP application container:

```yaml
services:
  app:
    image: php:8.4-fpm-alpine
    volumes:
      - .:/var/www/html
    depends_on:
      database:
        condition: service_healthy
      mercure:
        condition: service_healthy

  nginx:
    image: nginx:alpine
    volumes:
      - .:/var/www/html
      - ./docker/nginx/default.conf:/etc/nginx/conf.d/default.conf
    ports:
      - "80:80"
    depends_on:
      - app
```

## Persistent Data

Docker named volumes are used for persistent storage:

```yaml
volumes:
  database_data:
  mercure_data:
  mercure_config:
```

To back up:

```bash
docker run --rm -v jambo-api_database_data:/data -v $(pwd):/backup alpine \
  tar czf /backup/database-backup.tar.gz -C /data .
```

## Troubleshooting

### Mercure health check fails

```bash
docker compose logs mercure
docker compose restart mercure
```

### Database connection refused

Ensure the database container is healthy:

```bash
docker compose ps
docker compose logs database
```

Check that `DATABASE_URL` matches the credentials in `compose.yaml`.
