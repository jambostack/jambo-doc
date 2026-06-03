---
title: Deployment
description: Deploy Jambo API to production.
---

## VPS (Nginx + PHP-FPM)

### Requirements

- **Ubuntu 22.04+** or **Debian 12+**
- **PHP 8.4** with `php-fpm`, `php-cli`, and required extensions
- **Nginx** (or Apache)
- **MySQL 8+** or **PostgreSQL 14+**
- **Node.js 18+** for building frontend assets
- **Composer**
- **Supervisor** (recommended, for background workers)

### Step-by-step

```bash
# 1. Clone the project
cd /var/www
git clone https://github.com/jambostack/jambo-api.git
cd jambo-api

# 2. Install dependencies
composer install --no-dev --optimize-autoloader
npm ci && npm run build

# 3. Configure environment
cp .env.example .env
# Edit .env with your database, mailer, and APP_SECRET

# 4. Create database
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console app:setup

# 5. Set permissions
sudo chown -R www-data:www-data var/ public/uploads/
```

### Nginx configuration

```nginx
server {
    listen 80;
    server_name api.example.com;
    root /var/www/jambo-api/public;

    location / {
        try_files $uri /index.php$is_args$args;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(ht|git|env) {
        deny all;
    }
}
```

### Supervisor for background workers

```ini
[program:jambo-worker]
command=php /var/www/jambo-api/bin/console messenger:consume async -vv
user=www-data
numprocs=2
autostart=true
autorestart=true
```

---

## Docker

```bash
# Clone and build
git clone https://github.com/jambostack/jambo-api.git
cd jambo-api
docker compose up -d

# Run setup inside the container
docker compose exec app php bin/console app:setup
```

The included `compose.yaml` sets up PHP-FPM, Nginx, MySQL, and Meilisearch.

---

## Production checklist

- [ ] Set `APP_ENV=prod` and `APP_DEBUG=0`
- [ ] Generate a strong `APP_SECRET` (`openssl rand -hex 32`)
- [ ] Configure HTTPS (Let's Encrypt recommended)
- [ ] Set up database backups
- [ ] Enable OPcache in `php.ini`
- [ ] Set proper file permissions (`var/`, `public/uploads/`)
- [ ] Configure a real mailer DSN (do not use `null://` in production)
- [ ] Run `php bin/console cache:clear` after every deploy
