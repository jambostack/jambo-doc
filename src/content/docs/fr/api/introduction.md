---
title: API REST
description: Référence complète des endpoints REST de Jambo API.
---

## URL de base

```
https://votre-domaine.com/api/{project-uuid}
```

## Authentification

Toutes les requêtes nécessitent un token Bearer :

```
Authorization: Bearer VOTRE_TOKEN_API
```

## Endpoints

### Lister les entrées

```
GET /{collection}?locale=fr&limit=20&offset=0&status=published
```

| Paramètre | Défaut | Description |
|---|---|---|
| `locale` | défaut du projet | Langue du contenu |
| `limit` | 20 | Résultats par page (max 100) |
| `offset` | 0 | Décalage de pagination |
| `status` | `published` | `draft` ou `published` |

### Récupérer une entrée

```
GET /{collection}/{uuid}
```

### Format de réponse

```json
{
  "data": [
    {
      "uuid": "a1b2c3d4-...",
      "locale": "fr",
      "status": "published",
      "created_at": "2026-01-01T00:00:00+00:00",
      "updated_at": "2026-01-15T12:00:00+00:00",
      "title": "Exemple d'entrée",
      "slug": "exemple-entree"
    }
  ],
  "meta": {
    "total": 42,
    "limit": 20,
    "offset": 0
  }
}
```
