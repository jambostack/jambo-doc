---
title: Supprimer une entrada
description: Suppression douce d'une entrada de contenu (déplace vers la corbeille).
---

Déplace une entrada de contenu vers la corbeille (suppression douce).

```http
DELETE /api/{projectId}/{colecciónSlug}/{uuid}
```

## Solicitud

```bash
curl -X DELETE https://votre-domaine.com/api/{projectId}/articles/550e8400-... \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

## Respuesta

Retourne HTTP `204 No Content` en cas de éxito.

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `204` | Eliminado (déplacé en corbeille) |
| `403` | Permisos insuficientes |
| `404` | Entrada no encontrado |

:::note
Ceci effectue une **suppression douce** — l'entrada passe en corbeille et n'est plus retournée par les endpoints liste/get. Pour supprimer définitivement, utilisez le panneau d'administration.
:::
