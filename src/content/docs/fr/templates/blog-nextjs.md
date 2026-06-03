---
title: Blog NextJS
description: Un starter blog production-ready construit avec Next.js 15 et Jambo CMS.
---

Le template **Blog NextJS** est un blog prêt pour la production, construit avec Next.js 15 (App Router) et Jambo en tant que CMS headless. Il inclut une page d'accueil avec hero et cartes de fonctionnalités, une liste d'articles paginée, des pages d'article individuelles, le filtrage par catégorie et tag, un système de commentaires et une inscription à la newsletter.

## Contenu du template

- **Next.js 15** avec App Router et React Server Components
- **Tailwind CSS** + **Syne / DM Sans / JetBrains Mono** — typographie de la marque Jambo
- **Palette Jambo** — primaire émeraude, thèmes clair/sombre
- **Mode sombre** via `next-themes`
- **Système de commentaires** — les lecteurs peuvent commenter les articles
- **Newsletter** — formulaire d'inscription par email
- **Section hero** et **cartes de fonctionnalités** — page d'accueil entièrement pilotée par le CMS
- **Page À propos** — profil auteur avec liens sociaux
- **Pages CMS statiques** — mentions légales, confidentialité, etc.

## Démarrage rapide

### 1. Cloner le template

```bash
git clone https://github.com/jambostack/jambo-blog-nextjs
cd jambo-blog-nextjs
npm install
```

### 2. Importer le schéma dans Jambo

La méthode la plus rapide pour créer les 11 collections est d'importer le fichier de schéma fourni directement dans votre admin Jambo.

**Fichier :** `jambo-blog-nextjs-schema.zip` (inclus dans le dossier `data/` du template)

**Étapes :**

1. Connectez-vous à votre panneau d'administration Jambo
2. Sur le **Tableau de bord** (liste des projets), cliquez sur le bouton **Import** (icône ↑, en haut à droite)
3. Glissez-déposez ou sélectionnez `jambo-blog-nextjs-schema.zip`
4. Choisissez **Créer un nouveau projet**, donnez-lui un nom (ex. `Mon Blog`)
5. Cliquez sur **Importer** — les 11 collections sont créées instantanément

:::tip
Le fichier de schéma crée un nouveau projet vide avec exactement la structure attendue par le template. Aucune configuration manuelle n'est nécessaire.
:::

:::note
Si vous avez déjà un projet Jambo existant, choisissez **Fusionner avec un projet existant** et sélectionnez-le. Les collections existantes ne seront pas écrasées.
:::

### 3. Connecter le template à votre projet

Copiez `.env.local.example` vers `.env.local` :

```ini
JAMBOAPI_URL=https://votre-domaine-jambo.com/api/votre-project-uuid
JAMBOAPI_API_KEY=votre-token-api-lecture
JAMBOAPI_CREATE_KEY=votre-token-api-ecriture
JAMBOAPI_PROJECT_ID=votre-project-uuid
JAMBOAPI_IMAGE_HOST=votre-domaine-jambo.com
NEXT_PUBLIC_SITE_URL=https://votre-blog.com
```

Trouvez l'UUID et les tokens dans **Paramètres du projet → Accès API**.

### 4. Lancer en local

```bash
npm run dev
```

Ouvrez `http://localhost:3000`. Commencez par renseigner `settings` (titre du site), puis `hero-section`, puis vos premiers `posts`.

### 5. Déployer

```bash
vercel deploy
# ou
npm run build && npm start
```

---

## Schéma des collections

### `settings` *(singleton)*

`title` · `description` · `fav-icon` · `x` · `facebook` · `github` · `linkedin` · `instagram` · `google-analytics`

### `hero-section` *(singleton)*

`title` · `sub-text` · `read-articles` (boolean) · `browse-button` (boolean)

### `blog-features`

`title` · `sub-text` · `icon-name` · `order`

### `authors`

`name` · `about` · `avatar-seed`

### `categories` et `tags`

`title` · `slug`

### `posts`

`title` · `url` · `excerpt` · `content` · `featured` · `cover-image` → relations : `author`, `categories[]`, `tags[]`

### `comments`

`name` · `email` · `comment` → relation : `post`

### `about` *(singleton)*

`name` · `short-bio` · `about-section` · `image` · `x` · `facebook` · `github` · `linkedin` · `email`

### `pages`

`page-title` · `url` · `content`

### `newsletter`

`email`

---

## Webhook de revalidation

1. Dans **Paramètres du projet → Webhooks**, créez un webhook
2. URL : `https://votre-blog.com/api/revalidate?secret=VOTRE_SECRET`
3. Événements : `entry.published`, `entry.updated`, `entry.deleted`

## Code source

[github.com/jambostack/jambo-blog-nextjs](https://github.com/jambostack/jambo-blog-nextjs)
