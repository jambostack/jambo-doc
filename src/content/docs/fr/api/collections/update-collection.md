---
title: Mettre à jour une collection
description: Mettre à jour le nom ou la description d'une collection existante.
---

```http
PATCH /api/projects/{projectId}/collections/{slug}
```

## Corps de la requête

```json
{
  "name": "Nouveau nom",
  "description": "Nouvelle description"
}
```

## Codes de statut

| Statut | Description |
|--------|-------------|
| `200` | Mis à jour |
| `404` | Collection introuvable |
