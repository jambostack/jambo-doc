---
title: Managing Roles
description: Create and configure roles to control admin access in Jambo.
---

Roles define what admin users can do in the Jambo panel. Each user is assigned exactly one role.

## Built-in roles

| Role | Description |
|------|-------------|
| **Super Admin** | Full access to everything — settings, users, all projects |
| **Admin** | Full access to all projects, cannot manage users or system settings |
| **Editor** | Can create and edit content, cannot change settings or delete collections |
| **Viewer** | Read-only access to content |

## Custom roles

You can create custom roles with granular permissions:

1. Go to **Profile → Roles**
2. Click **+ New Role**
3. Enter a role name
4. Toggle permissions on/off
5. Click **Save**

## Permissions

Permissions are organized by resource:

### Projects
- View projects
- Create projects
- Manage project settings

### Collections
- View collections
- Create / edit / delete collections and fields

### Content
- View entries
- Create entries
- Edit entries
- Delete entries
- Publish entries

### Media
- View media library
- Upload files
- Delete files

### Settings
- Manage AI providers
- Manage webhooks
- Manage API tokens
- Manage users and roles
