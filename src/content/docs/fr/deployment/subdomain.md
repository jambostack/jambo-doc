---
title: Sous-domaine (hébergement mutualisé)
description: Configurer un sous-domaine pour servir votre API Jambo sur hébergement mutualisé.
---

Si votre site principal est sur `exemple.com` et que vous souhaitez que Jambo tourne sur `api.exemple.com`, configurez un sous-domaine pointant vers l'installation Jambo.

## Étape 1 — Créer le sous-domaine

Dans votre panneau d'hébergement (cPanel / DirectAdmin / Plesk) :

1. Allez dans **Sous-domaines** ou **Gestion des domaines**
2. Créez un nouveau sous-domaine : `api.exemple.com`
3. Définissez la racine du document comme le dossier `public/` de Jambo

## Étape 2 — Pointer vers public/

Définissez la racine du document du sous-domaine sur :

```
/home/utilisateur/jambo/public
```

Si votre hébergeur ne permet pas de racines personnalisées, placez le contenu de `public/` dans `public_html/` et mettez à jour `public_html/index.php` :

```php
require_once dirname(__DIR__) . '/jambo/vendor/autoload_runtime.php';
```

## Étape 3 — Configurer APP_HOSTNAME

```ini
APP_HOSTNAME=api.exemple.com
DEFAULT_URI=https://api.exemple.com
```

## Étape 4 — Certificat SSL

Activez Let's Encrypt pour votre sous-domaine depuis la section **SSL/TLS** de votre panneau.

## Étape 5 — Lancer les migrations via SSH

```bash
cd ~/jambo
php bin/console doctrine:migrations:migrate
php bin/console app:setup
php bin/console cache:warmup
```
