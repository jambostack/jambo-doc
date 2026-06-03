---
title: Lister les collections
description: Récupérer toutes les collections d'un projet.
---

```http
GET /api/{projectId}/collections
```

## Requête

```bash
curl https://votre-domaine.com/api/{projectId}/collections \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

## Réponse

```json
{
  "data": [
    {
      "uuid": "coll-uuid",
      "name": "Articles",
      "slug": "articles",
      "description": "Articles de blog",
      "is_singleton": false,
      "fields": [
        { "name": "Titre", "slug": "titre", "type": "text", "required": true },
        { "name": "Corps", "slug": "corps", "type": "richtext", "required": false }
      ]
    }
  ]
}
```
