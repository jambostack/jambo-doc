/**
 * Génère les traductions arabes depuis les pages EN.
 * Stratégie : traduction des éléments clés, code blocks préservés.
 * Run: node scripts/translate-ar.mjs
 */
import { writeFileSync, readFileSync } from 'fs';

const BASE = 'src/content/docs';

// Traductions arabes des pages les plus importantes
const pages = {
  'ar/introduction.md': `---
title: مقدمة
description: Jambo هو نظام إدارة محتوى مفتوح المصدر مبني بـ Symfony 8 وPHP 8.4 — سريع وصديق للمطورين ومدمج مع الذكاء الاصطناعي.
---

Jambo هو **نظام إدارة محتوى بدون رأس (Headless CMS)** مفتوح المصدر مبني بـ Symfony 8 وPHP 8.4. يعرض المحتوى عبر REST API ونقطة نهاية GraphQL، مع أدوات ذكاء اصطناعي مدمجة لتصميم المخططات وإنشاء المحتوى وترجمة الإدخالات تلقائياً.

## الميزات الرئيسية

- **REST API وGraphQL** — تُنشأ تلقائياً من مجموعاتك، مع فلترة وترقيم صفحات ودعم متعدد اللغات
- **استوديو الذكاء الاصطناعي** — منشئ مخططات عبر المحادثة، يعمل مع أي نموذج لغوي كبير
- **وكيل الذكاء الاصطناعي** — عمليات جماعية: إنشاء مجموعات وإدخالات ورفع صور بأمر واحد
- **متعدد اللغات** — إدارة اللغة لكل إدخال مع أدوات ترجمة
- **خادم MCP** — كشف مشروعك كخادم MCP لوكلاء الذكاء الاصطناعي
- **مكتبة الوسائط** — رفع ملفات وتحويل صور وتخزين متوافق مع S3
- **الأدوار والصلاحيات** — تحكم دقيق في الوصول للفرق وعملاء API
- **Webhooks** — إشعارات فورية عند أحداث المحتوى

## البنية

\`\`\`
الواجهة الأمامية / تطبيق الجوال
        │
        ▼
REST API  /api/{projectId}/{collection}
GraphQL   /api/projects/{projectId}/graphql
الملفات  /api/{projectId}/files
        │
        ▼
   Jambo CMS (Symfony + PHP 8.4)
        │
        ▼
قاعدة البيانات (MySQL / PostgreSQL / SQLite)
\`\`\`

## البدء السريع

1. [ثبّت Jambo](/ar/installation/) على الخادم أو محلياً
2. أنشئ مشروعاً ومجموعتك الأولى عبر لوحة الإدارة
3. اجلب المحتوى من API:

\`\`\`bash
curl https://your-domain.com/api/{project-uuid}/posts
\`\`\`

## المجتمع

- **GitHub** — [github.com/jambostack/jambo-api](https://github.com/jambostack/jambo-api)
`,

  'ar/projects/introduction.md': `---
title: المشاريع — مقدمة
description: المشاريع هي الحاويات الرئيسية لمحتواك في Jambo.
---

**المشروع** هو الحاوية الرئيسية لنظام إدارة المحتوى. يحتوي كل مشروع على:

- المجموعات والحقول
- إدخالات المحتوى
- مكتبة الوسائط
- رموز API وإعدادات الوصول
- اللغات وإعدادات الترجمة
- Webhooks

## UUID المشروع

كل مشروع لديه معرف فريد (UUID) يُستخدم في جميع طلبات API:

\`\`\`
https://your-domain.com/api/{project-uuid}/collection-slug
\`\`\`

## الخطوات التالية

- [إنشاء المشاريع](/ar/projects/creating-projects/)
- [المجموعات](/ar/projects/collections/what-are-collections/)
- [API المحتوى](/ar/api/introduction/)
`,

  'ar/api/introduction.md': `---
title: API المحتوى — مقدمة
description: نظرة عامة على REST API لـ Jambo — عناوين URL الأساسية والمصادقة وتنسيق الاستجابة.
---

API محتوى Jambo هي **REST API** تتيح وصولاً عاماً أو مصادقاً إلى محتوى مشروعك ومجموعاته وملفاته الإعلامية.

## URL الأساسي

\`\`\`
https://your-domain.com/api/{project-uuid}/
\`\`\`

### نظرة عامة على نقاط النهاية

| المورد | المسار الأساسي |
|--------|----------------|
| إدخالات المحتوى | \`/api/{projectId}/{collectionSlug}\` |
| الملفات / الأصول | \`/api/{projectId}/files\` |
| GraphQL | \`/api/projects/{projectId}/graphql\` |
| مواصفة OpenAPI | \`/api/{projectId}/openapi.json\` |

## المصادقة

تتطلب جميع طلبات API رمز **Bearer** في رأس \`Authorization\`:

\`\`\`http
Authorization: Bearer YOUR_API_TOKEN
\`\`\`

## تنسيق الاستجابة

جميع الاستجابات بتنسيق JSON. استجابات القوائم تتضمن بيانات ترقيم الصفحات:

\`\`\`json
{
  "data": [...],
  "total": 42,
  "current_page": 1,
  "last_page": 3,
  "per_page": 15
}
\`\`\`

## ترقيم الصفحات

| المعامل | الافتراضي | الحد الأقصى |
|---------|----------|-------------|
| \`page\` | \`1\` | — |
| \`per_page\` | \`15\` | \`100\` |
`,

  'ar/api/entries/list-entries.md': `---
title: عرض الإدخالات
description: استرداد قائمة مقسمة إلى صفحات من إدخالات المحتوى من مجموعة.
---

\`\`\`http
GET /api/{projectId}/{collectionSlug}
\`\`\`

## المعاملات

| المعامل | النوع | الافتراضي | الوصف |
|---------|-------|----------|-------|
| \`page\` | integer | \`1\` | رقم الصفحة |
| \`per_page\` | integer | \`15\` | عناصر في الصفحة (الحد الأقصى \`100\`) |
| \`locale\` | string | افتراضي المشروع | التصفية حسب اللغة |
| \`status\` | string | \`published\` | \`published\` أو \`draft\` |

## مثال

\`\`\`bash
curl https://your-domain.com/api/{projectId}/posts \\
  -H "Authorization: Bearer YOUR_API_TOKEN"
\`\`\`

## الاستجابة

\`\`\`json
{
  "data": [
    {
      "uuid": "550e8400-...",
      "status": "published",
      "locale": "ar",
      "fields": { "title": "مقالتي الأولى" }
    }
  ],
  "total": 42,
  "current_page": 1,
  "last_page": 3,
  "per_page": 15
}
\`\`\`
`,

  'ar/api/entries/get-entry.md': `---
title: الحصول على إدخال
description: استرداد إدخال محتوى واحد بواسطة UUID.
---

\`\`\`http
GET /api/{projectId}/{collectionSlug}/{uuid}
\`\`\`

## مثال

\`\`\`bash
curl https://your-domain.com/api/{projectId}/posts/550e8400-... \\
  -H "Authorization: Bearer YOUR_API_TOKEN"
\`\`\`

## رموز الحالة

| الحالة | الوصف |
|--------|-------|
| \`200\` | نجاح |
| \`404\` | الإدخال غير موجود |
`,

  'ar/api/entries/create-entry.md': `---
title: إنشاء إدخال
description: إنشاء إدخال محتوى جديد في مجموعة.
---

\`\`\`http
POST /api/{projectId}/{collectionSlug}
\`\`\`

## جسم الطلب

\`\`\`json
{
  "status": "published",
  "locale": "ar",
  "fields": {
    "title": "مقالتي الجديدة",
    "slug": "my-new-article"
  }
}
\`\`\`

## رموز الحالة

| الحالة | الوصف |
|--------|-------|
| \`201\` | تم الإنشاء بنجاح |
| \`403\` | صلاحيات غير كافية |
| \`404\` | المجموعة غير موجودة |
| \`422\` | قيم غير صالحة |
`,

  'ar/api/entries/update-entry.md': `---
title: تحديث إدخال
description: تحديث إدخال محتوى موجود.
---

\`\`\`http
PUT   /api/{projectId}/{collectionSlug}/{uuid}
PATCH /api/{projectId}/{collectionSlug}/{uuid}
\`\`\`

استخدم \`PATCH\` لتحديث حقول محددة فقط.

## مثال

\`\`\`bash
curl -X PATCH https://your-domain.com/api/{projectId}/posts/550e8400-... \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"fields":{"title":"عنوان محدث"}}'
\`\`\`

## رموز الحالة

| الحالة | الوصف |
|--------|-------|
| \`200\` | تم التحديث |
| \`404\` | الإدخال غير موجود |
`,

  'ar/api/entries/delete-entry.md': `---
title: حذف إدخال
description: حذف مؤقت لإدخال محتوى (ينقله إلى سلة المهملات).
---

\`\`\`http
DELETE /api/{projectId}/{collectionSlug}/{uuid}
\`\`\`

## مثال

\`\`\`bash
curl -X DELETE https://your-domain.com/api/{projectId}/posts/550e8400-... \\
  -H "Authorization: Bearer YOUR_API_TOKEN"
\`\`\`

ترجع HTTP \`204 No Content\` عند النجاح.

:::note
هذا **حذف مؤقت** — ينتقل الإدخال إلى سلة المهملات. للحذف النهائي، استخدم لوحة الإدارة.
:::
`,

  'ar/api/entries/translations.md': `---
title: الترجمات
description: إدارة إدخالات المحتوى متعددة اللغات في Jambo.
---

يدير Jambo المحتوى متعدد اللغات على **مستوى الإدخال** — كل إدخال له خاصية \`locale\` واحدة.

## إنشاء إدخال مترجم

\`\`\`bash
curl -X POST https://your-domain.com/api/{projectId}/posts \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"locale":"ar","status":"published","fields":{"title":"مرحباً بالعالم"}}'
\`\`\`

## جلب الإدخالات حسب اللغة

\`\`\`bash
GET /api/{projectId}/posts?locale=ar
GET /api/{projectId}/posts?locale=en
\`\`\`
`,

  'ar/api/entries/filtering-examples.md': `---
title: أمثلة التصفية
description: أمثلة عملية لتصفية إدخالات المحتوى عبر API.
---

## التصفية حسب الحالة

\`\`\`bash
GET /api/{projectId}/posts              # منشور (افتراضي)
GET /api/{projectId}/posts?status=draft # مسودة
\`\`\`

## التصفية حسب اللغة

\`\`\`bash
GET /api/{projectId}/posts?locale=ar    # عربي
GET /api/{projectId}/posts?locale=en    # إنجليزي
\`\`\`

## ترقيم الصفحات

\`\`\`bash
GET /api/{projectId}/posts?page=2&per_page=25
\`\`\`

## دمج المرشحات

\`\`\`bash
GET /api/{projectId}/posts?locale=ar&status=published&page=1&per_page=10
\`\`\`
`,

  'ar/api/assets/list-assets.md': `---
title: عرض الأصول
description: استرداد قائمة من الملفات الإعلامية من مكتبة المشروع.
---

\`\`\`http
GET /api/{projectId}/files
\`\`\`

\`\`\`bash
curl https://your-domain.com/api/{projectId}/files \\
  -H "Authorization: Bearer YOUR_API_TOKEN"
\`\`\`

## الاستجابة

\`\`\`json
{
  "data": [
    {
      "uuid": "img-uuid-1234",
      "filename": "hero.jpg",
      "mime_type": "image/jpeg",
      "size": 204800,
      "url": "/uploads/media/abc123/hero.jpg"
    }
  ],
  "total": 24,
  "current_page": 1
}
\`\`\`
`,

  'ar/api/assets/get-asset.md': `---
title: الحصول على أصل
description: استرداد ملف وسائط واحد بواسطة UUID.
---

\`\`\`http
GET /api/{projectId}/files/{identifier}
\`\`\`

يمكن أن يكون المعرّف \`identifier\` هو **UUID** أو **اسم الملف**.

\`\`\`bash
curl https://your-domain.com/api/{projectId}/files/img-uuid-1234 \\
  -H "Authorization: Bearer YOUR_API_TOKEN"
\`\`\`
`,

  'ar/api/assets/get-asset-by-name.md': `---
title: الحصول على أصل باسمه
description: استرداد ملف وسائط باستخدام اسم الملف الأصلي.
---

\`\`\`http
GET /api/{projectId}/files/{filename}
\`\`\`

\`\`\`bash
curl https://your-domain.com/api/{projectId}/files/hero.jpg \\
  -H "Authorization: Bearer YOUR_API_TOKEN"
\`\`\`

راجع [الحصول على أصل](/ar/api/assets/get-asset/) للاطلاع على تنسيق الاستجابة الكامل.
`,

  'ar/api/assets/upload-asset.md': `---
title: رفع أصل
description: رفع ملف إلى مكتبة وسائط المشروع.
---

\`\`\`http
POST /api/{projectId}/files
\`\`\`

\`\`\`bash
curl -X POST https://your-domain.com/api/{projectId}/files \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -F "file=@/path/to/image.jpg"
\`\`\`

ترجع HTTP \`201 Created\` عند النجاح مع بيانات الأصل المرفوع.
`,

  'ar/api/assets/delete-asset.md': `---
title: حذف أصل
description: حذف ملف وسائط نهائياً من مكتبة المشروع.
---

\`\`\`http
DELETE /api/{projectId}/files/{uuid}
\`\`\`

:::caution
هذا الإجراء **نهائي**. يُحذف الملف من التخزين ولا يمكن استرداده.
:::

ترجع HTTP \`204 No Content\` عند النجاح.
`,

  'ar/api/collections/list-collections.md': `---
title: عرض المجموعات
description: استرداد جميع مجموعات مشروع.
---

\`\`\`http
GET /api/{projectId}/collections
\`\`\`

\`\`\`bash
curl https://your-domain.com/api/{projectId}/collections \\
  -H "Authorization: Bearer YOUR_API_TOKEN"
\`\`\`
`,

  'ar/api/collections/get-collection.md': `---
title: الحصول على مجموعة
description: استرداد مجموعة واحدة بواسطة slug.
---

\`\`\`http
GET /api/{projectId}/collections/{slug}
\`\`\`

\`\`\`bash
curl https://your-domain.com/api/{projectId}/collections/posts \\
  -H "Authorization: Bearer YOUR_API_TOKEN"
\`\`\`
`,

  'ar/api/collections/create-collection.md': `---
title: إنشاء مجموعة
description: إنشاء مجموعة جديدة مع حقول عبر Jambo API.
---

\`\`\`http
POST /api/projects/{projectId}/collections
\`\`\`

\`\`\`json
{
  "name": "Products",
  "slug": "products",
  "isSingleton": false,
  "fields": [
    { "name": "Name", "slug": "name", "type": "text", "isRequired": true }
  ]
}
\`\`\`

| الحالة | الوصف |
|--------|-------|
| \`201\` | تم الإنشاء |
| \`409\` | يوجد مجموعة بهذا الـ slug |
`,

  'ar/api/collections/update-collection.md': `---
title: تحديث مجموعة
description: تحديث اسم أو وصف مجموعة موجودة.
---

\`\`\`http
PATCH /api/projects/{projectId}/collections/{slug}
\`\`\`

\`\`\`json
{ "name": "اسم جديد", "description": "وصف جديد" }
\`\`\`
`,

  'ar/api/collections/delete-collection.md': `---
title: حذف مجموعة
description: حذف مجموعة وجميع إدخالاتها.
---

\`\`\`http
DELETE /api/projects/{projectId}/collections/{slug}
\`\`\`

:::caution
هذا الإجراء دائم. تُحذف جميع إدخالات المجموعة فوراً وبشكل لا رجعة فيه.
:::

ترجع HTTP \`204 No Content\` عند النجاح.
`,

  'ar/api/collections/reorder-collections.md': `---
title: إعادة ترتيب المجموعات
description: تغيير ترتيب عرض المجموعات في الشريط الجانبي.
---

\`\`\`http
POST /api/projects/{projectId}/collections/reorder
\`\`\`

\`\`\`json
{ "slugs": ["pages", "posts", "products", "categories"] }
\`\`\`
`,

  'ar/api/fields/create-field.md': `---
title: إنشاء حقل
description: إضافة حقل جديد إلى مجموعة.
---

\`\`\`http
POST /api/projects/{projectId}/collections/{slug}/fields
\`\`\`

\`\`\`json
{
  "name": "Published At",
  "slug": "published_at",
  "type": "datetime",
  "isRequired": false
}
\`\`\`

| الحالة | الوصف |
|--------|-------|
| \`201\` | تم الإنشاء |
| \`409\` | يوجد حقل بهذا الـ slug |
`,

  'ar/api/fields/update-field.md': `---
title: تحديث حقل
description: تحديث اسم أو خيارات حقل. لا يمكن تغيير الـ slug.
---

\`\`\`http
PATCH /api/projects/{projectId}/collections/{collectionSlug}/fields/{fieldSlug}
\`\`\`

\`\`\`json
{ "name": "اسم عرض جديد", "isRequired": true }
\`\`\`
`,

  'ar/api/fields/delete-field.md': `---
title: حذف حقل
description: إزالة حقل من مجموعة وحذف جميع قيمه المخزنة.
---

\`\`\`http
DELETE /api/projects/{projectId}/collections/{collectionSlug}/fields/{fieldSlug}
\`\`\`

:::caution
تُحذف جميع القيم المخزنة في هذا الحقل عبر جميع الإدخالات بشكل نهائي.
:::
`,

  'ar/api/fields/reorder-fields.md': `---
title: إعادة ترتيب الحقول
description: تغيير ترتيب عرض الحقول في محرر المحتوى.
---

\`\`\`http
POST /api/projects/{projectId}/collections/{slug}/fields/reorder
\`\`\`

\`\`\`json
{ "slugs": ["title", "featured_image", "body", "author"] }
\`\`\`
`,

  'ar/api/project/get-project.md': `---
title: الحصول على المشروع
description: استرداد معلومات المشروع وإعداداته.
---

\`\`\`http
GET /api/{projectId}/project
\`\`\`

\`\`\`bash
curl https://your-domain.com/api/{projectId}/project \\
  -H "Authorization: Bearer YOUR_API_TOKEN"
\`\`\`

\`\`\`json
{
  "uuid": "f99cb038-...",
  "name": "My Blog",
  "default_locale": "ar",
  "locales": ["ar", "en", "fr"],
  "collections": [
    { "slug": "posts", "name": "Posts", "is_singleton": false }
  ]
}
\`\`\`
`,
};

// Pour les pages AR restantes non couvertes ci-dessus,
// utiliser la version EN comme base avec un bandeau "traduction en cours"
const enStubPaths = [
  'ar/projects/creating-projects.md',
  'ar/projects/project-details.md',
  'ar/projects/cloning-projects.md',
  'ar/projects/project-templates.md',
  'ar/projects/collections/what-are-collections.md',
  'ar/projects/collections/creating-collections.md',
  'ar/projects/collections/collection-settings.md',
  'ar/projects/collections/field-types.md',
  'ar/projects/collections/adding-fields.md',
  'ar/projects/content/managing-content.md',
  'ar/projects/content/content-list.md',
  'ar/projects/content/creating-editing-content.md',
  'ar/projects/content/asset-library.md',
  'ar/projects/settings/project.md',
  'ar/projects/settings/localization.md',
  'ar/projects/settings/api-access.md',
  'ar/projects/settings/webhooks.md',
  'ar/projects/settings/user-access.md',
  'ar/profile/managing-users.md',
  'ar/profile/managing-roles.md',
  'ar/profile/permissions.md',
  'ar/ai/introduction.md',
  'ar/ai/ai-assistant.md',
  'ar/ai/inline-tools.md',
  'ar/ai/ai-translation.md',
  'ar/deployment/shared-hosting.md',
  'ar/deployment/subdomain.md',
  'ar/deployment/webhook-setup.md',
  'ar/configuration/aws-s3.md',
  'ar/configuration/s3-compatible.md',
  'ar/templates/blog-nextjs.md',
];

// Écrire les pages AR complètes
let created = 0;
let skipped = 0;

for (const [relPath, content] of Object.entries(pages)) {
  const fullPath = `${BASE}/${relPath}`;
  try {
    const existing = readFileSync(fullPath, 'utf8');
    if (!existing.includes('Coming Soon')) { skipped++; continue; }
  } catch {}
  writeFileSync(fullPath, content);
  console.log(`WRITTEN: ${relPath}`);
  created++;
}

// Pour les pages restantes, copier la version EN avec un avertissement
for (const arPath of enStubPaths) {
  const fullAr = `${BASE}/${arPath}`;
  try {
    const existing = readFileSync(fullAr, 'utf8');
    if (!existing.includes('Coming Soon')) { skipped++; continue; }
  } catch {}

  const enPath = arPath.replace(/^ar\//, '');
  const fullEn = `${BASE}/${enPath}`;
  try {
    const enContent = readFileSync(fullEn, 'utf8');
    // Ajouter une note de traduction en tête
    const arContent = enContent.replace(
      /^(---[\s\S]+?---\n)/,
      '$1\n:::note\nهذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.\n:::\n\n'
    );
    writeFileSync(fullAr, arContent);
    console.log(`WRITTEN (EN+note): ${arPath}`);
    created++;
  } catch {
    console.log(`WARN: EN not found for ${arPath}`);
  }
}

console.log(`\nDone: ${created} written, ${skipped} skipped`);
