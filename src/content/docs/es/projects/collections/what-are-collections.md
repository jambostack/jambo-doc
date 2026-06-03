---
title: Qu'est-ce qu'une colección ?
description: Les coleccións sont les types de contenu qui définissent la structure de vos données dans Jambo.
---

Une **colección** est un type de contenu — elle définit la structure (campos) d'un groupe d'entradas liées. Pensez-y comme une table de base de données, sans avoir besoin de SQL.

## Ejemplos

| Colección | Campos |
|------------|--------|
| `articles` | titre, slug, corps, auteur, image_a_la_une, publicado_le |
| `produits` | nom, prix, description, images, catégorie |
| `membres_equipe` | nom, rol, bio, avatar, linkedin_url |
| `parametres` | titre_site, logo, texte_pied_de_page _(singleton)_ |

## Colección standard vs. singleton

**Colección standard** — peut avoir plusieurs entradas. Utilisée pour les listes d'éléments comme des articles de blog, des produits ou des membres d'équipe.

**Singleton** — ne peut avoir qu'une seule entrada. Utilisé pour les paramètres globaux du site, une section hero de page d'accueil, ou tout contenu unique.

## API auto-générée

Lorsque vous créez une colección, Jambo génère automatiquement des endpoints REST et GraphQL :

```
GET    /api/{projectId}/articles          # lister tous les articles
GET    /api/{projectId}/articles/{uuid}   # obtenir un article
POST   /api/{projectId}/articles          # créer un article
PATCH  /api/{projectId}/articles/{uuid}   # mettre à jour un article
DELETE /api/{projectId}/articles/{uuid}   # supprimer un article
```

Aucune configuration supplémentaire nécessaire.
