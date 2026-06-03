---
title: Blog NextJS
description: Un template de blog production-ready construit avec Next.js et Jambo CMS.
---

Le template **Blog NextJS** est un blog prêt pour la production construit avec Next.js 15 (App Router) et Jambo comme CMS headless.

## Qué incluye

- **Next.js 15** avec App Router et React Server Components
- **Tailwind CSS** pour le style
- **Régénération statique incrémentale (ISR)** — les pages se mettent à jour automatiquement quand le contenu change dans Jambo
- **Flux RSS** auto-généré depuis les articles
- **Mode sombre**
- **SEO-ready** — balises Open Graph, sitemap, JSON-LD

## Inicio rápido

```bash
git clone https://github.com/jambostack/jambo-blog-nextjs
cd jambo-blog-nextjs
npm install
```

Copiez `.env.example` vers `.env.local` :

```ini
JAMBO_URL=https://votre-domaine-jambo.com
JAMBO_PROJECT_ID=votre-uuid-de-proyecto
JAMBO_API_TOKEN=votre-token-api
```

## Schéma Jambo requis

**Colección Articles** (`articles`) :
- `titre` — text, requis
- `slug` — slug, requis
- `extrait` — longtext
- `corps` — richtext
- `image_a_la_une` — media
- `categorie` — relation → `categories`
- `publie_le` — datetime

**Colección Catégories** (`categories`) :
- `nom` — text, requis
- `slug` — slug, requis

## Déployer

```bash
# Vercel
vercel deploy

# Build pour n'importe quel hébergeur
npm run build && npm start
```

## Code source

[github.com/jambostack/jambo-blog-nextjs](https://github.com/jambostack/jambo-blog-nextjs)
