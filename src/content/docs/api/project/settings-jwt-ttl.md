---
title: Configure JWT Token TTL
description: Set custom JWT access and refresh token expiration times per project.
---

Each Jambo project can override the default JWT token expiration times. This is useful when different projects have different security requirements (e.g., a banking app wants 5-minute tokens, while a blog can use 1-hour tokens).

```http
GET    /api/projects/{projectUuid}/settings/jwt-ttl
PATCH  /api/projects/{projectUuid}/settings/jwt-ttl
```

## Authentication

Requires either:
- A valid **admin session** (cookie-based, for the admin UI)
- An **API token** with the `create` ability

```bash
Authorization: Bearer YOUR_API_TOKEN
```

---

## GET — Read JWT TTL Settings

```bash
curl https://your-domain.com/api/projects/{projectUuid}/settings/jwt-ttl \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

### Response

```json
{
  "jwt_access_ttl": 900,
  "jwt_refresh_ttl": null,
  "defaults": {
    "access_ttl": 900,
    "refresh_ttl": 2592000
  }
}
```

- `jwt_access_ttl` — Current access token TTL in seconds. `null` means "use default" (900s = 15 min).
- `jwt_refresh_ttl` — Current refresh token TTL in seconds. `null` means "use default" (2592000s = 30 days).
- `defaults` — The default values used when the project-level setting is `null`.

---

## PATCH — Update JWT TTL Settings

```bash
curl -X PATCH https://your-domain.com/api/projects/{projectUuid}/settings/jwt-ttl \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "jwt_access_ttl": 300,
    "jwt_refresh_ttl": 604800
  }'
```

### Request body

| Field | Type | Description |
|-------|------|-------------|
| `jwt_access_ttl` | `integer` or `null` | Access token lifetime in seconds. Minimum: `60`. Set to `0` or `null` to reset to default (900s). |
| `jwt_refresh_ttl` | `integer` or `null` | Refresh token lifetime in seconds. Minimum: `60`. Set to `0` or `null` to reset to default (2592000s). |

### Examples

**5-minute access tokens (high security):**
```json
{ "jwt_access_ttl": 300 }
```

**1-hour access tokens (convenience):**
```json
{ "jwt_access_ttl": 3600 }
```

**15-min access + 7-day refresh:**
```json
{ "jwt_access_ttl": 900, "jwt_refresh_ttl": 604800 }
```

**Reset to defaults:**
```json
{ "jwt_access_ttl": 0, "jwt_refresh_ttl": 0 }
```

### Response

```json
{
  "jwt_access_ttl": 300,
  "jwt_refresh_ttl": 604800
}
```

## Status codes

| Status | Description |
|--------|-------------|
| `200` | Configuration read or updated successfully |
| `403` | Access denied |
| `404` | Project not found |
| `422` | TTL value less than 60 seconds |

## How it works

When a user authenticates via `POST /api/{projectId}/auth/login`, the JWT service reads the project's TTL settings:

- If `jwtAccessTtl` is set on the project entity, that value is used for the `exp` claim of the access token.
- If `jwtAccessTtl` is `null`, the default of **900 seconds (15 minutes)** is used.
- The same logic applies to refresh tokens (default: **2,592,000 seconds = 30 days**).

This means changing the TTL only affects **new tokens** issued after the change. Existing tokens retain their original expiration time.
