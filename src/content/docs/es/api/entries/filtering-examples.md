---
title: Exemples de filtrage
description: Exemples pratiques pour filtrer les entradas de contenu via l'API.
---

## Filtrer par statut

```bash
# Entradas publicadoes (défaut)
GET /api/{projectId}/articles

# Entradas borrador
GET /api/{projectId}/articles?status=draft
```

## Filtrer par idioma

```bash
# Entradas en français
GET /api/{projectId}/articles?idioma=fr

# Entradas en anglais
GET /api/{projectId}/articles?idioma=en
```

## Pagination

```bash
# Page 2, 25 éléments par page
GET /api/{projectId}/articles?page=2&per_page=25
```

## Combiner les filtres

```bash
GET /api/{projectId}/articles?idioma=fr&status=published&page=1&per_page=10
```

## Filtrage avancé avec GraphQL

Pour les requêtes complexes (filtrer par valeur de campo, trier, filtres de plage), utilisez l'endpoint GraphQL :

```graphql
query {
  articles(
    filter: { status: { eq: "published" }, idioma: { eq: "fr" } }
    sort: [{ field: "created_at", direction: DESC }]
    page: 1
    perPage: 10
  ) {
    data { uuid fields { titre slug } }
    total
  }
}
```

Voir [Filtrage avancé](/es/api/entries/advanced-filtering/) pour la référence GraphQL complète.
