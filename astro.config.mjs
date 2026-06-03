import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://docs.jambostack.site',
  legacy: {
    collections: true,
  },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    starlight({
      title: 'Jambo Docs',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/jambostack/jambo-api' },
      ],
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        fr: { label: 'Français', lang: 'fr' },
        es: { label: 'Español', lang: 'es' },
        ar: { label: 'العربية', lang: 'ar', dir: 'rtl' },
      },
      customCss: ['./src/styles/global.css'],
      sidebar: [
        { slug: 'introduction' },
        { slug: 'installation' },
        {
          label: 'Configuration',
          translations: { fr: 'Configuration', es: 'Configuración', ar: 'الإعداد' },
          items: [
            { slug: 'configuration/environment-variables' },
            { slug: 'configuration/aws-s3' },
            { slug: 'configuration/s3-compatible' },
          ],
        },
        {
          label: 'Deployment',
          translations: { fr: 'Déploiement', es: 'Despliegue', ar: 'النشر' },
          items: [
            { slug: 'deployment/vps' },
            { slug: 'deployment/shared-hosting' },
            { slug: 'deployment/subdomain' },
            { slug: 'deployment/webhook-setup' },
          ],
        },
        {
          label: 'Profile Settings',
          translations: { fr: 'Paramètres du profil', es: 'Configuración de perfil', ar: 'إعدادات الملف الشخصي' },
          items: [
            { slug: 'profile/managing-users' },
            { slug: 'profile/managing-roles' },
            { slug: 'profile/permissions' },
          ],
        },
        {
          label: 'AI Features',
          translations: { fr: 'Fonctionnalités IA', es: 'Funciones IA', ar: 'ميزات الذكاء الاصطناعي' },
          items: [
            { slug: 'ai/introduction' },
            { slug: 'ai/ai-assistant' },
            { slug: 'ai/inline-tools' },
            { slug: 'ai/ai-translation' },
            { slug: 'ai/mcp-server' },
          ],
        },
        {
          label: 'Studio IA',
          translations: { fr: 'Studio IA', es: 'Studio IA', ar: 'استوديو الذكاء الاصطناعي' },
          items: [
            { slug: 'studio/schema-builder' },
            { slug: 'studio/ai-providers' },
            { slug: 'studio/ai-agent' },
          ],
        },
        {
          label: 'Projects',
          translations: { fr: 'Projets', es: 'Proyectos', ar: 'المشاريع' },
          items: [
            { slug: 'projects/introduction' },
            { slug: 'projects/creating-projects' },
            { slug: 'projects/project-details' },
            { slug: 'projects/cloning-projects' },
            { slug: 'projects/project-templates' },
            {
              label: 'Collections',
              items: [
                { slug: 'projects/collections/what-are-collections' },
                { slug: 'projects/collections/creating-collections' },
                { slug: 'projects/collections/collection-settings' },
                { slug: 'projects/collections/field-types' },
                { slug: 'projects/collections/adding-fields' },
              ],
            },
            {
              label: 'Content',
              translations: { fr: 'Contenu', es: 'Contenido', ar: 'المحتوى' },
              items: [
                { slug: 'projects/content/managing-content' },
                { slug: 'projects/content/content-list' },
                { slug: 'projects/content/creating-editing-content' },
                { slug: 'projects/content/asset-library' },
              ],
            },
            {
              label: 'Project Settings',
              translations: { fr: 'Paramètres projet', es: 'Configuración del proyecto', ar: 'إعدادات المشروع' },
              items: [
                { slug: 'projects/settings/project' },
                { slug: 'projects/settings/localization' },
                { slug: 'projects/settings/user-access' },
                { slug: 'projects/settings/api-access' },
                { slug: 'projects/settings/webhooks' },
              ],
            },
          ],
        },
        {
          label: 'Starter Templates',
          translations: { fr: 'Templates de démarrage', es: 'Plantillas de inicio', ar: 'قوالب البداية' },
          items: [
            { slug: 'templates/blog-nextjs' },
          ],
        },
        {
          label: 'Content API',
          translations: { fr: 'API de contenu', es: 'API de contenido', ar: 'واجهة برمجة المحتوى' },
          items: [
            { slug: 'api/introduction' },
            {
              label: 'Project',
              translations: { fr: 'Projet', es: 'Proyecto', ar: 'المشروع' },
              items: [{ slug: 'api/project/get-project' }],
            },
            {
              label: 'Collections',
              items: [
                { slug: 'api/collections/list-collections' },
                { slug: 'api/collections/get-collection' },
                { slug: 'api/collections/create-collection' },
                { slug: 'api/collections/update-collection' },
                { slug: 'api/collections/delete-collection' },
                { slug: 'api/collections/reorder-collections' },
              ],
            },
            {
              label: 'Fields',
              translations: { fr: 'Champs', es: 'Campos', ar: 'الحقول' },
              items: [
                { slug: 'api/fields/create-field' },
                { slug: 'api/fields/update-field' },
                { slug: 'api/fields/delete-field' },
                { slug: 'api/fields/reorder-fields' },
              ],
            },
            {
              label: 'Content Entries',
              translations: { fr: 'Entrées de contenu', es: 'Entradas de contenido', ar: 'مدخلات المحتوى' },
              items: [
                { slug: 'api/entries/list-entries' },
                { slug: 'api/entries/get-entry' },
                { slug: 'api/entries/translations' },
                { slug: 'api/entries/advanced-filtering' },
                { slug: 'api/entries/filtering-examples' },
                { slug: 'api/entries/create-entry' },
                { slug: 'api/entries/update-entry' },
                { slug: 'api/entries/delete-entry' },
              ],
            },
            {
              label: 'Assets',
              items: [
                { slug: 'api/assets/list-assets' },
                { slug: 'api/assets/get-asset' },
                { slug: 'api/assets/get-asset-by-name' },
                { slug: 'api/assets/upload-asset' },
                { slug: 'api/assets/delete-asset' },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
