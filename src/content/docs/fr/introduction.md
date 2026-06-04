---
title: Introduction
description: Jambo est un CMS headless open-source construit avec Symfony 8 et PHP 8.4 — rapide, orienté développeurs et natif IA.
---

Jambo est un **CMS headless** open-source construit avec Symfony 8 et PHP 8.4. Il expose votre contenu via une API REST et un endpoint GraphQL, avec des outils IA intégrés pour concevoir des schémas, générer du contenu et traduire des entrées automatiquement.

:::tip[Démo en ligne disponible]
Explorez Jambo sans rien installer — une démo hébergée tourne sur **[demo.jambostack.site](https://demo.jambostack.site)**.

Connectez-vous avec `demo@demo.jambostack.site` / `demo1234` (Basic Auth d'abord : `demo` / `jambo2026`).
:::

## Fonctionnalités clés

- **API REST & GraphQL** — générées automatiquement depuis vos collections, avec filtres, pagination et support multi-locale
- **AI Studio** — constructeur de schéma par chat, propulsé par n'importe quel LLM (OpenAI, Anthropic, Gemini, DeepSeek, Ollama)
- **Agent IA** — opérations en masse : créer des collections, générer des entrées, uploader des images en un seul prompt
- **Multi-locale** — gestion de la locale par entrée avec outils de traduction
- **Serveur MCP** — exposer votre projet comme serveur MCP pour les agents IA
- **Médiathèque** — upload de fichiers, transformations d'images, stockage compatible S3
- **Rôles & permissions** — contrôle d'accès granulaire pour les équipes et les clients API
- **Webhooks** — notifications push sur les événements de contenu
- **Auth end-user** — authentification JWT intégrée pour vos utilisateurs finaux

## Architecture

```
Votre frontend / app mobile
        │
        ▼
API REST  /api/{projectId}/{collection}
GraphQL   /api/projects/{projectId}/graphql
Fichiers  /api/{projectId}/files
        │
        ▼
   Jambo CMS (Symfony + PHP 8.4)
        │
        ▼
Base de données (MySQL / PostgreSQL / SQLite)
```

Jambo est **headless** — il ne sert que des données JSON. Votre frontend peut être n'importe quel framework : Next.js, Nuxt, Astro, applications mobiles ou générateur de site statique.

## Démarrage rapide

1. [Installez Jambo](/fr/installation/) sur votre serveur ou en local
2. Créez un projet et votre première collection via l'interface d'administration
3. Récupérez votre contenu depuis l'API :

```bash
curl https://votre-domaine.com/api/{project-uuid}/articles
```

## Communauté

- **GitHub** — [github.com/jambostack/jambo-api](https://github.com/jambostack/jambo-api)
- **Issues & demandes de fonctionnalités** — ouvrez une issue sur GitHub
