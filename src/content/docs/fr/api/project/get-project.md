---
title: Obtenir le projet
description: Récupérer les informations et la configuration du projet.
---

```http
GET /api/{projectId}/project
```

## Requête

```bash
curl https://votre-domaine.com/api/{projectId}/project \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

## Réponse

```json
{
  "uuid": "f99cb038-6611-44d3-b1c7-46cf62c1e232",
  "name": "Mon Blog",
  "slug": "mon-blog",
  "default_locale": "fr",
  "locales": ["fr", "en", "es"],
  "collections": [
    { "slug": "articles", "name": "Articles", "is_singleton": false },
    { "slug": "parametres", "name": "Paramètres", "is_singleton": true }
  ]
}
```

## Codes de statut

| Statut | Description |
|--------|-------------|
| `200` | Succès |
| `403` | Token invalide ou API publique désactivée |
| `404` | Projet introuvable |
