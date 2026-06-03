---
title: Supprimer une collection
description: Supprimer une collection et toutes ses entrées.
---

```http
DELETE /api/projects/{projectId}/collections/{slug}
```

:::caution
Permanent. Toutes les entrées de la collection sont immédiatement et irréversiblement supprimées.
:::

## Codes de statut

| Statut | Description |
|--------|-------------|
| `204` | Supprimé |
| `404` | Collection introuvable |
