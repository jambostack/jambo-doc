---
title: Mettre à jour un champ
description: Mettre à jour le nom ou les options d'un champ. Le slug ne peut pas être modifié.
---

```http
PATCH /api/projects/{projectId}/collections/{collectionSlug}/fields/{fieldSlug}
```

## Corps de la requête

```json
{
  "name": "Nouveau nom d'affichage",
  "isRequired": true
}
```

## Codes de statut

| Statut | Description |
|--------|-------------|
| `200` | Mis à jour |
| `404` | Champ introuvable |
