---
title: Project Details
description: Understand the project dashboard and key information in Jambo.
---

:::note
هذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.
:::


The project dashboard gives you an overview of your project. Access it by clicking a project from the main dashboard.

## Dashboard overview

| Section | Description |
|---------|-------------|
| **Collections** | Number of collections with quick-access links |
| **Entries** | Total content entries across all collections |
| **Media** | Number of files in the media library and storage used |
| **API** | Quick-copy for the project UUID and API base URL |
| **Recent activity** | Last 10 content changes with author and timestamp |

## Project UUID

Your project UUID is the unique identifier used in every API call:

```
https://your-domain.com/api/{project-uuid}/collection-slug
```

Find it in the dashboard header or in **Project Settings → API Access**.

## API base URL

Copy the API base URL from the dashboard and paste it into your frontend `.env`:

```ini
NEXT_PUBLIC_JAMBO_API=https://your-domain.com/api/f99cb038-...
JAMBO_TOKEN=your-api-token
```

## Content summary

The dashboard shows entry counts per collection, broken down by:
- **Published** — visible in the public API
- **Draft** — hidden from the public API
- **Trashed** — soft-deleted, in the trash

## Quick actions

From the project dashboard you can:
- **Open Studio** — launch the AI chat for schema and content generation
- **View API docs** — open the auto-generated OpenAPI spec in Swagger UI
- **Copy API URL** — copy the project API base URL to the clipboard
