---
title: Performance
description: Performance optimization guide for Jambo CMS — caching, Redis, query optimization, and Mercure tuning.
---

This guide covers strategies for keeping Jambo CMS fast under load.

## Caching

### Application Cache (Symfony Cache)

By default, Jambo uses the filesystem cache. For production, switch to Redis or APCu.

**Redis** (recommended):

Edit `config/packages/cache.yaml`:

```yaml
framework:
    cache:
        app: cache.adapter.redis
        default_redis_provider: 'redis://localhost:6379'
```

If your Redis instance requires a password:

```yaml
framework:
    cache:
        default_redis_provider: 'redis://:password@localhost:6379'
```

**APCu** (single-server, low overhead):

```yaml
framework:
    cache:
        app: cache.adapter.apcu
```

APCu is not recommended for workloads with heavy random writes, as memory fragmentation can degrade performance over time.

### Doctrine Metadata and Query Cache

Doctrine supports additional cache layers that significantly reduce database overhead:

```yaml
# config/packages/doctrine.yaml
doctrine:
    orm:
        metadata_cache_driver:
            type: pool
            pool: doctrine.system_cache_pool
        query_cache_driver:
            type: pool
            pool: doctrine.system_cache_pool
        result_cache_driver:
            type: pool
            pool: doctrine.result_cache_pool

framework:
    cache:
        pools:
            doctrine.result_cache_pool:
                adapter: cache.app
            doctrine.system_cache_pool:
                adapter: cache.system
```

Enable result caching on specific queries:

```php
$query->useResultCache(true, 3600, 'my_query_cache_key');
```

## Database Optimization

### Indexes

Ensure your database tables have appropriate indexes. Doctrine migrations create the default indexes, but custom queries may benefit from additional indexes:

```sql
CREATE INDEX idx_content_entry_collection ON content_entry (collection_id);
CREATE INDEX idx_content_entry_status ON content_entry (status);
CREATE INDEX idx_content_entry_updated ON content_entry (updated_at);
```

### Query Optimization

- Use the Doctrine query cache for queries that run on every request
- Avoid N+1 queries by using JOINs or eager loading with `QueryBuilder::addSelect()`
- Paginate large collections using KNP Paginator (already configured by default)

### Database Pooling

For high-traffic deployments, configure a connection pooler like PgBouncer (PostgreSQL) or ProxySQL (MySQL). This reduces the overhead of establishing new database connections.

## Messenger (Async Queue)

Async jobs (notification emails, webhook deliveries, content indexing) are processed via Symfony Messenger. The default transport uses Doctrine, but for higher throughput:

### Redis Transport

```bash
MESSENGER_TRANSPORT_DSN=redis://localhost:6379/messages
```

### AMQP (RabbitMQ)

```bash
MESSENGER_TRANSPORT_DSN=amqp://guest:guest@localhost:5672/%2f/messages
```

### Consumer Configuration

Run multiple consumer processes for higher throughput:

```bash
# Run 3 consumers in parallel
php bin/console messenger:consume async --time-limit=60 &
php bin/console messenger:consume async --time-limit=60 &
php bin/console messenger:consume async --time-limit=60 &
```

Each consumer should have `--time-limit` and `--memory-limit` flags to prevent memory leaks:

```cron
* * * * * php bin/console messenger:consume async --time-limit=60 --memory-limit=256M
```

## PHP-FPM Tuning

For production servers using PHP-FPM, adjust `php-fpm.conf`:

```ini
pm = dynamic
pm.max_children = 50
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 15
pm.max_requests = 500
```

Adjust `max_children` based on available memory. A rough formula: `memory / (PHP memory_limit per process)`.

## Meilisearch Performance

If full-text search is enabled, adjust Meilisearch index settings:

```bash
# Configure searchable attributes
curl -X PATCH 'http://localhost:7700/indexes/content/settings' \
  -H 'Content-Type: application/json' \
  -d '{
    "searchableAttributes": ["title", "body", "slug"],
    "sortableAttributes": ["created_at", "updated_at"],
    "rankingRules": ["typo", "words", "proximity", "attribute", "sort"]
  }'
```

## Mercure Tuning

### SSE vs Polling

The Mercure hub uses Server-Sent Events (SSE). For projects where real-time updates are not critical, you can reduce Mercure overhead:

- Set `MERCURE_URL` to empty to disable real-time publishing; the app falls back to JSONL files in `var/realtime/`
- Use a shorter Caddy `read_timeout` in production Caddyfiles

### Mercure Hub Resources

The `dunglas/mercure` container is lightweight, but for high-traffic deployments:

```yaml
services:
  mercure:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 128M
```

## Frontend Assets

### Build Optimization

The Webpack Encore build produces optimised bundles by default. For additional gains:

```bash
# Analyze bundle size
npx webpack-bundle-analyzer public/build/build-manifest.json

# Enable gzip on the web server
# Nginx: gzip on; gzip_types application/javascript text/css;
```

### Versioning

Webpack Encore adds content hashes to filenames for cache busting:

```js
// webpack.config.js — enabled in production
Encore.enableVersioning();
```

This is already configured in the default setup.

## Profiling

Enable the Symfony Web Profiler in development to identify bottlenecks:

```bash
# In .env.local (development only)
APP_ENV=dev
APP_DEBUG=true
```

Analyze:

- **Doctrine** panel: N+1 queries, slow queries
- **Performance** panel: Twig rendering time
- **Cache** panel: Cache hit/miss ratio
