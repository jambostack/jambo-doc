---
title: Créer des coleccións
description: Comment créer une nouvelle colección dans Jambo.
---

## Via le panneau d'administration

1. Ouvrez votre proyecto et allez dans **Paramètres → Coleccións**
2. Cliquez sur **+ Nouvelle colección**
3. Renseignez les détails :

| Campo | Descripción |
|-------|-------------|
| **Nom** | Nom d'affichage (ex. `Articles`) |
| **Slug** | Identifiant API, auto-généré depuis le nom (ex. `articles`) |
| **Description** | Optionnel, affiché dans la barre latérale |
| **Singleton** | Activez si la colección ne doit avoir qu'une seule entrada |

4. Cliquez sur **Créer** — votre colección est creadoe et les endpoints API sont disponibles immédiatement

## Via le Studio IA

Décrivez ce dont vous avez besoin en langage naturel :

```
/schema Créer un blog avec Articles (titre, slug, corps richtext, image à la une, auteur relation vers end_users, publicado_le date), et une colección Catégories (nom, slug, description)
```

Cliquez sur **Appliquer le schéma** pour créer toutes les coleccións et tous les campos d'un coup.

## Après la création

Votre colección dispose immédiatement de ces endpoints REST :

```
GET    /api/{projectId}/articles       # lister les entradas
GET    /api/{projectId}/articles/{uuid} # obtenir une entrada
POST   /api/{projectId}/articles       # créer
PATCH  /api/{projectId}/articles/{uuid} # mettre à jour
DELETE /api/{projectId}/articles/{uuid} # supprimer
```

Ensuite, [ajoutez des campos](/es/projects/coleccións/adding-fields/) pour définir les données stockées par chaque entrada.
