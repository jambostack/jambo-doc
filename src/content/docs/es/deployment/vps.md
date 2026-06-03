---
title: Despliegue
description: Despliega Jambo API en producción.
---

## VPS (Nginx + PHP-FPM)

### Requisitos

- **Ubuntu 22.04+** o **Debian 12+**
- **PHP 8.4** con `php-fpm`, `php-cli` y extensiones requeridas
- **Nginx** (o Apache)
- **MySQL 8+** o **PostgreSQL 14+**
- **Node.js 18+** para compilar assets frontend
- **Composer**
- **Supervisor** (recomendado, para workers en segundo plano)

### Pasos

```bash
# 1. Clonar el proyecto
cd /var/www
git clone https://github.com/jambostack/jambo-api.git
cd jambo-api

# 2. Instalar dependencias
composer install --no-dev --optimize-autoloader
npm ci && npm run build

# 3. Configurar el entorno
cp .env.example .env
# Edita .env con tu base de datos, mailer y APP_SECRET

# 4. Crear la base de datos
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console app:setup

# 5. Establecer permisos
sudo chown -R www-data:www-data var/ public/uploads/
```

### Configuración Nginx

```nginx
server {
    listen 80;
    server_name api.ejemplo.com;
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

### Supervisor para workers

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
# Clonar y lanzar
git clone https://github.com/jambostack/jambo-api.git
cd jambo-api
docker compose up -d

# Ejecutar setup dentro del contenedor
docker compose exec app php bin/console app:setup
```

El archivo `compose.yaml` incluido configura PHP-FPM, Nginx, MySQL y Meilisearch.

---

## Checklist de producción

- [ ] Establecer `APP_ENV=prod` y `APP_DEBUG=0`
- [ ] Generar un `APP_SECRET` robusto (`openssl rand -hex 32`)
- [ ] Configurar HTTPS (Let's Encrypt recomendado)
- [ ] Establecer copias de seguridad de la base de datos
- [ ] Activar OPcache en `php.ini`
- [ ] Establecer permisos correctos (`var/`, `public/uploads/`)
- [ ] Configurar un DSN de correo real (no usar `null://` en producción)
- [ ] Ejecutar `php bin/console cache:clear` después de cada despliegue
