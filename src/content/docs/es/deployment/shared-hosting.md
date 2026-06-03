---
title: Déployer sur hébergement mutualisé
description: Déployer Jambo sur un hébergement mutualisé avec cPanel ou DirectAdmin.
---

Jambo peut tourner sur un hébergement mutualisé si votre hébergeur fournit **PHP 8.4+** et un accès SSH.

## Requisitos previos

- PHP 8.4+ avec les extensions `ctype`, `iconv`, `sodium`, `pdo_mysql`
- MySQL 8+ ou PostgreSQL 14+
- Accès SSH (pour Composer et les migrations)
- Node.js 18+ (pour builder les assets frontend — faire en local puis uploader `public/build/`)

## Pasos de despliegue

### 1. Préparer en local

```bash
composer install --no-dev --optimize-autoloader
npm ci && npm run build
```

### 2. Uploader les archivos

Uploadez les archivos du proyecto dans un dossier parent de votre `public_html` :

```
~/
├── jambo/              ← archivos du proyecto
│   ├── src/
│   ├── vendor/
│   └── ...
└── public_html/        ← seulement le contenu de public/
    ├── index.php
    └── build/
```

### 3. Modifier index.php

Éditez `public_html/index.php` pour pointer vers le bon chemin :

```php
require_once dirname(__DIR__).'/jambo/vendor/autoload_runtime.php';
```

### 4. Configurer .env

```ini
APP_ENV=prod
APP_SECRET=votre-cle-secrete
DATABASE_URL="mysql://user:pass@localhost/dbname?serverVersion=8.0"
```

### 5. Exécuter les migrations via SSH

```bash
cd ~/jambo
php bin/console doctrine:migrations:migrate
php bin/console app:setup
php bin/console cache:warmup
```
