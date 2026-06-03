---
title: Traductions
description: Gérer les entradas de contenu multi-idioma dans Jambo.
---

Jambo gère le contenu multi-idioma au **niveau de l'entrada** — chaque entrada a une seule propriété `idioma`, et vous créez des entradas séparées pour chaque langue.

## Comment fonctionne la localisation

Chaque entrada appartient à une idioma :

```json
{
  "uuid": "entry-uuid",
  "idioma": "fr",
  "fields": { "titre": "Bonjour le monde" }
}
```

## Crear une entrada traduite

```bash
curl -X POST https://votre-domaine.com/api/{projectId}/articles \
  -H "Authorization: Bearer VOTRE_TOKEN_API" \
  -H "Content-Type: application/json" \
  -d '{"idioma":"en","status":"published","fields":{"titre":"Hello world","slug":"hello-world"}}'
```

## Récupérer les entradas par idioma

```bash
# Entradas en français
GET /api/{projectId}/articles?idioma=fr

# Entradas en anglais
GET /api/{projectId}/articles?idioma=en
```

## Traduction IA

Utilisez **Fonctionnalités IA → Traduction IA** dans le panneau admin pour traduire automatiquement des entradas d'une idioma à une autre.
