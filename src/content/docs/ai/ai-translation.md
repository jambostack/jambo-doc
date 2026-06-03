---
title: AI Translation
description: Automatically translate content entries between locales using AI.
---

The AI Translation feature lets you translate a complete content entry from one locale to another with a single click. All text fields are translated while media, relations, and non-text fields are preserved.

## How to use

1. Open a content entry in the admin panel
2. In the locale selector, click **Translate from [source locale]**
3. Confirm the target locale and source locale
4. Click **Translate**

Jambo sends all translatable fields to the configured AI provider and creates a new entry in the target locale.

## Translatable field types

| Field type | Translated? |
|------------|-------------|
| `text` | ✅ |
| `longtext` | ✅ |
| `richtext` | ✅ (preserves HTML tags) |
| `slug` | ✅ (transliterated) |
| `enumeration` | ❌ (value preserved) |
| `media` | ❌ (same file) |
| `relation` | ❌ (same reference) |
| `number` / `boolean` / `date` | ❌ (preserved) |

## Requirements

- At least one AI provider must be configured with text support
- The target locale must be enabled in **Project Settings → Localization**

## Translation quality

Translation quality depends on the configured AI provider and model. For best results:
- Use GPT-4o, Claude 3.5 Sonnet, or Gemini 1.5 Pro
- Review translations before publishing — AI translations may require editorial adjustments for tone and terminology

## Batch translation

To translate multiple entries at once, use the **AI Studio** with the `/data` command:

```
/data Translate all published posts from English to French
```

The AI Agent will handle the bulk operation automatically.
