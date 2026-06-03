---
title: Understanding Permissions
description: How the permission system works in Jambo — roles, projects, and API tokens.
---

Jambo has two separate permission systems: **admin permissions** (for CMS users) and **API token permissions** (for your applications).

## Admin permissions

Admin users are assigned a **role** that controls what they can do in the panel. Roles are configured in [Managing Roles](/profile/managing-roles/).

The permission check happens at every action:
- Viewing the panel → requires `view` permission on that resource
- Creating content → requires `create` permission
- Deleting a collection → requires `delete` permission on collections

Super Admins bypass all permission checks.

## API token permissions

When you create an API token in **Project Settings → API Access**, you can scope it to specific operations:

| Scope | What it allows |
|-------|----------------|
| `read` | GET requests (list and get entries, assets) |
| `write` | POST and PATCH requests (create and update) |
| `delete` | DELETE requests |
| `admin` | Full access including collection management |

A token with only `read` scope cannot create or modify content — it will receive `403 Forbidden`.

## End-user permissions

**End-users** (your application's users, registered via the `end_users` API) have a different permission system. They can only access content through the public API with their JWT token, and only if the project has end-user auth enabled.

End-user access is controlled per-project in **Project Settings → User Access**.

## Public API

If **Public API** is enabled for a project (Project Settings → API Access), anonymous requests (no token) can read `published` content. Write operations always require a token.
