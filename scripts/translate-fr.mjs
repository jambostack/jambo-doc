/**
 * Génère les traductions françaises pour toutes les pages encore en stub.
 * Run: node scripts/translate-fr.mjs
 */
import { writeFileSync, readFileSync, existsSync } from 'fs';

const BASE = 'src/content/docs';

const pages = {
  // ── Introduction ──────────────────────────────────────────────────────
  'fr/introduction.md': `---
title: Introduction
description: Jambo est un CMS headless open-source construit avec Symfony 8 et PHP 8.4 — rapide, orienté développeurs et natif IA.
---

Jambo est un **CMS headless** open-source construit avec Symfony 8 et PHP 8.4. Il expose votre contenu via une API REST et un endpoint GraphQL, avec des outils IA intégrés pour concevoir des schémas, générer du contenu et traduire des entrées automatiquement.

## Fonctionnalités clés

- **API REST & GraphQL** — générées automatiquement depuis vos collections, avec filtres, pagination et support multi-locale
- **AI Studio** — constructeur de schéma par chat, propulsé par n'importe quel LLM (OpenAI, Anthropic, Gemini, DeepSeek, Ollama)
- **Agent IA** — opérations en masse : créer des collections, générer des entrées, uploader des images en un seul prompt
- **Multi-locale** — gestion de la locale par entrée avec outils de traduction
- **Serveur MCP** — exposer votre projet comme serveur MCP pour les agents IA
- **Médiathèque** — upload de fichiers, transformations d'images, stockage compatible S3
- **Rôles & permissions** — contrôle d'accès granulaire pour les équipes et les clients API
- **Webhooks** — notifications push sur les événements de contenu
- **Auth end-user** — authentification JWT intégrée pour vos utilisateurs finaux

## Architecture

\`\`\`
Votre frontend / app mobile
        │
        ▼
API REST  /api/{projectId}/{collection}
GraphQL   /api/projects/{projectId}/graphql
Fichiers  /api/{projectId}/files
        │
        ▼
   Jambo CMS (Symfony + PHP 8.4)
        │
        ▼
Base de données (MySQL / PostgreSQL / SQLite)
\`\`\`

Jambo est **headless** — il ne sert que des données JSON. Votre frontend peut être n'importe quel framework : Next.js, Nuxt, Astro, applications mobiles ou générateur de site statique.

## Démarrage rapide

1. [Installez Jambo](/fr/installation/) sur votre serveur ou en local
2. Créez un projet et votre première collection via l'interface d'administration
3. Récupérez votre contenu depuis l'API :

\`\`\`bash
curl https://votre-domaine.com/api/{project-uuid}/articles
\`\`\`

## Communauté

- **GitHub** — [github.com/jambostack/jambo-api](https://github.com/jambostack/jambo-api)
- **Issues & demandes de fonctionnalités** — ouvrez une issue sur GitHub
`,

  // ── Projects ──────────────────────────────────────────────────────────
  'fr/projects/introduction.md': `---
title: Projets — Introduction
description: Les projets sont les conteneurs de premier niveau pour votre contenu dans Jambo.
---

Un **projet** est le conteneur de premier niveau pour votre CMS. Chaque projet possède ses propres :

- Collections et champs
- Entrées de contenu
- Médiathèque
- Tokens API et paramètres d'accès
- Locales et paramètres de traduction
- Webhooks

Vous pouvez créer plusieurs projets sur une seule installation Jambo — par exemple, un projet par site web ou application.

## Créer un projet

1. Connectez-vous au panneau d'administration Jambo
2. Cliquez sur **+ Nouveau projet** depuis le tableau de bord
3. Entrez un nom et un slug de projet
4. Choisissez la locale par défaut
5. Cliquez sur **Créer**

Votre projet est immédiatement prêt avec un UUID auto-généré et un endpoint API.

## UUID du projet

Chaque projet possède un UUID unique (ex. \`f99cb038-6611-44d3-b1c7-46cf62c1e232\`). Cet UUID est utilisé dans toutes les requêtes API :

\`\`\`
https://votre-domaine.com/api/{project-uuid}/slug-collection
\`\`\`

Trouvez l'UUID de votre projet dans **Paramètres du projet → Accès API**.

## Étapes suivantes

- [Créer des projets](/fr/projects/creating-projects/) — Guide étape par étape
- [Collections](/fr/projects/collections/what-are-collections/) — Définir la structure du contenu
- [API de contenu](/fr/api/introduction/) — Connecter votre frontend
`,

  'fr/projects/creating-projects.md': `---
title: Créer des projets
description: Guide étape par étape pour créer un nouveau projet dans Jambo.
---

## Créer un projet

1. Depuis le tableau de bord, cliquez sur **+ Nouveau projet**
2. Renseignez les détails du projet :

| Champ | Description |
|-------|-------------|
| **Nom** | Nom d'affichage (ex. "Mon Blog") |
| **Slug** | Identifiant URL-safe utilisé dans les routes API |
| **Locale par défaut** | Langue principale du contenu (ex. \`fr\`) |
| **Description** | Description optionnelle du projet |

3. Cliquez sur **Créer le projet**

Jambo crée le projet et vous redirige vers le tableau de bord du projet.

## Premières étapes après la création

### 1. Ajouter des locales (optionnel)

Si votre projet nécessite le support multi-langue, allez dans **Paramètres du projet → Localisation** et ajoutez les locales nécessaires (ex. \`en\`, \`es\`, \`ar\`).

### 2. Créer des collections

Les collections définissent la structure de votre contenu. Allez dans **Paramètres → Collections** et créez votre première collection — ou utilisez le Studio IA pour générer un schéma depuis une description.

### 3. Ajouter un accès API

Allez dans **Paramètres du projet → Accès API** pour créer un token API pour votre frontend.

### 4. Ajouter des membres à l'équipe

Allez dans **Paramètres du projet → Accès utilisateurs** pour inviter des collaborateurs et leur attribuer des rôles.
`,

  'fr/projects/project-details.md': `---
title: Détails du projet
description: Comprendre le tableau de bord projet et les informations clés dans Jambo.
---

Le tableau de bord projet vous donne une vue d'ensemble de votre projet. Accédez-y en cliquant sur un projet depuis le tableau de bord principal.

## Vue d'ensemble du tableau de bord

| Section | Description |
|---------|-------------|
| **Collections** | Nombre de collections avec liens d'accès rapide |
| **Entrées** | Total des entrées de contenu sur toutes les collections |
| **Médias** | Nombre de fichiers dans la médiathèque et espace utilisé |
| **API** | Copie rapide de l'UUID du projet et de l'URL de base API |
| **Activité récente** | Les 10 dernières modifications avec auteur et horodatage |

## UUID du projet

L'UUID du projet est l'identifiant unique utilisé dans chaque appel API :

\`\`\`
https://votre-domaine.com/api/{project-uuid}/slug-collection
\`\`\`

## URL de base de l'API

Copiez l'URL de base de l'API depuis le tableau de bord et collez-la dans le \`.env\` de votre frontend :

\`\`\`ini
NEXT_PUBLIC_JAMBO_API=https://votre-domaine.com/api/f99cb038-...
JAMBO_TOKEN=votre-token-api
\`\`\`

## Résumé du contenu

Le tableau de bord affiche le nombre d'entrées par collection, réparties en :
- **Publiées** — visibles dans l'API publique
- **Brouillons** — masquées de l'API publique
- **Corbeille** — suppression douce, dans la corbeille

## Actions rapides

Depuis le tableau de bord projet vous pouvez :
- **Ouvrir le Studio** — lancer le chat IA pour la génération de schéma et de contenu
- **Voir la doc API** — ouvrir la spec OpenAPI auto-générée dans Swagger UI
- **Copier l'URL API** — copier l'URL de base de l'API dans le presse-papiers
`,

  'fr/projects/cloning-projects.md': `---
title: Cloner des projets
description: Dupliquer un projet Jambo existant avec son schéma et optionnellement son contenu.
---

Cloner un projet crée une copie complète — incluant toutes les collections, les définitions de champs et les paramètres. Vous pouvez choisir d'inclure les entrées de contenu et les fichiers médias.

## Quand cloner

- **Environnement de staging** — cloner la production pour tester des changements de schéma avant la mise en ligne
- **Nouveau projet client** — démarrer depuis un schéma existant plutôt que de zéro
- **Sauvegarde** — snapshot avant un refactoring majeur du schéma

## Comment cloner

1. Depuis le tableau de bord, trouvez le projet à cloner
2. Cliquez sur le menu **...** puis **Cloner le projet**
3. Configurez le clone :

| Option | Description |
|--------|-------------|
| **Nom du nouveau projet** | Nom d'affichage du projet cloné |
| **Slug du nouveau projet** | Identifiant API du nouveau projet |
| **Copier les entrées** | Cloner toutes les entrées de contenu (pas seulement le schéma) |
| **Copier les fichiers médias** | Dupliquer les fichiers de la médiathèque |

4. Cliquez sur **Cloner**

Le clonage s'exécute en arrière-plan. Pour les grands projets, cela peut prendre quelques minutes.

## Après le clonage

Le projet cloné est totalement indépendant :
- Nouvel UUID et nouveaux tokens API (à générer dans **Paramètres → Accès API**)
- Mêmes collections et définitions de champs
- Les webhooks ne sont pas clonés — à configurer séparément
`,

  'fr/projects/project-templates.md': `---
title: Templates de projet
description: Utiliser les templates pour échafauder rapidement des structures de contenu courantes dans Jambo.
---

Les templates de projet sont des schémas pré-construits que vous pouvez appliquer lors de la création d'un nouveau projet. Ils vous fournissent une structure de collections prête à l'emploi.

## Templates disponibles

### Blog

- **Articles** — titre, slug, corps richtext, extrait, image à la une, auteur (relation → end_users), publié_le
- **Catégories** — nom, slug, description
- **Tags** — nom, slug

### Catalogue e-commerce

- **Produits** — nom, slug, description, prix, images, catégorie (relation), stock, statut
- **Catégories** — nom, slug, image, parent (relation → catégories)
- **Avis** — note, commentaire, produit (relation), auteur (relation → end_users)

### Portfolio

- **Projets** — titre, slug, description, image de couverture, galerie, tags, année, client
- **Services** — titre, description, icône, fourchette de prix
- **Témoignages** — nom de l'auteur, entreprise, citation, avatar

### Page d'atterrissage

- **Hero** _(singleton)_ — titre, sous-titre, texte CTA, lien CTA, image de fond
- **Fonctionnalités** — titre, description, icône, ordre
- **FAQ** — question, réponse, catégorie
- **Membres de l'équipe** — nom, rôle, bio, avatar, linkedin_url

## Appliquer un template

1. Cliquez sur **+ Nouveau projet**
2. Sélectionnez **Démarrer depuis un template**
3. Choisissez un template
4. Personnalisez le nom et le slug
5. Cliquez sur **Créer**

## Schémas générés par IA

Pour les structures personnalisées non couvertes par les templates, utilisez le [Studio IA](/fr/studio/schema-builder/) pour décrire vos besoins en langage naturel et générer un schéma sur mesure en quelques secondes.
`,

  // ── Collections ────────────────────────────────────────────────────────
  'fr/projects/collections/what-are-collections.md': `---
title: Qu'est-ce qu'une collection ?
description: Les collections sont les types de contenu qui définissent la structure de vos données dans Jambo.
---

Une **collection** est un type de contenu — elle définit la structure (champs) d'un groupe d'entrées liées. Pensez-y comme une table de base de données, sans avoir besoin de SQL.

## Exemples

| Collection | Champs |
|------------|--------|
| \`articles\` | titre, slug, corps, auteur, image_a_la_une, publié_le |
| \`produits\` | nom, prix, description, images, catégorie |
| \`membres_equipe\` | nom, rôle, bio, avatar, linkedin_url |
| \`parametres\` | titre_site, logo, texte_pied_de_page _(singleton)_ |

## Collection standard vs. singleton

**Collection standard** — peut avoir plusieurs entrées. Utilisée pour les listes d'éléments comme des articles de blog, des produits ou des membres d'équipe.

**Singleton** — ne peut avoir qu'une seule entrée. Utilisé pour les paramètres globaux du site, une section hero de page d'accueil, ou tout contenu unique.

## API auto-générée

Lorsque vous créez une collection, Jambo génère automatiquement des endpoints REST et GraphQL :

\`\`\`
GET    /api/{projectId}/articles          # lister tous les articles
GET    /api/{projectId}/articles/{uuid}   # obtenir un article
POST   /api/{projectId}/articles          # créer un article
PATCH  /api/{projectId}/articles/{uuid}   # mettre à jour un article
DELETE /api/{projectId}/articles/{uuid}   # supprimer un article
\`\`\`

Aucune configuration supplémentaire nécessaire.
`,

  'fr/projects/collections/creating-collections.md': `---
title: Créer des collections
description: Comment créer une nouvelle collection dans Jambo.
---

## Via le panneau d'administration

1. Ouvrez votre projet et allez dans **Paramètres → Collections**
2. Cliquez sur **+ Nouvelle collection**
3. Renseignez les détails :

| Champ | Description |
|-------|-------------|
| **Nom** | Nom d'affichage (ex. \`Articles\`) |
| **Slug** | Identifiant API, auto-généré depuis le nom (ex. \`articles\`) |
| **Description** | Optionnel, affiché dans la barre latérale |
| **Singleton** | Activez si la collection ne doit avoir qu'une seule entrée |

4. Cliquez sur **Créer** — votre collection est créée et les endpoints API sont disponibles immédiatement

## Via le Studio IA

Décrivez ce dont vous avez besoin en langage naturel :

\`\`\`
/schema Créer un blog avec Articles (titre, slug, corps richtext, image à la une, auteur relation vers end_users, publié_le date), et une collection Catégories (nom, slug, description)
\`\`\`

Cliquez sur **Appliquer le schéma** pour créer toutes les collections et tous les champs d'un coup.

## Après la création

Votre collection dispose immédiatement de ces endpoints REST :

\`\`\`
GET    /api/{projectId}/articles       # lister les entrées
GET    /api/{projectId}/articles/{uuid} # obtenir une entrée
POST   /api/{projectId}/articles       # créer
PATCH  /api/{projectId}/articles/{uuid} # mettre à jour
DELETE /api/{projectId}/articles/{uuid} # supprimer
\`\`\`

Ensuite, [ajoutez des champs](/fr/projects/collections/adding-fields/) pour définir les données stockées par chaque entrée.
`,

  'fr/projects/collections/collection-settings.md': `---
title: Paramètres de collection
description: Configurer les paramètres au niveau de la collection dans Jambo.
---

Accédez aux paramètres de collection via **Paramètres → Collections** → icône des paramètres sur une collection.

## Paramètres généraux

| Paramètre | Description |
|-----------|-------------|
| **Nom** | Nom d'affichage dans la barre latérale |
| **Slug** | Identifiant API. Changer le slug casse les appels API existants — à faire avec précaution |
| **Description** | Description optionnelle |
| **Icône** | Emoji ou icône affichés dans la navigation |
| **Singleton** | Si activé, une seule entrée est autorisée |

## Paramètres API

| Paramètre | Description |
|-----------|-------------|
| **Lecture publique** | Autoriser les requêtes GET non authentifiées pour cette collection |
| **Visibilité des brouillons** | Si les entrées brouillon apparaissent dans l'API publique |

## Zone dangereuse

| Action | Description |
|--------|-------------|
| **Supprimer la collection** | Supprime définitivement la collection, tous ses champs et toutes ses entrées |

:::caution
La suppression d'une collection est permanente et irréversible. Toutes les entrées sont supprimées immédiatement.
:::
`,

  'fr/projects/collections/field-types.md': `---
title: Types de champs
description: Référence complète de tous les types de champs disponibles dans les collections Jambo.
---

Lorsque vous ajoutez des champs à une collection, vous choisissez un **type de champ** qui définit comment la donnée est stockée et validée.

## Texte & Contenu

| Type | Description | Exemple de valeur |
|------|-------------|-------------------|
| \`text\` | Texte court sur une ligne | \`"Bonjour monde"\` |
| \`longtext\` | Texte multi-ligne | \`"Ligne 1\\nLigne 2"\` |
| \`richtext\` | Texte riche HTML (éditeur WYSIWYG) | \`"<p>Bonjour <strong>monde</strong></p>"\` |
| \`slug\` | Chaîne URL-safe, auto-générée depuis un autre champ | \`"bonjour-monde"\` |
| \`email\` | Adresse email avec validation | \`"utilisateur@exemple.com"\` |
| \`password\` | Mot de passe haché | _(écriture uniquement)_ |
| \`color\` | Valeur de couleur hexadécimale | \`"#3b82f6"\` |

## Nombres & Booléens

| Type | Description | Exemple de valeur |
|------|-------------|-------------------|
| \`number\` | Nombre entier | \`42\` |
| \`decimal\` | Nombre décimal | \`19.99\` |
| \`boolean\` | Vrai ou faux | \`true\` |

## Date & Heure

| Type | Description | Exemple de valeur |
|------|-------------|-------------------|
| \`date\` | Date uniquement | \`"2024-01-15"\` |
| \`datetime\` | Date et heure (ISO 8601) | \`"2024-01-15T10:30:00+00:00"\` |
| \`time\` | Heure uniquement | \`"10:30"\` |

## Structure

| Type | Description | Exemple de valeur |
|------|-------------|-------------------|
| \`enumeration\` | Une valeur parmi une liste prédéfinie | \`"brouillon"\` |
| \`json\` | Objet ou tableau JSON brut | \`{"cle": "valeur"}\` |

## Relations

| Type | Description | Exemple de valeur |
|------|-------------|-------------------|
| \`media\` | Référence à un fichier média (image, document, vidéo) | \`{"uuid": "...", "url": "..."}\` |
| \`relation\` | Référence à une entrée dans une autre collection | \`{"uuid": "...", "fields": {...}}\` |
`,

  'fr/projects/collections/adding-fields.md': `---
title: Ajouter des champs
description: Comment ajouter des champs à une collection dans Jambo.
---

Les champs définissent la structure des données d'une collection. Chaque entrée stocke une valeur pour chaque champ.

## Ajouter un champ

1. Ouvrez votre projet → **Paramètres → Collections**
2. Cliquez sur la collection à modifier
3. Cliquez sur **+ Ajouter un champ**
4. Choisissez un [type de champ](/fr/projects/collections/field-types/)
5. Configurez le champ :

| Option | Description |
|--------|-------------|
| **Nom** | Libellé d'affichage dans l'éditeur (ex. \`Image à la une\`) |
| **Slug** | Clé API — auto-généré, en minuscules avec underscores (ex. \`image_a_la_une\`) |
| **Requis** | Activez pour rendre le champ obligatoire |
| **Options** | Paramètres spécifiques au type (valeurs d'énumération, collection cible, etc.) |

6. Cliquez sur **Sauvegarder**

## Options requises par type

### Champs Énumération

Vous devez fournir la liste des valeurs autorisées :

\`\`\`
brouillon, publié, archivé
\`\`\`

### Champs Relation

Vous devez spécifier le slug de la **collection cible**. Exemple : \`end_users\` pour lier à la collection utilisateurs intégrée.

## Supprimer un champ

Cliquez sur l'icône de corbeille sur un champ pour le supprimer. Ceci **supprime définitivement toutes les valeurs stockées** pour ce champ dans toutes les entrées.

:::caution
La suppression d'un champ est irréversible. Exportez vos données d'abord si vous avez besoin de conserver les valeurs.
:::
`,

  // ── Content ────────────────────────────────────────────────────────────
  'fr/projects/content/managing-content.md': `---
title: Gérer le contenu
description: Vue d'ensemble de la gestion de contenu dans Jambo — statuts, locales et workflows.
---

Le contenu dans Jambo est organisé par **collection**. Chaque collection a sa propre liste d'entrées accessible depuis la barre latérale du projet.

## Statuts du contenu

Chaque entrée a l'un de deux statuts :

| Statut | Description |
|--------|-------------|
| \`brouillon\` | Non visible dans l'API publique par défaut |
| \`publié\` | Visible dans l'API publique |

## Locales

Si votre projet a plusieurs locales activées, chaque entrée appartient à une locale. Pour afficher du contenu en plusieurs langues, créez des entrées séparées — une par locale.

## Versionnement

Jambo sauvegarde un historique de versions pour chaque entrée. Cliquez sur **Historique** dans l'éditeur pour voir les versions précédentes et en restaurer une.

## Suppression douce (corbeille)

Supprimer une entrée la déplace vers la corbeille — elle disparaît de l'API publique mais n'est pas supprimée définitivement. Pour la supprimer définitivement, allez dans **Contenu → Corbeille**.

## Recherche

Utilisez la barre de recherche en haut de la liste de contenu pour trouver des entrées par leurs champs texte. Si Meilisearch est configuré, la recherche est en texte intégral sur tous les champs texte.
`,

  'fr/projects/content/content-list.md': `---
title: Liste de contenu
description: Comment parcourir, filtrer et gérer les entrées dans la vue liste du contenu.
---

La liste de contenu affiche toutes les entrées d'une collection. Accédez-y depuis la barre latérale du projet en cliquant sur le nom d'une collection.

## Colonnes de la liste

| Colonne | Description |
|---------|-------------|
| **Statut** | Badge \`publié\` ou \`brouillon\` |
| **Locale** | Locale de l'entrée (ex. \`FR\`, \`EN\`) |
| **Mis à jour le** | Date de dernière modification |
| Champs de la collection | Jusqu'à 3 champs texte de la collection |

## Filtrage

Utilisez la barre de filtre pour affiner les entrées :

- **Statut** — tout afficher, publiés uniquement, ou brouillons uniquement
- **Locale** — filtrer par locale
- **Recherche** — rechercher par valeur de champ texte
- **Plage de dates** — filtrer par date de création ou de modification

## Actions groupées

Sélectionnez plusieurs entrées avec les cases à cocher, puis choisissez une action groupée :

- **Publier** — mettre toutes les entrées sélectionnées en \`publié\`
- **Dépublier** — mettre toutes en \`brouillon\`
- **Supprimer** — déplacer toutes vers la corbeille

## Tri

Cliquez sur un en-tête de colonne pour trier par cette colonne. Cliquez à nouveau pour inverser l'ordre.
`,

  'fr/projects/content/creating-editing-content.md': `---
title: Créer & Modifier du contenu
description: Comment créer et modifier des entrées de contenu dans l'éditeur Jambo.
---

## Créer une entrée

1. Ouvrez un projet et cliquez sur une collection dans la barre latérale
2. Cliquez sur **+ Nouvelle entrée**
3. Renseignez les champs
4. Cliquez sur **Sauvegarder comme brouillon** ou **Publier**

## L'éditeur

Chaque entrée a un formulaire avec des champs basés sur le schéma de la collection :

| Type de champ | Contrôle de l'éditeur |
|---------------|----------------------|
| \`text\` | Saisie sur une ligne |
| \`longtext\` | Zone de texte multi-ligne |
| \`richtext\` | Éditeur WYSIWYG avec outils IA |
| \`number\` / \`decimal\` | Saisie numérique |
| \`boolean\` | Interrupteur |
| \`date\` / \`datetime\` | Sélecteur de date |
| \`enumeration\` | Liste déroulante |
| \`media\` | Sélecteur de média avec upload |
| \`relation\` | Sélecteur d'entrée avec recherche |
| \`json\` | Éditeur de code JSON |
| \`color\` | Sélecteur de couleur |

## Sauvegarde automatique

L'éditeur sauvegarde automatiquement vos modifications toutes les 30 secondes.

## Publication

Cliquez sur **Publier** pour rendre l'entrée visible dans l'API publique. Cliquez sur **Dépublier** pour revenir en brouillon.

## Historique des versions

Cliquez sur **Historique** (icône horloge) dans la barre d'outils pour voir toutes les versions précédentes.

## Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| \`Ctrl+S\` / \`Cmd+S\` | Sauvegarder |
| \`Ctrl+Z\` / \`Cmd+Z\` | Annuler (dans l'éditeur richtext) |
`,

  'fr/projects/content/asset-library.md': `---
title: Médiathèque
description: Gérer les images, vidéos et documents dans la médiathèque Jambo.
---

La médiathèque stocke tous les fichiers médias d'un projet — images, vidéos, PDFs et autres documents.

## Uploader des fichiers

### Glisser-déposer

Glissez des fichiers directement sur la page de la médiathèque pour les uploader.

### Bouton Upload

Cliquez sur **+ Uploader** et sélectionnez un ou plusieurs fichiers depuis votre ordinateur.

### Depuis l'éditeur de contenu

Lors de l'édition d'un champ \`media\`, cliquez sur **Sélectionner / Uploader** pour ouvrir le sélecteur de médias.

### Via l'API

\`\`\`bash
curl -X POST https://votre-domaine.com/api/{projectId}/files \\
  -H "Authorization: Bearer VOTRE_TOKEN" \\
  -F "file=@image.jpg"
\`\`\`

## Types de fichiers supportés

Tout type de fichier peut être uploadé. Les images (JPEG, PNG, WebP, GIF, SVG) bénéficient de fonctionnalités supplémentaires comme la génération de miniatures et les transformations d'images.

## Transformations d'images

Jambo peut redimensionner et recadrer les images à la volée :

\`\`\`
/uploads/media/uuid/image.jpg?w=800&h=600&fit=cover
\`\`\`

| Paramètre | Description |
|-----------|-------------|
| \`w\` | Largeur en pixels |
| \`h\` | Hauteur en pixels |
| \`fit\` | \`cover\`, \`contain\` ou \`fill\` |
| \`q\` | Qualité (1–100, défaut 85) |
| \`f\` | Format : \`webp\`, \`jpeg\`, \`png\` |
`,

  // ── Project Settings ────────────────────────────────────────────────────
  'fr/projects/settings/project.md': `---
title: Paramètres du projet
description: Configurer les paramètres généraux du projet dans Jambo.
---

Accédez aux paramètres du projet via **Paramètres → Projet** dans la barre latérale.

## Général

| Paramètre | Description |
|-----------|-------------|
| **Nom** | Nom d'affichage du projet |
| **Slug** | Identifiant URL-safe (le changer casse les appels API existants) |
| **Description** | Description optionnelle |
| **Locale par défaut** | La langue principale utilisée quand aucune locale n'est spécifiée dans les appels API |
| **Statut** | Actif ou archivé |

## Zone dangereuse

| Action | Description |
|--------|-------------|
| **Archiver le projet** | Masque le projet du tableau de bord ; l'API continue de fonctionner |
| **Supprimer le projet** | Supprime définitivement le projet, toutes les collections, entrées et fichiers médias |

:::caution
La suppression d'un projet est irréversible. Toutes les données sont supprimées définitivement.
:::
`,

  'fr/projects/settings/localization.md': `---
title: Localisation
description: Configurer les locales du projet et les paramètres de contenu multilingue.
---

Allez dans **Paramètres du projet → Localisation** pour gérer les langues supportées par votre projet.

## Ajouter une locale

1. Cliquez sur **+ Ajouter une locale**
2. Entrez le code de locale (ex. \`fr\`, \`es\`, \`ar\`, \`de\`)
3. Cliquez sur **Ajouter**

## Locale par défaut

La locale par défaut est utilisée quand :
- Une entrée de contenu est créée sans spécifier de locale
- Un appel API est effectué sans paramètre \`?locale=\`

## Support RTL

Les locales comme l'arabe (\`ar\`), l'hébreu (\`he\`) ou le persan (\`fa\`) utilisent l'écriture de droite à gauche. L'éditeur richtext passe automatiquement en mode RTL quand une locale RTL est sélectionnée.

## Codes de locale

Utilisez les codes de locale standard BCP 47 :

| Langue | Code |
|--------|------|
| Français | \`fr\` |
| Anglais | \`en\` |
| Espagnol | \`es\` |
| Arabe | \`ar\` |
| Allemand | \`de\` |
| Portugais | \`pt\` |
| Chinois simplifié | \`zh\` |
| Japonais | \`ja\` |
`,

  'fr/projects/settings/api-access.md': `---
title: Accès API
description: Gérer les tokens API et les paramètres d'API publique pour votre projet.
---

Allez dans **Paramètres du projet → Accès API** pour gérer comment vos applications frontend se connectent à Jambo.

## UUID du projet

L'UUID de votre projet est l'identifiant utilisé dans chaque requête API :

\`\`\`
https://votre-domaine.com/api/{project-uuid}/slug-collection
\`\`\`

## Tokens API

Les tokens API authentifient vos applications frontend.

### Créer un token

1. Cliquez sur **+ Nouveau token**
2. Entrez un nom (ex. \`Frontend Next.js\`, \`App mobile\`)
3. Sélectionnez les scopes :

| Scope | Autorise |
|-------|----------|
| \`read\` | Requêtes GET — lister et récupérer les entrées |
| \`write\` | POST et PATCH — créer et mettre à jour |
| \`delete\` | Requêtes DELETE |
| \`admin\` | Accès complet incluant la gestion des collections |

4. Cliquez sur **Créer**
5. **Copiez le token immédiatement** — il n'est affiché qu'une seule fois

### Révoquer un token

Cliquez sur l'icône de corbeille à côté d'un token pour le révoquer immédiatement.

## API publique

Quand l'**API publique** est activée, les requêtes GET anonymes (sans token) peuvent lire le contenu \`publié\`.

:::caution
N'activez jamais l'API publique pour les projets contenant des données sensibles ou privées.
:::
`,

  'fr/projects/settings/webhooks.md': `---
title: Webhooks
description: Configurer des webhooks pour recevoir des notifications lors des changements de contenu dans Jambo.
---

Les webhooks envoient des requêtes HTTP POST à votre endpoint lors des événements de contenu.

## Créer un webhook

1. Cliquez sur **+ Nouveau webhook**
2. Renseignez les détails :

| Champ | Description |
|-------|-------------|
| **URL** | L'URL de votre endpoint (ex. \`https://mon-site.com/api/revalider\`) |
| **Événements** | Les événements qui déclenchent ce webhook |
| **Actif** | Activer/désactiver sans supprimer |

## Événements

| Événement | Déclenché quand |
|-----------|-----------------|
| \`entry.created\` | Une entrée de contenu est créée |
| \`entry.updated\` | Une entrée de contenu est mise à jour |
| \`entry.deleted\` | Une entrée est supprimée (soft delete) |
| \`entry.published\` | Le statut d'une entrée passe à \`publié\` |
| \`entry.unpublished\` | Le statut d'une entrée passe à \`brouillon\` |
| \`media.uploaded\` | Un fichier est uploadé dans la médiathèque |
| \`media.deleted\` | Un fichier est supprimé de la médiathèque |

## Payload

Chaque webhook envoie un payload JSON :

\`\`\`json
{
  "event": "entry.updated",
  "project": "f99cb038-...",
  "collection": "articles",
  "entry": {
    "uuid": "550e8400-...",
    "status": "published",
    "locale": "fr"
  },
  "timestamp": "2024-01-15T12:00:00+00:00"
}
\`\`\`

## Prérequis

Les webhooks sont traités de manière asynchrone via la queue Symfony Messenger. Assurez-vous qu'un worker tourne — voir [Configuration des webhooks](/fr/deployment/webhook-setup/).
`,

  'fr/projects/settings/user-access.md': `---
title: Accès utilisateurs
description: Gérer les utilisateurs admin ayant accès à un projet et leurs rôles.
---

Allez dans **Paramètres du projet → Accès utilisateurs** pour contrôler qui peut accéder au projet.

## Membres du projet

Les Super Admins ont accès à tous les projets par défaut. Les autres utilisateurs admin doivent être ajoutés explicitement.

### Ajouter un membre

1. Cliquez sur **+ Ajouter un membre**
2. Recherchez un utilisateur admin par nom ou email
3. Sélectionnez son **rôle dans le projet** :

| Rôle | Accès |
|------|-------|
| **Gestionnaire** | Accès complet au projet — contenu, collections, paramètres |
| **Éditeur** | Créer et modifier du contenu ; ne peut pas modifier les collections ni les paramètres |
| **Lecteur** | Accès en lecture seule au contenu ; pas d'édition |

4. Cliquez sur **Ajouter**

### Retirer un membre

Cliquez sur **Retirer** à côté d'un membre pour révoquer son accès au projet.

## Authentification end-user

Les **end-users** sont les utilisateurs de votre application — différents des utilisateurs admin.

Pour activer l'authentification end-user pour un projet :

1. Activez **Activer l'auth end-user**
2. Configurez l'expiration du token (défaut : 7 jours)

Les end-users peuvent s'inscrire et se connecter via :

\`\`\`bash
POST /api/{projectId}/auth/register
{ "email": "utilisateur@exemple.com", "password": "..." }

POST /api/{projectId}/auth/login
{ "email": "utilisateur@exemple.com", "password": "..." }
\`\`\`
`,

  // ── Profile ────────────────────────────────────────────────────────────
  'fr/profile/managing-users.md': `---
title: Gérer les utilisateurs
description: Gérer les utilisateurs admin et leur accès au CMS Jambo.
---

Les utilisateurs admin sont les personnes ayant accès au panneau d'administration Jambo.

## Inviter un utilisateur

1. Cliquez sur **Inviter un utilisateur**
2. Entrez leur adresse email
3. Sélectionnez un rôle (voir [Gérer les rôles](/fr/profile/managing-roles/))
4. Cliquez sur **Envoyer l'invitation**

L'utilisateur reçoit un email avec un lien pour définir son mot de passe. Le lien est valide 48 heures.

## Modifier un utilisateur

Cliquez sur le nom d'un utilisateur pour modifier son profil :
- **Nom** et **email**
- **Rôle** — les changements prennent effet immédiatement
- **Statut** — actif ou suspendu

## Suspendre un utilisateur

Les utilisateurs suspendus ne peuvent pas se connecter. Leur contenu et paramètres sont préservés. Vous pouvez les réactiver à tout moment.

## Politique de mot de passe

- Minimum 8 caractères
- Les utilisateurs peuvent réinitialiser leur mot de passe via la page de connexion
- Les admins peuvent envoyer un email de réinitialisation depuis la page d'édition de l'utilisateur
`,

  'fr/profile/managing-roles.md': `---
title: Gérer les rôles
description: Créer et configurer des rôles pour contrôler l'accès admin dans Jambo.
---

Les rôles définissent ce que les utilisateurs admin peuvent faire dans le panneau Jambo.

## Rôles intégrés

| Rôle | Description |
|------|-------------|
| **Super Admin** | Accès complet à tout — paramètres, utilisateurs, tous les projets |
| **Admin** | Accès complet à tous les projets, ne peut pas gérer les utilisateurs ou les paramètres système |
| **Éditeur** | Peut créer et modifier du contenu, ne peut pas changer les paramètres ni supprimer les collections |
| **Lecteur** | Accès en lecture seule au contenu |

## Rôles personnalisés

1. Allez dans **Profil → Rôles**
2. Cliquez sur **+ Nouveau rôle**
3. Entrez un nom de rôle
4. Activez/désactivez les permissions
5. Cliquez sur **Sauvegarder**

## Permissions

| Ressource | Permissions disponibles |
|-----------|------------------------|
| **Projets** | Voir, créer, gérer les paramètres |
| **Collections** | Voir, créer / modifier / supprimer les collections et champs |
| **Contenu** | Voir, créer, modifier, supprimer, publier les entrées |
| **Médias** | Voir, uploader, supprimer des fichiers |
| **Paramètres** | Gérer les providers IA, webhooks, tokens API, utilisateurs et rôles |
`,

  'fr/profile/permissions.md': `---
title: Comprendre les permissions
description: Comment fonctionne le système de permissions dans Jambo — rôles, projets et tokens API.
---

Jambo dispose de deux systèmes de permissions distincts : les **permissions admin** (pour les utilisateurs CMS) et les **permissions des tokens API** (pour vos applications).

## Permissions admin

Les utilisateurs admin se voient attribuer un **rôle** qui contrôle ce qu'ils peuvent faire dans le panneau. Les rôles sont configurés dans [Gérer les rôles](/fr/profile/managing-roles/).

Les Super Admins contournent toutes les vérifications de permissions.

## Permissions des tokens API

Lors de la création d'un token API dans **Paramètres du projet → Accès API**, vous pouvez le limiter à des opérations spécifiques :

| Scope | Autorise |
|-------|----------|
| \`read\` | Requêtes GET (lister et récupérer les entrées et assets) |
| \`write\` | POST et PATCH (créer et mettre à jour) |
| \`delete\` | Requêtes DELETE |
| \`admin\` | Accès complet incluant la gestion des collections |

## API publique

Si l'**API publique** est activée pour un projet, les requêtes anonymes (sans token) peuvent lire le contenu \`publié\`. Les opérations d'écriture nécessitent toujours un token.
`,

  // ── AI ─────────────────────────────────────────────────────────────────
  'fr/ai/introduction.md': `---
title: Fonctionnalités IA — Introduction
description: Vue d'ensemble des fonctionnalités IA dans Jambo CMS.
---

Jambo intègre l'IA dans tout le CMS pour vous aider à travailler plus vite — de la conception de schémas à la traduction de contenu et à la génération d'images.

## Vue d'ensemble des fonctionnalités IA

| Fonctionnalité | Où | Ce qu'elle fait |
|----------------|-----|-----------------|
| [Studio IA](/fr/studio/schema-builder/) | Paramètres → Studio | Constructeur de schéma par chat et agent IA |
| [Assistant IA](/fr/ai/ai-assistant/) | Éditeur de contenu | Répondre aux questions, réécrire du texte |
| [Outils de contenu inline](/fr/ai/inline-tools/) | Éditeur richtext | Traduire, résumer, développer, réécrire le texte sélectionné |
| [Traduction IA](/fr/ai/ai-translation/) | Entrées de contenu | Traduire des entrées complètes entre locales |
| [Serveur MCP](/fr/ai/mcp-server/) | Paramètres du projet | Exposer votre projet comme serveur MCP pour les agents IA |

## Providers IA supportés

| Provider | Texte | Vision | Génération d'images |
|----------|-------|--------|---------------------|
| **OpenAI** (GPT-4o, o1) | ✅ | ✅ | ✅ (DALL-E 3) |
| **Anthropic** (Claude) | ✅ | ✅ | ❌ |
| **Google Gemini** | ✅ | ✅ | ✅ |
| **DeepSeek** | ✅ | ❌ | ❌ |
| **Ollama** (local) | ✅ | Selon le modèle | ❌ |

Configurez les providers dans **Admin → Paramètres → Studio IA**.

## Démarrage

1. Allez dans **Admin → Paramètres → Studio IA**
2. Ajoutez votre clé API pour au moins un provider
3. Ouvrez un projet → **Paramètres → Studio** pour commencer à utiliser le chat IA
`,

  'fr/ai/ai-assistant.md': `---
title: Assistant IA
description: Utiliser l'assistant IA pour écrire et améliorer le contenu dans l'éditeur Jambo.
---

L'assistant IA est disponible dans l'éditeur de contenu pour vous aider à écrire, réécrire et améliorer du texte directement dans le panneau d'administration.

## Accéder à l'assistant

Cliquez sur le bouton **✨ IA** dans la barre d'outils supérieure de tout formulaire d'entrée de contenu. Une barre latérale s'ouvre où vous pouvez taper des instructions.

## Ce que vous pouvez faire

### Générer du contenu

\`\`\`
Écris une introduction de 200 mots sur l'emballage durable
\`\`\`

### Réécrire du contenu existant

Sélectionnez du texte dans n'importe quel champ, puis demandez à l'assistant de le réécrire :

\`\`\`
Rends ça plus court et plus professionnel
\`\`\`

## Joindre des fichiers

Cliquez sur le bouton **📎** à côté de la saisie pour joindre un fichier. Formats supportés :

- **Images** (PNG, JPG, WebP) — l'IA analyse l'image visuellement (nécessite GPT-4o ou Claude)
- **CSV / JSON** — l'IA lit les données et peut créer des entrées depuis celles-ci
- **Fichiers texte** (TXT, MD, PDF) — l'IA lit le contenu et répond à des questions

## Prérequis

Un provider IA doit être configuré dans **Admin → Paramètres → Studio IA**.
`,

  'fr/ai/inline-tools.md': `---
title: Outils de contenu inline
description: Outils d'édition IA disponibles directement dans l'éditeur richtext.
---

Les outils de contenu inline sont des actions IA qui apparaissent dans l'**éditeur richtext** lorsque vous sélectionnez du texte.

## Comment utiliser

1. Ouvrez une entrée de contenu avec un champ \`richtext\`
2. Sélectionnez du texte dans l'éditeur
3. Une barre d'outils apparaît au-dessus de la sélection — cliquez sur **IA** (✨)
4. Choisissez une action dans le menu

## Actions disponibles

| Action | Ce qu'elle fait |
|--------|-----------------|
| **Améliorer l'écriture** | Corriger la grammaire, améliorer la clarté et le flux |
| **Raccourcir** | Résumer ou condenser le texte sélectionné |
| **Développer** | Développer avec plus de détails |
| **Simplifier** | Réécrire en langage plus simple |
| **Corriger la grammaire** | Corriger l'orthographe et la grammaire uniquement |
| **Traduire** | Traduire la sélection dans une autre langue |
| **Changer le ton** | Réécrire en Professionnel / Décontracté / Amical / Formel |

## Accepter les changements

Après la génération d'un remplacement, vous voyez une **vue diff** comparant l'original et le nouveau texte. Cliquez sur :
- **Accepter** — remplacer la sélection par la version IA
- **Annuler** — conserver le texte original
- **Réessayer** — régénérer avec la même instruction
`,

  'fr/ai/ai-translation.md': `---
title: Traduction IA
description: Traduire automatiquement les entrées de contenu entre locales avec l'IA.
---

La fonctionnalité de traduction IA vous permet de traduire une entrée de contenu complète d'une locale à une autre en un seul clic.

## Comment utiliser

1. Ouvrez une entrée de contenu dans le panneau d'administration
2. Dans le sélecteur de locale, cliquez sur **Traduire depuis [locale source]**
3. Confirmez la locale cible et la locale source
4. Cliquez sur **Traduire**

Jambo envoie tous les champs traduisibles au provider IA configuré et crée une nouvelle entrée dans la locale cible.

## Champs traduisibles

| Type de champ | Traduit ? |
|---------------|-----------|
| \`text\` | ✅ |
| \`longtext\` | ✅ |
| \`richtext\` | ✅ (préserve les balises HTML) |
| \`slug\` | ✅ (translittéré) |
| \`enumeration\` | ❌ (valeur préservée) |
| \`media\` | ❌ (même fichier) |
| \`relation\` | ❌ (même référence) |
| \`number\` / \`boolean\` / \`date\` | ❌ (préservé) |

## Traduction en masse

Pour traduire plusieurs entrées à la fois, utilisez le **Studio IA** avec la commande \`/data\` :

\`\`\`
/data Traduire tous les articles publiés de l'anglais vers le français
\`\`\`
`,

  // ── Deployment ─────────────────────────────────────────────────────────
  'fr/deployment/shared-hosting.md': `---
title: Déployer sur hébergement mutualisé
description: Déployer Jambo sur un hébergement mutualisé avec cPanel ou DirectAdmin.
---

Jambo peut tourner sur un hébergement mutualisé si votre hébergeur fournit **PHP 8.4+** et un accès SSH.

## Prérequis

- PHP 8.4+ avec les extensions \`ctype\`, \`iconv\`, \`sodium\`, \`pdo_mysql\`
- MySQL 8+ ou PostgreSQL 14+
- Accès SSH (pour Composer et les migrations)
- Node.js 18+ (pour builder les assets frontend — faire en local puis uploader \`public/build/\`)

## Étapes de déploiement

### 1. Préparer en local

\`\`\`bash
composer install --no-dev --optimize-autoloader
npm ci && npm run build
\`\`\`

### 2. Uploader les fichiers

Uploadez les fichiers du projet dans un dossier parent de votre \`public_html\` :

\`\`\`
~/
├── jambo/              ← fichiers du projet
│   ├── src/
│   ├── vendor/
│   └── ...
└── public_html/        ← seulement le contenu de public/
    ├── index.php
    └── build/
\`\`\`

### 3. Modifier index.php

Éditez \`public_html/index.php\` pour pointer vers le bon chemin :

\`\`\`php
require_once dirname(__DIR__).'/jambo/vendor/autoload_runtime.php';
\`\`\`

### 4. Configurer .env

\`\`\`ini
APP_ENV=prod
APP_SECRET=votre-cle-secrete
DATABASE_URL="mysql://user:pass@localhost/dbname?serverVersion=8.0"
\`\`\`

### 5. Exécuter les migrations via SSH

\`\`\`bash
cd ~/jambo
php bin/console doctrine:migrations:migrate
php bin/console app:setup
php bin/console cache:warmup
\`\`\`
`,

  'fr/deployment/subdomain.md': `---
title: Sous-domaine (hébergement mutualisé)
description: Configurer un sous-domaine pour servir votre API Jambo sur hébergement mutualisé.
---

Si votre site principal est sur \`exemple.com\` et que vous souhaitez que Jambo tourne sur \`api.exemple.com\`, configurez un sous-domaine pointant vers l'installation Jambo.

## Étape 1 — Créer le sous-domaine

Dans votre panneau d'hébergement (cPanel / DirectAdmin / Plesk) :

1. Allez dans **Sous-domaines** ou **Gestion des domaines**
2. Créez un nouveau sous-domaine : \`api.exemple.com\`
3. Définissez la racine du document comme le dossier \`public/\` de Jambo

## Étape 2 — Pointer vers public/

Définissez la racine du document du sous-domaine sur :

\`\`\`
/home/utilisateur/jambo/public
\`\`\`

Si votre hébergeur ne permet pas de racines personnalisées, placez le contenu de \`public/\` dans \`public_html/\` et mettez à jour \`public_html/index.php\` :

\`\`\`php
require_once dirname(__DIR__) . '/jambo/vendor/autoload_runtime.php';
\`\`\`

## Étape 3 — Configurer APP_HOSTNAME

\`\`\`ini
APP_HOSTNAME=api.exemple.com
DEFAULT_URI=https://api.exemple.com
\`\`\`

## Étape 4 — Certificat SSL

Activez Let's Encrypt pour votre sous-domaine depuis la section **SSL/TLS** de votre panneau.

## Étape 5 — Lancer les migrations via SSH

\`\`\`bash
cd ~/jambo
php bin/console doctrine:migrations:migrate
php bin/console app:setup
php bin/console cache:warmup
\`\`\`
`,

  'fr/deployment/webhook-setup.md': `---
title: Configuration des webhooks (Queues)
description: Configurer les workers en arrière-plan pour traiter les webhooks et tâches asynchrones.
---

Jambo utilise **Symfony Messenger** pour traiter les webhooks et autres tâches asynchrones en arrière-plan. Sans un worker en cours d'exécution, ces tâches s'accumulent dans la queue sans jamais être traitées.

## Configurer le transport

Dans \`.env\` :

\`\`\`ini
# Recommandé pour la production : transport doctrine (fiable)
MESSENGER_TRANSPORT_DSN=doctrine://default?auto_setup=0

# Redis (plus rapide, nécessite un serveur Redis)
MESSENGER_TRANSPORT_DSN=redis://localhost:6379/messages
\`\`\`

Pour le transport \`doctrine\`, créez la table de queue :

\`\`\`bash
php bin/console messenger:setup-transports
\`\`\`

## Lancer le worker

\`\`\`bash
php bin/console messenger:consume async --time-limit=3600
\`\`\`

## Production : Supervisor

\`\`\`ini
[program:jambo-worker]
command=php /var/www/jambo-api/bin/console messenger:consume async --time-limit=3600
user=www-data
numprocs=2
autostart=true
autorestart=true
\`\`\`

\`\`\`bash
supervisorctl reread && supervisorctl update && supervisorctl start jambo-worker:*
\`\`\`

## Vérifier la signature des webhooks

Chaque requête webhook inclut un header \`X-Jambo-Signature\` :

\`\`\`php
$signature = 'sha256=' . hash_hmac('sha256', $rawBody, $secret);
if (!hash_equals($signature, $request->headers->get('X-Jambo-Signature'))) {
    // Signature invalide — rejeter la requête
}
\`\`\`
`,

  // ── Configuration ───────────────────────────────────────────────────────
  'fr/configuration/aws-s3.md': `---
title: Configuration AWS S3
description: Stocker les fichiers médias Jambo sur Amazon S3.
---

Par défaut, Jambo stocke les fichiers uploadés localement dans \`public/uploads/\`. Pour la production, configurez **Amazon S3**.

## Configuration

Ajoutez ceci dans votre \`.env\` :

\`\`\`ini
STORAGE_DRIVER=s3
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_DEFAULT_REGION=eu-west-3
AWS_BUCKET=mon-jambo-media
AWS_URL=https://mon-jambo-media.s3.eu-west-3.amazonaws.com
\`\`\`

## Politique de bucket

Pour rendre les fichiers uploadés publiquement lisibles :

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::mon-jambo-media/*"
  }]
}
\`\`\`

## Migrer les fichiers existants

\`\`\`bash
aws s3 sync public/uploads/ s3://mon-jambo-media/ --acl public-read
\`\`\`
`,

  'fr/configuration/s3-compatible.md': `---
title: Services compatibles S3
description: Utiliser des services compatibles S3 comme MinIO, Cloudflare R2 ou DigitalOcean Spaces avec Jambo.
---

L'intégration S3 de Jambo fonctionne avec n'importe quel service de stockage objet compatible S3.

| Service | Notes |
|---------|-------|
| **Cloudflare R2** | Pas de frais d'egress, CDN mondial inclus |
| **DigitalOcean Spaces** | Tarification simple, CDN intégré |
| **MinIO** | Self-hosted, sur site |
| **Backblaze B2** | Coût très bas |

## Configuration

Les services compatibles S3 nécessitent une variable \`AWS_ENDPOINT_URL\` supplémentaire :

\`\`\`ini
STORAGE_DRIVER=s3
AWS_ACCESS_KEY_ID=votre-cle
AWS_SECRET_ACCESS_KEY=votre-secret
AWS_DEFAULT_REGION=auto
AWS_BUCKET=mon-bucket
AWS_URL=https://votre-url-cdn.com
AWS_ENDPOINT_URL=https://votre-endpoint-provider.com
\`\`\`

## Exemple Cloudflare R2

\`\`\`ini
STORAGE_DRIVER=s3
AWS_ACCESS_KEY_ID=votre-cle-r2
AWS_SECRET_ACCESS_KEY=votre-secret-r2
AWS_DEFAULT_REGION=auto
AWS_BUCKET=jambo-media
AWS_URL=https://pub-xxxx.r2.dev
AWS_ENDPOINT_URL=https://account-id.r2.cloudflarestorage.com
\`\`\`

Consultez [Configuration AWS S3](/fr/configuration/aws-s3/) pour la politique de bucket et la configuration CORS — elles s'appliquent à tous les providers compatibles S3.
`,

  // ── Templates ───────────────────────────────────────────────────────────
  'fr/templates/blog-nextjs.md': `---
title: Blog NextJS
description: Un template de blog production-ready construit avec Next.js et Jambo CMS.
---

Le template **Blog NextJS** est un blog prêt pour la production construit avec Next.js 15 (App Router) et Jambo comme CMS headless.

## Ce qui est inclus

- **Next.js 15** avec App Router et React Server Components
- **Tailwind CSS** pour le style
- **Régénération statique incrémentale (ISR)** — les pages se mettent à jour automatiquement quand le contenu change dans Jambo
- **Flux RSS** auto-généré depuis les articles
- **Mode sombre**
- **SEO-ready** — balises Open Graph, sitemap, JSON-LD

## Démarrage rapide

\`\`\`bash
git clone https://github.com/jambostack/jambo-blog-nextjs
cd jambo-blog-nextjs
npm install
\`\`\`

Copiez \`.env.example\` vers \`.env.local\` :

\`\`\`ini
JAMBO_URL=https://votre-domaine-jambo.com
JAMBO_PROJECT_ID=votre-uuid-de-projet
JAMBO_API_TOKEN=votre-token-api
\`\`\`

## Schéma Jambo requis

**Collection Articles** (\`articles\`) :
- \`titre\` — text, requis
- \`slug\` — slug, requis
- \`extrait\` — longtext
- \`corps\` — richtext
- \`image_a_la_une\` — media
- \`categorie\` — relation → \`categories\`
- \`publie_le\` — datetime

**Collection Catégories** (\`categories\`) :
- \`nom\` — text, requis
- \`slug\` — slug, requis

## Déployer

\`\`\`bash
# Vercel
vercel deploy

# Build pour n'importe quel hébergeur
npm run build && npm start
\`\`\`

## Code source

[github.com/jambostack/jambo-blog-nextjs](https://github.com/jambostack/jambo-blog-nextjs)
`,

  // ── API FR (les plus importantes) ────────────────────────────────────
  'fr/api/introduction.md': `---
title: API de contenu — Introduction
description: Vue d'ensemble de l'API REST Jambo — URLs de base, authentification et format de réponse.
---

L'API de contenu Jambo est une **API REST** qui donne un accès public ou authentifié au contenu, aux collections et aux fichiers médias de votre projet.

## URL de base

\`\`\`
https://votre-domaine.com/api/{project-uuid}/
\`\`\`

### Vue d'ensemble des endpoints

| Ressource | Chemin de base |
|-----------|----------------|
| Entrées de contenu | \`/api/{projectId}/{collectionSlug}\` |
| Fichiers / assets | \`/api/{projectId}/files\` |
| GraphQL | \`/api/projects/{projectId}/graphql\` |
| Spec OpenAPI | \`/api/{projectId}/openapi.json\` |

## Authentification

Toutes les requêtes API nécessitent un **token Bearer** dans le header \`Authorization\` :

\`\`\`http
Authorization: Bearer VOTRE_TOKEN_API
\`\`\`

Les tokens API sont gérés dans **Paramètres du projet → Accès API**.

### Exemple

\`\`\`bash
curl https://votre-domaine.com/api/{project-uuid}/articles \\
  -H "Authorization: Bearer VOTRE_TOKEN_API"
\`\`\`

## Format de réponse

Toutes les réponses sont en JSON. Les réponses de liste incluent des métadonnées de pagination :

\`\`\`json
{
  "data": [
    {
      "uuid": "550e8400-...",
      "status": "published",
      "locale": "fr",
      "fields": {
        "titre": "Mon premier article",
        "slug": "mon-premier-article"
      }
    }
  ],
  "total": 42,
  "current_page": 1,
  "last_page": 3,
  "per_page": 15
}
\`\`\`

## Pagination

| Paramètre | Défaut | Max |
|-----------|--------|-----|
| \`page\` | \`1\` | — |
| \`per_page\` | \`15\` | \`100\` |

## Spec OpenAPI / Swagger

\`\`\`
GET /api/{projectId}/openapi.json
\`\`\`

Importez-la dans Swagger UI ou Postman pour explorer et tester tous les endpoints automatiquement.
`,
};

let created = 0;
let skipped = 0;

for (const [relPath, content] of Object.entries(pages)) {
  const fullPath = `${BASE}/${relPath}`;
  // Seulement écraser les stubs (Coming Soon)
  try {
    const existing = readFileSync(fullPath, 'utf8');
    if (!existing.includes('Coming Soon')) {
      console.log(`SKIP (has content): ${relPath}`);
      skipped++;
      continue;
    }
  } catch {
    // fichier inexistant → écrire quand même
  }
  writeFileSync(fullPath, content);
  console.log(`WRITTEN: ${relPath}`);
  created++;
}

console.log(`\nDone: ${created} written, ${skipped} skipped`);
