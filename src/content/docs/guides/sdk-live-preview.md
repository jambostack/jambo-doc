---
title: Live Preview SDK
description: Using the @jambostack/live-preview npm package to enable real-time content preview on your frontend.
---

Jambo CMS provides a live preview system that lets content editors see changes in real time as they edit. The frontend SDK (`@jambostack/live-preview`) bridges your frontend application to the Jambo admin panel via `postMessage` and JWT-authenticated API calls.

## Architecture

The live preview works in two directions:

- **Admin panel** (iframe host): Sends updated field data to the frontend iframe whenever the editor makes a change
- **Frontend iframe**: Receives updates, re-renders content, and sends hover/click events back for visual editing

Communication happens through `postMessage` between the Jambo admin panel (parent window) and your frontend (iframe).

## Installation

```bash
npm install @jambostack/live-preview
```

The package exports two entry points:

- `@jambostack/live-preview/core` — Vanilla JS, works with any framework
- `@jambostack/live-preview/next` — React hook for Next.js

## Next.js / React

### useLivePreview Hook

```tsx
import { useLivePreview } from '@jambostack/live-preview/next';

export default function BlogPost({ initialData }) {
  const { data, isPreview } = useLivePreview({ initialData });

  return (
    <article>
      <h1>{data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.body }} />
    </article>
  );
}
```

The hook accepts `initialData` (the data fetched server-side) and returns:

| Return value | Type | Description |
|---|---|---|
| `data` | `Record<string, any>` | Current entry data, updated in real time |
| `isPreview` | `boolean` | Whether the page is in preview mode |
| `fieldProps` | `(slug, type?) => object` | Generates `data-jambo-*` attributes for visual editing |

### Visual Editing

Add `data-jambo-*` attributes to HTML elements using `fieldProps()`:

```tsx
const { data, isPreview, fieldProps } = useLivePreview({ initialData });

return (
  <article>
    <h1 {...fieldProps('title', 'text')}>{data.title}</h1>
    <div {...fieldProps('body', 'rich-text')}>
      <RichText content={data.body} />
    </div>
    <img {...fieldProps('cover', 'media')} src={data.cover} />
  </article>
);
```

Supported field types: `text`, `textarea`, `number`, `email`, `url`, `slug`, `rich-text`, `media`.

Visual editing features:

- **Hover**: Blue outline on the element in the iframe; the corresponding field highlights in the admin panel
- **Click on text field**: An inline popover editor appears for quick edits
- **Click on complex field**: Admin panel scrolls to and focuses the field

## Vanilla JS / Other Frameworks

```ts
import { subscribe, initVisualEditing } from '@jambostack/live-preview/core';

const unsub = subscribe({
  onInit: async (ctx) => {
    const res = await fetch(`/api/content/${ctx.collection}/${ctx.entryUuid}`);
    return res.json();
  },
  onUpdate: (data) => {
    document.getElementById('title')!.textContent = data.title;
  },
});
```

### subscribe()

| Option | Type | Description |
|---|---|---|
| `onInit` | `(ctx: PreviewContext) => Promise<Record<string, any>>` | Called when the admin sends the init message; fetch initial data here |
| `onUpdate` | `(data: Record<string, any>) => void` | Called whenever the admin sends updated field data |
| `debug` | `boolean` | Enable console logging |
| `targetOrigin` | `string` | Origin to restrict postMessage to (default: `*`) |

The `PreviewContext` provides: `entryUuid`, `collection`, `locale`, `token` (JWT), and `projectUuid`.

### initVisualEditing()

```ts
const cleanup = initVisualEditing({
  allowedOrigin: 'https://admin.your-domain.com',
  inlineEditEnabled: true,
  debug: false,
});
```

Injects CSS for hover outlines, attaches mouse listeners to `[data-jambo-field]` elements, and shows an inline popover editor on click.

## How It Works

### Query Parameters

When the admin panel opens your frontend in an iframe, it appends query parameters:

```
https://your-frontend.com/blog/my-post?jambo_preview=<jwt>&jambo_entry=<uuid>&jambo_collection=<slug>&jambo_locale=<locale>&jambo_project=<uuid>
```

The SDK detects these parameters and activates preview mode.

### PostMessage Protocol

| Direction | Message | When |
|---|---|---|
| Iframe to Admin | `jambo-ready` | Page loaded and SDK initialized |
| Admin to Iframe | `jambo-init` | Sends collection, entry UUID, locale, token, project UUID |
| Iframe to Admin | `jambo-error` | Initialization failed |
| Iframe to Admin | `jambo-hover-field` | User hovers a field |
| Iframe to Admin | `jambo-select-field` | User clicks a field |
| Iframe to Admin | `jambo-inline-update` | User submits an inline edit |
| Admin to Iframe | `jambo-update` | Updated field data (debounced 500ms) |
| Admin to Iframe | `jambo-navigate` | Locale change |

### Backend Preview API

The Jambo CMS provides two endpoints (both require admin authentication):

| Endpoint | Purpose |
|---|---|
| `GET /api/projects/{projectUuid}/preview/token/{entryUuid}` | Generate a preview JWT token (valid 1 hour) |
| `GET /api/projects/{projectUuid}/preview/content/{collection}/{entryUuid}` | Fetch full entry data including drafts |

The token contains claims for `sub=preview`, project UUID, entry UUID, collection slug, and status. The content endpoint validates the token before returning data.

## Prerequisites

Before live preview works, the project must be configured in the admin panel:

1. **Preview URL**: Set in Project Settings (the URL of your frontend)
2. **Preview enabled**: Toggle on in Project Settings
3. **Preview mode**: Choose between `toggle` (tab) or `side-by-side` (split pane)

The project entity stores these as `previewUrl`, `previewEnabled`, and `previewMode`.
