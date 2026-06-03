---
title: Exemples de filtrage
description: Exemples pratiques pour filtrer les entrées de contenu via l'API.
---

## Filtrer par statut

```bash
# Entrées publiées (défaut)
GET /api/{projectId}/articles

# Entrées brouillon
GET /api/{projectId}/articles?status=draft
```

## Filtrer par locale

```bash
# Entrées en français
GET /api/{projectId}/articles?locale=fr

# Entrées en anglais
GET /api/{projectId}/articles?locale=en
```

## Pagination

```bash
# Page 2, 25 éléments par page
GET /api/{projectId}/articles?page=2&per_page=25
```

## Combiner les filtres

```bash
GET /api/{projectId}/articles?locale=fr&status=published&page=1&per_page=10
```

## Filtrage avancé avec GraphQL

Pour les requêtes complexes (filtrer par valeur de champ, trier, filtres de plage), utilisez l'endpoint GraphQL :

```graphql
query {
  articles(
    filter: { status: { eq: "published" }, locale: { eq: "fr" } }
    sort: [{ field: "created_at", direction: DESC }]
    page: 1
    perPage: 10
  ) {
    data { uuid fields { titre slug } }
    total
  }
}
```

Voir [Filtrage avancé](/fr/api/entries/advanced-filtering/) pour la référence GraphQL complète.
