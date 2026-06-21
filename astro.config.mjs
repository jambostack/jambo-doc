import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://docs.jambostack.site',
  legacy: { collections: true },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    starlight({
      title: 'Jambo Docs',
      logo: {
        light: './src/assets/logo-dark.png',
        dark: './src/assets/logo-light.png',
        replacesTitle: true,
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/jambostack/jambo-api' },
      ],
      defaultLocale: 'root',
      customCss: ['./src/styles/global.css'],
      sidebar: [
        { slug: 'introduction' },
        {
          label: 'Getting Started',
          items: [
            { slug: 'getting-started/installation' },
            { slug: 'getting-started/quick-start' },
            { slug: 'getting-started/concepts' },
          ],
        },
        {
          label: 'Features',
          items: [
            { slug: 'features/collections' },
            { slug: 'features/fields' },
            { slug: 'features/content' },
            { slug: 'features/media' },
            { slug: 'features/workflows' },
            { slug: 'features/flows' },
            { slug: 'features/live-preview' },
            { slug: 'features/realtime' },
            { slug: 'features/localization' },
            { slug: 'features/auth' },
            { slug: 'features/rbac' },
            { slug: 'features/webhooks' },
            { slug: 'features/search' },
            { slug: 'features/audit' },
          ],
        },
        {
          label: 'API Reference',
          items: [
            { slug: 'api/overview' },
            { slug: 'api/rest' },
            { slug: 'api/graphql' },
            { slug: 'api/mcp' },
          ],
        },
        {
          label: 'Studio',
          items: [
            { slug: 'studio/dashboard' },
            { slug: 'studio/schema-builder' },
            { slug: 'studio/ai-assistant' },
            { slug: 'studio/ai-agent' },
            { slug: 'studio/ai-translation' },
          ],
        },
        {
          label: 'Deployment',
          items: [
            { slug: 'deployment/requirements' },
            { slug: 'deployment/vps' },
            { slug: 'deployment/shared' },
            { slug: 'deployment/docker' },
            { slug: 'deployment/configuration' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { slug: 'guides/sdk-live-preview' },
            { slug: 'guides/customizing' },
            { slug: 'guides/export-import' },
            { slug: 'guides/performance' },
            { slug: 'guides/troubleshooting' },
          ],
        },
      ],
    }),
  ],
});
