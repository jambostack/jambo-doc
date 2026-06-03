---
title: Cloning Projects
description: Duplicate an existing Jambo project including its schema and optionally its content.
---

Cloning a project creates a full copy — including all collections, field definitions, and settings. You can choose whether to include content entries and media files.

## When to clone

- **Staging environment** — clone production to test schema changes before going live
- **New client project** — start from an existing schema instead of from scratch
- **Backup** — snapshot before a major schema refactor

## How to clone

1. From the main dashboard, find the project you want to clone
2. Click the **...** menu then **Clone project**
3. Configure the clone:

| Option | Description |
|--------|-------------|
| **New project name** | Display name for the cloned project |
| **New project slug** | API identifier for the new project |
| **Copy content entries** | Clone all content entries (not just the schema) |
| **Copy media files** | Duplicate files in the media library |

4. Click **Clone**

Cloning runs in the background. For large projects it may take a few minutes.

## After cloning

The cloned project is fully independent:
- New UUID and API tokens (generate new ones in **Project Settings → API Access**)
- Same collections and field definitions
- Webhooks are not cloned — configure them separately
- Changes to one project do not affect the other

## Limitations

- Relations between entries are preserved within the cloned project
- When using S3 storage, media files are not duplicated — both projects reference the same files on S3
