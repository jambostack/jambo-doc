---
title: النشر
description: انشر Jambo API في بيئة الإنتاج.
---

## VPS (Nginx + PHP-FPM)

### المتطلبات

- **Ubuntu 22.04+** أو **Debian 12+**
- **PHP 8.4** مع `php-fpm` و `php-cli` والإضافات المطلوبة
- **Nginx** (أو Apache)
- **MySQL 8+** أو **PostgreSQL 14+**
- **Node.js 18+** لبناء أصول الواجهة الأمامية
- **Composer**
- **Supervisor** (موصى به، للعمليات الخلفية)

### الخطوات

```bash
# ١. استنساخ المشروع
cd /var/www
git clone https://github.com/jambostack/jambo-api.git
cd jambo-api

# ٢. تثبيت التبعيات
composer install --no-dev --optimize-autoloader
npm ci && npm run build

# ٣. إعداد البيئة
cp .env.example .env
# حرر .env بقاعدة البيانات والبريد و APP_SECRET

# ٤. إنشاء قاعدة البيانات
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console app:setup

# ٥. تعيين الصلاحيات
sudo chown -R www-data:www-data var/ public/uploads/
```

### إعداد Nginx

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

### Supervisor للعمليات الخلفية

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
# استنساخ وتشغيل
git clone https://github.com/jambostack/jambo-api.git
cd jambo-api
docker compose up -d

# تشغيل الإعداد داخل الحاوية
docker compose exec app php bin/console app:setup
```

ملف `compose.yaml` المضمن يقوم بإعداد PHP-FPM و Nginx و MySQL و Meilisearch.

---

## قائمة مراجعة الإنتاج

- [ ] تعيين `APP_ENV=prod` و `APP_DEBUG=0`
- [ ] إنشاء `APP_SECRET` قوي (`openssl rand -hex 32`)
- [ ] إعداد HTTPS (Let's Encrypt موصى به)
- [ ] إعداد نسخ احتياطية لقاعدة البيانات
- [ ] تفعيل OPcache في `php.ini`
- [ ] تعيين صلاحيات الملفات الصحيحة (`var/`، `public/uploads/`)
- [ ] إعداد DSN بريد حقيقي (لا تستخدم `null://` في الإنتاج)
- [ ] تشغيل `php bin/console cache:clear` بعد كل نشر
