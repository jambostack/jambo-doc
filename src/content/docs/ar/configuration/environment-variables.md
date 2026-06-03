---
title: الإعدادات
description: قم بإعداد متغيرات البيئة لـ Jambo API.
---

انسخ `.env.example` إلى `.env` واملأ القيم:

```ini
APP_ENV=prod
APP_SECRET=           # سلسلة عشوائية من 32 حرفاً: openssl rand -hex 32
APP_HOSTNAME=         # نطاقك، مثال api.example.com

DATABASE_URL=         # mysql://user:pass@host/db?serverVersion=8.0.32&charset=utf8mb4

MAILER_DSN=           # smtp://user:pass@smtp.example.com:587
MEILISEARCH_HOST=     # http://localhost:7700
MEILISEARCH_KEY=      # مفتاح Meilisearch الرئيسي
```

## مزودو الذكاء الاصطناعي

يتم إعداد مفاتيح الذكاء الاصطناعي في **المسؤول → إعدادات التطبيق → تبويب مزودي الذكاء الاصطناعي**، وليس عبر متغيرات البيئة. هذا يسمح بتحديث المفاتيح دون إعادة النشر.
