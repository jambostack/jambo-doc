---
title: التثبيت
description: قم بتثبيت Jambo API على خادمك في دقائق.
---

## المتطلبات

- **PHP 8.4+** مع الإضافات: `ctype`، `iconv`، `sodium`
- **Composer**
- **MySQL 8+**، أو PostgreSQL 14+، أو SQLite
- **Node.js 18+** + npm (لأصول الواجهة الأمامية)
- اختياري: **Meilisearch** (للبحث النصي الكامل)، **Symfony CLI**

## التثبيت عبر Composer (موصى به)

```bash
composer create-project jambostack/jambo-api مشروعي
cd مشروعي
```

هذا ينشئ مشروعاً جديداً مع جميع التبعيات المثبتة. انتقل إلى قسم الإعداد.

## التثبيت عبر Git

```bash
git clone https://github.com/jambostack/jambo-api.git
cd jambo-api

composer install --no-dev --optimize-autoloader
npm install && npm run build
```

## الإعداد

```bash
cp .env.example .env
```

قم بتحرير `.env` بإعدادات قاعدة البيانات والتطبيق الخاصة بك، ثم شغل:

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console app:setup
```

يقوم الأمر `app:setup` بإنشاء حساب المسؤول وعرض بيانات الاعتماد. القيم الافتراضية:

| الحقل        | القيمة الافتراضية           |
|--------------|-----------------------------|
| البريد الإلكتروني | `admin@jambostack.site` |
| كلمة المرور  | `admin1234`                 |

يمكنك تخصيصها:

```bash
php bin/console app:setup --email="you@example.com" --password="كلمةمرورقوية123"
```

:::caution
قم بتغيير كلمة المرور فوراً بعد تسجيل الدخول الأول: الصورة الرمزية (أعلى اليمين) → **الإعدادات → الأمان**.
:::

## التحقق

ابدأ خادم Symfony المحلي:

```bash
symfony serve -d
```

افتح `https://localhost:8000` وقم بتسجيل الدخول. API الخاص بك جاهز على `https://localhost:8000/api/{project-uuid}`.

## الخطوات التالية

- [بداية سريعة](/ar/guides/quick-start/) — أنشئ مجموعتك الأولى
- [الإعدادات](/ar/guides/configuration/) — مرجع متغيرات البيئة
- [النشر](/ar/guides/deployment/) — دليل النشر في الإنتاج
