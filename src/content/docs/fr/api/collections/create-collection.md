---
title: Créer une collection
description: Créer une nouvelle collection avec des champs via l'API Jambo.
---

```http
POST /api/projects/{projectId}/collections
```

## Corps de la requête

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

## Codes de statut

| Statut | Description |
|--------|-------------|
| `201` | Créé |
| `409` | Une collection avec ce slug existe déjà |
| `422` | Erreur de validation |
