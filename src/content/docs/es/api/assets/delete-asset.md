---
title: Supprimer un asset
description: Supprimer définitivement un archivo média de la biblioteca de medios du proyecto.
---

```http
DELETE /api/{projectId}/files/{uuid}
```

:::caution
Cette action est **permanente**. Le archivo est eliminado du stockage et ne peut pas être récupéré.
:::

## Solicitud

```bash
curl -X DELETE https://votre-domaine.com/api/{projectId}/files/img-uuid-1234 \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `204` | Eliminado avec éxito |
| `403` | Permisos insuficientes |
| `404` | Asset no encontrado |
