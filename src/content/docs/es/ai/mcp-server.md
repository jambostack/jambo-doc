---
title: Servidor MCP
description: Conecta agentes de IA directamente a Jambo API mediante Model Context Protocol.
---

## ¿Qué es MCP?

Model Context Protocol (MCP) permite a los agentes de IA (Claude, Cursor, agentes personalizados) interactuar directamente con tu CMS — leer contenido, crear entradas, gestionar esquemas — sin escribir integraciones personalizadas.

## Endpoint

```
https://tu-dominio.com/mcp
```

## Categorías de herramientas

| Categoría | Descripción |
|---|---|
| **Exploración** | Navegar proyectos, colecciones, esquemas |
| **Contenido** | Listar, crear, modificar, eliminar entradas |
| **Esquema** | Gestionar colecciones y campos |
| **Medios** | Subir y consultar assets |
| **Usuarios finales** | Gestionar usuarios front-end |
| **Herramientas IA** | Generación de contenido, búsqueda, versionado |

## Conectar Claude Desktop

Añade a tu `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "jambo": {
      "url": "https://tu-dominio.com/mcp",
      "headers": {
        "Authorization": "Bearer TU_TOKEN_MCP"
      }
    }
  }
}
```

Crea un token MCP en **Proyecto → Configuración → Acceso MCP**.
