---
title: Obtenir un asset par nom
description: Récupérer un archivo média en utilisant son nom de archivo original.
---

Récupère un archivo média en utilisant son nom de archivo. C'est un alias pratique pour [Obtenir un asset](/es/api/assets/get-asset/) — le paramètre `identifier` accepte à la fois les UUIDs et les noms de archivos.

```http
GET /api/{projectId}/files/{filename}
```

## Ejemplo

```bash
curl https://votre-domaine.com/api/{projectId}/files/hero.jpg \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

Voir [Obtenir un asset](/es/api/assets/get-asset/) pour le format de réponse complet.
