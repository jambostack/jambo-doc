---
title: Réordonner les champs
description: Changer l'ordre d'affichage des champs dans l'éditeur de contenu.
---

```http
POST /api/projects/{projectId}/collections/{slug}/fields/reorder
```

## Corps de la requête

```json
{
  "slugs": ["titre", "image_a_la_une", "corps", "auteur", "publie_le"]
}
```

## Codes de statut

| Statut | Description |
|--------|-------------|
| `200` | Réordonné |
| `422` | Slugs de champs invalides |
