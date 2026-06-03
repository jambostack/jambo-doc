---
title: Mettre à jour une entrée
description: Mettre à jour une entrée de contenu existante.
---

Met à jour une entrée de contenu existante. Supporte le remplacement complet (`PUT`) ou la mise à jour partielle (`PATCH`).

```http
PUT   /api/{projectId}/{collectionSlug}/{uuid}
PATCH /api/{projectId}/{collectionSlug}/{uuid}
```

Utilisez `PATCH` pour ne mettre à jour que certains champs.

## Corps de la requête

```json
{
  "status": "published",
  "fields": {
    "titre": "Titre mis à jour",
    "corps": "<p>Contenu mis à jour</p>"
  }
}
```

## Requête

```bash
curl -X PATCH https://votre-domaine.com/api/{projectId}/articles/550e8400-... \
  -H "Authorization: Bearer VOTRE_TOKEN_API" \
  -H "Content-Type: application/json" \
  -d '{"fields":{"titre":"Titre mis à jour"}}'
```

## Codes de statut

| Statut | Description |
|--------|-------------|
| `200` | Mis à jour avec succès |
| `403` | Permissions insuffisantes |
| `404` | Entrée introuvable |
| `422` | Valeurs invalides |
