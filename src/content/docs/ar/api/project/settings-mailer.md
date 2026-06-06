---
title: تكوين SMTP البريد للمشروع
description: قراءة وتعديل واختبار تكوين SMTP لمشروع محدد.
---

يمكن لكل مشروع Jambo أن يكون له خادم SMTP خاص به. يتم استخدام البريد لإرسال الرسائل (نماذج الاتصال، إعادة تعيين كلمة المرور، إلخ). يتم تشفير كلمة المرور على الخادم باستخدام XSalsa20-Poly1305.

```http
GET    /api/projects/{projectUuid}/settings/mailer
PUT    /api/projects/{projectUuid}/settings/mailer
POST   /api/projects/{projectUuid}/settings/mailer/test
```

## المصادقة

يتطلب إما:
- **جلسة مسؤول** صالحة (للوحة الإدارة)
- **رمز API** مع صلاحية `create`

```bash
Authorization: Bearer TOKEN_API
```

---

## GET — قراءة تكوين SMTP

```bash
curl https://your-domain.com/api/projects/{projectUuid}/settings/mailer \
  -H "Authorization: Bearer TOKEN_API"
```

### الاستجابة (مُكوّن)

```json
{
  "data": {
    "host": "smtp.resend.com",
    "port": 587,
    "username": "resend",
    "encryption": "tls",
    "from_email": "noreply@example.com",
    "from_name": "مشروعي",
    "enabled": true
  }
}
```

---

## PUT — إنشاء أو تعديل تكوين SMTP

```bash
curl -X PUT https://your-domain.com/api/projects/{projectUuid}/settings/mailer \
  -H "Authorization: Bearer TOKEN_API" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "smtp.gmail.com",
    "port": 587,
    "username": "apikey",
    "password": "كلمة-المرور",
    "encryption": "tls",
    "from_email": "noreply@example.com",
    "from_name": "مشروعي",
    "enabled": true
  }'
```

| الحقل | النوع | مطلوب | الوصف |
|-------|------|--------|-------------|
| `host` | `string` | لا | مضيف SMTP (متحقق: لا IP خاص) |
| `port` | `integer` | لا | منفذ SMTP. مسموح: `25`, `465`, `587`, `2525` |
| `username` | `string` | لا | اسم المستخدم SMTP |
| `password` | `string` | لا | كلمة مرور SMTP (مشفرة عند التخزين) |
| `encryption` | `string` | لا | `tls`, `ssl`, أو `none` |
| `from_email` | `string` | لا | بريد المرسل |
| `from_name` | `string` | لا | اسم المرسل |
| `enabled` | `boolean` | لا | تفعيل أو تعطيل البريد |

---

## POST — إرسال بريد تجريبي

```bash
curl -X POST https://your-domain.com/api/projects/{projectUuid}/settings/mailer/test \
  -H "Authorization: Bearer TOKEN_API"
```

### الاستجابة (نجاح)

```json
{ "sent": true }
```

### الاستجابة (فشل)

```json
{ "error": "فشل الإرسال. تحقق من تكوين SMTP." }
```

## رموز الحالة

| الحالة | الوصف |
|--------|-------------|
| `200` | تمت القراءة أو التعديل بنجاح |
| `400` | مضيف غير صالح أو منفذ غير صالح |
| `403` | تم رفض الوصول |
| `404` | المشروع غير موجود |
| `422` | البريد غير مُكوّن أو معطل |

## الإرسال البرمجي

```php
use App\Service\ProjectMailerService;
use App\Message\Attachment;

$mailerService->send(
    project: $project,
    to: 'client@example.com',
    subject: 'مرحباً!',
    body: 'نص احتياطي',
    htmlBody: '<h1>مرحباً!</h1><p>شكراً لتسجيلك.</p>',
    replyTo: 'support@example.com',
    cc: ['manager@example.com'],
    bcc: ['archive@example.com'],
    attachments: [
        new Attachment(
            content: file_get_contents('/path/report.pdf'),
            filename: 'تقرير_شهري.pdf',
            mimeType: 'application/pdf',
        ),
    ],
);
```

يتم إرسال الرسائل بشكل **غير متزامن** عبر Symfony Messenger وتسجيلها في جدول `email_log`.
