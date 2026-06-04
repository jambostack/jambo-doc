---
title: Installation
description: Installez Jambo API sur votre serveur en quelques minutes.
---

## Prérequis

- **PHP 8.4+** avec les extensions : `ctype`, `iconv`, `sodium`
- **Composer**
- **MySQL 8+**, PostgreSQL 14+, ou SQLite
- **Node.js 18+** + npm (pour les assets frontend)
- Optionnel : **Meilisearch** (recherche plein texte), **Symfony CLI**

## Installer via Composer (recommandé)

```bash
composer create-project jambostack/jambo-api mon-projet
cd mon-projet
```

Cela crée un projet frais avec toutes les dépendances installées. Passez à l'étape configuration.

## Installer via Git

```bash
git clone https://github.com/jambostack/jambo-api.git
cd jambo-api

composer install --no-dev --optimize-autoloader
npm install && npm run build
```

## Configurer

```bash
cp .env.example .env
```

Éditez `.env` avec vos identifiants de base de données et paramètres d'application, puis lancez :

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console app:setup
```

La commande `app:setup` crée le compte administrateur et affiche les identifiants. Valeurs par défaut :

| Champ        | Valeur par défaut           |
|--------------|-----------------------------|
| Email        | `admin@jambostack.site`     |
| Mot de passe | `admin1234`                 |

Vous pouvez les personnaliser :

```bash
php bin/console app:setup --email="vous@exemple.com" --password="MotDePasseFort123"
```

:::caution
Changez le mot de passe immédiatement après la première connexion : avatar (en haut à droite) → **Paramètres → Sécurité**.
:::

## Vérifier

Démarrez le serveur local Symfony :

```bash
symfony serve -d
```

Ouvrez `https://localhost:8000` et connectez-vous. Votre API est prête sur `https://localhost:8000/api/{project-uuid}`.

## Étapes suivantes

- [Démarrage rapide](/fr/guides/quick-start/) — Créez votre première collection
- [Configuration](/fr/guides/configuration/) — Référence des variables d'environnement
- [Déploiement](/fr/guides/deployment/) — Guide de déploiement en production
