import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';

const stubs = [
  'configuration/aws-s3.md',
  'configuration/s3-compatible.md',
  'deployment/shared-hosting.md',
  'deployment/subdomain.md',
  'deployment/webhook-setup.md',
  'profile/managing-users.md',
  'profile/managing-roles.md',
  'profile/permissions.md',
  'ai/introduction.md',
  'ai/ai-assistant.md',
  'ai/inline-tools.md',
  'ai/ai-translation.md',
  'projects/introduction.md',
  'projects/creating-projects.md',
  'projects/project-details.md',
  'projects/cloning-projects.md',
  'projects/project-templates.md',
  'projects/collections/what-are-collections.md',
  'projects/collections/creating-collections.md',
  'projects/collections/collection-settings.md',
  'projects/collections/field-types.md',
  'projects/collections/adding-fields.md',
  'projects/content/managing-content.md',
  'projects/content/content-list.md',
  'projects/content/creating-editing-content.md',
  'projects/content/asset-library.md',
  'projects/settings/project.md',
  'projects/settings/localization.md',
  'projects/settings/user-access.md',
  'projects/settings/api-access.md',
  'projects/settings/webhooks.md',
  'templates/blog-nextjs.md',
  'api/project/get-project.md',
  'api/collections/list-collections.md',
  'api/collections/get-collection.md',
  'api/collections/create-collection.md',
  'api/collections/update-collection.md',
  'api/collections/delete-collection.md',
  'api/collections/reorder-collections.md',
  'api/fields/create-field.md',
  'api/fields/update-field.md',
  'api/fields/delete-field.md',
  'api/fields/reorder-fields.md',
  'api/entries/list-entries.md',
  'api/entries/get-entry.md',
  'api/entries/translations.md',
  'api/entries/filtering-examples.md',
  'api/entries/create-entry.md',
  'api/entries/update-entry.md',
  'api/entries/delete-entry.md',
  'api/assets/list-assets.md',
  'api/assets/get-asset.md',
  'api/assets/get-asset-by-name.md',
  'api/assets/upload-asset.md',
  'api/assets/delete-asset.md',
];

let total = 0;
for (const lang of ['fr', 'es', 'ar']) {
  let created = 0, skipped = 0;
  for (const stub of stubs) {
    const full = `src/content/docs/${lang}/${stub}`;
    if (existsSync(full)) { skipped++; continue; }
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, `---\ntitle: "Coming Soon"\ndescription: "This page is under construction."\n---\n\n## Coming Soon\n\nThis page is under construction.\n`);
    created++;
    total++;
  }
  console.log(`${lang}: ${created} created, ${skipped} skipped`);
}
console.log(`Total i18n stubs: ${total}`);
