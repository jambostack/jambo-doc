---
title: Proveedores IA
description: Configura los proveedores IA para Jambo Studio.
---

## Proveedores soportados

| Proveedor | Modelos | Texto | Imágenes | Formato API |
|---|---|---|---|---|
| **OpenAI** | GPT-4o, GPT-4o mini, GPT-4.1, o1, o3-mini | ✅ | ✅ DALL‑E 3 | Nativo |
| **Anthropic** | Claude Opus, Sonnet, Haiku | ✅ | ❌ | Nativo |
| **Google Gemini** | Gemini 2.0 Flash, Gemini 2.0 Pro | ✅ | ✅ Imagen | Nativo |
| **DeepSeek** | DeepSeek Chat, DeepSeek Reasoner | ✅ | ❌ | Compatible OpenAI |
| **Mistral AI** | Mistral Large, Mistral Small, Codestral | ✅ | ❌ | Compatible OpenAI |
| **Groq** | Llama 3.3 70B, Mixtral 8x7B, Gemma 2 9B | ✅ | ❌ | Compatible OpenAI |
| **xAI (Grok)** | Grok 2, Grok 2 Vision | ✅ | ❌ | Compatible OpenAI |
| **Perplexity** | Sonar Pro, Sonar Reasoning Pro | ✅ | ❌ | Compatible OpenAI |
| **Alibaba Qwen** | Qwen Max, Qwen Plus, Qwen Turbo | ✅ | ❌ | Compatible OpenAI |
| **OpenRouter** | GPT-4o, Claude Sonnet, Gemini Flash, Llama 4 (pasarela multi-proveedor) | ✅ | ❌ | Compatible OpenAI |
| **Ollama** | Cualquier modelo instalado localmente (Llama 3, Mistral, Phi, etc.) | ⚠️ Local | ❌ | Compatible OpenAI (local) |

## Configuración

Ve a **Admin → Configuración de la aplicación → pestaña Proveedores IA** y activa los proveedores que quieras usar. Las claves API se almacenan cifradas en la base de datos — sin variables de entorno necesarias.

Cada proveedor requiere:
- **Clave API** (excepto Ollama que usa una URL local)
- **Modelo por defecto** — selecciona tu modelo preferido en el desplegable

## Capacidades de los proveedores

El agente IA del Studio Jambo detecta automáticamente qué pueden hacer tus proveedores configurados. Un **badge de capacidades** se muestra en el chat del Studio:

```
🟢 Texto (claude-sonnet-4-6)  🟢 Imágenes (dall-e-3)
```

| Proveedor | Generación de texto | Generación de imágenes |
|---|---|---|
| **OpenAI** | ✅ Calidad completa | ✅ DALL‑E 3 |
| **Anthropic** | ✅ Calidad completa | ❌ |
| **Google Gemini** | ✅ Calidad completa | ✅ Imagen |
| **Ollama** | ⚠️ Calidad limitada (depende del modelo local) | ❌ |
| Todos los demás | ✅ | ❌ |

Si necesitas generación de imágenes IA para portadas de blog, imágenes hero o avatares de autores, activa **OpenAI** o **Gemini** además de tu proveedor de texto. Cuando no hay ningún proveedor de imágenes disponible, el agente usa SVG profesionales como marcadores de posición con la paleta esmeralda de Jambo.

## Ollama (local)

Para Ollama, introduce la URL del servidor (por defecto: `http://localhost:11434`) en lugar de una clave API. Esto permite usar las funciones IA completamente sin conexión. Nota: los modelos locales tienen calidad limitada comparados con los proveedores en la nube. El agente mostrará una advertencia ⚠️ en el chat.

## OpenRouter

OpenRouter es una pasarela API unificada que da acceso a más de 200 modelos de múltiples proveedores con una sola clave API. Usa el formato de prefijo de modelo (ej. `openai/gpt-4o`, `anthropic/claude-sonnet-4-6`, `google/gemini-2.0-flash`).

Obtén tu clave API en [openrouter.ai](https://openrouter.ai/).

## Conmutación automática entre proveedores

Jambo Studio intenta automáticamente el primer proveedor habilitado. Si ese proveedor falla, recurre al siguiente — garantizando que tus funciones IA permanezcan disponibles.
