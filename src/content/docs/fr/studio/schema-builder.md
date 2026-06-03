---
title: Schema Builder
description: Concevez votre schéma de contenu en discutant avec un agent IA.
---

## Vue d'ensemble

Le Studio IA de Jambo vous permet de concevoir et de modifier votre schéma de contenu en décrivant votre besoin en langage naturel. Aucun code requis. L'**agent IA** peut également créer du contenu en masse, générer des images, traduire des entrées et bien plus — consultez la page [Agent IA](/fr/studio/ai-agent/) pour tous les détails.

## Agent IA — Assistant intelligent

Le Studio Jambo inclut un puissant **agent IA** qui va bien au-delà de la simple génération de schéma. Il dispose de 8 outils réels :

- **`explore_schema`** — Analyser vos collections et champs existants
- **`create_collections`** — Créer des collections + champs en une seule action
- **`create_entries`** — Créer jusqu'à 100 entrées en masse × plusieurs langues
- **`update_entries`** — Modifier du contenu existant
- **`delete_entries`** — Suppression douce d'entrées
- **`generate_images`** — Génération d'images IA (DALL‑E / Gemini) + téléversement automatique
- **`translate_entries`** — Traduire du contenu entre les langues via l'IA

L'agent détecte les capacités de votre fournisseur (texte, images) et s'adapte automatiquement. Lisez le guide complet : [Documentation Agent IA](/fr/studio/ai-agent/).

## Fonctionnement du chat

Il existe deux modes :

### Mode rapide (`/schema`, `/data`, `/all`)

Pour les petites demandes, utilisez les commandes slash. L'IA répond avec un aperçu JSON et un bouton « Appliquer ».

```
/schema Créer un blog avec des articles, des catégories et des auteurs
/data Générer 5 articles de blog professionnels en français
/all Construire un schéma e-commerce complet avec des données d'exemple
```

### Mode agent

Pour les demandes complexes, en masse ou multi-langues, l'IA passe en **mode plan**. Elle présente un plan d'exécution avec la liste des actions. Vérifiez le plan et cliquez sur **Exécuter** pour tout lancer automatiquement.

```
Créer un site d'agence complet avec 6 projets portfolio,
8 témoignages clients et un blog — le tout en 4 langues.
```

L'agent crée les collections, génère les entrées et téléverse les images — sans jamais quitter le chat.

## Conventions de nommage

Jambo applique des règles de nommage strictes automatiquement :

- Noms de collections : **PascalCase pluriel** (`BlogPosts`, `Products`)
- Noms de singletons : **PascalCase singulier** (`Hero`, `Config`)
- Noms de champs : **camelCase** (`publishedAt`, `featuredImage`)
- Slugs : **snake_case** (`blog_posts`, `published_at`)
- **EndUsers** est une collection système intégrée — ne créez jamais une nouvelle collection « Users »

## Types de champs supportés

`text` · `longtext` · `richtext` · `slug` · `email` · `password` · `number` · `decimal` · `boolean` · `date` · `datetime` · `time` · `color` · `json` · `enumeration` · `media` · `relation`

## Opérations en masse & multi-langues

L'agent IA peut gérer des opérations en masse qui prendraient des heures manuellement :

- **Créer 100 entrées en 4 langues** (400 appels API) — en un clic
- **Traduire une collection entière** du français vers l'anglais, l'espagnol et l'arabe
- **Générer des images IA** pour les couvertures de blog, les sections hero, les avatars d'auteurs
- **Modifier des dizaines d'entrées** à la fois (mettre à jour des catégories, corriger des slugs, etc.)

## Capacités du fournisseur

L'agent détecte ce que votre fournisseur IA peut faire. Un badge affiche les capacités actuelles :

🟢 **Texte** (actif) · 🟢 **Images** (actif) · 🔴 **Voix** (indisponible)

Configurez les fournisseurs dans [Admin → Paramètres de l'application → Fournisseurs IA](/admin/app-settings). L'agent utilise automatiquement le premier fournisseur activé et bascule sur le suivant en cas d'échec.
