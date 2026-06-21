---
title: Workflows
description: Custom content statuses, transitions, assignments, and the publishing workflow.
---

## Overview

Jambo's workflow system allows you to define **custom statuses** for each collection. Statuses control the editorial lifecycle — from draft through review to publication — and determine whether entries are publicly accessible.

Workflows are configured as **JSON embedded in the Collection** entity's `settings` field.

## How workflows work

Each **Collection** defines its own workflow via `$settings['workflow']`. The configuration supports:

- Custom status slugs and labels
- Color-coded status badges in the Studio
- A default status for new entries
- A "published" flag that controls public API visibility

The `ContentEntry.status` string stores the current status of each entry.

## Status definitions

Statuses are arrays with four properties:

| Property | Type | Description |
|---|---|---|
| `slug` | `string` | Machine name (e.g. `review`) |
| `label` | `string` | Human-readable label (e.g. "In Review") |
| `color` | `string` | Hex color for UI badges (e.g. `#f59e0b`) |
| `published` | `bool` | Whether entries in this status are publicly visible |

### Default statuses

```json
[
  {"slug": "draft",     "label": "Draft",     "color": "#6b7280", "published": false},
  {"slug": "published", "label": "Published", "color": "#10b981", "published": true}
]
```

### Custom workflow example

```json
{
  "workflow": {
    "defaultStatus": "draft",
    "statuses": [
      {"slug": "draft",       "label": "Draft",        "color": "#6b7280", "published": false},
      {"slug": "review",      "label": "In Review",    "color": "#f59e0b", "published": false},
      {"slug": "approved",    "label": "Approved",     "color": "#3b82f6", "published": false},
      {"slug": "published",   "label": "Published",    "color": "#10b981", "published": true},
      {"slug": "archived",    "label": "Archived",     "color": "#ef4444", "published": false}
    ]
  }
}
```

Statuses are stored per-collection in the `Collection.settings` JSON column.

## System statuses

Two statuses are always valid, even when not in the workflow config:

| Status | Description |
|---|---|
| `draft` | New entries default to this |
| `scheduled` | Entry will auto-publish at `scheduledAt` |

## Status transitions

When an entry's status changes, the following happens automatically:

- **Transitioning to `published`**: sets `publishedAt` to the current timestamp
- **Transitioning from `scheduled` to `published`**: clears `scheduledAt`
- **Every status change**: dispatches the `content.status_changed` event

The **Scheduled Publishing** console command (`app:publish-scheduled`, from `src/Command/PublishScheduledEntriesCommand.php`) automatically transitions scheduled entries to `published` when their `scheduledAt` time arrives.

## Assignments

Entries can be **assigned** to a project member for review or editing. The `assignedTo` field stores a `User` reference. Assignments trigger **notifications** (type `'status_change'`) when the assigned entry's status changes.

## Notifications

The `NotificationSubscriber` (`src/EventSubscriber/NotificationSubscriber.php`) creates notifications for:

- Status changes on assigned entries
- Comments left on assigned entries
- @mentions in comments

## Real-time updates

Status changes are published in real-time via Mercure on the `projects/{uuid}/status` topic:

```json
{
  "event": "status.changed",
  "data": {
    "entry": "...",
    "from": "draft",
    "to": "published",
    "title": "...",
    "time": "..."
  }
}
```

## API integration

The collection's workflow is exposed through the public API:

```
GET /public-api/collections/{slug}
```

Returns the `workflow` object containing `statuses` and `defaultStatus`.

When creating or updating entries, the `status` field is validated against the collection's workflow statuses plus the system statuses (`draft`, `scheduled`).

## See also

- [Collections](/features/collections/) — workflow configuration storage
- [Content](/features/content/) — per-entry status and scheduling
- [Real-time](/features/realtime/) — live status change events
- [Auth](/features/auth/) — user assignments and permissions
