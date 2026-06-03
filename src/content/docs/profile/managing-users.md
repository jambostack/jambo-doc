---
title: Managing Users
description: Manage admin users and their access to the Jambo CMS.
---

Admin users are the people who have access to the Jambo admin panel. They are different from **end-users** (your application's users, managed via the `end_users` collection API).

## Viewing users

Go to **Profile → Users** to see all admin users on your Jambo installation.

## Inviting a user

1. Click **Invite User**
2. Enter their email address
3. Select a role (see [Managing Roles](/profile/managing-roles/))
4. Click **Send Invitation**

The user receives an email with a link to set their password. The link is valid for 48 hours.

## Editing a user

Click on a user's name to edit their profile:

- **Name** and **email**
- **Role** — changes take effect immediately
- **Status** — active or suspended

## Suspending a user

Suspended users cannot log in to the admin panel. Their content and settings are preserved. You can reactivate them at any time.

## Deleting a user

Deleting a user is permanent. Their created/updated content entries are preserved but show no author.

:::caution
You cannot delete your own account. Ask another admin to do it.
:::

## Password policy

- Minimum 8 characters
- Users can reset their password via the login page ("Forgot password?")
- Admins can send a password reset email from the user edit page
