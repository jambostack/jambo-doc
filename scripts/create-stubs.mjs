import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';

const DOC = 'src/content/docs';

const stubs = [
  ['introduction.md', 'Introduction', 'Welcome to Jambo documentation.'],
  ['configuration/aws-s3.md', 'AWS S3 Configuration', 'Configure AWS S3 for media storage.'],
  ['configuration/s3-compatible.md', 'S3 Compatible Services', 'Use S3-compatible services like MinIO or Wasabi.'],
  ['deployment/shared-hosting.md', 'Deploy on Shared Hosting', 'Deploy Jambo on shared hosting.'],
  ['deployment/subdomain.md', 'Subdomain (Shared Hosting)', 'Configure a subdomain on shared hosting.'],
  ['deployment/webhook-setup.md', 'Webhook Setup (Queues)', 'Configure webhooks and queue workers.'],
  ['profile/managing-users.md', 'Managing Users', 'Manage users in your Jambo instance.'],
  ['profile/managing-roles.md', 'Managing Roles', 'Create and manage roles.'],
  ['profile/permissions.md', 'Understanding Permissions', 'Understand the permission system.'],
  ['ai/introduction.md', 'AI Features — Introduction', 'Overview of AI features in Jambo.'],
  ['ai/ai-assistant.md', 'AI Assistant', 'Use the AI assistant in the Studio.'],
  ['ai/inline-tools.md', 'Inline Content Tools', 'AI-powered inline editing tools.'],
  ['ai/ai-translation.md', 'AI Translation', 'Translate content automatically with AI.'],
  ['projects/introduction.md', 'Projects — Introduction', 'Overview of Jambo projects.'],
  ['projects/creating-projects.md', 'Creating Projects', 'How to create a new project.'],
  ['projects/project-details.md', 'Project Details', 'Manage your project details.'],
  ['projects/cloning-projects.md', 'Cloning Projects', 'Clone an existing project.'],
  ['projects/project-templates.md', 'Project Templates', 'Use project templates.'],
  ['projects/collections/what-are-collections.md', 'What are Collections?', 'Collections store your structured content.'],
  ['projects/collections/creating-collections.md', 'Creating Collections', 'Create a new collection.'],
  ['projects/collections/collection-settings.md', 'Collection Settings', 'Configure collection settings.'],
  ['projects/collections/field-types.md', 'Field Types', 'All available field types.'],
  ['projects/collections/adding-fields.md', 'Adding Fields', 'Add fields to a collection.'],
  ['projects/content/managing-content.md', 'Managing Content', 'Manage content entries.'],
  ['projects/content/content-list.md', 'Content List', 'Browse and filter content.'],
  ['projects/content/creating-editing-content.md', 'Creating & Editing Content', 'Create and edit content entries.'],
  ['projects/content/asset-library.md', 'Asset Library', 'Manage media assets.'],
  ['projects/settings/project.md', 'Project Settings', 'Configure project settings.'],
  ['projects/settings/localization.md', 'Localization', 'Configure project locales.'],
  ['projects/settings/user-access.md', 'User Access', 'Manage user access to the project.'],
  ['projects/settings/api-access.md', 'API Access', 'Manage API tokens and access.'],
  ['projects/settings/webhooks.md', 'Webhooks', 'Configure project webhooks.'],
  ['templates/blog-nextjs.md', 'Blog NextJS', 'Blog starter template with Next.js.'],
  ['api/project/get-project.md', 'Get Project', 'Retrieve project information.'],
  ['api/collections/list-collections.md', 'List Collections', 'List all collections.'],
  ['api/collections/get-collection.md', 'Get a Collection', 'Retrieve a specific collection.'],
  ['api/collections/create-collection.md', 'Create a Collection', 'Create a new collection.'],
  ['api/collections/update-collection.md', 'Update a Collection', 'Update an existing collection.'],
  ['api/collections/delete-collection.md', 'Delete a Collection', 'Delete a collection.'],
  ['api/collections/reorder-collections.md', 'Reorder Collections', 'Change the order of collections.'],
  ['api/fields/create-field.md', 'Create a Field', 'Add a field to a collection.'],
  ['api/fields/update-field.md', 'Update a Field', 'Update an existing field.'],
  ['api/fields/delete-field.md', 'Delete a Field', 'Remove a field from a collection.'],
  ['api/fields/reorder-fields.md', 'Reorder Fields', 'Change the order of fields.'],
  ['api/entries/list-entries.md', 'List Entries', 'List content entries.'],
  ['api/entries/get-entry.md', 'Get an Entry', 'Retrieve a specific entry.'],
  ['api/entries/translations.md', 'Translations', 'Manage entry translations.'],
  ['api/entries/filtering-examples.md', 'Filtering Examples', 'Examples of entry filtering.'],
  ['api/entries/create-entry.md', 'Create an Entry', 'Create a new content entry.'],
  ['api/entries/update-entry.md', 'Update an Entry', 'Update an existing entry.'],
  ['api/entries/delete-entry.md', 'Delete an Entry', 'Delete a content entry.'],
  ['api/assets/list-assets.md', 'List Assets', 'List all assets.'],
  ['api/assets/get-asset.md', 'Get an Asset', 'Retrieve a specific asset.'],
  ['api/assets/get-asset-by-name.md', 'Get an Asset by Name', 'Retrieve an asset by its filename.'],
  ['api/assets/upload-asset.md', 'Upload an Asset', 'Upload a file to the media library.'],
  ['api/assets/delete-asset.md', 'Delete an Asset', 'Delete an asset.'],
];

let created = 0, skipped = 0;
for (const [path, title, description] of stubs) {
  const full = `${DOC}/${path}`;
  mkdirSync(dirname(full), { recursive: true });
  if (existsSync(full)) { skipped++; continue; }
  writeFileSync(full, `---\ntitle: "${title}"\ndescription: "${description}"\n---\n\n## Coming Soon\n\nThis page is under construction.\n`);
  created++;
}
console.log(`EN stubs: ${created} created, ${skipped} skipped`);
