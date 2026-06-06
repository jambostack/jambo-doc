---
title: Configurar el TTL de tokens JWT
description: Establecer tiempos de expiración JWT personalizados por proyecto.
---

Cada proyecto Jambo puede reemplazar los tiempos de expiración predeterminados de los tokens JWT.

```http
GET    /api/projects/{projectUuid}/settings/jwt-ttl
PATCH  /api/projects/{projectUuid}/settings/jwt-ttl
```

## Autenticación

Requiere:
- Una **sesión de administrador** válida (cookie)
- Un **token API** con la habilidad `create`

```bash
Authorization: Bearer TU_TOKEN_API
```

---

## GET — Leer configuración JWT TTL

```bash
curl https://tu-dominio.com/api/projects/{projectUuid}/settings/jwt-ttl \
  -H "Authorization: Bearer TU_TOKEN_API"
```

### Respuesta

```json
{
  "jwt_access_ttl": 900,
  "jwt_refresh_ttl": null,
  "defaults": {
    "access_ttl": 900,
    "refresh_ttl": 2592000
  }
}
```

---

## PATCH — Modificar configuración JWT TTL

```bash
curl -X PATCH https://tu-dominio.com/api/projects/{projectUuid}/settings/jwt-ttl \
  -H "Authorization: Bearer TU_TOKEN_API" \
  -H "Content-Type: application/json" \
  -d '{ "jwt_access_ttl": 300, "jwt_refresh_ttl": 604800 }'
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `jwt_access_ttl` | `integer` o `null` | Segundos. Mín: `60`. `0`/`null` = restaurar defecto (900s) |
| `jwt_refresh_ttl` | `integer` o `null` | Segundos. Mín: `60`. `0`/`null` = restaurar defecto (2592000s) |

### Ejemplos

**5 minutos (alta seguridad):** `{ "jwt_access_ttl": 300 }`
**1 hora:** `{ "jwt_access_ttl": 3600 }`
**Restaurar defectos:** `{ "jwt_access_ttl": 0, "jwt_refresh_ttl": 0 }`

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `200` | Éxito |
| `403` | Acceso denegado |
| `404` | Proyecto no encontrado |
| `422` | TTL inferior a 60 segundos |
