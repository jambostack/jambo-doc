---
title: Configuración del proyecto
description: Configurar los ajustes generales del proyecto en Jambo.
---

Acceda a la configuración del proyecto desde la barra lateral → **Configuración → Proyecto**.

## General

| Configuración | Descripción |
|---------------|-------------|
| **Nombre** | Nombre de visualización del proyecto |
| **Descripción** | Descripción opcional |
| **Locale por defecto** | Idioma principal utilizado cuando no se especifica locale en las llamadas API |
| **Almacenamiento** | Disco local (`public`) o almacenamiento compatible con S3 |

## JWT Token TTL

Configure el tiempo de expiración de los tokens de autenticación:

| Configuración | Por defecto | Descripción |
|---------------|-------------|-------------|
| **Access Token TTL** | 900s (15 min) | Duración de los tokens de acceso en segundos. Mín: 60. Dejar vacío para el valor por defecto. |
| **Refresh Token TTL** | 2.592.000s (30 días) | Duración de los tokens de actualización en segundos. Mín: 60. Dejar vacío para el valor por defecto. |

Estas configuraciones se aplican a los tokens emitidos vía `POST /api/{projectId}/auth/login`. Cambiar el TTL solo afecta a los **nuevos tokens**.

## SMTP Mailer

Cada proyecto puede tener su propia configuración SMTP. Consulte la sección **SMTP Mailer** en la configuración del proyecto.

## Zona de peligro

| Acción | Descripción |
|--------|-------------|
| **Archivar proyecto** | Oculta el proyecto del panel; la API sigue funcionando |
| **Eliminar proyecto** | Elimina permanentemente el proyecto, todas las colecciones, entradas y archivos multimedia |

:::caution
Eliminar un proyecto es irreversible. Todos los datos se eliminan permanentemente.
:::
