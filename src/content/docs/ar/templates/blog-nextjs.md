---
title: Blog NextJS
description: قالب مدونة جاهز للإنتاج مبني على Next.js 15 و Jambo CMS.
---

:::note
هذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.
:::

قالب **Blog NextJS** هو مدونة جاهزة للإنتاج مبنية على Next.js 15 مع Jambo كـ CMS بدون رأس.

## استيراد مخطط المجموعات

يتضمن القالب ملف `jambo-blog-nextjs-schema.zip` (في مجلد `data/`) لإنشاء جميع المجموعات الـ 11 دفعة واحدة:

1. في **لوحة التحكم** الخاصة بـ Jambo، انقر على زر **Import** (أيقونة ↑)
2. ارفع الملف `jambo-blog-nextjs-schema.zip`
3. اختر **إنشاء مشروع جديد** وانقر على **استيراد**

للتوثيق الكامل، راجع [النسخة الإنجليزية](/templates/blog-nextjs/) أو [النسخة الفرنسية](/fr/templates/blog-nextjs/).

:::note
هذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.
:::


The **Blog NextJS** starter template is a production-ready blog built with Next.js 15 (App Router) and Jambo as the headless CMS backend. It includes a homepage, post listing, individual post pages, and category filtering.

## What's included

- **Next.js 15** with App Router and React Server Components
- **Tailwind CSS** for styling
- **Incremental Static Regeneration (ISR)** — pages update automatically when content changes in Jambo
- **RSS feed** auto-generated from posts
- **Dark mode** support
- **SEO-ready** — Open Graph tags, sitemap, JSON-LD structured data

## Getting started

### 1. Clone the template

```bash
git clone https://github.com/jambostack/jambo-blog-nextjs
cd jambo-blog-nextjs
npm install
```

### 2. Connect to your Jambo project

Copy `.env.example` to `.env.local` and fill in your project details:

```ini
JAMBO_URL=https://your-jambo-domain.com
JAMBO_PROJECT_ID=your-project-uuid
JAMBO_API_TOKEN=your-api-token
```

### 3. Set up the schema

In your Jambo project, create these collections (or use AI Studio to generate them):

**Posts collection** (`posts`):
- `title` — text, required
- `slug` — slug, required
- `excerpt` — longtext
- `body` — richtext
- `featured_image` — media
- `category` — relation → `categories`
- `published_at` — datetime

**Categories collection** (`categories`):
- `name` — text, required
- `slug` — slug, required

### 4. Run locally

```bash
npm run dev
```

Open `http://localhost:3000` to see the blog.

### 5. Deploy

The template is ready to deploy on Vercel, Netlify, or any Node.js host:

```bash
# Vercel
vercel deploy

# Build for any host
npm run build && npm start
```

## Revalidation webhook

Set up a Jambo webhook to automatically rebuild pages when you publish or update posts:

1. In **Project Settings → Webhooks**, create a new webhook
2. URL: `https://your-blog.com/api/revalidate?secret=YOUR_SECRET`
3. Events: `entry.published`, `entry.updated`, `entry.deleted`

The template includes a revalidation endpoint at `app/api/revalidate/route.js`.

## Source code

[github.com/jambostack/jambo-blog-nextjs](https://github.com/jambostack/jambo-blog-nextjs)
