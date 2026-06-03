/**
 * Génère les traductions espagnoles en adaptant les pages FR.
 * Stratégie : lecture des pages FR déjà rédigées + adaptation ES.
 * Run: node scripts/translate-es.mjs
 */
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { dirname } from 'path';

const BASE = 'src/content/docs';

// Pages qui sont des stubs ES et dont on a la version FR
// On lit la version FR et on applique des remplacements intelligents

function frToEs(content) {
  return content
    // Frontmatter
    .replace(/title: Introduction/, 'title: Introducción')
    .replace(/title: Instalación/, 'title: Instalación')
    .replace(/Proyectos — Introducción/, 'Proyectos — Introducción')
    // Headings & labels courants
    .replace(/## Fonctionnalités clés/g, '## Características principales')
    .replace(/## Architecture/g, '## Arquitectura')
    .replace(/## Démarrage rapide/g, '## Inicio rápido')
    .replace(/## Communauté/g, '## Comunidad')
    .replace(/## Vue d\'ensemble/g, '## Descripción general')
    .replace(/## Paramètres/g, '## Parámetros')
    .replace(/## Requête/g, '## Solicitud')
    .replace(/## Réponse/g, '## Respuesta')
    .replace(/## Codes de statut/g, '## Códigos de estado')
    .replace(/## Corps de la requête/g, '## Cuerpo de la solicitud')
    .replace(/## Étapes suivantes/g, '## Próximos pasos')
    .replace(/## Comment utiliser/g, '## Cómo usar')
    .replace(/## Créer/g, '## Crear')
    .replace(/## Ajouter/g, '## Agregar')
    .replace(/## Actions disponibles/g, '## Acciones disponibles')
    .replace(/## Templates disponibles/g, '## Plantillas disponibles')
    .replace(/## Ce qui est inclus/g, '## Qué incluye')
    .replace(/## Prérequis/g, '## Requisitos previos')
    .replace(/## Étapes de déploiement/g, '## Pasos de despliegue')
    .replace(/## Configuration/g, '## Configuración')
    .replace(/## Exemple/g, '## Ejemplo')
    // Table headers
    .replace(/\| Champ \|/g, '| Campo |')
    .replace(/\| Paramètre \|/g, '| Parámetro |')
    .replace(/\| Type \|/g, '| Tipo |')
    .replace(/\| Défaut \|/g, '| Defecto |')
    .replace(/\| Description \|/g, '| Descripción |')
    .replace(/\| Fonctionnalité \|/g, '| Funcionalidad |')
    .replace(/\| Statut \|/g, '| Estado |')
    .replace(/\| Locale \|/g, '| Idioma |')
    .replace(/\| Autorrise \|/g, '| Permite |')
    .replace(/\| Autorise \|/g, '| Permite |')
    .replace(/\| Ressource \|/g, '| Recurso |')
    .replace(/\| Chemin de base \|/g, '| Ruta base |')
    .replace(/\| Service \|/g, '| Servicio |')
    // Common words
    .replace(/Succès/g, 'Éxito')
    .replace(/succès/g, 'éxito')
    .replace(/Supprimé/g, 'Eliminado')
    .replace(/supprimé/g, 'eliminado')
    .replace(/Créé/g, 'Creado')
    .replace(/créé/g, 'creado')
    .replace(/Mis à jour/g, 'Actualizado')
    .replace(/mis à jour/g, 'actualizado')
    .replace(/Permissions insuffisantes/g, 'Permisos insuficientes')
    .replace(/introuvable/g, 'no encontrado')
    .replace(/Introuvable/g, 'No encontrado')
    .replace(/publié/g, 'publicado')
    .replace(/Publié/g, 'Publicado')
    .replace(/brouillon/g, 'borrador')
    .replace(/Brouillon/g, 'Borrador')
    .replace(/collection/g, 'colección')
    .replace(/Collection/g, 'Colección')
    .replace(/collections/g, 'colecciones')
    .replace(/Collections/g, 'Colecciones')
    .replace(/entrée/g, 'entrada')
    .replace(/Entrée/g, 'Entrada')
    .replace(/entrées/g, 'entradas')
    .replace(/Entrées/g, 'Entradas')
    .replace(/projet/g, 'proyecto')
    .replace(/Projet/g, 'Proyecto')
    .replace(/projets/g, 'proyectos')
    .replace(/Projets/g, 'Proyectos')
    .replace(/champ/g, 'campo')
    .replace(/Champ/g, 'Campo')
    .replace(/champs/g, 'campos')
    .replace(/Champs/g, 'Campos')
    .replace(/utilisateur/g, 'usuario')
    .replace(/Utilisateur/g, 'Usuario')
    .replace(/utilisateurs/g, 'usuarios')
    .replace(/Utilisateurs/g, 'Usuarios')
    .replace(/rôle/g, 'rol')
    .replace(/Rôle/g, 'Rol')
    .replace(/rôles/g, 'roles')
    .replace(/Rôles/g, 'Roles')
    .replace(/Paramètres du projet/g, 'Configuración del proyecto')
    .replace(/paramètres du projet/g, 'configuración del proyecto')
    .replace(/médiathèque/g, 'biblioteca de medios')
    .replace(/Médiathèque/g, 'Biblioteca de medios')
    .replace(/fichier/g, 'archivo')
    .replace(/Fichier/g, 'Archivo')
    .replace(/fichiers/g, 'archivos')
    .replace(/Fichiers/g, 'Archivos')
    .replace(/locale/g, 'idioma')
    .replace(/Locale/g, 'Idioma')
    .replace(/locales/g, 'idiomas')
    .replace(/Locales/g, 'Idiomas')
    // Fix URL paths fr → es
    .replace(/\/fr\//g, '/es/')
    // Fix descriptions
    .replace(/description: (.*)\n/, (m, desc) => `description: ${desc}\n`);
}

// Lire chaque page FR stub correspondante et générer la version ES
const frStubs = [
  'fr/introduction.md',
  'fr/projects/introduction.md',
  'fr/projects/creating-projects.md',
  'fr/projects/project-details.md',
  'fr/projects/cloning-projects.md',
  'fr/projects/project-templates.md',
  'fr/projects/collections/what-are-collections.md',
  'fr/projects/collections/creating-collections.md',
  'fr/projects/collections/collection-settings.md',
  'fr/projects/collections/field-types.md',
  'fr/projects/collections/adding-fields.md',
  'fr/projects/content/managing-content.md',
  'fr/projects/content/content-list.md',
  'fr/projects/content/creating-editing-content.md',
  'fr/projects/content/asset-library.md',
  'fr/projects/settings/project.md',
  'fr/projects/settings/localization.md',
  'fr/projects/settings/api-access.md',
  'fr/projects/settings/webhooks.md',
  'fr/projects/settings/user-access.md',
  'fr/profile/managing-users.md',
  'fr/profile/managing-roles.md',
  'fr/profile/permissions.md',
  'fr/ai/introduction.md',
  'fr/ai/ai-assistant.md',
  'fr/ai/inline-tools.md',
  'fr/ai/ai-translation.md',
  'fr/deployment/shared-hosting.md',
  'fr/deployment/subdomain.md',
  'fr/deployment/webhook-setup.md',
  'fr/configuration/aws-s3.md',
  'fr/configuration/s3-compatible.md',
  'fr/templates/blog-nextjs.md',
  'fr/api/introduction.md',
  'fr/api/entries/list-entries.md',
  'fr/api/entries/get-entry.md',
  'fr/api/entries/create-entry.md',
  'fr/api/entries/update-entry.md',
  'fr/api/entries/delete-entry.md',
  'fr/api/entries/translations.md',
  'fr/api/entries/filtering-examples.md',
  'fr/api/assets/list-assets.md',
  'fr/api/assets/get-asset.md',
  'fr/api/assets/get-asset-by-name.md',
  'fr/api/assets/upload-asset.md',
  'fr/api/assets/delete-asset.md',
  'fr/api/collections/list-collections.md',
  'fr/api/collections/get-collection.md',
  'fr/api/collections/create-collection.md',
  'fr/api/collections/update-collection.md',
  'fr/api/collections/delete-collection.md',
  'fr/api/collections/reorder-collections.md',
  'fr/api/fields/create-field.md',
  'fr/api/fields/update-field.md',
  'fr/api/fields/delete-field.md',
  'fr/api/fields/reorder-fields.md',
  'fr/api/project/get-project.md',
];

let created = 0;
let skipped = 0;

for (const frPath of frStubs) {
  const esPath = frPath.replace(/^fr\//, 'es/');
  const fullFr = `${BASE}/${frPath}`;
  const fullEs = `${BASE}/${esPath}`;

  // Vérifier si ES est encore un stub
  try {
    const existing = readFileSync(fullEs, 'utf8');
    if (!existing.includes('Coming Soon')) {
      console.log(`SKIP (has content): ${esPath}`);
      skipped++;
      continue;
    }
  } catch {}

  // Lire la version FR
  let frContent;
  try {
    frContent = readFileSync(fullFr, 'utf8');
  } catch {
    console.log(`WARN (FR not found): ${frPath}`);
    continue;
  }

  const esContent = frToEs(frContent);
  writeFileSync(fullEs, esContent);
  console.log(`WRITTEN: ${esPath}`);
  created++;
}

console.log(`\nDone: ${created} written, ${skipped} skipped`);
