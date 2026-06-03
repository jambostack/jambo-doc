---
title: Obtenir un asset par nom
description: Récupérer un fichier média en utilisant son nom de fichier original.
---

Récupère un fichier média en utilisant son nom de fichier. C'est un alias pratique pour [Obtenir un asset](/fr/api/assets/get-asset/) — le paramètre `identifier` accepte à la fois les UUIDs et les noms de fichiers.

```http
GET /api/{projectId}/files/{filename}
```

## Exemple

```bash
curl https://votre-domaine.com/api/{projectId}/files/hero.jpg \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

Voir [Obtenir un asset](/fr/api/assets/get-asset/) pour le format de réponse complet.
