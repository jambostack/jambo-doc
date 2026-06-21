---
title: AI Translation
description: Per-entry and bulk AI translation with locale management and multi-provider support.
---

AI Translation in JamboApi operates at **three levels**: per-entry translation from the content editor toolbar, bulk translation via the AI Agent, and automated translation through flow automation nodes.

## How Translation Works

Translation sends the structured JSON content of an entry to the AI, which preserves the exact field structure while translating text values. Non-text fields (numbers, booleans, relations, media, dates) pass through unchanged.

The AI is instructed to:

1. Maintain the exact JSON key structure
2. Translate only string/text values
3. Preserve all non-text field types as-is
4. Return only valid JSON

## Per-Entry Translation

### Access

From any content entry editor, click the **AI** toolbar button and select **Translate**. The toolbar provides:

- **Locale selector** -- Choose the target language from your project's configured locales
- **Field selector** -- Optionally target a specific field instead of translating all text fields

### API

```http
POST /api/projects/{uuid}/ai/translate
Content-Type: application/json

{
  "content": {
    "title": "Hello World",
    "body": "This is a blog post about AI translation."
  },
  "locale": "fr"
}
```

**Response:**

```json
{
  "title": "Bonjour le monde",
  "body": "Ceci est un article de blog sur la traduction IA."
}
```

### How It Works

The request hits `AiController::translate()` which delegates to `AiContentService::translateContent()`. The service:

1. Receives the JSON content object and target locale
2. Calls the AI with a prompt instructing it to translate while preserving structure
3. Uses the `fast` model (`gpt-4o-mini`) by default for speed
4. Parses the AI response and returns the translated JSON
5. Logs the operation to the audit trail

## Bulk Translation (AI Agent)

For translating multiple entries at once, use the AI Agent's `translate_entries` tool.

### Request Format

```json
{
  "tool": "translate_entries",
  "params": {
    "collection": "articles",
    "source_locale": "en",
    "target_locales": ["fr", "es", "ar", "de"],
    "uuids": [
      "550e8400-e29b-41d4-a716-446655440000",
      "550e8400-e29b-41d4-a716-446655440001"
    ]
  }
}
```

### Behavior

| Parameter | Type | Description |
|-----------|------|-------------|
| `collection` | string (required) | Collection slug |
| `source_locale` | string (required) | Source locale code |
| `target_locales` | array (required) | One or more target locale codes |
| `uuids` | array (optional) | Entry UUIDs to translate. If empty, reads the first 200 entries from the source locale |

**Per-entry process:**

1. Load the source entry with all field values
2. Extract only string-based fields (non-empty)
3. Send JSON to AI for translation into each target locale
4. Create a **new ContentEntry** in each target locale
5. Merge translated text fields with original non-text fields (numbers, booleans, relations, media, dates)
6. Persist the new entry

**Important:** Translation creates separate entries per locale. The original source entry is not modified.

## Flow Automation Translation

For automated workflows, the `ai.translate` node type translates text input through flow automations:

| Setting | Description |
|---------|-------------|
| Source text | From configuration or previous node output |
| Target language | One of 12 supported languages |
| Result | Translated text with source language detection |

**Supported languages:** French, English, Spanish, Arabic, German, Italian, Portuguese, Dutch, Russian, Chinese, Japanese, Korean

This is useful for:
- Automatically translating form submissions
- Webhook-triggered translation pipelines
- Scheduled content localization

## MCP Translation Tool

The MCP server exposes an `ai_translate_content` tool for programmatic translation:

```json
{
  "name": "ai_translate_content",
  "arguments": {
    "content": { "title": "Hello World", "body": "Content text" },
    "target_locale": "es"
  }
}
```

## Locale Configuration

Projects can define multiple locales. Each locale has:

- A **locale code** (e.g., `en`, `fr`, `es`, `ar`)
- A display name in the UI

The default locale is set at project creation and can be changed in project settings.

Locales available in the translation dropdown are filtered from the project's configured locales.

## Model Selection

By default, translation uses the `fast` model alias (`gpt-4o-mini`). This can be customized by changing the AI provider configuration in **Admin Settings > AI Providers**. The translation system uses whichever provider is currently enabled and configured.

## Audit Trail

All translation operations are logged:

| Field | Per-Entry Translation | Bulk Translation |
|-------|----------------------|-----------------|
| Tool name | `ai_translate` | `translate_entries` |
| Source | `ai` | `ai` |
| Input | Content JSON + locale | Full operation parameters |
| Output | Translated JSON | Per-entry results |
| Status | success/failure | success/failure (per entry) |

## Best Practices

- **Batch by locale:** Translating into one locale at a time produces more consistent results than mixing multiple locales in a single request
- **Review before publishing:** AI translations should be reviewed by a human editor, especially for nuanced or brand-critical content
- **Field granularity:** Use per-entry translation for individual entries that need careful handling
- **Scale with Agent:** Use bulk translation for large content migrations or multi-language launches
- **Locale consistency:** Ensure the target locale is configured in your project before translating
