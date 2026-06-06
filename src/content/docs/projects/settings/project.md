---
title: Project Settings
description: Configure general project settings in Jambo.
---

Access project settings via the project sidebar → **Settings → Project**.

## General

| Setting | Description |
|---------|-------------|
| **Name** | Project display name |
| **Description** | Optional description |
| **Default locale** | The primary language used when no locale is specified in API calls |
| **Storage** | Local disk (`public`) or S3-compatible storage |

## JWT Token TTL

Configure the expiration time for end-user authentication tokens:

| Setting | Default | Description |
|---------|---------|-------------|
| **Access Token TTL** | 900s (15 min) | Lifetime of access tokens in seconds. Min: 60. Leave empty for default. |
| **Refresh Token TTL** | 2,592,000s (30 days) | Lifetime of refresh tokens in seconds. Min: 60. Leave empty for default. |

These settings apply to tokens issued via `POST /api/{projectId}/auth/login`. Changing the TTL only affects **new tokens** — existing tokens retain their original expiration.

## SMTP Mailer

Each project can have its own SMTP configuration. See the **SMTP Mailer** section in project settings for configuration.

## Danger zone

| Action | Description |
|--------|-------------|
| **Archive project** | Hides the project from the dashboard; API continues to work |
| **Delete project** | Permanently deletes the project, all collections, entries, and media files |

:::caution
Deleting a project is irreversible. All data is permanently removed.
:::
