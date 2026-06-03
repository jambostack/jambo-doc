---
title: Blog NextJS
description: Un starter de blog listo para producción con Next.js 15 y Jambo CMS.
---

:::note
Esta página está disponible en inglés. La traducción al español está en preparación.
:::

El template **Blog NextJS** es un blog listo para producción construido con Next.js 15 y Jambo como CMS headless.

## Importar el esquema

El archivo `jambo-blog-nextjs-schema.zip` (en la carpeta `data/` del template) permite crear las 11 colecciones de un solo golpe:

1. En el **Dashboard** de Jambo, haga clic en el botón **Import** (ícono ↑)
2. Suba `jambo-blog-nextjs-schema.zip`
3. Elija **Crear nuevo proyecto** y haga clic en **Importar**

Para la documentación completa, consulte la [versión en inglés](/templates/blog-nextjs/) o la [versión en francés](/fr/templates/blog-nextjs/).

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
