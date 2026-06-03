---
title: Créer une entrée
description: Créer une nouvelle entrée de contenu dans une collection.
---

Crée une nouvelle entrée de contenu dans une collection.

```http
POST /api/{projectId}/{collectionSlug}
```

## Corps de la requête

```json
{
  "status": "published",
  "locale": "fr",
  "fields": {
    "titre": "Mon nouvel article",
    "slug": "mon-nouvel-article",
    "corps": "<p>Contenu ici...</p>"
  }
}
```

| Champ | Type | Défaut | Description |
|-------|------|--------|-------------|
| `status` | string | `draft` | `draft` ou `published` |
| `locale` | string | défaut du projet | Locale de l'entrée |
| `fields` | object | `{}` | Valeurs des champs par slug |

## Requête

```bash
curl -X POST https://votre-domaine.com/api/{projectId}/articles \
  -H "Authorization: Bearer VOTRE_TOKEN_API" \
  -H "Content-Type: application/json" \
  -d '{"status":"published","locale":"fr","fields":{"titre":"Mon article"}}'
```

## Réponse

Retourne l'entrée créée avec HTTP `201 Created`.

## Codes de statut

| Statut | Description |
|--------|-------------|
| `201` | Créé avec succès |
| `403` | Permissions insuffisantes |
| `404` | Collection introuvable |
| `409` | La collection singleton a déjà une entrée |
| `422` | Locale ou valeurs de champs invalides |
