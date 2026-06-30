---
title: Admin API
description: Complete reference of the Jambo Admin API — projects, collections, fields, import CSV, and Personal Access Tokens.
---

The Admin API provides full CRUD operations for managing projects, collections, fields, and performing bulk imports. It requires a **Personal Access Token** obtained from the admin UI (Settings → Personal Access Tokens).

**Base URL:** `/admin-api`

**Authentication:** `Authorization: Bearer *** | Scope | Description |
|------------|-------------|----------|
| `projects:write` | `POST`/`PATCH`/`DELETE` | Project management |
| `schema:write` | `POST`/`PATCH`/`DELETE` | Collections & fields |
| `content:write` | `POST`/`PATCH`/`DELETE` | Content entries (incl. bulk import) |
| `content:read` | `GET` | Read-only access |

> If a request tries to write without the required scope, the API returns **403 Missing scope**.

---

## Projects

### List Projects

```http
GET /admin-api/projects
```

**Response:**
```json
{
  "data": [
    {
      "uuid": "a8ba18b8-3002-4c53-93ea-2e0c76ded4ba",
      "name": "My Project",
      "defaultLocale": "en",
      "locales": ["en", "fr"],
      "publicApi": true
    }
  ]
}
```

### Create Project

```http
POST /admin-api/projects
Authorization: Bearer ***on: application/json

{
  "name": "My Project",
  "defaultLocale": "fr",
  "locales": ["fr", "en"]
}
```

**Required scope:** `projects:write`

### Get Project

```http
GET /admin-api/projects/{uuid}
```

### Update Project

```http
PATCH /admin-api/projects/{uuid}
Authorization: Bearer <token...on: application/json

{
  "name": "New Name",
  "publicApi": true
}
```

### Delete Project

```http
DELETE /admin-api/projects/{uuid}
Authorization: Bearer <token...>

---

## Collections

Base: `/admin-api/projects/{uuid}/collections`

### List Collections

```http
GET /admin-api/projects/{uuid}/collections
```

### Create Collection

```http
POST /admin-api/projects/{uuid}/collections
Authorization: Bearer <token...on: application/json

{
  "name": "Articles",
  "isSingleton": false
}
```

**Required scope:** `schema:write`

### Get Collection

```http
GET /admin-api/projects/{uuid}/collections/{slug}
```

Returns the collection **with its fields**.

### Update Collection

```http
PATCH /admin-api/projects/{uuid}/collections/{slug}
Authorization: Bearer <token...>

### Delete Collection

```http
DELETE /admin-api/projects/{uuid}/collections/{slug}
Authorization: Bearer <token...>

---

## Fields

Base: `/admin-api/projects/{uuid}/collections/{slug}/fields`

### List Fields

```http
GET /admin-api/projects/{uuid}/collections/{slug}/fields
```

### Create Field

```http
POST /admin-api/projects/{uuid}/collections/{slug}/fields
Authorization: Bearer <token...on: application/json

{
  "name": "Title",
  "slug": "title",
  "type": "text",
  "is_required": true
}
```

**Field types:** `text`, `number`, `boolean`, `media`, `relation`, `textarea`, `email`, `url`, `color`, `date`, `json`

**Required scope:** `schema:write`

### Update Field

```http
PATCH /admin-api/projects/{uuid}/collections/{slug}/fields/{fieldSlug}
Authorization: Bearer <token...>

### Delete Field

```http
DELETE /admin-api/projects/{uuid}/collections/{slug}/fields/{fieldSlug}
Authorization: Bearer <token...>

---

## Bulk Import CSV

Imports multiple entries into a collection at once using a JSON array and a field mapping.

```http
POST /admin-api/projects/{uuid}/collections/{slug}/import-csv
Authorization: Bearer <token...on: application/json

{
  "data": [
    { "Nom": "Dupont SARL", "Ville": "Paris", "Email": "contact@dupont.fr" },
    { "Nom": "Martin SAS", "Ville": "Lyon", "Email": "info@martin.fr" }
  ],
  "field_mapping": {
    "Nom": "entreprise",
    "Ville": "ville",
    "Email": "email"
  },
  "locale": "fr",
  "status": "draft"
}
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `data` | `array` | ✅ | Array of objects with the rows to import |
| `field_mapping` | `object` | ✅ | Maps CSV column names → field slugs |
| `locale` | `string` | ❌ | Locale for entries (default: project default) |
| `status` | `string` | ❌ | Entry status: `draft` or `published` (default: `draft`) |
| `slug_field` | `string` | ❌ | Column to use for generating the slug |

**Required scope:** `content:write`

**Response:**
```json
{
  "data": {
    "created": 50,
    "errors": [],
    "total": 50
  }
}
```

**Slug auto-generation:** If no `slug_field` is provided, the slug is generated from the first non-empty field value. It is truncated to 50 characters and lowercase.

---

## Personal Access Tokens

Base: `/api/settings/tokens`

### List Tokens

```http
GET /api/settings/tokens
```

### Create Token

```http
POST /api/settings/tokens
Content-Type: application/json

{
  "name": "CI/CD Pipeline",
  "scopes": ["schema:write", "projects:write"]
}
```

The plain token value is returned **only once** in the response. Store it securely!

### Update Token

```http
PATCH /api/settings/tokens/{id}
Content-Type: application/json

{
  "name": "New Name",
  "scopes": ["schema:write"]
}
```

### Revoke Token

```http
DELETE /api/settings/tokens/{id}
```

---

## OpenAPI Spec

The full Admin API specification is available in OpenAPI 3.0.3 format:

```http
GET /api/settings/admin-api/openapi.json
```

You can load this URL into Swagger UI, Postman, or any OpenAPI-compatible client.
