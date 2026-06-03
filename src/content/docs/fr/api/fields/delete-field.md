---
title: Supprimer un champ
description: Supprimer un champ d'une collection et effacer toutes ses valeurs stockées.
---

```http
DELETE /api/projects/{projectId}/collections/{collectionSlug}/fields/{fieldSlug}
```

:::caution
Toutes les valeurs stockées dans ce champ sur toutes les entrées sont définitivement supprimées.
:::

## Codes de statut

| Statut | Description |
|--------|-------------|
| `204` | Supprimé |
| `404` | Champ introuvable |
