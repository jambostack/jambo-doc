---
title: Supprimer une colección
description: Supprimer une colección et toutes ses entradas.
---

```http
DELETE /api/projects/{projectId}/coleccións/{slug}
```

:::caution
Permanent. Toutes les entradas de la colección sont immédiatement et irréversiblement eliminadoes.
:::

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `204` | Eliminado |
| `404` | Colección no encontrado |
