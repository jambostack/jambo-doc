---
title: AI Providers
description: Configure AI providers for the Jambo Studio.
---

## Supported providers

| Provider | Models | Text | Images | API Format |
|---|---|---|---|---|
| **OpenAI** | GPT-4o, GPT-4o mini, GPT-4.1, o1, o3-mini | ✅ | ✅ DALL‑E 3 | Native |
| **Anthropic** | Claude Opus, Sonnet, Haiku | ✅ | ❌ | Native |
| **Google Gemini** | Gemini 2.0 Flash, Gemini 2.0 Pro | ✅ | ✅ Imagen | Native |
| **DeepSeek** | DeepSeek Chat, DeepSeek Reasoner | ✅ | ❌ | OpenAI-compatible |
| **Mistral AI** | Mistral Large, Mistral Small, Codestral | ✅ | ❌ | OpenAI-compatible |
| **Groq** | Llama 3.3 70B, Mixtral 8x7B, Gemma 2 9B | ✅ | ❌ | OpenAI-compatible |
| **xAI (Grok)** | Grok 2, Grok 2 Vision | ✅ | ❌ | OpenAI-compatible |
| **Perplexity** | Sonar Pro, Sonar Reasoning Pro | ✅ | ❌ | OpenAI-compatible |
| **Alibaba Qwen** | Qwen Max, Qwen Plus, Qwen Turbo | ✅ | ❌ | OpenAI-compatible |
| **OpenRouter** | GPT-4o, Claude Sonnet, Gemini Flash, Llama 4 (multi-provider gateway) | ✅ | ❌ | OpenAI-compatible |
| **Ollama** | Any locally installed model (Llama 3, Mistral, Phi, etc.) | ⚠️ Local | ❌ | OpenAI-compatible (local) |

## Configuration

Go to **Admin → App Settings → AI Providers** tab and enable the providers you want to use. API keys are stored encrypted in the database — no environment variables needed.

Each provider requires:
- **API key** (except Ollama which uses a local URL)
- **Default model** — select your preferred model from the dropdown

## Provider capabilities

The Jambo Studio AI agent automatically detects what your configured providers can do. A **capabilities badge** is displayed in the Studio chat:

```
🟢 Text (claude-sonnet-4-6)  🟢 Images (dall-e-3)
```

| Provider | Text generation | Image generation |
|---|---|---|
| **OpenAI** | ✅ Full quality | ✅ DALL‑E 3 |
| **Anthropic** | ✅ Full quality | ❌ |
| **Google Gemini** | ✅ Full quality | ✅ Imagen |
| **Ollama** | ⚠️ Limited quality (depends on local model) | ❌ |
| All others | ✅ | ❌ |

If you need AI image generation for blog covers, hero images, or author avatars, enable **OpenAI** or **Gemini** in addition to your text provider. When no image provider is available, the agent falls back to professional SVG placeholders in the Jambo emerald color scheme.

## Ollama (local)

For Ollama, set the server URL (default: `http://localhost:11434`) instead of an API key. This allows running AI features completely offline. Note: local models have limited quality compared to cloud providers. The agent will display a ⚠️ warning in the chat.

## OpenRouter

OpenRouter is a unified API gateway that gives access to 200+ models from multiple providers through a single API key. Use the model prefix format (e.g. `openai/gpt-4o`, `anthropic/claude-sonnet-4-6`, `google/gemini-2.0-flash`).

Get your API key at [openrouter.ai](https://openrouter.ai/).

## Multi-provider fallback

Jambo Studio automatically tries the first enabled provider. If that provider fails, it falls back to the next enabled one — ensuring your AI features stay available.
