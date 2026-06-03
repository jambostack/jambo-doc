---
title: Réordonner les campos
description: Changer l'ordre d'affichage des campos dans l'éditeur de contenu.
---

```http
POST /api/projects/{projectId}/coleccións/{slug}/fields/reorder
```

## Cuerpo de la solicitud

```json
{
  "slugs": ["titre", "image_a_la_une", "corps", "auteur", "publie_le"]
}
```

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `200` | Réordonné |
| `422` | Slugs de campos invalides |
