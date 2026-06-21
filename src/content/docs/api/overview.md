---
title: Overview
description: Authentication, pagination, filtering, error codes, and rate limiting for the JamboApi CMS REST & GraphQL APIs.
---

The JamboApi CMS exposes two API surfaces: a **RESTful API** for CRUD operations on content, collections, assets, and end-users, and a **GraphQL API** for flexible, schema-driven content queries with subscription support. This document covers the shared conventions: authentication, pagination, error handling, and rate limiting.

## Authentication

The API supports two authentication mechanisms depending on the endpoint and use case.

### Bearer Token (API Token)

Most REST endpoints and the MCP endpoint authenticate via a **Bearer token** sent in the `Authorization` header:

```
Authorization: Bearer token
```

Tokens are 64-character hex strings generated in the Studio (Settings > API Access). Each token carries a set of **abilities** that control what operations it can perform:

| Ability | Allowed Operations |
|---------|-------------------|
| `read` | GET requests (listing and reading entries) |
| `create` | POST, PUT, PATCH requests |
| `delete` | DELETE requests |
| `write` | Legacy shorthand for `create` |
| `manage` | Administrative operations (schema changes, user management) |

Tokens can also have an optional expiration date. Expired tokens are rejected with a `401 Unauthorized` response.

**How it works (v2):** The plain-text token is hashed with HMAC-SHA256 using the application secret and stored in the database. On each request, the `ApiTokenChecker` service hashes the incoming token and looks up the match. Legacy v1 tokens (SHA-256 only) are auto-upgraded to v2 on first use.

### JWT (End-User Auth)

End-user authentication uses **JWT** (JSON Web Tokens) signed with HMAC-SHA256 via the `lcobucci/jwt` library. This is used for the `/api/{projectId}/auth/*` endpoints.

- **Access token TTL:** 15 minutes (configurable per project via `jwtAccessTtl`)
- **Refresh token TTL:** 30 days (configurable per project via `jwtRefreshTtl`)
- **Maximum TTL:** 365 days (hard ceiling)
- **Leeway:** 30 seconds (clock skew tolerance)

JWT claims include: `euid` (end-user UUID), `pid` (project UUID), `tkn` (token version), `iat`, `exp`, `iss` (`jamboapi`), `jti` (unique identifier).

The refresh endpoint (`POST /api/{projectId}/auth/refresh`) accepts a refresh token and returns a new access token. Refresh tokens themselves cannot be used to access the API.

### Session Auth (Admin)

Administrators and project members authenticate through the Studio web interface via Symfony form login. Session authentication supports CSRF protection and login throttling (5 attempts per 60 seconds). Social login through Google, Microsoft, GitHub, and GitLab is also available.

### Public Access

Endpoints that do not require authentication are listed in the security configuration:
- `/api/{projectId}/auth/register`, `/login`, `/forgot-password`, `/reset-password`
- `/public-api` (schema discovery)
- `/api/{projectId}/openapi.json` (OpenAPI spec generation)
- `/cdn` (public file serving)

## Pagination

All list endpoints return paginated results using a consistent structure. The page and page size are controlled through query parameters.

### Request Parameters

| Parameter | Type | Default | Maximum | Description |
|-----------|------|---------|---------|-------------|
| `page` | integer | 1 | - | The page number (1-based) |
| `per_page` | integer | 15 | varies | Number of items per page |

Per-endpoint defaults and maximums:

| Endpoint | Default `per_page` | Max `per_page` |
|----------|-------------------|----------------|
| Content entries | 15 | 100 |
| Collections | 50 | 200 |
| Files / Assets | 20 | 100 |
| End-users | 20 | 100 |

### Response Format

```json
{
  "data": [ ... ],
  "meta": {
    "total": 100,
    "page": 1,
    "per_page": 15,
    "pages": 7
  }
}
```

## Filtering

Filtering is available on select endpoints through query parameters.

### Content Entries

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | string | `published` | Workflow status filter (e.g. `draft`, `published`, `scheduled`) |
| `locale` | string | project default | Locale code (e.g. `en`, `fr`, `es`, `ar`) |

### End-Users

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `status` | string | - | Filter by `active`, `banned`, or `pending` |
| `search` | string | - | LIKE search on email and name fields |
| `uuids[]` | array | - | Direct lookup by UUID (up to 100). Bypasses pagination. |

## Error Codes

Errors are returned as JSON with a simple structure. The HTTP status code indicates the error category.

### Success Codes

| Status | Description |
|--------|-------------|
| 200 | OK - Successful GET, PUT, PATCH requests |
| 201 | Created - Successful POST requests |
| 204 | No Content - Successful DELETE requests |

### Client Error Codes

| Status | Description |
|--------|-------------|
| 400 | Bad Request - Invalid JSON, missing parameters, or validation failure |
| 401 | Unauthorized - Missing, invalid, or expired authentication |
| 403 | Forbidden - Insufficient permissions or public API disabled |
| 404 | Not Found - Resource does not exist |
| 409 | Conflict - Duplicate email or unique field value collision |
| 422 | Unprocessable Entity - Field validation errors |
| 429 | Too Many Requests - Rate limit exceeded |

### Server Error Codes

| Status | Description |
|--------|-------------|
| 500 | Internal Server Error - An unexpected error occurred |
| 503 | Service Unavailable - Mailer not configured or runtime failure |

### Error Response Formats

Standard error:
```json
{
  "error": "Human-readable error message"
}
```

Field validation errors:
```json
{
  "errors": {
    "field_slug": "Error message for this field"
  }
}
```

## Rate Limiting

Rate limiting is implemented per-endpoint using Symfony's sliding window rate limiter.

| Limiter | Limit | Interval | Applied To |
|---------|-------|----------|------------|
| Login | 5 requests | 60 seconds | Admin login form |
| Registration | 3 requests | 60 seconds | End-user registration |
| Password Reset | 3 requests | 60 seconds | Password reset requests |
| CAPTCHA | 10 requests | 60 seconds | CAPTCHA generation (per IP) |
| Public Email | 3 requests | 60 seconds | Public contact forms (per IP) |
| Admin Email | 30 requests | 60 seconds | Admin email sending (per project) |
| MCP | 60 requests | 60 seconds | MCP API endpoint (per IP) |
| 2FA | 5 requests | 60 seconds | Two-factor verification |

When a rate limit is exceeded, the API returns HTTP `429 Too Many Requests` with a JSON error body.

## CORS

The API supports CORS for browser-based clients. The OpenAPI spec endpoint and file uploads explicitly handle `OPTIONS` preflight requests with:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Max-Age: 3600`

## API Documentation

Every project exposes a dynamically generated OpenAPI 3.0.3 specification at:

```
GET /api/{projectId}/openapi.json
```

This spec is generated from the project's collections and fields, and can be used with tools like Swagger UI, Postman, or Insomnia. The spec is cached with ETag headers (`Cache-Control: private, max-age=60, must-revalidate`).

## Next Steps

- [REST API Reference](/api/rest) -- Complete endpoint reference
- [GraphQL API](/api/graphql) -- Queries, mutations, and subscriptions
- [MCP Server](/api/mcp) -- AI agent integration via Model Context Protocol
