---
title: Obtenir un asset
description: Récupérer un seul archivo média par son UUID.
---

```http
GET /api/{projectId}/files/{identifier}
```

L'`identifier` peut être l'**UUID** ou le **nom de archivo** de l'asset.

## Solicitud

```bash
# Par UUID
curl https://votre-domaine.com/api/{projectId}/files/img-uuid-1234 \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

## Respuesta

```json
{
  "uuid": "img-uuid-1234",
  "filename": "hero.jpg",
  "mime_type": "image/jpeg",
  "size": 204800,
  "url": "/uploads/media/abc123/hero.jpg"
}
```
