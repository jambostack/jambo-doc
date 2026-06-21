---
title: RBAC (Role-Based Access Control)
description: Multi-layered access control with roles, permissions, API tokens, project memberships, and super admin privileges.
---

Jambo CMS uses a multi-layered access control system combining Symfony security roles, granular permissions, project-level memberships, and scoped API tokens.

## Architecture

```
User
  ├── Symfony roles (ROLE_USER, ROLE_SUPER_ADMIN)
  └── userRoles (ManyToMany)
        │
        ▼
      Role
        ├── name (unique machine name)
        └── permissions (ManyToMany)
              │
              ▼
          Permission
            ├── name (unique, e.g. "content.create")
            ├── label (human-readable)
            └── group ("content", "media", "settings", etc.)

ProjectMember
  ├── user -> User (nullable for invitations)
  ├── role -> Role (nullable)
  ├── email (unique per project)
  └── status: Active | Pending

ApiToken
  ├── project -> Project
  ├── abilities: ["read", "write", "delete"]
  ├── expiresAt (nullable)
  └── tokenHash (HMAC-SHA256)
```

## Entities

### Role

At `src/Entity/Role.php`:

| Field | Type | Description |
|---|---|---|
| `id` | int | Auto-generated |
| `name` | string (100, unique) | Machine name, e.g. `editor`, `admin` |
| `label` | string (255) | Human-readable display name |
| `permissions` | ManyToMany -> Permission | Join table: `role_permissions` |
| `users` | ManyToMany -> User (inverse) | Join table: `user_roles` |

```php
$role->hasPermission('content.create'); // true/false
```

### Permission

At `src/Entity/Permission.php`:

| Field | Type | Description |
|---|---|---|
| `id` | int | Auto-generated |
| `name` | string (100, unique) | e.g. `content.create`, `content.delete`, `project.manage` |
| `label` | string (255) | Human-readable display name |
| `group` | string (50) | Grouping key: `content`, `media`, `settings`, etc. |

Permission names follow the convention `{resource}.{action}` (e.g. `content.create`, `media.delete`, `project.settings`).

### User roles

At `src/Entity/User.php`:

| Field | Type | Description |
|---|---|---|
| `roles` | json | Symfony security roles: `ROLE_USER`, `ROLE_SUPER_ADMIN` |
| `userRoles` | ManyToMany -> Role | Join table: `user_roles` |

```php
$user->hasRole('editor');
$user->hasPermission('content.create');
// Iterates through all user roles and checks each for the permission
```

### ProjectMember

At `src/Entity/ProjectMember.php`:

| Field | Type | Description |
|---|---|---|
| `project` | ManyToOne -> Project | Owning project |
| `user` | ManyToOne -> User (nullable) | NULL for pending invitations |
| `role` | ManyToOne -> Role (nullable) | The role assigned to this member |
| `email` | string | Email address (must be unique per project) |
| `status` | enum | `Active` or `Pending` |
| `invitedBy` | ManyToOne -> User (nullable) | Who sent the invitation |
| `invitationToken` | string (64, unique, nullable) | Token for accepting invitation |

A user's effective permissions for a project are determined by their `ProjectMember.role.permissions`.

### ApiToken

At `src/Entity/ApiToken.php`:

| Field | Type | Description |
|---|---|---|
| `name` | string | Human-readable label |
| `tokenHash` | string (64, unique) | HMAC-SHA256 of the plain token |
| `tokenVersion` | int | For future rotation (default 1) |
| `abilities` | json | `["read"]`, `["read", "write"]`, or `["read", "write", "delete"]` |
| `project` | ManyToOne -> Project | Scoped to a project |
| `expiresAt` | DateTimeImmutable (nullable) | Optional expiry |
| `lastUsedAt` | DateTimeImmutable (nullable) | Last usage timestamp |

Token generation returns the plain token once, which is then hashed for storage:

```php
$plainToken = ApiToken::generatePlainToken();          // 64 hex chars
$hash = ApiToken::hashToken($plainToken, $appSecret);   // HMAC-SHA256
```

Ability checks:

```php
$token->can('read');    // true if 'read' is in abilities array
$token->can('write');   // true if 'write' is in abilities array
$token->can('delete');  // true only if explicitly granted
```

**Default abilities:** `['read']` (tokens are read-only unless explicitly granted more).

## Access Levels

| Level | Mechanism | Scope |
|---|---|---|
| Super admin | `ROLE_SUPER_ADMIN` Symfony role | All projects, all operations |
| Project member | `ProjectMember` with assigned `Role` | Single project |
| API token | `ApiToken` with `abilities` | Single project, programmatic access |
| Unauthenticated | No access (public endpoints excluded) | None |

Super admin bypasses all project-level checks:

```php
// Pattern used across all controllers:
if (in_array('ROLE_SUPER_ADMIN', $user->getRoles(), true)) {
    return; // Full access
}
if ($this->memberRepo->findActiveByUserAndProject($user, $project) === null) {
    throw $this->createAccessDeniedException();
}
```

## Permission Enforcement

Permissions are checked at the controller level using Symfony's security system:

- **`$this->denyAccessUnlessGranted('project.view', $project)`** -- checks project membership
- **`$this->denyAccessUnlessGranted('project.manage', $project)`** -- checks management permission
- **`$memberRepo->findActiveByUserAndProject($user, $project)`** -- explicit member lookup

For API token authentication, the `ApiTokenAuthenticator` validates the token hash and checks abilities before allowing access.

## Example: Check permissions

```php
// In a controller:
$this->denyAccessUnlessGranted('project.view', $project);

// In a service:
if (!$user->hasPermission('content.create')) {
    throw new AccessDeniedException();
}
```

## Key files

| File | Purpose |
|---|---|
| `src/Entity/Role.php` | Role entity with permission collection |
| `src/Entity/Permission.php` | Permission entity with name, label, group |
| `src/Entity/User.php` | User entity with Symfony roles and role collection |
| `src/Entity/ApiToken.php` | API token entity with scoped abilities |
| `src/Entity/ProjectMember.php` | Member-to-project relationship with role assignment |
