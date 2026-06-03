---
title: Supprimer un campo
description: Supprimer un campo d'une colección et effacer toutes ses valeurs stockées.
---

```http
DELETE /api/projects/{projectId}/coleccións/{colecciónSlug}/fields/{fieldSlug}
```

:::caution
Toutes les valeurs stockées dans ce campo sur toutes les entradas sont définitivement eliminadoes.
:::

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `204` | Eliminado |
| `404` | Campo no encontrado |
