---
title: What are Collections?
description: Collections are the content types that define the structure of your data in Jambo.
---

:::note
هذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.
:::


A **collection** is a content type — it defines the structure (fields) for a group of related entries. Think of it as a database table, but without needing SQL.

## Examples

| Collection | Fields |
|------------|--------|
| `posts` | title, slug, body, author, featured_image, published_at |
| `products` | name, price, description, images, category |
| `team_members` | name, role, bio, avatar, linkedin_url |
| `settings` | site_title, logo, footer_text _(singleton)_ |

## Regular collections vs. singletons

**Regular collection** — can have multiple entries. Used for lists of items like blog posts, products, or team members.

**Singleton** — can have exactly one entry. Used for site-wide settings, a homepage hero section, or any unique piece of content.

## Auto-generated API

When you create a collection, Jambo automatically generates REST and GraphQL endpoints:

```
GET    /api/{projectId}/posts          # list all posts
GET    /api/{projectId}/posts/{uuid}   # get one post
POST   /api/{projectId}/posts          # create a post
PATCH  /api/{projectId}/posts/{uuid}   # update a post
DELETE /api/{projectId}/posts/{uuid}   # delete a post
```

No additional configuration needed.

## Field types

Collections are made up of fields. See [Field Types](/projects/collections/field-types/) for the full list of available field types.
