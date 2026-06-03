---
title: Mettre à jour un campo
description: Mettre à jour le nom ou les options d'un campo. Le slug ne peut pas être modifié.
---

```http
PATCH /api/projects/{projectId}/coleccións/{colecciónSlug}/fields/{fieldSlug}
```

## Cuerpo de la solicitud

```json
{
  "name": "Nouveau nom d'affichage",
  "isRequired": true
}
```

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `200` | Actualizado |
| `404` | Campo no encontrado |
