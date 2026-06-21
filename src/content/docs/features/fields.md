---
title: Fields
description: Schema field types, EAV value storage, validation rules, and conditional visibility.
---

## Overview

**Fields** define the schema of a Collection. Each field has a name, slug, type, and an optional set of configuration options. Fields are ordered and can be marked as required. Values are stored in an EAV (Entity-Attribute-Value) table.

A Field always belongs to exactly one Collection and cannot exist independently.

## Field types

Jambo supports the following field types, grouped by how they are stored in the database:

### Text-based (stored as `textValue`)

| Type | Description |
|---|---|
| `text` | Single-line text input |
| `longtext` | Multi-line text area |
| `richtext` | Rich text (WYSIWYG) editor |
| `wysiwyg` | Alternate rich text variant |
| `textarea` | Plain text area |
| `markdown` | Markdown editor |
| `email` | Email input with validation |
| `url` | URL input with validation |
| `color` | Color picker |
| `password` | Password input (masked) |
| `slug` | URL slug generation |
| `code` | Code editor |
| `icon` | Icon selector |
| `uuid` | UUID input |
| `time` | Time input |

### Numeric (stored as `numberValue`, DECIMAL 14,6)

| Type | Description |
|---|---|
| `number` | Numeric input |
| `decimal` | Decimal number input |
| `rating` | Star rating selector (numeric) |

### Boolean (stored as `booleanValue`)

| Type | Description |
|---|---|
| `boolean` | Boolean toggle |
| `checkbox` | Checkbox input |

### Date/time (stored as `dateValue` or `datetimeValue`)

| Type | Description |
|---|---|
| `date` | Date picker (formatted as `Y-m-d`) |
| `datetime` | DateTime picker (ISO 8601 ATOM format) |

### Complex (stored as `jsonValue`)

| Type | Description |
|---|---|
| `json` | Raw JSON input |
| `array` | List of values |
| `repeater` | Repeatable set of sub-fields |
| `enumeration` | Single or multi-select from a predefined list |
| `media` | Media file selection (image, video, document) |
| `relation` | Relation to another collection or end users |
| `tags` | Tag-style multi-select input |

## EAV value storage

Field values are stored in `ContentFieldValue` (`src/Entity/ContentFieldValue.php`) using polymorphic typed columns. Each value row holds:

| Column | Used by |
|---|---|
| `textValue` | text, longtext, richtext, wysiwyg, textarea, markdown, email, url, color, password, slug, code, icon, uuid, time |
| `numberValue` | number, decimal, rating |
| `booleanValue` | boolean, checkbox |
| `dateValue` | date |
| `datetimeValue` | datetime |
| `jsonValue` | json, array, repeater, media, relation, enumeration, tags |

This structure allows efficient type-specific querying and indexing.

## Relation fields

Relation fields (`type: "relation"`) connect content entries together or reference end users. Configuration is stored in the field's `options`:

- `relation.type`: `1` (One to One) or `2` (One to Many)
- `relation.collection`: ID of the target collection, or absent for `end_users`
- `targetCollection`: set to `'end_users'` when referencing the end-user entity

## Validation rules

Fields support configurable validation via the `validationRules` JSON column (`src/Service/EavFieldHelperService.php`):

| Rule | Applies to | Description |
|---|---|---|
| `required` | All types | Value must be non-empty |
| `regex` / `regexMessage` | text, longtext, slug, etc. | Pattern matching with custom error message |
| `minLength` / `maxLength` | text, longtext, etc. | String length limits |
| `min` / `max` | number, decimal, rating | Numeric range limits |
| `unique` | text, longtext, email, slug, url | Value must be unique across all entries in the collection |

Type-specific validation is also built in:
- `email` — uses `FILTER_VALIDATE_EMAIL`
- `url` — uses `FILTER_VALIDATE_URL`
- `number`, `decimal` — checks `is_numeric()`
- `boolean`, `checkbox` — checks `is_bool()`
- `date`, `datetime` — checks `strtotime()`

## Conditional fields (v1.10+)

Fields can be shown or hidden based on the value of another field. Conditions are stored in `options.conditions` as an array. All conditions must be met (AND logic) for the field to be visible.

Supported operators:

| Operator | Description |
|---|---|
| `empty` | Target value is empty |
| `notEmpty` | Target value is non-empty |
| `eq` | Loose equality (`==`) |
| `neq` | Loose inequality (`!=`) |
| `in` | Value is in array |
| `contains` | String contains (`str_contains`) |
| `startsWith` | String starts with (`str_starts_with`) |
| `gt` | Greater than (numeric) |
| `gte` | Greater than or equal (numeric) |
| `lt` | Less than (numeric) |
| `lte` | Less than or equal (numeric) |

Example condition — show a field only when `category` equals `"advanced"`:

```json
{
  "conditions": [
    {"field": "category", "operator": "eq", "value": "advanced"}
  ]
}
```

Conditional visibility is evaluated by `FieldConditionEvaluator` (`src/Service/FieldConditionEvaluator.php`).

## Field endpoints

All field endpoints are scoped under a collection:

`/api/projects/{projectUuid}/collections/{collectionSlug}/fields`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `` | List all fields |
| `POST` | `` | Create a new field |
| `GET` | `/{fieldSlug}` | Get a single field |
| `PUT/PATCH` | `/{fieldSlug}` | Update a field |
| `POST` | `/reorder` | Batch reorder fields |
| `DELETE` | `/{fieldSlug}` | Soft-delete a field |

#### Create a field

```json
// POST /api/projects/{uuid}/collections/blog_posts/fields
{
  "name": "title",
  "type": "text",
  "is_required": true,
  "options": null,
  "validationRules": {
    "maxLength": 200
  },
  "order": 1
}
```

## See also

- [Collections](/features/collections/) — field groups
- [Content](/features/content/) — values stored from these field definitions
