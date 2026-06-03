---
title: Schema Builder
description: Diseña tu esquema de contenido conversando con un agente IA.
---

## Descripción general

El Studio IA de Jambo te permite diseñar y modificar tu esquema de contenido describiendo lo que necesitas en lenguaje natural. Sin código. El **agente IA** también puede crear contenido en masa, generar imágenes, traducir entradas y mucho más — consulta la página [Agente IA](/es/studio/ai-agent/) para todos los detalles.

## Agente IA — Asistente inteligente

El Studio de Jambo incluye un potente **agente IA** que va mucho más allá de la simple generación de esquemas. Tiene acceso a 8 herramientas reales:

- **`explore_schema`** — Analizar tus colecciones y campos actuales
- **`create_collections`** — Crear colecciones + campos en una sola acción
- **`create_entries`** — Crear hasta 100 entradas en masa × múltiples idiomas
- **`update_entries`** — Modificar contenido existente
- **`delete_entries`** — Eliminación suave de entradas
- **`generate_images`** — Generación de imágenes IA (DALL‑E / Gemini) + subida automática
- **`translate_entries`** — Traducir contenido entre idiomas con IA

El agente detecta las capacidades de tu proveedor (texto, imágenes) y se adapta automáticamente. Lee la guía completa: [Documentación del Agente IA](/es/studio/ai-agent/).

## Cómo funciona el chat

Hay dos modos:

### Modo rápido (`/schema`, `/data`, `/all`)

Para peticiones pequeñas, usa los comandos slash. La IA responde con una vista previa JSON y un botón "Aplicar".

```
/schema Crear un blog con artículos, categorías y autores
/data Generar 5 artículos de blog profesionales en español
/all Construir un esquema de e-commerce completo con datos de ejemplo
```

### Modo agente

Para peticiones complejas, en masa o multi-idioma, la IA cambia al **modo plan**. Presenta un plan de ejecución con la lista de acciones. Revisa el plan y haz clic en **Ejecutar** para lanzarlo todo automáticamente.

```
Crear un sitio de agencia completo con 6 proyectos de portfolio,
8 testimonios de clientes y un blog — todo en 4 idiomas.
```

El agente crea colecciones, genera entradas y sube imágenes — sin salir del chat.

## Convenciones de nombres

Jambo aplica reglas de nomenclatura estrictas automáticamente:

- Nombres de colecciones: **PascalCase plural** (`BlogPosts`, `Products`)
- Nombres de singletons: **PascalCase singular** (`Hero`, `Config`)
- Nombres de campos: **camelCase** (`publishedAt`, `featuredImage`)
- Slugs: **snake_case** (`blog_posts`, `published_at`)
- **EndUsers** es una colección del sistema integrada — nunca crees una nueva colección "Users"

## Tipos de campos soportados

`text` · `longtext` · `richtext` · `slug` · `email` · `password` · `number` · `decimal` · `boolean` · `date` · `datetime` · `time` · `color` · `json` · `enumeration` · `media` · `relation`

## Operaciones en masa y multi-idioma

El agente IA puede manejar operaciones masivas que tomarían horas manualmente:

- **Crear 100 entradas en 4 idiomas** (400 llamadas API) — un clic
- **Traducir una colección entera** del francés al inglés, español y árabe
- **Generar imágenes IA** para portadas de blog, secciones hero, avatares de autores
- **Modificar docenas de entradas** a la vez (actualizar categorías, corregir slugs, etc.)

## Capacidades del proveedor

El agente detecta qué puede hacer tu proveedor IA. Un badge muestra las capacidades actuales:

🟢 **Texto** (activo) · 🟢 **Imágenes** (activo) · 🔴 **Voz** (no disponible)

Configura los proveedores en [Admin → Configuración de la aplicación → Proveedores IA](/admin/app-settings). El agente usa automáticamente el primer proveedor habilitado y recurre al siguiente en caso de fallo.
