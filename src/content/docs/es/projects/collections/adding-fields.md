---
title: Ajouter des campos
description: Comment ajouter des campos à une colección dans Jambo.
---

Les campos définissent la structure des données d'une colección. Chaque entrada stocke une valeur pour chaque campo.

## Agregar un campo

1. Ouvrez votre proyecto → **Paramètres → Coleccións**
2. Cliquez sur la colección à modifier
3. Cliquez sur **+ Ajouter un campo**
4. Choisissez un [type de campo](/es/projects/coleccións/field-types/)
5. Configurez le campo :

| Option | Descripción |
|--------|-------------|
| **Nom** | Libellé d'affichage dans l'éditeur (ex. `Image à la une`) |
| **Slug** | Clé API — auto-généré, en minuscules avec underscores (ex. `image_a_la_une`) |
| **Requis** | Activez pour rendre le campo obligatoire |
| **Options** | Paramètres spécifiques au type (valeurs d'énumération, colección cible, etc.) |

6. Cliquez sur **Sauvegarder**

## Options requises par type

### Campos Énumération

Vous devez fournir la liste des valeurs autorisées :

```
borrador, publicado, archivé
```

### Campos Relation

Vous devez spécifier le slug de la **colección cible**. Exemple : `end_users` pour lier à la colección usuarios intégrée.

## Supprimer un campo

Cliquez sur l'icône de corbeille sur un campo pour le supprimer. Ceci **supprime définitivement toutes les valeurs stockées** pour ce campo dans toutes les entradas.

:::caution
La suppression d'un campo est irréversible. Exportez vos données d'abord si vous avez besoin de conserver les valeurs.
:::
