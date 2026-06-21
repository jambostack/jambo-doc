---
title: Localization
description: Multi-locale content management — project locales, per-entry locale, fallback behavior, and AI translation.
---

## Overview

Jambo supports **per-entry localization**. Each content entry is scoped to exactly one locale. To represent the same content in multiple languages, you create separate entries with different `locale` values.

## Project-level configuration

The `Project` entity (`src/Entity/Project.php`) defines two locale properties:

```php
public string $defaultLocale = 'en';  // The project's fallback locale
public array $locales = ['en'];       // All enabled locales
```

- `defaultLocale` — the fallback locale used when no locale is specified (max 10 characters, supports codes like `en-US` or `zh-CN`)
- `locales` — a JSON array of all enabled locale codes

On project creation, both default to `['en']`.

## Per-entry locale

Each `ContentEntry` stores its own locale:

```php
public string $locale = 'en';  // 10 characters max
```

The locale is part of the entry's reserved system keys and is always present in API responses alongside other metadata.

## Managing locales

Locale management endpoints are in `src/Controller/ProjectSettingsController.php`:

| Method | Endpoint | Description |
|---|---|---|
| `PATCH` | `/api/projects/{uuid}/settings/localization` | Update locales and default locale |
| `POST` | `/api/projects/{uuid}/settings/locales` | Add a new locale |
| `PUT` | `/api/projects/{uuid}/settings/locale` | Change the default locale |
| `DELETE` | `/api/projects/{uuid}/settings/locales/{locale}` | Remove a locale |

Important rules enforced by the API:
- The `defaultLocale` is always implicitly part of the enabled locales list, even if an admin tries to remove it
- You cannot delete the default locale (returns 422)
- You cannot set a default locale that isn't in the enabled locales list

## Creating localized content

To create content in a specific locale, include the `locale` field:

```json
// POST /api/projects/{uuid}/collections/blog_posts/entries
{
  "locale": "fr",
  "status": "published",
  "fields": {
    "title": "Bonjour le monde"
  }
}
```

If no `locale` is provided, the project's `defaultLocale` is used.

## Locale validation

When creating or updating entries, the requested locale is validated against the project's enabled locales:

```php
$validLocales = array_unique(array_merge($project->locales, [$project->defaultLocale]));
```

The `defaultLocale` is always considered valid.

## Querying by locale

### Studio API

The admin content listing filters by locale only when the `?locale=` query parameter is explicitly provided:

```
GET /api/projects/{uuid}/collections/blog_posts/entries?locale=fr
```

Without the parameter, **all locales** are returned.

### Public API

The public API defaults to the project's `defaultLocale`:

```
GET /api/{projectId}/blog_posts?locale=fr
```

### Repository filtering

All repository query methods accept an optional `?string $locale` parameter (from `src/Repository/ContentEntryRepository.php`):

- `findByCollectionPaginated()`
- `countByCollection()`
- `findTrashedPaginated()`
- `countTrashedByCollection()`
- `findByAssigneePaginated()`

When `locale` is `null`, no locale filter is applied (all locales returned).

## Fallback behavior

There is **no built-in automatic locale fallback** at the data layer. Each entry exists independently per locale. If an entry is not found in the requested locale, the API returns no results for that locale — it does not automatically fall back to the default locale.

Fallback logic must be implemented at the **application layer** (your frontend or SDK) by:
1. Requesting content in the preferred locale
2. Falling back to the default locale if no content is found

## AI translation

Jambo includes an AI-powered translation endpoint (`src/Service/AiContentService.php`):

```
POST /api/projects/{uuid}/ai/translate
```

```json
{
  "content": {"title": "Hello World", "body": "This is a post"},
  "locale": "fr"
}
```

The translation is **stateless** — it returns translated content without persisting it. You can use the result to pre-populate a new entry in the target locale.

## User locale

The Jambo admin UI is also localized. Each user can set their preferred UI language:

| Locale | Language |
|---|---|
| `en` | English |
| `fr` | French |
| `es` | Spanish |
| `ar` | Arabic |

The user's locale (`User.locale`, max 5 characters) is set via the settings panel and applied on every request by `LocaleSubscriber`.

## Search indexing

The `locale` field is a **filterable attribute** in Meilisearch, allowing searches scoped to a specific language:

```
GET /api/projects/{uuid}/search?q=hello&locale=fr
```

## See also

- [Content](/features/content/) — per-entry locale management
- [Media](/features/media/) — locale-independent media library
