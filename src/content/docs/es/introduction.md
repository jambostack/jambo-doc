---
title: Introducción
description: Jambo est un CMS headless open-source construit avec Symfony 8 et PHP 8.4 — rapide, orienté développeurs et natif IA.
---

Jambo est un **CMS headless** open-source construit avec Symfony 8 et PHP 8.4. Il expose votre contenu via une API REST et un endpoint GraphQL, avec des outils IA intégrés pour concevoir des schémas, générer du contenu et traduire des entradas automatiquement.

## Características principales

- **API REST & GraphQL** — générées automatiquement depuis vos coleccións, avec filtres, pagination et support multi-idioma
- **AI Studio** — constructeur de schéma par chat, propulsé par n'importe quel LLM (OpenAI, Anthropic, Gemini, DeepSeek, Ollama)
- **Agent IA** — opérations en masse : créer des coleccións, générer des entradas, uploader des images en un seul prompt
- **Multi-idioma** — gestion de la idioma par entrada avec outils de traduction
- **Serveur MCP** — exposer votre proyecto comme serveur MCP pour les agents IA
- **Biblioteca de medios** — upload de archivos, transformations d'images, stockage compatible S3
- **Rols & permissions** — control d'accès granulaire pour les équipes et les clients API
- **Webhooks** — notifications push sur les événements de contenu
- **Auth end-user** — authentification JWT intégrée pour vos usuarios finaux

## Arquitectura

```
Votre frontend / app mobile
        │
        ▼
API REST  /api/{projectId}/{colección}
GraphQL   /api/projects/{projectId}/graphql
Archivos  /api/{projectId}/files
        │
        ▼
   Jambo CMS (Symfony + PHP 8.4)
        │
        ▼
Base de données (MySQL / PostgreSQL / SQLite)
```

Jambo est **headless** — il ne sert que des données JSON. Votre frontend peut être n'importe quel framework : Next.js, Nuxt, Astro, applications mobiles ou générateur de site statique.

## Inicio rápido

1. [Installez Jambo](/es/installation/) sur votre serveur ou en local
2. Créez un proyecto et votre première colección via l'interface d'administration
3. Récupérez votre contenu depuis l'API :

```bash
curl https://votre-domaine.com/api/{project-uuid}/articles
```

## Comunidad

- **GitHub** — [github.com/jambostack/jambo-api](https://github.com/jambostack/jambo-api)
- **Issues & demandes de fonctionnalités** — ouvrez une issue sur GitHub
