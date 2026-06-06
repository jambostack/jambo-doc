---
title: Configure Project SMTP Mailer
description: Read, update, and test the SMTP configuration for a specific project.
---

Each project in Jambo can have its own SMTP server configuration. The mailer is used for sending emails (contact forms, password resets, etc.) via the project's own SMTP credentials. The password is encrypted server-side using XSalsa20-Poly1305.

```http
GET    /api/projects/{projectUuid}/settings/mailer
PUT    /api/projects/{projectUuid}/settings/mailer
POST   /api/projects/{projectUuid}/settings/mailer/test
```

## Authentication

Requires either:
- A valid **admin session** (cookie-based, for the admin UI)
- An **API token** with the `create` ability

```bash
Authorization: Bearer YOUR_API_TOKEN
```

---

## GET — Read SMTP Configuration

```bash
curl https://your-domain.com/api/projects/{projectUuid}/settings/mailer \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

### Response (configured)

```json
{
  "data": {
    "host": "smtp.resend.com",
    "port": 587,
    "username": "resend",
    "encryption": "tls",
    "from_email": "noreply@example.com",
    "from_name": "My Project",
    "enabled": true
  }
}
```

### Response (not configured)

```json
{
  "data": null
}
```

---

## PUT — Create or Update SMTP Configuration

```bash
curl -X PUT https://your-domain.com/api/projects/{projectUuid}/settings/mailer \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "smtp.gmail.com",
    "port": 587,
    "username": "apikey",
    "password": "your-app-password",
    "encryption": "tls",
    "from_email": "noreply@example.com",
    "from_name": "My Project",
    "enabled": true
  }'
```

### Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `host` | `string` | No | SMTP hostname (validated: no private IPs) |
| `port` | `integer` | No | SMTP port. Allowed: `25`, `465`, `587`, `2525` |
| `username` | `string` | No | SMTP authentication username |
| `password` | `string` | No | SMTP password (only updated if provided, encrypted at rest) |
| `encryption` | `string` | No | `tls`, `ssl`, or `none` |
| `from_email` | `string` | No | Sender email address (valid email required) |
| `from_name` | `string` | No | Sender display name |
| `enabled` | `boolean` | No | Enable or disable the mailer |

### Response

```json
{
  "data": {
    "host": "smtp.gmail.com",
    "port": 587,
    "username": "apikey",
    "encryption": "tls",
    "from_email": "noreply@example.com",
    "from_name": "My Project",
    "enabled": true
  }
}
```

---

## POST — Send Test Email

Sends a test email to the configured `from_email` address using the project's SMTP settings.

```bash
curl -X POST https://your-domain.com/api/projects/{projectUuid}/settings/mailer/test \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

### Response (success)

```json
{
  "sent": true
}
```

### Response (failure)

```json
{
  "error": "Failed to send test email. Check your SMTP configuration and try again."
}
```

## Status codes

| Status | Description |
|--------|-------------|
| `200` | Configuration read or updated successfully |
| `400` | Invalid host (private IP) or invalid port |
| `403` | Access denied |
| `404` | Project not found |
| `422` | Mailer not configured or disabled |

## Email sending (programmatic)

To send emails from your application, use the public email endpoint:

```http
POST /api/{projectUuid}/email
```

This endpoint supports **captcha** protection, **rate limiting**, and **honeypot** spam detection. See the [Contact Form](/api/email/send) documentation.

For **programmatic email sending** from your backend, use the `ProjectMailerService` directly:

```php
use App\Service\ProjectMailerService;
use App\Message\Attachment;

// Send with HTML body, CC, BCC, and attachments
$mailerService->send(
    project: $project,
    to: 'user@example.com',
    subject: 'Welcome!',
    body: 'Plain text fallback',
    htmlBody: '<h1>Welcome!</h1><p>Thank you for signing up.</p>',
    replyTo: 'support@example.com',
    cc: ['manager@example.com'],
    bcc: ['archive@example.com'],
    attachments: [
        new Attachment(
            content: file_get_contents('/path/to/report.pdf'),
            filename: 'monthly_report.pdf',
            mimeType: 'application/pdf',
        ),
    ],
);
```

Emails are dispatched **asynchronously** via Symfony Messenger and logged in the `email_log` table for audit.
