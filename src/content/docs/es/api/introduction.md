---
title: API REST
description: Referencia completa de los endpoints REST de Jambo API.
---

## URL base

```
https://tu-dominio.com/api/{project-uuid}
```

## Autenticación

Todas las solicitudes requieren un token Bearer:

```
Authorization: Bearer TU_TOKEN_API
```

## Endpoints

### Listar entradas

```
GET /{collection}?locale=es&limit=20&offset=0&status=published
```

| Parámetro | Por defecto | Descripción |
|---|---|---|
| `locale` | defecto del proyecto | Idioma del contenido |
| `limit` | 20 | Resultados por página (máx 100) |
| `offset` | 0 | Desplazamiento de paginación |
| `status` | `published` | `draft` o `published` |

### Obtener una entrada

```
GET /{collection}/{uuid}
```

### Formato de respuesta

```json
{
  "data": [
    {
      "uuid": "a1b2c3d4-...",
      "locale": "es",
      "status": "published",
      "created_at": "2026-01-01T00:00:00+00:00",
      "updated_at": "2026-01-15T12:00:00+00:00",
      "title": "Entrada de ejemplo",
      "slug": "entrada-ejemplo"
    }
  ],
  "meta": {
    "total": 42,
    "limit": 20,
    "offset": 0
  }
}
```
