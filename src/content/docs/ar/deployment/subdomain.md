---
title: Subdomain (Shared Hosting)
description: Configure a subdomain to serve your Jambo API on shared hosting.
---

:::note
هذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.
:::


If your main website runs on `example.com` and you want Jambo to run on `api.example.com`, configure a subdomain pointing to the Jambo installation.

## Step 1 — Create the subdomain

In your hosting control panel (cPanel / DirectAdmin / Plesk):

1. Go to **Subdomains** or **Domain Management**
2. Create a new subdomain: `api.example.com`
3. Set the document root to Jambo's `public/` folder

## Step 2 — Point the document root to `public/`

Jambo's entry point is `public/index.php`. Set the subdomain document root to:

```
/home/username/jambo/public
```

If your host does not allow custom document roots, place the contents of `public/` in `public_html/` and update `public_html/index.php` to reference the project root:

```php
// Update this line to point to your project root
require_once dirname(__DIR__) . '/jambo/vendor/autoload_runtime.php';
```

## Step 3 — Configure APP_HOSTNAME

In your `.env`:

```ini
APP_HOSTNAME=api.example.com
DEFAULT_URI=https://api.example.com
```

## Step 4 — Enable SSL

Enable a free Let's Encrypt SSL certificate for your subdomain from the **SSL/TLS** section of your control panel.

Once active, your API is available at `https://api.example.com/api/{project-uuid}/`.

## Step 5 — Run migrations via SSH

```bash
cd ~/jambo
php bin/console doctrine:migrations:migrate
php bin/console app:setup    # first time only
php bin/console cache:warmup
```

## Troubleshooting

**403 or blank page** — check that the document root points to `public/` and that `index.php` can find `autoload_runtime.php`.

**Mixed content warnings** — ensure `DEFAULT_URI` uses `https://` and that all uploads are served over HTTPS.
