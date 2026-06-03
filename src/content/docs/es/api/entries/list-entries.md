---
title: Lister les entradas
description: Récupérer une liste paginée d'entradas de contenu depuis une colección.
---

Récupère une liste paginée d'entradas de contenu depuis une colección.

```http
GET /api/{projectId}/{colecciónSlug}
```

## Parámetros

### Chemin

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `projectId` | uuid | L'UUID de votre proyecto |
| `colecciónSlug` | string | Le slug de la colección (ex. `articles`) |

### Solicitud

| Parámetro | Tipo | Defecto | Descripción |
|-----------|------|--------|-------------|
| `page` | integer | `1` | Numéro de page |
| `per_page` | integer | `15` | Éléments par page (max `100`) |
| `idioma` | string | défaut du proyecto | Filtrer par idioma (ex. `fr`, `en`) |
| `status` | string | `published` | Filtrer par statut : `published` ou `draft` |

## Solicitud

```bash
curl https://votre-domaine.com/api/{projectId}/articles \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

Avec filtres :

```bash
curl "https://votre-domaine.com/api/{projectId}/articles?page=2&per_page=10&idioma=fr" \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

## Respuesta

```json
{
  "data": [
    {
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "status": "published",
      "idioma": "fr",
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

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `200` | Éxito |
| `403` | API publique désactivée pour ce proyecto |
| `404` | Proyecto ou colección no encontrado |
