---
title: Creating & Editing Content
description: How to create and edit content entries in the Jambo editor.
---

## Creating an entry

1. Open a project and click a collection in the sidebar
2. Click **+ New Entry**
3. Fill in the fields
4. Click **Save as Draft** or **Publish**

## The editor

Each entry has a form with fields based on the collection's schema. Field types render different controls:

| Field type | Editor control |
|------------|---------------|
| `text` | Single-line input |
| `longtext` | Multi-line textarea |
| `richtext` | WYSIWYG editor with AI tools |
| `number` / `decimal` | Number input |
| `boolean` | Toggle switch |
| `date` / `datetime` | Date picker |
| `enumeration` | Dropdown select |
| `media` | Media picker with upload |
| `relation` | Entry picker with search |
| `json` | JSON code editor |
| `color` | Color picker |

## Autosave

The editor autosaves your changes every 30 seconds. The save indicator in the header shows the last saved time.

## Publishing

Click **Publish** to make the entry visible in the public API. Click **Unpublish** to revert to draft.

## Locale

Select the locale from the dropdown in the header. To translate an entry, switch to the target locale and either create a new entry or use [AI Translation](/ai/ai-translation/).

## Version history

Click **History** (clock icon) in the top toolbar to see all previous versions. Click a version to preview it, then **Restore** to roll back.

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` / `Cmd+S` | Save |
| `Ctrl+Z` / `Cmd+Z` | Undo (in rich text editor) |
