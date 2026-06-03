---
title: Localization
description: Configure project locales and multilingual content settings.
---

:::note
هذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.
:::


Go to **Project Settings → Localization** to manage the languages your project supports.

## Adding a locale

1. Click **+ Add Locale**
2. Enter the locale code (e.g. `fr`, `es`, `ar`, `de`)
3. Click **Add**

The locale is immediately available for content entries and API calls.

## Default locale

The default locale is used when:
- A content entry is created without specifying a locale
- An API call is made without `?locale=` parameter

Change the default locale in **Project Settings → General**.

## Removing a locale

Removing a locale does not delete entries with that locale — it only prevents new entries from being created with it, and API calls with `?locale=removed-locale` will return empty results.

## RTL support

Locales like Arabic (`ar`), Hebrew (`he`), or Persian (`fa`) use right-to-left text direction. The rich text editor automatically switches to RTL mode when an RTL locale is selected.

## Locale codes

Use standard BCP 47 locale codes:

| Language | Code |
|----------|------|
| English | `en` |
| French | `fr` |
| Spanish | `es` |
| Arabic | `ar` |
| German | `de` |
| Portuguese | `pt` |
| Chinese (Simplified) | `zh` |
| Japanese | `ja` |
