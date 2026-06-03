---
title: Managing Content
description: Overview of content management in Jambo — statuses, locales, and workflows.
---

:::note
هذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.
:::


Content in Jambo is organized by **collection**. Each collection has its own list of entries accessible from the project sidebar.

## Content statuses

Every entry has one of two statuses:

| Status | Description |
|--------|-------------|
| `draft` | Not visible in the public API by default |
| `published` | Visible in the public API |

You can toggle status from the entry list or the editor.

## Locales

If your project has multiple locales enabled (see **Project Settings → Localization**), each entry belongs to one locale. To show content in multiple languages, create separate entries — one per locale.

The API defaults to returning the project's default locale. Pass `?locale=fr` to fetch French entries.

## Versioning

Jambo saves a version history for each entry. Click **History** in the editor to view previous versions and restore one if needed.

## Soft delete (trash)

Deleting an entry moves it to the trash — it disappears from the public API but is not permanently removed. To permanently delete, go to **Content → Trash** and force-delete.

## Search

Use the search bar at the top of the content list to find entries by their text fields. If Meilisearch is configured, search is full-text across all text fields.
