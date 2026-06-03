---
title: Obtenir une entrée
description: Récupérer une seule entrée de contenu par son UUID.
---

Récupère une seule entrée de contenu par son UUID.

```http
GET /api/{projectId}/{collectionSlug}/{uuid}
```

## Paramètres

| Paramètre | Type | Description |
|-----------|------|-------------|
| `projectId` | uuid | L'UUID de votre projet |
| `collectionSlug` | string | Le slug de la collection |
| `uuid` | uuid | L'UUID de l'entrée |

## Requête

```bash
curl https://votre-domaine.com/api/{projectId}/articles/550e8400-... \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

## Réponse

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "status": "published",
  "locale": "fr",
  "created_at": "2024-01-15T10:30:00+00:00",
  "fields": {
    "titre": "Mon premier article",
    "slug": "mon-premier-article",
    "corps": "<p>Contenu complet ici...</p>"
  }
}
```

## Codes de statut

| Statut | Description |
|--------|-------------|
| `200` | Succès |
| `404` | Entrée introuvable |
