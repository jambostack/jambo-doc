---
title: Agente IA
description: El agente IA de Jambo Studio — un asistente inteligente que explora, planifica y ejecuta operaciones complejas en tu CMS.
---

El Agente IA es la funcionalidad más potente de Jambo Studio. A diferencia del chat básico (`/schema`, `/data`, `/all`), el agente tiene acceso a **8 herramientas reales** que le permiten leer tu esquema, crear colecciones, generar contenido en masa, traducir entradas e incluso producir imágenes IA — todo con un solo prompt.

## Modo agente vs. Modo básico

| Funcionalidad | Modo básico (`/schema`) | Modo agente |
|---|---|---|
| Generación de esquema | ✅ Vista previa JSON → aplicación manual | ✅ Creado + guardado automáticamente |
| Generación de contenido | 3–5 entradas por colección | **hasta 100 entradas de una vez** |
| Multi-idioma | Manual por idioma | **auto, todos los idiomas configurados a la vez** |
| Imágenes | Subida manual desde el admin | **Generadas por IA + subida automática** |
| Operaciones en masa | No disponible | ✅ Crear, actualizar, eliminar docenas de entradas |
| Exploración del esquema | Cadena de contexto estática | ✅ Herramienta `explore_schema()` en tiempo real |
| Traducción | No disponible | ✅ Herramienta `translate_entries()` |
| Vista previa del plan | No disponible | ✅ PlanCard con lista de acciones antes de la ejecución |

## Capacidades del proveedor

El agente detecta automáticamente qué puede hacer tu proveedor IA configurado y adapta su comportamiento. Un **badge de capacidades** se muestra permanentemente sobre el campo de entrada del chat:

```
🟢 Texto (claude-sonnet-4-6)  🟢 Imágenes (dall-e-3)
```

Si falta una capacidad, el agente te avisa y sugiere cómo habilitarla:

> ⚠️ No hay proveedor de imágenes configurado. Usaré SVG profesionales como sustitutos.
> Para obtener imágenes generadas por IA, añade OpenAI o Gemini en **Admin → Ajustes → Proveedores IA**.

| Proveedor | Texto | Imágenes | Notas |
|---|---|---|---|
| **OpenAI** | ✅ GPT-4o, o1, etc. | ✅ DALL‑E 3 | Capacidades completas |
| **Anthropic** | ✅ Claude Opus / Sonnet | ❌ | Solo texto |
| **Google Gemini** | ✅ Gemini Flash / Pro | ✅ Imagen | Capacidades completas |
| **Ollama** | ⚠️ Calidad limitada | ❌ | Modelo local |
| **DeepSeek / Mistral / Groq / xAI / Perplexity / Qwen / OpenRouter** | ✅ | ❌ | Solo texto |

## Las 8 herramientas del agente

Cada herramienta es una función del lado del servidor que la IA puede invocar. El agente elige qué herramientas usar según tu solicitud.

### Herramientas de lectura (siempre disponibles, solo lectura)

| Herramienta | Descripción |
|---|---|
| `explore_schema` | Devuelve todas las colecciones con sus campos, tipos, indicadores de obligatoriedad y relaciones. El agente lo llama al inicio de cada sesión. |
| `read_entries` | Lee entradas de una colección. Admite paginación y filtros por idioma/estado. |

### Herramientas de escritura (reglas de ejecución)

| Herramienta | Confirmación | Qué hace |
|---|---|---|
| `create_collections` | **Automática** | Crea colecciones + campos directamente en la base de datos. Incluye destinos de relaciones y valores de enumeración. |
| `create_entries` | **Automática** | Crea entradas en masa. Admite hasta 100 entradas × N idiomas en una sola llamada. |
| `update_entries` | **Vista previa requerida** | Modifica entradas existentes por UUID. Muestra un diff antes de ejecutar. |
| `delete_entries` | **Vista previa + Confirmación** | Eliminación suave de entradas por UUID. Muestra la lista de entradas afectadas antes de confirmar. |
| `generate_images` | **Automática** | Genera imágenes via DALL‑E o Gemini, las sube a la biblioteca de medios y devuelve los UUID. Usa SVG como respaldo si no hay proveedor de imágenes. |
| `translate_entries` | **Vista previa requerida** | Traduce entradas de un idioma origen a N idiomas destino con IA. Preserva slugs y datos estructurados. |

### Reglas de confirmación

| Acción | Comportamiento |
|---|---|
| **Crear** cualquier cosa | Ejecutado inmediatamente, sin confirmación |
| **Modificar** datos existentes | Vista previa primero — haz clic en "Ejecutar" para aplicar |
| **Eliminar** datos existentes | Vista previa primero — haz clic en "Confirmar" para eliminar |

## Cómo usar el agente

### 1. Solicitudes simples — detección automática

Para peticiones pequeñas (1-2 colecciones, 3-5 entradas), usa los comandos estándar `/schema`, `/data` o `/all`. El agente responde en el modo clásico de vista previa JSON con botones "Aplicar".

```
/schema Crear un blog con artículos, categorías y comentarios
/data Generar 5 artículos de blog profesionales en español
/all Construir un esquema de e-commerce completo con productos
```

### 2. Solicitudes en masa — modo agente

Cuando pides **operaciones masivas**, el agente cambia al **modo plan**:

```
Crear un sitio de agencia completo con un portfolio (6 proyectos),
testimonios (8 citas) y un blog (5 artículos).
Todo en francés, inglés, español y árabe.
Añadir imágenes hero profesionales para cada sección.
```

El agente responde con una **PlanCard**:

```
┌────────────────────────────────────────────────┐
│ 📋 Plan                                        │
│                                                │
│ Crear sitio de agencia con portfolio,          │
│ testimonios, blog — 4 idiomas                  │
│                                                │
│ 1. explore_schema                              │
│ 2. create_collections  3 coll.                 │
│ 3. create_entries     76 entradas × 4 idiomas  │
│ 4. generate_images     12 imágenes             │
│                                                │
│ [Ejecutar plan]                                │
└────────────────────────────────────────────────┘
```

Haz clic en **Ejecutar plan** y el agente ejecuta todas las acciones en secuencia, mostrando un **ExecutionLog**:

```
✅ explore_schema: OK
✅ create_collections: 3 colección(es)
✅ create_entries: 76 creadas, 0 errores
✅ generate_images: 12 imágenes generadas (DALL-E)
```

### 3. Explorar y leer

Pide al agente que analice tu proyecto antes de hacer cambios:

```
Explora mi esquema y dime qué falta para un blog
Lee los testimonios actuales y sugiere mejoras
¿Qué colecciones debería añadir para una plataforma de e-learning?
```

## Endpoint de ejecución de herramientas

Si estás construyendo una integración personalizada, puedes llamar al agente programáticamente:

```
POST /api/projects/{uuid}/studio/ai-execute
Content-Type: application/json
Authorization: Bearer <token>

{
  "actions": [
    { "tool": "explore_schema", "params": {} },
    { "tool": "create_entries", "params": {
        "collection": "testimonials",
        "entries": [{ "quote": "...", "author_name": "..." }],
        "locales": ["fr", "en", "es", "ar"]
    }}
  ],
  "auto_confirm": true
}
```

## Endpoint de capacidades

```
GET /api/projects/{uuid}/studio/ai-capabilities
→ { "text": true, "images": true, "provider": "openai", "model": "gpt-4o", "limits": [] }
```

## Generación de imágenes

El agente puede generar imágenes cuando hay un proveedor con capacidad de imágenes (OpenAI o Gemini) configurado.

```
Genera una captura de pantalla de dashboard oscuro para la sección hero
Crea imágenes de portada para 3 artículos sobre rendimiento PHP
Añade avatares de autor para los 6 testimonios
```

Cuando no hay proveedor de imágenes disponible, el agente usa **SVG profesionales como marcadores de posición** con la paleta esmeralda de Jambo.

## Consejos

- **Sé específico** — "Crea 6 testimonios de desarrolladores freelance sobre cambiar de Strapi" funciona mejor que "Añade testimonios"
- **Menciona los idiomas** — "En francés e inglés" o "En todos los idiomas configurados" activa la generación multi-idioma
- **Itera** — "Mantén los 3 primeros testimonios, reemplaza los 3 últimos por mejores"
- **Explora primero** — "Analiza mi esquema y sugiere mejoras para el blog" antes de hacer cambios
- **Imágenes** — Describe el visual que quieres: "Un dashboard oscuro futurista con paneles de datos verdes y gráficos analíticos"
