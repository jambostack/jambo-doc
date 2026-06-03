---
title: Obtenir une colección
description: Récupérer une seule colección par son slug.
---

```http
GET /api/{projectId}/coleccións/{slug}
```

## Solicitud

```bash
curl https://votre-domaine.com/api/{projectId}/coleccións/articles \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `200` | Éxito |
| `404` | Colección no encontrado |
