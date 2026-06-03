---
title: Déploiement
description: Déployez Jambo API en production.
---

## VPS (Nginx + PHP-FPM)

### Prérequis

- **Ubuntu 22.04+** ou **Debian 12+**
- **PHP 8.4** avec `php-fpm`, `php-cli` et les extensions requises
- **Nginx** (ou Apache)
- **MySQL 8+** ou **PostgreSQL 14+**
- **Node.js 18+** pour compiler les assets frontend
- **Composer**
- **Supervisor** (recommandé, pour les workers en arrière-plan)

### Étapes

```bash
# 1. Cloner le projet
cd /var/www
git clone https://github.com/jambostack/jambo-api.git
cd jambo-api

# 2. Installer les dépendances
composer install --no-dev --optimize-autoloader
npm ci && npm run build

# 3. Configurer l'environnement
cp .env.example .env
# Éditez .env avec votre base de données, mailer et APP_SECRET

# 4. Créer la base de données
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console app:setup

# 5. Définir les permissions
sudo chown -R www-data:www-data var/ public/uploads/
```

### Configuration Nginx

```nginx
server {
    listen 80;
    server_name api.exemple.com;
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

### Supervisor pour les workers

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
# Cloner et lancer
git clone https://github.com/jambostack/jambo-api.git
cd jambo-api
docker compose up -d

# Lancer la configuration dans le conteneur
docker compose exec app php bin/console app:setup
```

Le fichier `compose.yaml` inclus configure PHP-FPM, Nginx, MySQL et Meilisearch.

---

## Checklist de production

- [ ] Définir `APP_ENV=prod` et `APP_DEBUG=0`
- [ ] Générer un `APP_SECRET` robuste (`openssl rand -hex 32`)
- [ ] Configurer HTTPS (Let's Encrypt recommandé)
- [ ] Mettre en place des sauvegardes de base de données
- [ ] Activer OPcache dans `php.ini`
- [ ] Définir les permissions correctes (`var/`, `public/uploads/`)
- [ ] Configurer un DSN mailer réel (ne pas utiliser `null://` en production)
- [ ] Lancer `php bin/console cache:clear` après chaque déploiement
