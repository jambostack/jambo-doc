---
title: Mettre à jour une colección
description: Mettre à jour le nom ou la description d'une colección existante.
---

```http
PATCH /api/projects/{projectId}/coleccións/{slug}
```

## Cuerpo de la solicitud

```json
{
  "name": "Nouveau nom",
  "description": "Nouvelle description"
}
```

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `200` | Actualizado |
| `404` | Colección no encontrado |
