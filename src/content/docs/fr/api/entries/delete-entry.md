---
title: Supprimer une entrée
description: Suppression douce d'une entrée de contenu (déplace vers la corbeille).
---

Déplace une entrée de contenu vers la corbeille (suppression douce).

```http
DELETE /api/{projectId}/{collectionSlug}/{uuid}
```

## Requête

```bash
curl -X DELETE https://votre-domaine.com/api/{projectId}/articles/550e8400-... \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

## Réponse

Retourne HTTP `204 No Content` en cas de succès.

## Codes de statut

| Statut | Description |
|--------|-------------|
| `204` | Supprimé (déplacé en corbeille) |
| `403` | Permissions insuffisantes |
| `404` | Entrée introuvable |

:::note
Ceci effectue une **suppression douce** — l'entrée passe en corbeille et n'est plus retournée par les endpoints liste/get. Pour supprimer définitivement, utilisez le panneau d'administration.
:::
