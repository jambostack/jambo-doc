---
title: Lister les assets
description: Récupérer une liste de fichiers médias depuis la médiathèque du projet.
---

```http
GET /api/{projectId}/files
```

## Paramètres de requête

| Paramètre | Défaut | Description |
|-----------|--------|-------------|
| `page` | `1` | Numéro de page |
| `per_page` | `15` | Éléments par page (max `100`) |
| `type` | — | Filtrer par préfixe MIME : `image`, `video`, `application` |
| `search` | — | Rechercher par nom de fichier |

## Requête

```bash
curl https://votre-domaine.com/api/{projectId}/files \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

## Réponse

```json
{
  "data": [
    {
      "uuid": "img-uuid-1234",
      "filename": "hero.jpg",
      "mime_type": "image/jpeg",
      "size": 204800,
      "url": "/uploads/media/abc123/hero.jpg",
      "created_at": "2024-01-15T10:00:00+00:00"
    }
  ],
  "total": 24,
  "current_page": 1,
  "per_page": 15
}
```
