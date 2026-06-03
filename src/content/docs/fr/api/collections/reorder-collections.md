---
title: Réordonner les collections
description: Changer l'ordre d'affichage des collections dans la barre latérale.
---

```http
POST /api/projects/{projectId}/collections/reorder
```

## Corps de la requête

```json
{
  "slugs": ["pages", "articles", "produits", "categories"]
}
```

## Codes de statut

| Statut | Description |
|--------|-------------|
| `200` | Réordonné |
| `422` | Slugs invalides |
