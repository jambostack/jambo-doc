---
title: Field Types
description: Complete reference for all available field types in Jambo collections.
---

When adding fields to a collection, you choose a **field type** that defines how data is stored and validated.

## Text & Content

| Type | Description | Example value |
|------|-------------|---------------|
| `text` | Short single-line text | `"Hello world"` |
| `longtext` | Multi-line plain text | `"First line\nSecond line"` |
| `richtext` | HTML rich text (WYSIWYG editor) | `"<p>Hello <strong>world</strong></p>"` |
| `slug` | URL-safe string, auto-generated from another field | `"hello-world"` |
| `email` | Email address with validation | `"user@example.com"` |
| `password` | Hashed password field | _(write-only)_ |
| `color` | Hex color value | `"#3b82f6"` |

## Numbers & Booleans

| Type | Description | Example value |
|------|-------------|---------------|
| `number` | Integer number | `42` |
| `decimal` | Decimal number | `19.99` |
| `boolean` | True or false | `true` |

## Date & Time

| Type | Description | Example value |
|------|-------------|---------------|
| `date` | Date only | `"2024-01-15"` |
| `datetime` | Date and time (ISO 8601) | `"2024-01-15T10:30:00+00:00"` |
| `time` | Time only | `"10:30"` |

## Structure

| Type | Description | Example value |
|------|-------------|---------------|
| `enumeration` | One value from a predefined list | `"draft"` |
| `json` | Raw JSON object or array | `{"key": "value"}` |

## Relations

| Type | Description | Example value |
|------|-------------|---------------|
| `media` | Reference to a media asset (image, file, video) | `{"uuid": "...", "url": "..."}` |
| `relation` | Reference to an entry in another collection | `{"uuid": "...", "fields": {...}}` |

### Configuring relations

**`media`** fields store a reference to a file in the media library. The API returns the full asset object including URL and MIME type.

**`relation`** fields must specify a `targetCollection` in the field options. For example, a `Post` collection can have an `author` field of type `relation` pointing to `end_users` (the built-in user collection).

### Configuring enumerations

`enumeration` fields require a list of allowed values, set in the field options. Example: `["draft", "published", "archived"]`.
