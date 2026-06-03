---
title: Créer un champ
description: Ajouter un nouveau champ à une collection.
---

```http
POST /api/projects/{projectId}/collections/{slug}/fields
```

## Corps de la requête

```json
{
  "name": "Publié le",
  "slug": "publie_le",
  "type": "datetime",
  "isRequired": false,
  "options": {}
}
```

### Champ Énumération

```json
{
  "name": "Statut",
  "slug": "statut",
  "type": "enumeration",
  "isRequired": true,
  "options": { "values": ["brouillon", "publié", "archivé"] }
}
```

### Champ Relation

```json
{
  "name": "Auteur",
  "slug": "auteur",
  "type": "relation",
  "isRequired": false,
  "options": { "targetCollection": "end_users" }
}
```

## Codes de statut

| Statut | Description |
|--------|-------------|
| `201` | Créé |
| `409` | Un champ avec ce slug existe déjà |
| `422` | Type invalide ou options requises manquantes |
