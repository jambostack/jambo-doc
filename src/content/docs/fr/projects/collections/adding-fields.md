---
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
| **Nom** | Libellé d'affichage dans l'éditeur (ex. `Image à la une`) |
| **Slug** | Clé API — auto-généré, en minuscules avec underscores (ex. `image_a_la_une`) |
| **Requis** | Activez pour rendre le champ obligatoire |
| **Options** | Paramètres spécifiques au type (valeurs d'énumération, collection cible, etc.) |

6. Cliquez sur **Sauvegarder**

## Options requises par type

### Champs Énumération

Vous devez fournir la liste des valeurs autorisées :

```
brouillon, publié, archivé
```

### Champs Relation

Vous devez spécifier le slug de la **collection cible**. Exemple : `end_users` pour lier à la collection utilisateurs intégrée.

## Supprimer un champ

Cliquez sur l'icône de corbeille sur un champ pour le supprimer. Ceci **supprime définitivement toutes les valeurs stockées** pour ce champ dans toutes les entrées.

:::caution
La suppression d'un champ est irréversible. Exportez vos données d'abord si vous avez besoin de conserver les valeurs.
:::
