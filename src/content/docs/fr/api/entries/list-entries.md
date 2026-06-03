---
title: Lister les entrées
description: Récupérer une liste paginée d'entrées de contenu depuis une collection.
---

Récupère une liste paginée d'entrées de contenu depuis une collection.

```http
GET /api/{projectId}/{collectionSlug}
```

## Paramètres

### Chemin

| Paramètre | Type | Description |
|-----------|------|-------------|
| `projectId` | uuid | L'UUID de votre projet |
| `collectionSlug` | string | Le slug de la collection (ex. `articles`) |

### Requête

| Paramètre | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `page` | integer | `1` | Numéro de page |
| `per_page` | integer | `15` | Éléments par page (max `100`) |
| `locale` | string | défaut du projet | Filtrer par locale (ex. `fr`, `en`) |
| `status` | string | `published` | Filtrer par statut : `published` ou `draft` |

## Requête

```bash
curl https://votre-domaine.com/api/{projectId}/articles \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

Avec filtres :

```bash
curl "https://votre-domaine.com/api/{projectId}/articles?page=2&per_page=10&locale=fr" \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

## Réponse

```json
{
  "data": [
    {
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "status": "published",
      "locale": "fr",
      "created_at": "2024-01-15T10:30:00+00:00",
      "updated_at": "2024-01-15T12:00:00+00:00",
      "fields": {
        "titre": "Mon premier article",
        "slug": "mon-premier-article",
        "corps": "<p>Contenu complet ici...</p>"
      }
    }
  ],
  "total": 42,
  "current_page": 1,
  "last_page": 3,
  "per_page": 15,
  "from": 1,
  "to": 15
}
```

## Codes de statut

| Statut | Description |
|--------|-------------|
| `200` | Succès |
| `403` | API publique désactivée pour ce projet |
| `404` | Projet ou collection introuvable |
