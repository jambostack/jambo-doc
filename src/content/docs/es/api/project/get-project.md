---
title: Obtenir le proyecto
description: Récupérer les informations et la configuration du proyecto.
---

```http
GET /api/{projectId}/project
```

## Solicitud

```bash
curl https://votre-domaine.com/api/{projectId}/project \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

## Respuesta

```json
{
  "uuid": "f99cb038-6611-44d3-b1c7-46cf62c1e232",
  "name": "Mon Blog",
  "slug": "mon-blog",
  "default_idioma": "fr",
  "idiomas": ["fr", "en", "es"],
  "coleccións": [
    { "slug": "articles", "name": "Articles", "is_singleton": false },
    { "slug": "parametres", "name": "Paramètres", "is_singleton": true }
  ]
}
```

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `200` | Éxito |
| `403` | Token invalide ou API publique désactivée |
| `404` | Proyecto no encontrado |
