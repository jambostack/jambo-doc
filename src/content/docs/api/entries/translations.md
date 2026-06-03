---
title: Translations
description: Manage multi-locale content entries in Jambo.
---

Jambo handles multi-locale content at the **entry level** — each entry has a single `locale` property, and you create separate entries for each language.

## How localization works

Each content entry belongs to one locale:

```json
{
  "uuid": "entry-uuid",
  "locale": "en",
  "fields": { "title": "Hello world" }
}
```

To serve the French version, create a separate entry:

```json
{
  "uuid": "entry-uuid-fr",
  "locale": "fr",
  "fields": { "title": "Bonjour le monde" }
}
```

## Creating a translated entry

```bash
curl -X POST https://your-domain.com/api/{projectId}/posts \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "locale": "fr",
    "status": "published",
    "fields": {
      "title": "Bonjour le monde",
      "slug": "bonjour-le-monde"
    }
  }'
```

## Fetching entries by locale

```bash
# English entries
GET /api/{projectId}/posts?locale=en

# French entries
GET /api/{projectId}/posts?locale=fr
```

## AI Translation

Use **AI Features → AI Translation** in the admin panel to automatically translate entries from one locale to another. The AI translates all text fields while preserving formatting and field structure.

## Enabled locales

Locales are configured per-project in **Project Settings → Localization**. Only entries with a locale that matches an enabled project locale are returned.
