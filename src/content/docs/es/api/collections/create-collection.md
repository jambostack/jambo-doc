---
title: Créer une colección
description: Créer une nouvelle colección avec des campos via l'API Jambo.
---

```http
POST /api/projects/{projectId}/coleccións
```

## Cuerpo de la solicitud

```json
{
  "name": "Produits",
  "slug": "produits",
  "description": "Catalogue produits",
  "isSingleton": false,
  "fields": [
    { "name": "Nom", "slug": "nom", "type": "text", "isRequired": true },
    { "name": "Prix", "slug": "prix", "type": "decimal", "isRequired": true }
  ]
}
```

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `201` | Creado |
| `409` | Une colección avec ce slug existe déjà |
| `422` | Erreur de validation |
