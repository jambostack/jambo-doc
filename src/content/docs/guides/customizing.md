---
title: Customizing
description: How to customize the Jambo CMS admin panel — templates, themes, branding, and extending the UI.
---

Jambo CMS is built on Symfony 8.0 with an Inertia.js React frontend and Tailwind CSS. Customization focuses on the admin panel's appearance, available templates, and branding options.

## Template Customization

Jambo uses Twig for server-rendered templates, primarily for emails, login pages, and invitation flows.

### Available Templates

The `templates/` directory contains:

```text
templates/
  base.html.twig              # Base layout (used by login, invitation pages)
  app.html.twig               # Main app shell (Inertia.js mount point)
  email/
    two_factor_code.html.twig # Two-factor authentication email
  invitation/
    invalid.html.twig         # Invalid invitation page
  security/
    login.html.twig           # Customizable login page
```

### Overriding Templates

To customize a template, edit the file in `templates/`. For example, to brand the login page:

```twig
{# templates/security/login.html.twig #}
{% extends 'base.html.twig' %}

{% block title %}Sign in to {{ app_name }}{% endblock %}

{% block body %}
<div class="login-container">
  <img src="{{ asset('images/logo.svg') }}" alt="Your logo" />
  <form method="post">
    {# ... #}
  </form>
</div>
{% endblock %}
```

## Admin UI Customization

The admin panel is a React single-page application built with Inertia.js and Tailwind CSS. The source lives in `assets/js/`.

### Application Shell

The main application shell is `templates/app.html.twig`, which renders the Inertia.js bootstrap:

```twig
<!DOCTYPE html>
<html>
<head>
  {% block stylesheets %}
    {{ encore_entry_link_tags('app') }}
  {% endblock %}
</head>
<body>
  {{ inertia() }}
  {% block javascripts %}
    {{ encore_entry_script_tags('app') }}
  {% endblock %}
</body>
</html>
```

The Inertia app is bootstrapped in `assets/app.js`:

```js
import { createInertiaApp } from '@inertiajs/react';
import { TranslationProvider } from './js/components/TranslationProvider';

createInertiaApp({
  resolve: (name) => {
    const pages = require.context('./js/pages', true, /\.tsx$/);
    return pages(`./${name}.tsx`);
  },
  setup({ el, App, props }) {
    // Theme, locale, translations are injected from server props
  },
});
```

### Theme Variables

The admin panel uses CSS custom properties defined in `assets/styles/app.css`. Key variables:

```css
:root {
  --color-primary: #3b82f6;        /* Blue-500 */
  --color-primary-hover: #2563eb;
  --color-sidebar-bg: #1e293b;     /* Slate-800 */
  --color-sidebar-text: #e2e8f0;
  --color-bg: #f8fafc;             /* Slate-50 */
  --color-surface: #ffffff;
  --color-text: #0f172a;           /* Slate-900 */
  --color-border: #e2e8f0;         /* Slate-200 */
  --font-family: 'Inter', sans-serif;
  --border-radius: 8px;
}
```

Override these by editing `assets/styles/app.css` or importing a custom CSS file in `assets/app.js`.

### Webpack Configuration

Asset bundling is handled by Symfony Webpack Encore. The configuration is in `webpack.config.js`:

```js
// webpack.config.js
Encore
  .setOutputPath('public/build/')
  .setPublicPath('/build')
  .addEntry('app', './assets/app.js')
  .enableReactPreset()
  .enableTypeScriptLoader()
  .enablePostCssLoader()
  .enableSingleRuntimeChunk()
  .splitEntryChunks()
  .cleanupOutputBeforeBuild();
```

Custom loaders or aliases can be added:

```js
Encore.addAliases({
  '@components': path.resolve(__dirname, 'assets/js/components'),
  '@lib': path.resolve(__dirname, 'assets/js/lib'),
});
```

After any CSS or JavaScript change, rebuild assets:

```bash
npm run build
```

## Adding Custom React Components

Components are organized in `assets/js/components/`. To add a custom page or modify an existing one:

1. Create a component in `assets/js/components/`
2. Register a page in `assets/js/pages/` (following Inertia conventions)
3. Bind a Symfony route to the Inertia page using the `Inertia` response helper

## Language / Localization

Translations are managed server-side and injected into the React app. The `TranslationProvider` component in `assets/js/components/TranslationProvider.tsx` wraps the application.

To add or edit strings, modify the translation files (configured in Symfony's translation system under `translations/`).
