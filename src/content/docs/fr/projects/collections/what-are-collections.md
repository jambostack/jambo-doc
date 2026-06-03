---
title: Qu'est-ce qu'une collection ?
description: Les collections sont les types de contenu qui définissent la structure de vos données dans Jambo.
---

Une **collection** est un type de contenu — elle définit la structure (champs) d'un groupe d'entrées liées. Pensez-y comme une table de base de données, sans avoir besoin de SQL.

## Exemples

| Collection | Champs |
|------------|--------|
| `articles` | titre, slug, corps, auteur, image_a_la_une, publié_le |
| `produits` | nom, prix, description, images, catégorie |
| `membres_equipe` | nom, rôle, bio, avatar, linkedin_url |
| `parametres` | titre_site, logo, texte_pied_de_page _(singleton)_ |

## Collection standard vs. singleton

**Collection standard** — peut avoir plusieurs entrées. Utilisée pour les listes d'éléments comme des articles de blog, des produits ou des membres d'équipe.

**Singleton** — ne peut avoir qu'une seule entrée. Utilisé pour les paramètres globaux du site, une section hero de page d'accueil, ou tout contenu unique.

## API auto-générée

Lorsque vous créez une collection, Jambo génère automatiquement des endpoints REST et GraphQL :

```
GET    /api/{projectId}/articles          # lister tous les articles
GET    /api/{projectId}/articles/{uuid}   # obtenir un article
POST   /api/{projectId}/articles          # créer un article
PATCH  /api/{projectId}/articles/{uuid}   # mettre à jour un article
DELETE /api/{projectId}/articles/{uuid}   # supprimer un article
```

Aucune configuration supplémentaire nécessaire.
