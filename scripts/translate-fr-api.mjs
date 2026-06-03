/**
 * Génère les traductions françaises pour les pages API.
 * Run: node scripts/translate-fr-api.mjs
 */
import { writeFileSync, readFileSync } from 'fs';

const BASE = 'src/content/docs';

const pages = {
  // ── Entrées ────────────────────────────────────────────────────────────
  'fr/api/entries/list-entries.md': `---
title: Lister les entrées
description: Récupérer une liste paginée d'entrées de contenu depuis une collection.
---

Récupère une liste paginée d'entrées de contenu depuis une collection.

\`\`\`http
GET /api/{projectId}/{collectionSlug}
\`\`\`

## Paramètres

### Chemin

| Paramètre | Type | Description |
|-----------|------|-------------|
| \`projectId\` | uuid | L'UUID de votre projet |
| \`collectionSlug\` | string | Le slug de la collection (ex. \`articles\`) |

### Requête

| Paramètre | Type | Défaut | Description |
|-----------|------|--------|-------------|
| \`page\` | integer | \`1\` | Numéro de page |
| \`per_page\` | integer | \`15\` | Éléments par page (max \`100\`) |
| \`locale\` | string | défaut du projet | Filtrer par locale (ex. \`fr\`, \`en\`) |
| \`status\` | string | \`published\` | Filtrer par statut : \`published\` ou \`draft\` |

## Requête

\`\`\`bash
curl https://votre-domaine.com/api/{projectId}/articles \\
  -H "Authorization: Bearer VOTRE_TOKEN_API"
\`\`\`

Avec filtres :

\`\`\`bash
curl "https://votre-domaine.com/api/{projectId}/articles?page=2&per_page=10&locale=fr" \\
  -H "Authorization: Bearer VOTRE_TOKEN_API"
\`\`\`

## Réponse

\`\`\`json
{
  "data": [
    {
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "status": "published",
      "locale": "fr",
      "created_at": "2024-01-15T10:30:00+00:00",
      "updated_at": "2024-01-15T12:00:00+00:00",
      "fields": {
        "titre": "Mon premier article",
        "slug": "mon-premier-article",
        "corps": "<p>Contenu complet ici...</p>"
      }
    }
  ],
  "total": 42,
  "current_page": 1,
  "last_page": 3,
  "per_page": 15,
  "from": 1,
  "to": 15
}
\`\`\`

## Codes de statut

| Statut | Description |
|--------|-------------|
| \`200\` | Succès |
| \`403\` | API publique désactivée pour ce projet |
| \`404\` | Projet ou collection introuvable |
`,

  'fr/api/entries/get-entry.md': `---
title: Obtenir une entrée
description: Récupérer une seule entrée de contenu par son UUID.
---

Récupère une seule entrée de contenu par son UUID.

\`\`\`http
GET /api/{projectId}/{collectionSlug}/{uuid}
\`\`\`

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| \`projectId\` | uuid | L'UUID de votre projet |
| \`collectionSlug\` | string | Le slug de la collection |
| \`uuid\` | uuid | L'UUID de l'entrée |

## Requête

\`\`\`bash
curl https://votre-domaine.com/api/{projectId}/articles/550e8400-... \\
  -H "Authorization: Bearer VOTRE_TOKEN_API"
\`\`\`

## Réponse

\`\`\`json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "status": "published",
  "locale": "fr",
  "created_at": "2024-01-15T10:30:00+00:00",
  "fields": {
    "titre": "Mon premier article",
    "slug": "mon-premier-article",
    "corps": "<p>Contenu complet ici...</p>"
  }
}
\`\`\`

## Codes de statut

| Statut | Description |
|--------|-------------|
| \`200\` | Succès |
| \`404\` | Entrée introuvable |
`,

  'fr/api/entries/create-entry.md': `---
title: Créer une entrée
description: Créer une nouvelle entrée de contenu dans une collection.
---

Crée une nouvelle entrée de contenu dans une collection.

\`\`\`http
POST /api/{projectId}/{collectionSlug}
\`\`\`

## Corps de la requête

\`\`\`json
{
  "status": "published",
  "locale": "fr",
  "fields": {
    "titre": "Mon nouvel article",
    "slug": "mon-nouvel-article",
    "corps": "<p>Contenu ici...</p>"
  }
}
\`\`\`

| Champ | Type | Défaut | Description |
|-------|------|--------|-------------|
| \`status\` | string | \`draft\` | \`draft\` ou \`published\` |
| \`locale\` | string | défaut du projet | Locale de l'entrée |
| \`fields\` | object | \`{}\` | Valeurs des champs par slug |

## Requête

\`\`\`bash
curl -X POST https://votre-domaine.com/api/{projectId}/articles \\
  -H "Authorization: Bearer VOTRE_TOKEN_API" \\
  -H "Content-Type: application/json" \\
  -d '{"status":"published","locale":"fr","fields":{"titre":"Mon article"}}'
\`\`\`

## Réponse

Retourne l'entrée créée avec HTTP \`201 Created\`.

## Codes de statut

| Statut | Description |
|--------|-------------|
| \`201\` | Créé avec succès |
| \`403\` | Permissions insuffisantes |
| \`404\` | Collection introuvable |
| \`409\` | La collection singleton a déjà une entrée |
| \`422\` | Locale ou valeurs de champs invalides |
`,

  'fr/api/entries/update-entry.md': `---
title: Mettre à jour une entrée
description: Mettre à jour une entrée de contenu existante.
---

Met à jour une entrée de contenu existante. Supporte le remplacement complet (\`PUT\`) ou la mise à jour partielle (\`PATCH\`).

\`\`\`http
PUT   /api/{projectId}/{collectionSlug}/{uuid}
PATCH /api/{projectId}/{collectionSlug}/{uuid}
\`\`\`

Utilisez \`PATCH\` pour ne mettre à jour que certains champs.

## Corps de la requête

\`\`\`json
{
  "status": "published",
  "fields": {
    "titre": "Titre mis à jour",
    "corps": "<p>Contenu mis à jour</p>"
  }
}
\`\`\`

## Requête

\`\`\`bash
curl -X PATCH https://votre-domaine.com/api/{projectId}/articles/550e8400-... \\
  -H "Authorization: Bearer VOTRE_TOKEN_API" \\
  -H "Content-Type: application/json" \\
  -d '{"fields":{"titre":"Titre mis à jour"}}'
\`\`\`

## Codes de statut

| Statut | Description |
|--------|-------------|
| \`200\` | Mis à jour avec succès |
| \`403\` | Permissions insuffisantes |
| \`404\` | Entrée introuvable |
| \`422\` | Valeurs invalides |
`,

  'fr/api/entries/delete-entry.md': `---
title: Supprimer une entrée
description: Suppression douce d'une entrée de contenu (déplace vers la corbeille).
---

Déplace une entrée de contenu vers la corbeille (suppression douce).

\`\`\`http
DELETE /api/{projectId}/{collectionSlug}/{uuid}
\`\`\`

## Requête

\`\`\`bash
curl -X DELETE https://votre-domaine.com/api/{projectId}/articles/550e8400-... \\
  -H "Authorization: Bearer VOTRE_TOKEN_API"
\`\`\`

## Réponse

Retourne HTTP \`204 No Content\` en cas de succès.

## Codes de statut

| Statut | Description |
|--------|-------------|
| \`204\` | Supprimé (déplacé en corbeille) |
| \`403\` | Permissions insuffisantes |
| \`404\` | Entrée introuvable |

:::note
Ceci effectue une **suppression douce** — l'entrée passe en corbeille et n'est plus retournée par les endpoints liste/get. Pour supprimer définitivement, utilisez le panneau d'administration.
:::
`,

  'fr/api/entries/translations.md': `---
title: Traductions
description: Gérer les entrées de contenu multi-locale dans Jambo.
---

Jambo gère le contenu multi-locale au **niveau de l'entrée** — chaque entrée a une seule propriété \`locale\`, et vous créez des entrées séparées pour chaque langue.

## Comment fonctionne la localisation

Chaque entrée appartient à une locale :

\`\`\`json
{
  "uuid": "entry-uuid",
  "locale": "fr",
  "fields": { "titre": "Bonjour le monde" }
}
\`\`\`

## Créer une entrée traduite

\`\`\`bash
curl -X POST https://votre-domaine.com/api/{projectId}/articles \\
  -H "Authorization: Bearer VOTRE_TOKEN_API" \\
  -H "Content-Type: application/json" \\
  -d '{"locale":"en","status":"published","fields":{"titre":"Hello world","slug":"hello-world"}}'
\`\`\`

## Récupérer les entrées par locale

\`\`\`bash
# Entrées en français
GET /api/{projectId}/articles?locale=fr

# Entrées en anglais
GET /api/{projectId}/articles?locale=en
\`\`\`

## Traduction IA

Utilisez **Fonctionnalités IA → Traduction IA** dans le panneau admin pour traduire automatiquement des entrées d'une locale à une autre.
`,

  'fr/api/entries/filtering-examples.md': `---
title: Exemples de filtrage
description: Exemples pratiques pour filtrer les entrées de contenu via l'API.
---

## Filtrer par statut

\`\`\`bash
# Entrées publiées (défaut)
GET /api/{projectId}/articles

# Entrées brouillon
GET /api/{projectId}/articles?status=draft
\`\`\`

## Filtrer par locale

\`\`\`bash
# Entrées en français
GET /api/{projectId}/articles?locale=fr

# Entrées en anglais
GET /api/{projectId}/articles?locale=en
\`\`\`

## Pagination

\`\`\`bash
# Page 2, 25 éléments par page
GET /api/{projectId}/articles?page=2&per_page=25
\`\`\`

## Combiner les filtres

\`\`\`bash
GET /api/{projectId}/articles?locale=fr&status=published&page=1&per_page=10
\`\`\`

## Filtrage avancé avec GraphQL

Pour les requêtes complexes (filtrer par valeur de champ, trier, filtres de plage), utilisez l'endpoint GraphQL :

\`\`\`graphql
query {
  articles(
    filter: { status: { eq: "published" }, locale: { eq: "fr" } }
    sort: [{ field: "created_at", direction: DESC }]
    page: 1
    perPage: 10
  ) {
    data { uuid fields { titre slug } }
    total
  }
}
\`\`\`

Voir [Filtrage avancé](/fr/api/entries/advanced-filtering/) pour la référence GraphQL complète.
`,

  // ── Assets FR ───────────────────────────────────────────────────────────
  'fr/api/assets/list-assets.md': `---
title: Lister les assets
description: Récupérer une liste de fichiers médias depuis la médiathèque du projet.
---

\`\`\`http
GET /api/{projectId}/files
\`\`\`

## Paramètres de requête

| Paramètre | Défaut | Description |
|-----------|--------|-------------|
| \`page\` | \`1\` | Numéro de page |
| \`per_page\` | \`15\` | Éléments par page (max \`100\`) |
| \`type\` | — | Filtrer par préfixe MIME : \`image\`, \`video\`, \`application\` |
| \`search\` | — | Rechercher par nom de fichier |

## Requête

\`\`\`bash
curl https://votre-domaine.com/api/{projectId}/files \\
  -H "Authorization: Bearer VOTRE_TOKEN_API"
\`\`\`

## Réponse

\`\`\`json
{
  "data": [
    {
      "uuid": "img-uuid-1234",
      "filename": "hero.jpg",
      "mime_type": "image/jpeg",
      "size": 204800,
      "url": "/uploads/media/abc123/hero.jpg",
      "created_at": "2024-01-15T10:00:00+00:00"
    }
  ],
  "total": 24,
  "current_page": 1,
  "per_page": 15
}
\`\`\`
`,

  'fr/api/assets/get-asset.md': `---
title: Obtenir un asset
description: Récupérer un seul fichier média par son UUID.
---

\`\`\`http
GET /api/{projectId}/files/{identifier}
\`\`\`

L'\`identifier\` peut être l'**UUID** ou le **nom de fichier** de l'asset.

## Requête

\`\`\`bash
# Par UUID
curl https://votre-domaine.com/api/{projectId}/files/img-uuid-1234 \\
  -H "Authorization: Bearer VOTRE_TOKEN_API"
\`\`\`

## Réponse

\`\`\`json
{
  "uuid": "img-uuid-1234",
  "filename": "hero.jpg",
  "mime_type": "image/jpeg",
  "size": 204800,
  "url": "/uploads/media/abc123/hero.jpg"
}
\`\`\`
`,

  'fr/api/assets/get-asset-by-name.md': `---
title: Obtenir un asset par nom
description: Récupérer un fichier média en utilisant son nom de fichier original.
---

Récupère un fichier média en utilisant son nom de fichier. C'est un alias pratique pour [Obtenir un asset](/fr/api/assets/get-asset/) — le paramètre \`identifier\` accepte à la fois les UUIDs et les noms de fichiers.

\`\`\`http
GET /api/{projectId}/files/{filename}
\`\`\`

## Exemple

\`\`\`bash
curl https://votre-domaine.com/api/{projectId}/files/hero.jpg \\
  -H "Authorization: Bearer VOTRE_TOKEN_API"
\`\`\`

Voir [Obtenir un asset](/fr/api/assets/get-asset/) pour le format de réponse complet.
`,

  'fr/api/assets/upload-asset.md': `---
title: Uploader un asset
description: Uploader un fichier dans la médiathèque du projet.
---

\`\`\`http
POST /api/{projectId}/files
\`\`\`

## Requête

Envoyez une requête \`multipart/form-data\` avec le fichier dans le champ \`file\` :

\`\`\`bash
curl -X POST https://votre-domaine.com/api/{projectId}/files \\
  -H "Authorization: Bearer VOTRE_TOKEN_API" \\
  -F "file=@/chemin/vers/image.jpg"
\`\`\`

Depuis JavaScript :

\`\`\`js
const form = new FormData();
form.append('file', fileInput.files[0]);

const res = await fetch(\`/api/\${projectId}/files\`, {
  method: 'POST',
  headers: { Authorization: \`Bearer \${token}\` },
  body: form,
});
const asset = await res.json();
\`\`\`

## Réponse

Retourne l'asset uploadé avec HTTP \`201 Created\` :

\`\`\`json
{
  "uuid": "new-asset-uuid",
  "filename": "image.jpg",
  "mime_type": "image/jpeg",
  "size": 102400,
  "url": "/uploads/media/new-asset-uuid/image.jpg"
}
\`\`\`
`,

  'fr/api/assets/delete-asset.md': `---
title: Supprimer un asset
description: Supprimer définitivement un fichier média de la médiathèque du projet.
---

\`\`\`http
DELETE /api/{projectId}/files/{uuid}
\`\`\`

:::caution
Cette action est **permanente**. Le fichier est supprimé du stockage et ne peut pas être récupéré.
:::

## Requête

\`\`\`bash
curl -X DELETE https://votre-domaine.com/api/{projectId}/files/img-uuid-1234 \\
  -H "Authorization: Bearer VOTRE_TOKEN_API"
\`\`\`

## Codes de statut

| Statut | Description |
|--------|-------------|
| \`204\` | Supprimé avec succès |
| \`403\` | Permissions insuffisantes |
| \`404\` | Asset introuvable |
`,

  // ── Collections FR ──────────────────────────────────────────────────────
  'fr/api/collections/list-collections.md': `---
title: Lister les collections
description: Récupérer toutes les collections d'un projet.
---

\`\`\`http
GET /api/{projectId}/collections
\`\`\`

## Requête

\`\`\`bash
curl https://votre-domaine.com/api/{projectId}/collections \\
  -H "Authorization: Bearer VOTRE_TOKEN_API"
\`\`\`

## Réponse

\`\`\`json
{
  "data": [
    {
      "uuid": "coll-uuid",
      "name": "Articles",
      "slug": "articles",
      "description": "Articles de blog",
      "is_singleton": false,
      "fields": [
        { "name": "Titre", "slug": "titre", "type": "text", "required": true },
        { "name": "Corps", "slug": "corps", "type": "richtext", "required": false }
      ]
    }
  ]
}
\`\`\`
`,

  'fr/api/collections/get-collection.md': `---
title: Obtenir une collection
description: Récupérer une seule collection par son slug.
---

\`\`\`http
GET /api/{projectId}/collections/{slug}
\`\`\`

## Requête

\`\`\`bash
curl https://votre-domaine.com/api/{projectId}/collections/articles \\
  -H "Authorization: Bearer VOTRE_TOKEN_API"
\`\`\`

## Codes de statut

| Statut | Description |
|--------|-------------|
| \`200\` | Succès |
| \`404\` | Collection introuvable |
`,

  'fr/api/collections/create-collection.md': `---
title: Créer une collection
description: Créer une nouvelle collection avec des champs via l'API Jambo.
---

\`\`\`http
POST /api/projects/{projectId}/collections
\`\`\`

## Corps de la requête

\`\`\`json
{
  "name": "Produits",
  "slug": "produits",
  "description": "Catalogue produits",
  "isSingleton": false,
  "fields": [
    { "name": "Nom", "slug": "nom", "type": "text", "isRequired": true },
    { "name": "Prix", "slug": "prix", "type": "decimal", "isRequired": true }
  ]
}
\`\`\`

## Codes de statut

| Statut | Description |
|--------|-------------|
| \`201\` | Créé |
| \`409\` | Une collection avec ce slug existe déjà |
| \`422\` | Erreur de validation |
`,

  'fr/api/collections/update-collection.md': `---
title: Mettre à jour une collection
description: Mettre à jour le nom ou la description d'une collection existante.
---

\`\`\`http
PATCH /api/projects/{projectId}/collections/{slug}
\`\`\`

## Corps de la requête

\`\`\`json
{
  "name": "Nouveau nom",
  "description": "Nouvelle description"
}
\`\`\`

## Codes de statut

| Statut | Description |
|--------|-------------|
| \`200\` | Mis à jour |
| \`404\` | Collection introuvable |
`,

  'fr/api/collections/delete-collection.md': `---
title: Supprimer une collection
description: Supprimer une collection et toutes ses entrées.
---

\`\`\`http
DELETE /api/projects/{projectId}/collections/{slug}
\`\`\`

:::caution
Permanent. Toutes les entrées de la collection sont immédiatement et irréversiblement supprimées.
:::

## Codes de statut

| Statut | Description |
|--------|-------------|
| \`204\` | Supprimé |
| \`404\` | Collection introuvable |
`,

  'fr/api/collections/reorder-collections.md': `---
title: Réordonner les collections
description: Changer l'ordre d'affichage des collections dans la barre latérale.
---

\`\`\`http
POST /api/projects/{projectId}/collections/reorder
\`\`\`

## Corps de la requête

\`\`\`json
{
  "slugs": ["pages", "articles", "produits", "categories"]
}
\`\`\`

## Codes de statut

| Statut | Description |
|--------|-------------|
| \`200\` | Réordonné |
| \`422\` | Slugs invalides |
`,

  // ── Fields FR ───────────────────────────────────────────────────────────
  'fr/api/fields/create-field.md': `---
title: Créer un champ
description: Ajouter un nouveau champ à une collection.
---

\`\`\`http
POST /api/projects/{projectId}/collections/{slug}/fields
\`\`\`

## Corps de la requête

\`\`\`json
{
  "name": "Publié le",
  "slug": "publie_le",
  "type": "datetime",
  "isRequired": false,
  "options": {}
}
\`\`\`

### Champ Énumération

\`\`\`json
{
  "name": "Statut",
  "slug": "statut",
  "type": "enumeration",
  "isRequired": true,
  "options": { "values": ["brouillon", "publié", "archivé"] }
}
\`\`\`

### Champ Relation

\`\`\`json
{
  "name": "Auteur",
  "slug": "auteur",
  "type": "relation",
  "isRequired": false,
  "options": { "targetCollection": "end_users" }
}
\`\`\`

## Codes de statut

| Statut | Description |
|--------|-------------|
| \`201\` | Créé |
| \`409\` | Un champ avec ce slug existe déjà |
| \`422\` | Type invalide ou options requises manquantes |
`,

  'fr/api/fields/update-field.md': `---
title: Mettre à jour un champ
description: Mettre à jour le nom ou les options d'un champ. Le slug ne peut pas être modifié.
---

\`\`\`http
PATCH /api/projects/{projectId}/collections/{collectionSlug}/fields/{fieldSlug}
\`\`\`

## Corps de la requête

\`\`\`json
{
  "name": "Nouveau nom d'affichage",
  "isRequired": true
}
\`\`\`

## Codes de statut

| Statut | Description |
|--------|-------------|
| \`200\` | Mis à jour |
| \`404\` | Champ introuvable |
`,

  'fr/api/fields/delete-field.md': `---
title: Supprimer un champ
description: Supprimer un champ d'une collection et effacer toutes ses valeurs stockées.
---

\`\`\`http
DELETE /api/projects/{projectId}/collections/{collectionSlug}/fields/{fieldSlug}
\`\`\`

:::caution
Toutes les valeurs stockées dans ce champ sur toutes les entrées sont définitivement supprimées.
:::

## Codes de statut

| Statut | Description |
|--------|-------------|
| \`204\` | Supprimé |
| \`404\` | Champ introuvable |
`,

  'fr/api/fields/reorder-fields.md': `---
title: Réordonner les champs
description: Changer l'ordre d'affichage des champs dans l'éditeur de contenu.
---

\`\`\`http
POST /api/projects/{projectId}/collections/{slug}/fields/reorder
\`\`\`

## Corps de la requête

\`\`\`json
{
  "slugs": ["titre", "image_a_la_une", "corps", "auteur", "publie_le"]
}
\`\`\`

## Codes de statut

| Statut | Description |
|--------|-------------|
| \`200\` | Réordonné |
| \`422\` | Slugs de champs invalides |
`,

  // ── Project FR ──────────────────────────────────────────────────────────
  'fr/api/project/get-project.md': `---
title: Obtenir le projet
description: Récupérer les informations et la configuration du projet.
---

\`\`\`http
GET /api/{projectId}/project
\`\`\`

## Requête

\`\`\`bash
curl https://votre-domaine.com/api/{projectId}/project \\
  -H "Authorization: Bearer VOTRE_TOKEN_API"
\`\`\`

## Réponse

\`\`\`json
{
  "uuid": "f99cb038-6611-44d3-b1c7-46cf62c1e232",
  "name": "Mon Blog",
  "slug": "mon-blog",
  "default_locale": "fr",
  "locales": ["fr", "en", "es"],
  "collections": [
    { "slug": "articles", "name": "Articles", "is_singleton": false },
    { "slug": "parametres", "name": "Paramètres", "is_singleton": true }
  ]
}
\`\`\`

## Codes de statut

| Statut | Description |
|--------|-------------|
| \`200\` | Succès |
| \`403\` | Token invalide ou API publique désactivée |
| \`404\` | Projet introuvable |
`,
};

let created = 0;
let skipped = 0;

for (const [relPath, content] of Object.entries(pages)) {
  const fullPath = `${BASE}/${relPath}`;
  try {
    const existing = readFileSync(fullPath, 'utf8');
    if (!existing.includes('Coming Soon')) {
      console.log(`SKIP (has content): ${relPath}`);
      skipped++;
      continue;
    }
  } catch {}
  writeFileSync(fullPath, content);
  console.log(`WRITTEN: ${relPath}`);
  created++;
}

console.log(`\nDone: ${created} written, ${skipped} skipped`);
