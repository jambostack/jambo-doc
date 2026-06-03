---
title: Agent IA
description: L'agent IA de Jambo Studio — un assistant intelligent qui explore, planifie et exécute des opérations complexes sur votre CMS.
---

L'Agent IA est la fonctionnalité la plus puissante de Jambo Studio. Contrairement au chat basique (`/schema`, `/data`, `/all`), l'agent dispose de **8 outils réels** qui lui permettent de lire votre schéma, de créer des collections, de générer du contenu en masse, de traduire des entrées et même de produire des images IA — le tout avec une seule invite.

## Mode agent vs. Mode basique

| Fonctionnalité | Mode basique (`/schema`) | Mode agent |
|---|---|---|
| Génération de schéma | ✅ Aperçu JSON → application manuelle | ✅ Créé + enregistré automatiquement |
| Génération de contenu | 3 à 5 entrées par collection | **jusqu'à 100 entrées en une fois** |
| Multi-langue | Manuel par langue | **auto, toutes les langues configurées en même temps** |
| Images | Téléversement manuel via l'admin | **Générées par IA + téléversement auto** |
| Opérations en masse | Non disponible | ✅ Créer, mettre à jour, supprimer des dizaines d'entrées |
| Exploration du schéma | Chaîne de contexte statique | ✅ Outil `explore_schema()` en temps réel |
| Traduction | Non disponible | ✅ Outil `translate_entries()` |
| Aperçu du plan | Non disponible | ✅ PlanCard avec liste des actions avant exécution |

## Capacités du fournisseur

L'agent détecte automatiquement ce que votre fournisseur IA configuré peut faire et adapte son comportement. Un **badge de capacités** s'affiche en permanence au-dessus de la zone de saisie du chat :

```
🟢 Texte (claude-sonnet-4-6)  🟢 Images (dall-e-3)
```

Si une capacité est manquante, l'agent vous avertit et vous suggère comment l'activer :

> ⚠️ Aucun fournisseur d'images configuré. J'utiliserai des SVG professionnels en remplacement.
> Pour obtenir des images générées par IA, ajoutez OpenAI ou Gemini dans **Admin → Paramètres → Fournisseurs IA**.

| Fournisseur | Texte | Images | Notes |
|---|---|---|---|
| **OpenAI** | ✅ GPT-4o, o1, etc. | ✅ DALL‑E 3 | Capacités complètes |
| **Anthropic** | ✅ Claude Opus / Sonnet | ❌ | Texte uniquement |
| **Google Gemini** | ✅ Gemini Flash / Pro | ✅ Imagen | Capacités complètes |
| **Ollama** | ⚠️ Qualité limitée | ❌ | Modèle local |
| **DeepSeek / Mistral / Groq / xAI / Perplexity / Qwen / OpenRouter** | ✅ | ❌ | Texte uniquement |

## Les 8 outils de l'agent

Chaque outil est une fonction côté serveur que l'IA peut invoquer. L'agent choisit les outils à utiliser en fonction de votre demande.

### Outils de lecture (toujours disponibles, lecture seule)

| Outil | Description |
|---|---|
| `explore_schema` | Retourne toutes les collections avec leurs champs, types, indicateurs de champ requis et relations. L'agent l'appelle au début de chaque session. |
| `read_entries` | Lit les entrées d'une collection. Supporte la pagination et les filtres par langue/statut. |

### Outils d'écriture (règles d'exécution)

| Outil | Confirmation | Ce qu'il fait |
|---|---|---|
| `create_collections` | **Automatique** | Crée des collections + champs directement en base de données. Inclut les cibles de relations et les valeurs d'énumération. |
| `create_entries` | **Automatique** | Crée des entrées en masse. Supporte jusqu'à 100 entrées × N langues en un seul appel. |
| `update_entries` | **Aperçu requis** | Modifie des entrées existantes par UUID. Affiche un diff avant l'exécution. |
| `delete_entries` | **Aperçu + Confirmation** | Suppression douce d'entrées par UUID. Affiche la liste des entrées concernées avant confirmation. |
| `generate_images` | **Automatique** | Génère des images via DALL‑E ou Gemini, les téléverse dans la médiathèque et retourne les UUID. Bascule sur des SVG si aucun fournisseur d'images n'est disponible. |
| `translate_entries` | **Aperçu requis** | Traduit des entrées d'une langue source vers N langues cibles via l'IA. Préserve les slugs et les données structurées. |

### Règles de confirmation

| Action | Comportement |
|---|---|
| **Créer** quoi que ce soit | Exécuté immédiatement, aucune confirmation nécessaire |
| **Modifier** des données existantes | Aperçu affiché d'abord — cliquez « Exécuter » pour appliquer |
| **Supprimer** des données existantes | Aperçu affiché d'abord — cliquez « Confirmer » pour supprimer |

## Comment utiliser l'agent

### 1. Demandes simples — détection automatique

Pour les petites demandes (1-2 collections, 3-5 entrées), utilisez les commandes standard `/schema`, `/data`, ou `/all`. L'agent répond en mode aperçu JSON classique avec des boutons « Appliquer ».

```
/schema Créer un blog avec des articles, des catégories et des commentaires
/data Générer 5 articles de blog professionnels en français
/all Construire un schéma e-commerce complet avec des produits
```

### 2. Demandes en masse — mode agent

Lorsque vous demandez des **opérations en masse**, l'agent passe en **mode plan** :

```
Créer un site d'agence complet avec un portfolio (6 projets),
des témoignages (8 citations) et un blog (5 articles).
Tout en français, anglais, espagnol et arabe.
Ajouter des images hero professionnelles pour chaque section.
```

L'agent répond avec une **PlanCard** :

```
┌────────────────────────────────────────────────┐
│ 📋 Plan                                        │
│                                                │
│ Créer site d'agence avec portfolio,            │
│ témoignages, blog — 4 langues                  │
│                                                │
│ 1. explore_schema                              │
│ 2. create_collections  3 coll.                 │
│ 3. create_entries     76 entrées × 4 langues   │
│ 4. generate_images     12 images               │
│                                                │
│ [Exécuter le plan]                             │
└────────────────────────────────────────────────┘
```

Cliquez sur **Exécuter le plan** et l'agent enchaîne toutes les actions, affichant un **ExecutionLog** :

```
✅ explore_schema: OK
✅ create_collections: 3 collection(s)
✅ create_entries: 76 créées, 0 erreur
✅ generate_images: 12 images générées (DALL-E)
```

### 3. Explorer et lire

Demandez à l'agent d'analyser votre projet avant de faire des modifications :

```
Explore mon schéma et dis-moi ce qui manque pour un blog
Lis les témoignages actuels et suggère des améliorations
Quelles collections devrais-je ajouter pour une plateforme e-learning ?
```

## Endpoint d'exécution des outils

Si vous créez une intégration personnalisée, vous pouvez appeler l'agent de façon programmatique :

```
POST /api/projects/{uuid}/studio/ai-execute
Content-Type: application/json
Authorization: Bearer <token>

{
  "actions": [
    { "tool": "explore_schema", "params": {} },
    { "tool": "create_entries", "params": {
        "collection": "testimonials",
        "entries": [{ "quote": "...", "author_name": "..." }],
        "locales": ["fr", "en", "es", "ar"]
    }}
  ],
  "auto_confirm": true
}
```

## Endpoint des capacités

```
GET /api/projects/{uuid}/studio/ai-capabilities
→ { "text": true, "images": true, "provider": "openai", "model": "gpt-4o", "limits": [] }
```

## Génération d'images

L'agent peut générer des images lorsqu'un fournisseur capable de le faire (OpenAI ou Gemini) est configuré.

```
Génère une capture d'écran de tableau de bord sombre pour la section hero
Crée des images de couverture pour 3 articles sur les performances PHP
Ajoute des avatars d'auteurs pour les 6 témoignages
```

Quand aucun fournisseur d'images n'est disponible, l'agent bascule sur des **SVG professionnels en placeholder** avec la palette émeraude de Jambo.

## Conseils

- **Soyez précis** — « Créer 6 témoignages de développeurs freelance à propos du passage de Strapi » fonctionne mieux que « Ajouter des témoignages »
- **Mentionnez les langues** — « En français et en anglais » ou « Dans toutes les langues configurées » déclenche la génération multi-langue
- **Itérez** — « Garde les 3 premiers témoignages, remplace les 3 derniers par de meilleurs »
- **Explorez d'abord** — « Analyse mon schéma et suggère des améliorations pour le blog » avant de faire des modifications
- **Images** — Décrivez le visuel souhaité : « Un tableau de bord sombre futuriste avec des panneaux de données verts et des graphiques analytiques »
