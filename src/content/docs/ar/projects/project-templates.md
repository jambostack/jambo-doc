---
title: Project Templates
description: Use project templates to quickly scaffold common content structures in Jambo.
---

:::note
هذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.
:::


Project templates are pre-built schemas you can apply when creating a new project. They give you a ready-to-use collection structure without defining everything from scratch.

## Available templates

### Blog

- **Posts** — title, slug, richtext body, excerpt, featured image, author (relation → end_users), published_at
- **Categories** — name, slug, description
- **Tags** — name, slug

### E-commerce catalog

- **Products** — name, slug, description, price, images, category (relation), stock, status
- **Categories** — name, slug, image, parent (relation → categories)
- **Reviews** — rating, comment, product (relation), author (relation → end_users)

### Portfolio

- **Projects** — title, slug, description, cover image, gallery, tags, year, client
- **Services** — title, description, icon, price range
- **Testimonials** — author name, company, quote, avatar

### Landing page

- **Hero** _(singleton)_ — headline, subheadline, CTA text, CTA link, background image
- **Features** — title, description, icon, order
- **FAQ** — question, answer, category
- **Team members** — name, role, bio, avatar, linkedin_url

## Applying a template

1. Click **+ New Project**
2. Select **Start from a template**
3. Choose a template
4. Customize the name and slug
5. Click **Create**

The project is created with all collections and fields pre-configured. You can edit, add, or delete any collection or field after creation.

## Custom templates

Turn any existing project into a template via **Project Settings → General → Save as template**. It then appears in the picker for future projects.

## AI-generated schemas

For custom structures not covered by templates, use the [AI Studio](/studio/schema-builder/) to describe your needs in plain language and generate a tailored schema in seconds.
