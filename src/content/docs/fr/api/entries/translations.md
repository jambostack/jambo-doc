---
title: Traductions
description: Gérer les entrées de contenu multi-locale dans Jambo.
---

Jambo gère le contenu multi-locale au **niveau de l'entrée** — chaque entrée a une seule propriété `locale`, et vous créez des entrées séparées pour chaque langue.

## Comment fonctionne la localisation

Chaque entrée appartient à une locale :

```json
{
  "uuid": "entry-uuid",
  "locale": "fr",
  "fields": { "titre": "Bonjour le monde" }
}
```

## Créer une entrée traduite

```bash
curl -X POST https://votre-domaine.com/api/{projectId}/articles \
  -H "Authorization: Bearer VOTRE_TOKEN_API" \
  -H "Content-Type: application/json" \
  -d '{"locale":"en","status":"published","fields":{"titre":"Hello world","slug":"hello-world"}}'
```

## Récupérer les entrées par locale

```bash
# Entrées en français
GET /api/{projectId}/articles?locale=fr

# Entrées en anglais
GET /api/{projectId}/articles?locale=en
```

## Traduction IA

Utilisez **Fonctionnalités IA → Traduction IA** dans le panneau admin pour traduire automatiquement des entrées d'une locale à une autre.
