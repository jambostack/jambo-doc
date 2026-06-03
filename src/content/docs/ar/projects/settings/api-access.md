---
title: API Access
description: Manage API tokens and public API settings for your project.
---

:::note
هذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.
:::


Go to **Project Settings → API Access** to manage how your frontend applications connect to Jambo.

## Project UUID

Your project UUID is the identifier used in every API request:

```
https://your-domain.com/api/{project-uuid}/collection-slug
```

Copy it from the top of this settings page.

## API tokens

API tokens authenticate your frontend applications. Each token can be scoped to specific operations.

### Creating a token

1. Click **+ New Token**
2. Enter a name (e.g. `Next.js frontend`, `Mobile app`)
3. Select the scopes:

| Scope | Allows |
|-------|--------|
| `read` | GET requests — list and retrieve entries |
| `write` | POST and PATCH — create and update entries |
| `delete` | DELETE requests |
| `admin` | Full management access (collections, fields, settings) |

4. Click **Create**
5. **Copy the token immediately** — it is shown only once

### Revoking a token

Click the trash icon next to a token to revoke it immediately. Any requests using that token will receive `401 Unauthorized`.

## Public API

When **Public API** is enabled, anonymous GET requests (without a token) can read `published` entries. This is useful for fully public content.

:::caution
Never enable the Public API for projects containing sensitive or private data.
:::

## OpenAPI spec

Every project auto-generates an OpenAPI 3.0 specification:

```
GET /api/{projectId}/openapi.json
```

Import it into Postman, Insomnia, or Swagger UI to explore all endpoints.
