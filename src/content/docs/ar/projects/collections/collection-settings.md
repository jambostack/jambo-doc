---
title: Collection Settings
description: Configure collection-level settings in Jambo.
---

:::note
هذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.
:::


Access collection settings by opening a project → **Settings → Collections** → click the settings icon on a collection.

## General settings

| Setting | Description |
|---------|-------------|
| **Name** | Display name shown in the admin sidebar |
| **Slug** | API identifier. Changing the slug breaks existing API calls — do with caution |
| **Description** | Optional description shown in the sidebar |
| **Icon** | Emoji or icon displayed in the sidebar nav |
| **Singleton** | If enabled, only one entry is allowed |

## API settings

| Setting | Description |
|---------|-------------|
| **Public read** | Allow unauthenticated GET requests for this collection |
| **Draft visibility** | Whether draft entries appear in the public API |

## Danger zone

| Action | Description |
|--------|-------------|
| **Delete collection** | Permanently deletes the collection, all its fields, and all entries |

:::caution
Deleting a collection is permanent and cannot be undone. All content entries for this collection are deleted immediately.
:::
