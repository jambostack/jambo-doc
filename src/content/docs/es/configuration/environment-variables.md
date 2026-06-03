---
title: Configuración
description: Configura las variables de entorno de Jambo API.
---

Copia `.env.example` a `.env` y completa los valores:

```ini
APP_ENV=prod
APP_SECRET=           # Cadena aleatoria de 32 caracteres: openssl rand -hex 32
APP_HOSTNAME=         # Tu dominio, ej. api.ejemplo.com

DATABASE_URL=         # mysql://user:pass@host/db?serverVersion=8.0.32&charset=utf8mb4

MAILER_DSN=           # smtp://user:pass@smtp.ejemplo.com:587
MEILISEARCH_HOST=     # http://localhost:7700
MEILISEARCH_KEY=      # Tu clave maestra Meilisearch
```

## Proveedores IA

Las claves IA se configuran en **Admin → Configuración de la app → pestaña Proveedores IA**, no mediante variables de entorno. Esto permite actualizar las claves sin redesplegar.
