---
title: Instalación
description: Instala Jambo API en tu servidor en minutos.
---

## Requisitos

- **PHP 8.4+** con extensiones: `ctype`, `iconv`, `sodium`
- **Composer**
- **MySQL 8+**, PostgreSQL 14+, o SQLite
- **Node.js 18+** + npm (para assets frontend)
- Opcional: **Meilisearch** (búsqueda de texto completo), **Symfony CLI**

## Instalar vía Composer (recomendado)

```bash
composer create-project jambostack/jambo-api mi-proyecto
cd mi-proyecto
```

Esto crea un proyecto nuevo con todas las dependencias instaladas. Salta a la sección de configuración.

## Instalar vía Git

```bash
git clone https://github.com/jambostack/jambo-api.git
cd jambo-api

composer install --no-dev --optimize-autoloader
npm install && npm run build
```

## Configurar

```bash
cp .env.example .env
```

Edita `.env` con las credenciales de tu base de datos y configuración de la aplicación, luego ejecuta:

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console app:setup
```

El comando `app:setup` crea la cuenta de administrador y muestra las credenciales. Valores por defecto:

| Campo         | Valor por defecto           |
|---------------|-----------------------------|
| Email         | `admin@jambostack.site`     |
| Contraseña    | `admin1234`                 |

Puedes personalizarlos:

```bash
php bin/console app:setup --email="tu@ejemplo.com" --password="ContraseñaFuerte123"
```

:::caution
Cambia la contraseña inmediatamente después del primer inicio de sesión: avatar (arriba a la derecha) → **Configuración → Seguridad**.
:::

## Verificar

Inicia el servidor local de Symfony:

```bash
symfony serve -d
```

Abre `https://localhost:8000` e inicia sesión. Tu API está lista en `https://localhost:8000/api/{project-uuid}`.

## Próximos pasos

- [Inicio rápido](/es/guides/quick-start/) — Crea tu primera colección
- [Configuración](/es/guides/configuration/) — Referencia de variables de entorno
- [Despliegue](/es/guides/deployment/) — Guía de despliegue en producción
