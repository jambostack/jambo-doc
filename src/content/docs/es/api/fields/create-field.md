---
title: Créer un campo
description: Ajouter un nouveau campo à une colección.
---

```http
POST /api/projects/{projectId}/coleccións/{slug}/fields
```

## Cuerpo de la solicitud

```json
{
  "name": "Publicado le",
  "slug": "publie_le",
  "type": "datetime",
  "isRequired": false,
  "options": {}
}
```

### Campo Énumération

```json
{
  "name": "Statut",
  "slug": "statut",
  "type": "enumeration",
  "isRequired": true,
  "options": { "values": ["borrador", "publicado", "archivé"] }
}
```

### Campo Relation

```json
{
  "name": "Auteur",
  "slug": "auteur",
  "type": "relation",
  "isRequired": false,
  "options": { "targetColección": "end_users" }
}
```

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `201` | Creado |
| `409` | Un campo avec ce slug existe déjà |
| `422` | Type invalide ou options requises manquantes |
