---
title: Projects — Introduction
description: Projects are the top-level containers for your content in Jambo.
---

A **project** is the top-level container for your CMS content. Each project has its own:

- Collections and fields
- Content entries
- Media library
- API tokens and access settings
- Locales and translation settings
- Webhooks

You can create multiple projects on a single Jambo installation — for example, one project per website or application.

## Creating a project

1. Log in to the Jambo admin panel
2. Click **+ New Project** on the dashboard
3. Enter a project name and slug
4. Choose the default locale
5. Click **Create**

Your project is immediately ready with an auto-generated UUID and API endpoint.

## Project UUID

Every project has a unique UUID (e.g. `f99cb038-6611-44d3-b1c7-46cf62c1e232`). This UUID is used in all API requests:

```
https://your-domain.com/api/{project-uuid}/collection-slug
```

Find your project UUID in **Project Settings → API Access**.

## What's next

- [Creating Projects](/projects/creating-projects/) — Step-by-step guide
- [Collections](/projects/collections/what-are-collections/) — Define your content structure
- [Content API](/api/introduction/) — Connect your frontend
