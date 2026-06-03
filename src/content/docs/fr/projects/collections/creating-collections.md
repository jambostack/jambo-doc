---
title: Créer des collections
description: Comment créer une nouvelle collection dans Jambo.
---

## Via le panneau d'administration

1. Ouvrez votre projet et allez dans **Paramètres → Collections**
2. Cliquez sur **+ Nouvelle collection**
3. Renseignez les détails :

| Champ | Description |
|-------|-------------|
| **Nom** | Nom d'affichage (ex. `Articles`) |
| **Slug** | Identifiant API, auto-généré depuis le nom (ex. `articles`) |
| **Description** | Optionnel, affiché dans la barre latérale |
| **Singleton** | Activez si la collection ne doit avoir qu'une seule entrée |

4. Cliquez sur **Créer** — votre collection est créée et les endpoints API sont disponibles immédiatement

## Via le Studio IA

Décrivez ce dont vous avez besoin en langage naturel :

```
/schema Créer un blog avec Articles (titre, slug, corps richtext, image à la une, auteur relation vers end_users, publié_le date), et une collection Catégories (nom, slug, description)
```

Cliquez sur **Appliquer le schéma** pour créer toutes les collections et tous les champs d'un coup.

## Après la création

Votre collection dispose immédiatement de ces endpoints REST :

```
GET    /api/{projectId}/articles       # lister les entrées
GET    /api/{projectId}/articles/{uuid} # obtenir une entrée
POST   /api/{projectId}/articles       # créer
PATCH  /api/{projectId}/articles/{uuid} # mettre à jour
DELETE /api/{projectId}/articles/{uuid} # supprimer
```

Ensuite, [ajoutez des champs](/fr/projects/collections/adding-fields/) pour définir les données stockées par chaque entrée.
