---
title: Adding Fields
description: How to add fields to a collection in Jambo.
---

:::note
هذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.
:::


Fields define the data structure of a collection. Each entry in the collection stores a value for each field.

## Add a field

1. Open your project → **Settings → Collections**
2. Click on the collection you want to edit
3. Click **+ Add Field**
4. Choose a [field type](/projects/collections/field-types/)
5. Configure the field:

| Option | Description |
|--------|-------------|
| **Name** | Display label in the editor (e.g. `Featured Image`) |
| **Slug** | API key — auto-generated, lowercase, underscored (e.g. `featured_image`) |
| **Required** | Toggle on to make the field mandatory |
| **Options** | Type-specific settings (enumeration values, relation target, etc.) |

6. Click **Save**

## Required field options

### Enumeration fields

You must provide the list of allowed values:

```
draft, published, archived
```

### Relation fields

You must specify the **target collection** slug. Example: setting `end_users` as the target links to the built-in users collection.

## Reordering fields

Drag fields up and down in the field list to change their display order in the editor. The API always returns all fields regardless of order.

## Editing a field

Click the pencil icon on any field to edit its name, required status, or options. The slug **cannot be changed** after creation (it would break existing API consumers).

## Deleting a field

Click the trash icon on a field to delete it. This **permanently deletes all stored values** for that field across all entries.

:::caution
Deleting a field is irreversible. Export your data first if you need to keep the values.
:::
