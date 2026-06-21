---
title: VPS Deployment
description: Step-by-step guide for deploying Jambo CMS on a Virtual Private Server (VPS).
---

This guide walks through deploying Jambo CMS on a fresh Ubuntu 24.04 VPS with PHP 8.4, MySQL 8.0, Nginx, and optional Redis and Mercure support.

## Prerequisites

- A VPS running Ubuntu 24.04 with root or sudo access
- A domain name pointing to the server IP
- SSH access configured

## Step 1: System Dependencies

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx mysql-server certbot python3-certbot-nginx \
  curl git unzip redis-server
```

## Step 2: PHP 8.4

Install PHP 8.4 from the Ondrej PPA:

```bash
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
sudo apt install -y php8.4 php8.4-cli php8.4-fpm php8.4-mysql \
  php8.4-pgsql php8.4-xml php8.4-mbstring php8.4-curl php8.4-zip \
  php8.4-gd php8.4-intl php8.4-bcmath php8.4-exif php8.4-fileinfo \
  php8.4-redis php8.4-apcu
```

Verify:

```bash
php -v  # Should show PHP 8.4.x
php -m  # Verify required extensions
```

Install Composer:

```bash
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```

## Step 3: Database

```bash
sudo mysql_secure_installation
sudo mysql -e "CREATE DATABASE jambo_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
sudo mysql -e "CREATE USER jambo@localhost IDENTIFIED BY 'your-strong-password';"
sudo mysql -e "GRANT ALL PRIVILEGES ON jambo_production.* TO jambo@localhost;"
sudo mysql -e "FLUSH PRIVILEGES;"
```

## Step 4: Clone and Install

```bash
cd /var/www
git clone https://github.com/jambostack/jambo-api.git
cd jambo-api
git checkout main
```

Create the `.env.local` file:

```bash
cp .env .env.local
```

Set production values. At minimum:

```bash
APP_ENV=prod
APP_SECRET=$(openssl rand -hex 32)
DATABASE_URL="mysql://jambo:your-strong-password@127.0.0.1:3306/jambo_production?serverVersion=8.0.32&charset=utf8mb4"
MESSENGER_TRANSPORT_DSN=doctrine://default
MAILER_DSN=smtp://user:pass@smtp.example.com:587
APP_HOSTNAME=your-domain.com
```

Install PHP dependencies:

```bash
composer install --no-dev --optimize-autoloader
```

Create the database schema:

```bash
php bin/console doctrine:database:create --if-not-exists
php bin/console doctrine:migrations:migrate --no-interaction
```

Create the admin user:

```bash
php bin/console app:create-admin your-email@example.com
```

Set directory permissions:

```bash
sudo setfacl -dR -m u:www-data:rwX var/
sudo setfacl -R -m u:www-data:rwX var/
```

## Step 5: Frontend Assets

If Node.js is installed on the server:

```bash
npm ci
npm run build
```

Alternatively, build locally and rsync the `public/build/` directory.

## Step 6: Nginx Configuration

Create `/etc/nginx/sites-available/jambo`:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/jambo-api/public;

    index index.php;

    location / {
        try_files $uri /index.php$is_args$args;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(ht|git) {
        deny all;
    }

    # Mercure proxy (if using bundled Mercure)
    location /mercure {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 86400;
    }
}
```

Enable the site and get SSL:

```bash
sudo ln -s /etc/nginx/sites-available/jambo /etc/nginx/sites-enabled/
sudo certbot --nginx -d your-domain.com
sudo nginx -t && sudo systemctl reload nginx
```

## Step 7: Mercure Hub

Jambo provides a Mercure hub via Docker. If you prefer to run it as a systemd service:

```bash
# Download the Mercure binary
sudo curl -L https://github.com/dunglas/mercure/releases/latest/download/mercure_linux_amd64.tar.gz -o /tmp/mercure.tar.gz
sudo tar -xzf /tmp/mercure.tar.gz -C /usr/local/bin/ mercure

# Create a config file /etc/mercure.env:
# SERVER_NAME=:8080
# MERCURE_PUBLISHER_JWT_KEY=your-mercure-jwt-secret
# MERCURE_SUBSCRIBER_JWT_KEY=your-mercure-jwt-secret
# MERCURE_EXTRA_DIRECTIVES=cors_origins https://your-domain.com

# Run as a service
sudo mercure run --config /etc/mercure.env
```

Update `.env.local`:

```bash
MERCURE_URL=http://127.0.0.1:8080/.well-known/mercure
MERCURE_PUBLIC_URL=https://your-domain.com/.well-known/mercure
MERCURE_JWT_SECRET=your-mercure-jwt-secret
```

## Step 8: Redis (Optional but Recommended)

Redis is used for cache, session storage, and as an alternative Messenger transport:

```bash
sudo systemctl enable redis-server
```

Configure in `.env.local`:

```bash
REDIS_URL=redis://localhost:6379
```

Update `config/packages/cache.yaml` to use Redis:

```yaml
framework:
    cache:
        app: cache.adapter.redis
        default_redis_provider: '%env(REDIS_URL)%'
```

## Step 9: Cron Jobs

Set up the Messenger consumer for async jobs:

```cron
* * * * * cd /var/www/jambo-api && php bin/console messenger:consume async --time-limit=60 --memory-limit=256M > /dev/null 2>&1
```

## Step 10: Verification

```bash
curl -I https://your-domain.com
# Expected: HTTP/2 302 or 200

php bin/console cache:clear --env=prod

# Check Mercure health
curl -f http://127.0.0.1:8080/healthz
```
