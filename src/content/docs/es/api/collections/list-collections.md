---
title: Lister les coleccións
description: Récupérer toutes les coleccións d'un proyecto.
---

```http
GET /api/{projectId}/coleccións
```

## Solicitud

```bash
curl https://votre-domaine.com/api/{projectId}/coleccións \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

## Respuesta

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
