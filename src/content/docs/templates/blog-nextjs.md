---
title: Blog NextJS
description: A production-ready blog starter template built with Next.js 15 and Jambo CMS.
---

The **Blog NextJS** starter template is a production-ready blog built with Next.js 15 (App Router) and Jambo as the headless CMS backend. It includes a homepage with hero and feature sections, post listing with pagination, individual post pages, category and tag filtering, a comments system, and newsletter subscription.

## What's included

- **Next.js 15** with App Router and React Server Components
- **Tailwind CSS** + **Syne / DM Sans / JetBrains Mono** — Jambo brand typography
- **Jambo color palette** — emerald primary, dark/light themes
- **Dark mode** via `next-themes`
- **Comments system** — readers can post comments on articles
- **Newsletter** — email subscription form
- **Hero section** and **feature cards** — fully CMS-driven homepage
- **About page** — author profile with social links
- **Static CMS pages** — legal, privacy, etc.

## Getting started

### 1. Clone the template

```bash
git clone https://github.com/jambostack/jambo-blog-nextjs
cd jambo-blog-nextjs
npm install
```

### 2. Import the schema into Jambo

The fastest way to set up all 11 collections is to import the provided schema file directly into your Jambo admin.

**Download:** `jambo-blog-nextjs-schema.zip` (included in the `data/` folder of the template)

**Steps:**

1. Log in to your Jambo admin panel
2. On the **Dashboard** (projects list), click the **Import** button (↑ icon, top right)
3. Upload `jambo-blog-nextjs-schema.zip`
4. Choose **Create new project**, give it a name (e.g. `My Blog`)
5. Click **Import** — all 11 collections are created instantly

:::tip
The schema file creates a new empty project with the exact collection and field structure expected by the template. No manual configuration needed.
:::

:::note
If you already have an existing Jambo project, choose **Merge into existing project** and select it. Existing collections will not be overwritten.
:::

### 3. Connect the template to your project

Copy `.env.local.example` to `.env.local` and fill in your project details:

```ini
# Jambo CMS
JAMBOAPI_URL=https://your-jambo-domain.com/api/your-project-uuid
JAMBOAPI_API_KEY=your-read-api-token
JAMBOAPI_CREATE_KEY=your-write-api-token
JAMBOAPI_PROJECT_ID=your-project-uuid
JAMBOAPI_IMAGE_HOST=your-jambo-domain.com

# Site
NEXT_PUBLIC_SITE_URL=https://your-blog.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX   # optional
```

Find your project UUID and API tokens in **Project Settings → API Access**.

### 4. Run locally

```bash
npm run dev
```

Open `http://localhost:3000`. The homepage will be empty until you add content — start with `settings` (site title), then `hero-section`, then your first `posts`.

### 5. Deploy

```bash
# Vercel (recommended)
vercel deploy

# Any Node.js host
npm run build && npm start
```

---

## Collections schema

The template uses 11 collections. Below is the complete reference for manual setup or inspection.

### `settings` — Site configuration *(singleton)*

| Field | Slug | Type |
|-------|------|------|
| Title | `title` | text *(required)* |
| Description | `description` | longtext |
| Favicon | `fav-icon` | text |
| X (Twitter) | `x` | text |
| Facebook | `facebook` | text |
| GitHub | `github` | text |
| LinkedIn | `linkedin` | text |
| Instagram | `instagram` | text |
| Google Analytics | `google-analytics` | text |

### `hero-section` — Homepage hero *(singleton)*

| Field | Slug | Type |
|-------|------|------|
| Title | `title` | text *(required)* |
| Sub Text | `sub-text` | longtext |
| Read Articles button | `read-articles` | boolean |
| Browse button | `browse-button` | boolean |

### `blog-features` — Homepage feature cards

| Field | Slug | Type |
|-------|------|------|
| Title | `title` | text *(required)* |
| Sub Text | `sub-text` | longtext |
| Icon Name | `icon-name` | text |
| Order | `order` | number |

### `authors`

| Field | Slug | Type |
|-------|------|------|
| Name | `name` | text *(required)* |
| Bio | `about` | longtext |
| Avatar Seed | `avatar-seed` | text |

### `categories` and `tags`

Both follow the same structure:

| Field | Slug | Type |
|-------|------|------|
| Title | `title` | text *(required)* |
| Slug | `slug` | slug *(required)* |

### `posts`

| Field | Slug | Type |
|-------|------|------|
| Title | `title` | text *(required)* |
| URL | `url` | slug *(required)* |
| Excerpt | `excerpt` | longtext |
| Content | `content` | richtext |
| Featured | `featured` | boolean |
| Cover Image | `cover-image` | media |
| Author | `author` | relation → `authors` |
| Categories | `categories` | relation (multiple) → `categories` |
| Tags | `tags` | relation (multiple) → `tags` |

### `comments`

| Field | Slug | Type |
|-------|------|------|
| Name | `name` | text *(required)* |
| Email | `email` | text *(required)* |
| Comment | `comment` | longtext *(required)* |
| Post | `post` | relation → `posts` |

### `about` — About page *(singleton)*

| Field | Slug | Type |
|-------|------|------|
| Name | `name` | text *(required)* |
| Short Bio | `short-bio` | longtext |
| About Section | `about-section` | richtext |
| Image | `image` | media |
| X (Twitter) | `x` | text |
| Facebook | `facebook` | text |
| GitHub | `github` | text |
| LinkedIn | `linkedin` | text |
| Email | `email` | text |

### `pages` — Static CMS pages

| Field | Slug | Type |
|-------|------|------|
| Page Title | `page-title` | text *(required)* |
| URL | `url` | slug *(required)* |
| Content | `content` | richtext |

### `newsletter` — Subscribers

| Field | Slug | Type |
|-------|------|------|
| Email | `email` | text *(required)* |

---

## Revalidation webhook

Set up a Jambo webhook to automatically revalidate pages when content changes:

1. In **Project Settings → Webhooks**, create a new webhook
2. URL: `https://your-blog.com/api/revalidate?secret=YOUR_SECRET`
3. Events: `entry.published`, `entry.updated`, `entry.deleted`

Add `REVALIDATE_SECRET=YOUR_SECRET` to your `.env.local`.

## Source code

[github.com/jambostack/jambo-blog-nextjs](https://github.com/jambostack/jambo-blog-nextjs)
