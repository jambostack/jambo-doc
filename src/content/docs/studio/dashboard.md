---
title: Dashboard
description: Project management, navigation, import/export, and user administration in the JamboApi Studio.
---

The Studio Dashboard is the main landing page after login. It provides a card-based overview of all your projects, quick access to create or import projects, and navigation to project-specific features.

## Project List

The dashboard displays all projects in a responsive card grid. Each project card shows:

- **Project name** and **description**
- **Default locale** (e.g., EN, FR, ES, AR)
- **Content counts**: collections, content entries, and assets

### Search and Filter

A search bar at the top filters projects by name in real time. The results update as you type.

## Project Actions

### Create Project

Clicking the **Create Project** button opens a modal with the following fields:

| Field | Type | Description |
|-------|------|-------------|
| Name | Text (required) | Project display name |
| Description | Textarea | Project description |
| Default Locale | Select | Primary content locale |
| Project Type | Select | `Blank` (start empty) or `From Template` |
| Template | Select | Available only when "From Template" is selected |
| Add Demo Data | Checkbox | Pre-populates the project with sample collections and content |

On creation, the API returns a new project UUID and you are redirected to the project detail page.

### Import Project

The **Import** button opens a two-step import flow:

1. **Upload** -- Drag and drop a `.zip` file (exported from another JamboApi project) or click to browse
2. **Preview** -- The file is uploaded and analyzed. You see a summary of what it contains (collections, entries, media files, settings)
3. **Confirm** -- Choose to import as a **new project** (enter a name) or **merge into an existing project** (select from a list)

During merge, you can choose conflict resolution strategies:

| Strategy | Description |
|----------|-------------|
| `skip` | Keep existing data, skip conflicting items |
| `overwrite` | Replace existing data with imported data |
| `new_uuids` | Assign new UUIDs to conflicting items, keep both |

### Export Project

The export modal lets you select what to include in the download:

| Option | Default | Description |
|--------|---------|-------------|
| Structure | Always enabled | Collections and field definitions |
| Content | Optional | All content entries |
| Media | Optional | Uploaded media files |
| Settings | Optional | Project configuration |
| End Users | Optional | End-user data |

The export is downloaded as a `.zip` file via the API.

## Project Detail View

After selecting a project, you see the project detail page with:

### Identity Card

- Project name, UUID, description
- Default locale and available locales
- Storage strategy (local, S3-compatible, or other)

### Statistics

Quick-reference cards showing:
- **Collections** count
- **Content entries** count
- **Assets** count

### Quick Actions

A grid of action cards providing direct access to:

| Action | Description |
|--------|-------------|
| Asset Library | Browse and manage media files |
| Settings | Project configuration and localization |
| User Access | Manage project members and permissions |
| API Access | View and manage API tokens |
| API Docs | OpenAPI specification and documentation |
| Webhooks | Configure webhook endpoints |
| End Users | Manage end-user accounts |

### Additional Project Actions

| Action | Description |
|--------|-------------|
| Save as Template | Export the project structure as a reusable template |
| Clone Project | Create an exact copy of the project |
| Export | Download the project as a `.zip` archive |
| Import | Import content into this project |

## Navigation

The Studio uses a sidebar navigation layout:

### Main Sidebar

- **Dashboard** link (returns to project list)
- **Project list** with drag-and-drop reorderable collections
- Quick action links (Settings, API Access, End Users)

### Collection Navigation

Within a project, the sidebar lists all collections. Collections can be reordered via drag and drop. Clicking a collection opens its content entry list.

### Mobile Navigation

On mobile viewports, the sidebar collapses into a slide-out drawer accessible via a hamburger menu.

### Breadcrumbs

Breadcrumb navigation is shown in the header area, displaying the current location path (e.g., Dashboard > Project Name > Collection Name).

## User Management

### Profile

Users can access their profile via the user menu in the header. Profile settings include:

- Name and email
- Avatar upload
- Password change
- Language preference

### Team Administration (Admin Settings)

Administrators have access to a global settings panel with:

- **App Settings** -- Global application configuration, including AI provider setup (see [AI Assistant](/studio/ai-assistant))
- **User Management** -- List, create, and manage system users and their roles

## Header Components

The app header provides:

- **Dashboard** link
- **Language switcher** (to toggle the Studio UI language)
- **Notification bell** (real-time notifications via Mercure/SSE)
- **User menu** (profile, settings, logout)
- **Appearance toggle** (light/dark mode)

## Real-Time Notifications

The Studio uses Server-Sent Events (SSE) via Mercure for real-time updates. The notification bell displays updates about:

- Content changes by other team members
- System notifications
- Webhook delivery status

A real-time token endpoint (`/api/projects/{projectUuid}/realtime/token`) provides the necessary connection credentials.

## Internationalization

The Studio UI supports multiple languages. Translations are served from the server and include English, French, Spanish, and Arabic. The UI language can be switched via the header language switcher.

## Appearance

The dashboard supports both light and dark modes. The appearance can be toggled via the header dropdown (light, dark, or system preference).
