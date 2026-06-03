---
title: Creating Collections
description: How to create a new collection in Jambo.
---

## Via the admin panel

1. Open your project and go to **Settings → Collections**
2. Click **+ New Collection**
3. Fill in the details:

| Field | Description |
|-------|-------------|
| **Name** | Display name (e.g. `Posts`) |
| **Slug** | API identifier, auto-generated from name (e.g. `posts`) |
| **Description** | Optional, shown in the admin sidebar |
| **Singleton** | Toggle on if this collection should have exactly one entry |

4. Click **Create** — your collection is created and the API endpoints are live immediately

## Via AI Studio

Describe what you need in plain language and the AI generates the full schema:

```
/schema Create a blog with Posts (title, slug, richtext body, featured image, author relation to end_users, published_at date), and a Categories collection (name, slug, description)
```

Click **Apply Schema** to create all collections and fields at once.

## After creation

Your collection immediately has these REST endpoints:

```
GET    /api/{projectId}/posts       # list entries
GET    /api/{projectId}/posts/{uuid} # get one entry
POST   /api/{projectId}/posts       # create
PATCH  /api/{projectId}/posts/{uuid} # update
DELETE /api/{projectId}/posts/{uuid} # delete
```

Next, [add fields](/projects/collections/adding-fields/) to define what data each entry stores.
