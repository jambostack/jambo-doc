---
title: Auth
description: Authentication and authorization — admin users, end users, 2FA, social login, and JWT.
---

## Overview

Jambo has two distinct authentication systems:

1. **Admin users** — Studio dashboard access (session-based, Inertia)
2. **End users** — Frontend/public API access (JWT-based, API tokens)

Both support **2FA**, **social login** (4 providers), and **role-based permissions**.

## Admin users

The `User` entity (`src/Entity/User.php`) represents a CMS administrator:

| Property | Type | Description |
|---|---|---|
| `email` | `string` | Unique, 180 chars |
| `password` | `?string` | Hashed password (null for social-only accounts) |
| `name` | `string` | Display name |
| `locale` | `string` | UI language preference |
| `roles` | `array` | Symfony security roles |
| `userRoles` | `ManyToMany` | Custom Role entities |

### Admin authentication flow

1. Login via `/login` (email + password, or social provider)
2. If 2FA is enabled, redirected to `/two-factor-challenge`
3. On verification, full Symfony session is created

### Admin auth routes

| Route | Method | Description |
|---|---|---|
| `/login` | GET/POST | Login page |
| `/register` | GET/POST | Registration |
| `/forgot-password` | GET/POST | Password reset request |
| `/reset-password/{token}` | GET/POST | Password reset |
| `/two-factor-challenge` | GET/POST | 2FA code entry |
| `/logout` | POST | Session logout |

## End users

The `EndUser` entity (`src/Entity/EndUser.php`) represents a frontend user scoped to a project:

| Property | Type | Description |
|---|---|---|
| `email` | `string` | Unique per project |
| `password` | `?string` | Hashed password |
| `username` | `?string` | Display name |
| `status` | `string` | `active`, `banned`, or `pending` |
| `avatarUrl` | `?string` | Profile picture |
| `emailVerifiedAt` | `?datetime` | Email verification timestamp |
| `tokenVersion` | `int` | JWT revocation counter |
| `customFields` | `json` | Project-defined custom fields |

### End-user JWT authentication

Jambo issues HMAC-SHA256 signed JWTs (`src/Service/EndUserJwtService.php`):

| Token | Default TTL | Configurable |
|---|---|---|
| Access token | 15 minutes | Yes (per project, min 60s) |
| Refresh token | 30 days | Yes (per project, max 365 days) |

Token claims include:
- `euid` — EndUser UUID
- `pid` — Project UUID
- `tkn` — Token version (for revocation)
- `ref` — True for refresh tokens only

**Token revocation**: Incrementing `tokenVersion` invalidates all existing tokens for that user (used on logout, password change, or ban).

### End-user auth API

All endpoints under `/api/{projectId}/auth/`:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/register` | Register with email + password |
| `POST` | `/login` | Login, returns JWT pair |
| `POST` | `/verify-2fa` | Exchange 2FA token for JWT pair |
| `POST` | `/refresh` | Refresh access token |
| `GET` | `/me` | Get authenticated user profile |
| `PATCH` | `/me` | Update profile |
| `POST` | `/logout` | Revoke all tokens |
| `POST` | `/forgot-password` | Request password reset |
| `POST` | `/reset-password` | Reset password with token |
| `POST` | `/social/{provider}` | Social OAuth login |

## Two-factor authentication (2FA)

Both admin users and end users support 2FA with two methods:

### TOTP (Authenticator app)

- Uses `OTPHP\TOTP` library
- 6-digit codes, 30-second period, SHA1
- Setup via `/totp/setup` (generates secret + QR provisioning URI)
- Confirmed via `/totp/confirm` (verifies one code)
- On confirmation, generates **8 backup codes** in format `XXXX-XXXX-XXXX-XXXX`

### Email 2FA

- 6-digit code sent from `noreply@jamboapi.local`
- 5-minute expiry
- Codes stored as SHA-256 hashes in JWT claims

### Backup codes

- 8 one-time-use codes generated on 2FA enable
- Stored as SHA-256 hashes
- Verify via `TwoFactorService::verifyAndConsumeBackupCode()`

### Admin 2FA management

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/settings/security/totp/setup` | Generate TOTP secret |
| `POST` | `/api/settings/security/totp/confirm` | Verify and enable TOTP |
| `POST` | `/api/settings/security/email/enable` | Enable email 2FA |
| `POST` | `/api/settings/security/email/confirm` | Verify and enable email 2FA |
| `POST` | `/api/settings/security/disable` | Disable 2FA |
| `POST` | `/api/settings/security/backup-codes` | Regenerate backup codes |

For end users, the 2FA flow is:
1. Login returns `requires_2fa: true` with a 60-second JWT `two_factor_token`
2. `POST /api/{projectId}/auth/verify-2fa` with `code` returns the full JWT pair

## Social login

Jambo supports **4 OAuth providers** (`src/Service/SocialLoginService.php`):

| Provider | Scopes | User data mapped |
|---|---|---|
| Google | `openid`, `email`, `profile` | `sub`, `email`, `name`, `picture` |
| Microsoft (Azure) | `openid`, `email`, `profile` | `oid`, `email`, `displayName` |
| GitHub | `user:email` | `id`, `email`, `login`, `avatar_url` |
| GitLab | `read_user` | `id`, `email`, `username`, `avatar_url` |

### For admin users

OAuth credentials are stored in `AppSettings.oauthProviders`. The OAuth callback is handled by `SocialLoginAuthenticator` (`src/Security/SocialLoginAuthenticator.php`).

### For end users

OAuth credentials are stored per-project in `Project.settings.security.endUserSocialProviders`. Social login for end users uses `POST /api/{projectId}/auth/social/{provider}` which exchanges the OAuth authorization code for a JWT pair.

## API token authentication

The **public API** supports Bearer token authentication for project-level access:

```
Authorization: Bearer <api-token>
```

Token abilities control permitted operations (`read`, `create`, `delete`). Tokens are validated via `ApiTokenChecker` and used in all public API controllers.

## See also

- [RBAC](/features/rbac/) — roles and permissions
- [Workflows](/features/workflows/) — content assignment and notifications
