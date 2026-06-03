---
title: Obtenir une entrada
description: Récupérer une seule entrada de contenu par son UUID.
---

Récupère une seule entrada de contenu par son UUID.

```http
GET /api/{projectId}/{colecciónSlug}/{uuid}
```

## Parámetros

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `projectId` | uuid | L'UUID de votre proyecto |
| `colecciónSlug` | string | Le slug de la colección |
| `uuid` | uuid | L'UUID de l'entrada |

## Solicitud

```bash
curl https://votre-domaine.com/api/{projectId}/articles/550e8400-... \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

## Respuesta

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "status": "published",
  "idioma": "fr",
  "created_at": "2024-01-15T10:30:00+00:00",
  "fields": {
    "titre": "Mon premier article",
    "slug": "mon-premier-article",
    "corps": "<p>Contenu complet ici...</p>"
  }
}
```

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `200` | Éxito |
| `404` | Entrada no encontrado |
