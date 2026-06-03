---
title: Mettre à jour une entrada
description: Mettre à jour une entrada de contenu existante.
---

Met à jour une entrada de contenu existante. Supporte le remplacement complet (`PUT`) ou la mise à jour partielle (`PATCH`).

```http
PUT   /api/{projectId}/{colecciónSlug}/{uuid}
PATCH /api/{projectId}/{colecciónSlug}/{uuid}
```

Utilisez `PATCH` pour ne mettre à jour que certains campos.

## Cuerpo de la solicitud

```json
{
  "status": "published",
  "fields": {
    "titre": "Titre actualizado",
    "corps": "<p>Contenu actualizado</p>"
  }
}
```

## Solicitud

```bash
curl -X PATCH https://votre-domaine.com/api/{projectId}/articles/550e8400-... \
  -H "Authorization: Bearer VOTRE_TOKEN_API" \
  -H "Content-Type: application/json" \
  -d '{"fields":{"titre":"Titre actualizado"}}'
```

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `200` | Actualizado avec éxito |
| `403` | Permisos insuficientes |
| `404` | Entrada no encontrado |
| `422` | Valeurs invalides |
