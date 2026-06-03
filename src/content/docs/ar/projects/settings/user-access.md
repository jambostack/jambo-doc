---
title: User Access
description: Manage which admin users have access to a project and their roles within it.
---

:::note
هذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.
:::


Go to **Project Settings → User Access** to control which admin users can access a project and what they can do.

## Project members

Super Admins have access to all projects by default. Other admin users must be explicitly added.

### Adding a member

1. Click **+ Add Member**
2. Search for an existing admin user by name or email
3. Select their **project role**:

| Role | Access |
|------|--------|
| **Manager** | Full access to the project — content, collections, settings |
| **Editor** | Create and edit content; cannot modify collections or settings |
| **Viewer** | Read-only access to content; no editing |

4. Click **Add**

### Removing a member

Click **Remove** next to a member to revoke their project access. Their content contributions are preserved.

## End-user authentication

**End-users** are your application's users — different from admin users. They authenticate via JWT tokens through the public API.

To enable end-user authentication for a project:

1. Toggle **Enable end-user auth**
2. Configure token expiry (default: 7 days)
3. Optionally restrict registration to specific email domains

End-users can register and log in via:

```bash
POST /api/{projectId}/auth/register
{ "email": "user@example.com", "password": "..." }

POST /api/{projectId}/auth/login
{ "email": "user@example.com", "password": "..." }
```

The login response includes a JWT token for authenticated API calls.
