---
title: Réordonner les coleccións
description: Changer l'ordre d'affichage des coleccións dans la barre latérale.
---

```http
POST /api/projects/{projectId}/coleccións/reorder
```

## Cuerpo de la solicitud

```json
{
  "slugs": ["pages", "articles", "produits", "categories"]
}
```

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `200` | Réordonné |
| `422` | Slugs invalides |
