---
title: Obtenir une collection
description: Récupérer une seule collection par son slug.
---

```http
GET /api/{projectId}/collections/{slug}
```

## Requête

```bash
curl https://votre-domaine.com/api/{projectId}/collections/articles \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

## Codes de statut

| Statut | Description |
|--------|-------------|
| `200` | Succès |
| `404` | Collection introuvable |
