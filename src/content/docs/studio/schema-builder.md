---
title: Schema Builder
description: Visual builder for collections, fields, validation, end-user fields, and code export in JamboApi Studio.
---

The Schema Builder is a visual, drag-and-drop interface for designing your content model. It lives under **Project Settings > Studio** and provides a complete environment for managing collections, fields, validation rules, workflow configurations, and end-user fields.

## Studio Layout

The Studio panel is organized into tabs:

| Tab | Description |
|-----|-------------|
| Schema | Visual schema builder with collections, fields, and end-user fields |
| Export | Code export (TypeScript, Python, PHP SDK generation) |
| Search | Full-text search across all collections |
| Audit | Tool execution audit logs |
| GraphQL | GraphQL endpoint reference and examples |
| AI Guide | Auto-generated Markdown context for AI assistants |

## Schema Builder

The main schema builder panel consists of two areas:

### Mobile Collections View

On narrow screens, collections are displayed as a vertically scrollable list. Active collection is highlighted.

### Desktop Editor View

On desktop, the editor view shows a selected collection with three tabs:

#### Fields Tab

Displays all fields of the current collection in a reorderable list. Each field row shows:

- **Drag handle** (for reordering)
- **Field label** and **type badge**
- **Required indicator**
- **Expand arrow** to reveal type-specific options

Clicking a field row expands it to show inline configuration options. Drag and drop reorder is supported via `@hello-pangea/dnd`.

#### Collection Tab

Collection-level settings:

- **Name** and **Slug** (auto-generated from name)
- **Description**
- **Singleton toggle** -- When enabled, the collection can only contain one entry
- **Template selector** -- Apply a predefined collection template

#### Workflow Tab

Workflow configuration for the collection. Allows defining custom statuses and transitions.

## Field Types

The Schema Builder supports **23 field types**:

| Type | Description |
|------|-------------|
| `text` | Single-line text |
| `longtext` | Multi-line text |
| `richtext` | Rich text editor (Lexical-based) |
| `slug` | URL-safe slug (can auto-generate from another field) |
| `email` | Email with validation |
| `password` | Password input |
| `number` | Numeric value (integer or decimal) |
| `enumeration` | Predefined list of values |
| `boolean` | True/false toggle |
| `color` | Color picker |
| `date` | Date picker (with optional range) |
| `datetime` | Date and time picker |
| `time` | Time picker |
| `media` | Media/file selector (single or multiple) |
| `relation` | Relate to entries in another collection (one-to-one or one-to-many) |
| `json` | Raw JSON data |
| `url` | URL with validation |
| `markdown` | Markdown editor |
| `code` | Code editor (CodeMirror-based) |
| `icon` | Icon selector |
| `uuid` | System UUID display |
| `tags` | Tag input |
| `rating` | Star rating |
| `repeater` | Repeatable group of sub-fields |

## Adding a Field

Click **Add Field** to open a grid of field types. Selecting a type opens the field configuration form with these sections:

### Basic Information

| Setting | Description |
|---------|-------------|
| Label | Display label for the Studio UI |
| Name | Field identifier in the API |
| Description | Tooltip text shown to content editors |
| Placeholder | Placeholder text in input fields |
| Required | Toggle required validation |

### Type-Specific Options

Each field type has unique configuration options:

- **Slug**: Select a source field for auto-generation
- **Enumeration**: Add/remove list values
- **Date/Time**: Toggle time inclusion, enable range selection
- **Media**: Select single or multiple, restrict media types
- **Relation**: Select target collection, set cardinality (one-to-one / one-to-many), include drafts
- **Repeater**: Define variant sub-fields

### Validation Rules

| Rule | Applies To |
|------|-----------|
| Required | All types |
| Unique | All types (except `text` with certain char types) |
| Min Length / Max Length | `text`, `longtext` |
| Min Value / Max Value | `number` |
| Pattern (regex) | `text`, `slug` |
| Custom error message | All rules |

### Other Options

| Option | Description |
|--------|-------------|
| Repeatable | Allow multiple values for the field |
| Hide in Content List | Exclude from the entries table view |
| Hidden in API | Exclude API output |

### Display Conditions

Fields can be configured to show or hide based on the value of another field using the **Condition Editor**. This enables dynamic forms where fields appear only when relevant.

## End-User Custom Fields

The Studio panel includes an **End-User Editor** for managing custom fields on the End User entity. This allows adding extra data fields (name, type, options, validation) to end-user profiles without modifying the database schema.

## Collection Templates

Collections and field configurations can be saved as **templates** for reuse across projects. When creating a new collection, you can select from available templates to pre-populate the field structure.

## Workflow Configuration

Each collection has its own workflow with customizable statuses. The default workflow includes `draft` and `published` statuses, and you can add custom statuses to match your publishing process.

## Code Export (SDK Generation)

The **Export** tab generates typed SDK clients for your schema:

| Language | Features |
|----------|----------|
| TypeScript | Full type definitions matching your collections |
| Python | Typed data classes and API client methods |
| PHP | Typed classes for your content model |

Select which collections to include, then copy the code or download it as a file.

## AI-Assisted Schema Design

The Studio includes a chat panel (`SchemaChatPanel`) that uses AI to help design your schema. You can:

- Describe your content model in natural language
- Ask for schema improvements
- Generate sample data for testing

The AI panel communicates with the server via SSE streaming at `/api/projects/{uuid}/studio/ai-chat`.

## Search

The **Search** tab provides full-text search across all collections in the project. Results can be filtered by collection and locale.

## Audit Logs

The **Audit** tab displays a log of tool execution for the project, with expandable detail views showing the input and output of each operation.

## AI Guide

The **AI Guide** tab generates a comprehensive Markdown context document describing your project. It includes:

- Project facts (name, UUID, locales)
- API endpoints and their URLs
- Complete collection schemas with all fields
- End-user custom field definitions

This document can be shared with AI assistants to help them understand your content model.
