---
title: Configuration
description: Configurez les variables d'environnement de Jambo API.
---

Copiez `.env.example` vers `.env` et remplissez les valeurs :

```ini
APP_ENV=prod
APP_SECRET=           # Chaîne aléatoire de 32 caractères : openssl rand -hex 32
APP_HOSTNAME=         # Votre domaine, ex. api.exemple.com

DATABASE_URL=         # mysql://user:pass@host/db?serverVersion=8.0.32&charset=utf8mb4

MAILER_DSN=           # smtp://user:pass@smtp.exemple.com:587
MEILISEARCH_HOST=     # http://localhost:7700
MEILISEARCH_KEY=      # Votre clé maître Meilisearch
```

## Fournisseurs IA

Les clés IA se configurent dans **Admin → Paramètres de l'app → onglet Fournisseurs IA**, pas via les variables d'environnement. Cela permet de mettre à jour les clés sans redéployer.
