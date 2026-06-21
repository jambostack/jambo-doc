---
title: REST API
description: Complete reference of all REST API endpoints for content, collections, assets, end-users, projects, and utility routes.
---

The JamboApi CMS REST API provides programmatic access to all CMS features. Endpoints are organized by resource type and authentication method.

## Base URLs

| Scope | Base URL |
|-------|----------|
| Public Content API | `/api/{projectId}` |
| Public Schema API | `/public-api` |
| Admin API | `/api/projects/{uuid}` |
| File API | `/api/{projectId}/files` |
| End-User Auth | `/api/{projectId}/auth` |

> `{projectId}` and `{uuid}` must be valid UUIDs (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).

---

## Content Entries

Base: `/api/{projectId}/{collectionSlug}`

### List Entries

```
GET /api/{projectId}/{collectionSlug}
```

Lists all entries in a collection with filtering and pagination.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | int | 1 | Page number |
| `per_page` | int | 15 | Items per page (max 100) |
| `status` | string | `published` | Workflow status filter |
| `locale` | string | project default | Locale code |

**Response:** Paginated list of entries with EAV field values.

**Auth:** Public (if project has `publicApi = true`).

### Get Entry

```
GET /api/{projectId}/{collectionSlug}/{uuid}
```

Returns a single entry by its UUID with all field values.

**Auth:** Public (if project has `publicApi = true`).

### Create Entry

```
POST /api/{projectId}/{collectionSlug}
```

Creates a new entry in the collection.

**Request Body:** JSON object with field values keyed by field slug.

```json
{
  "title": "Hello World",
  "body": "Content body text",
  "status": "draft",
  "locale": "en"
}
```

**Auth:** ApiToken with `create` ability.

### Update Entry

```
PUT|PATCH /api/{projectId}/{collectionSlug}/{uuid}
```

Partially updates an existing entry. Only the provided fields are modified.

**Auth:** ApiToken with `create` ability.

### Delete Entry

```
DELETE /api/{projectId}/{collectionSlug}/{uuid}
```

Soft-deletes an entry. The entry is marked with a `deletedAt` timestamp and excluded from default queries.

**Auth:** ApiToken with `delete` ability.

---

## Collections

Base: `/public-api/collections`

### List Collections

```
GET /public-api/collections
```

Returns all collections for the authenticated project.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | int | 1 | Page number |
| `per_page` | int | 50 | Items per page (max 200) |

**Auth:** ApiToken.

### Get Collection

```
GET /public-api/collections/{slug}
```

Returns a single collection with full field details, including options and workflow configuration.

**Auth:** ApiToken.

---

## Project Schema

### Get Project Schema

```
GET /public-api
```

Returns the full project schema, including project info and all collections with their fields.

**Response:**

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "name": "My Project",
  "defaultLocale": "en",
  "locales": ["en", "fr", "es"],
  "collections": [
    {
      "name": "Articles",
      "slug": "articles",
      "fields": [
        { "name": "Title", "slug": "title", "type": "text", "isRequired": true }
      ]
    }
  ]
}
```

**Auth:** ApiToken.

---

## Files / Assets

Base: `/api/{projectId}/files`

### List Files

```
GET /api/{projectId}/files
```

Lists all media files in the project.

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | int | 1 | Page number |
| `per_page` | int | 20 | Items per page (max 100) |

**Auth:** Public (if `publicApi = true`) or ApiToken.

### Upload File

```
POST /api/{projectId}/files
```

Uploads a new media file. Maximum file size is **10 MB**.

**Request:** Multipart form data with the file.

**Auth:** Session user (admin) or ApiToken.

**Response:**

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "fileName": "photo.webp",
  "originalName": "photo.jpg",
  "mimeType": "image/webp",
  "fileSize": 123456,
  "url": "https://cdn.jamboapi.test/uploads/project-uuid/photo.webp",
  "alt": null,
  "caption": null,
  "width": 1920,
  "height": 1080,
  "createdAt": "2026-06-20T10:00:00+00:00"
}
```

### Get File

```
GET /api/{projectId}/files/{identifier}
```

Returns file metadata by identifier (UUID or filename).

**Auth:** Public (if `publicApi = true`).

### Delete File

```
DELETE /api/{projectId}/files/{uuid}
```

Deletes a media file.

**Auth:** ApiToken with `delete` ability.

---

## End-User Authentication

Base: `/api/{projectId}/auth`

### Register

```
POST /api/{projectId}/auth/register
```

Creates a new end-user account.

### Login

```
POST /api/{projectId}/auth/login
```

Authenticates an end-user and returns JWT tokens.

**Response:**

```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "expires_in": 900
}
```

### Refresh Token

```
POST /api/{projectId}/auth/refresh
```

Exchanges a refresh token for a new access token.

### Get Current User

```
GET /api/{projectId}/auth/me
```

Returns the authenticated end-user's profile.

**Auth:** EndUser JWT.

### Update Current User

```
PATCH /api/{projectId}/auth/me
```

Updates the authenticated end-user's profile.

**Auth:** EndUser JWT.

### Logout

```
POST /api/{projectId}/auth/logout
```

Invalidates the current session.

**Auth:** EndUser JWT.

### Forgot Password

```
POST /api/{projectId}/auth/forgot-password
```

Sends a password reset email.

### Reset Password

```
POST /api/{projectId}/auth/reset-password
```

Resets the password using a reset token.

### Social Login

```
POST /api/{projectId}/auth/social/{provider}
```

Authenticates via OAuth provider. Supported providers: `google`, `microsoft`, `github`, `gitlab`.

### Verify 2FA

```
POST /api/{projectId}/auth/verify-2fa
```

Verifies a two-factor authentication code (TOTP, email code, or backup code).

---

## End-User Admin

Base: `/api/projects/{uuid}/end-users`

### List End-Users

```
GET /api/projects/{uuid}/end-users
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter: `active`, `banned`, or `pending` |
| `search` | string | LIKE search on email and name |
| `uuids[]` | array | Direct UUID lookup (max 100) |
| `page` | int | Page number |
| `per_page` | int | Items per page (max 100) |

### Get End-User

```
GET /api/projects/{uuid}/end-users/{endUserUuid}
```

### Create End-User

```
POST /api/projects/{uuid}/end-users
```

### Update End-User

```
PATCH /api/projects/{uuid}/end-users/{endUserUuid}
```

### Delete End-User

```
DELETE /api/projects/{uuid}/end-users/{endUserUuid}
```

### Update End-User Status

```
PATCH /api/projects/{uuid}/end-users/{endUserUuid}/status
```

---

## End-User Custom Fields Schema

Base: `/api/projects/{uuid}/end-users/fields`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/projects/{uuid}/end-users/fields` | List custom fields |
| POST | `/api/projects/{uuid}/end-users/fields` | Create custom field |
| POST | `/api/projects/{uuid}/end-users/fields/reorder` | Reorder fields |
| PUT/PATCH | `/api/projects/{uuid}/end-users/fields/{slug}` | Update custom field |
| DELETE | `/api/projects/{uuid}/end-users/fields/{slug}` | Delete custom field |

Requires `manage` permission for write operations.

---

## Project Import / Export

Base: `/api/projects`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/projects/{uuid}/export` | Export project as ZIP |
| GET | `/api/projects/{uuid}/export/preview` | Preview export contents |
| POST | `/api/projects/import` | Import as new project |
| POST | `/api/projects/import/preview` | Preview import |
| POST | `/api/projects/{uuid}/import/merge` | Merge import into existing project |

**Export Query Parameters:** `structure`, `content`, `media`, `end_users` (booleans) control what is included.

---

## Utilities

### OpenAPI Specification

```
GET /api/{projectId}/openapi.json
```

Returns a dynamic OpenAPI 3.0.3 specification generated from the project's collections and fields. Supports ETag-based caching (`Cache-Control: private, max-age=60`).

### CAPTCHA

```
GET /api/{projectUuid}/captcha
```

Generates a CAPTCHA image. Returns a token and base64-encoded image. The token is valid for 5 minutes.

### Email (Public)

```
POST /api/{projectUuid}/email
```

Sends an email from a public form. Requires valid CAPTCHA. Includes a honeypot field (`website`) to prevent bot submissions.

Rate limited to 3 requests per 60 seconds per IP.

### Email (Admin)

```
POST /api/admin/projects/{uuid}/email
```

Sends an email as an admin. Supports `to`, `cc`, `bcc`, `replyTo`, `attachments` (base64-encoded), and `htmlBody`.

Rate limited to 30 requests per 60 seconds per project.

---

## Authentication by Endpoint

| Endpoint Group | Auth Method |
|----------------|-------------|
| `/public-api/*` | ApiToken |
| `/api/{projectId}/{collectionSlug}*` | Public (if `publicApi`) or ApiToken |
| `/api/{projectId}/files/*` | Public or ApiToken or Session |
| `/api/{projectId}/auth/register\|login\|forgot-password\|reset-password` | Public |
| `/api/{projectId}/auth/me\|logout\|refresh` | EndUser JWT |
| `/api/{projectId}/auth/social/*` | Public (OAuth flow) |
| `/api/projects/{uuid}/end-users*` | ApiToken or Session |
| `/api/projects/{uuid}/export*\|import*` | Session |
| `/api/{projectId}/openapi.json` | Session or ApiToken |
| `/mcp` | Session or ApiToken |
| `/api/projects/{uuid}/mcp` | Public (via route) |
