---
title: Supprimer un asset
description: Supprimer définitivement un fichier média de la médiathèque du projet.
---

```http
DELETE /api/{projectId}/files/{uuid}
```

:::caution
Cette action est **permanente**. Le fichier est supprimé du stockage et ne peut pas être récupéré.
:::

## Requête

```bash
curl -X DELETE https://votre-domaine.com/api/{projectId}/files/img-uuid-1234 \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

## Codes de statut

| Statut | Description |
|--------|-------------|
| `204` | Supprimé avec succès |
| `403` | Permissions insuffisantes |
| `404` | Asset introuvable |
