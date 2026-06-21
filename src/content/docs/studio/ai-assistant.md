---
title: AI Assistant
description: AI-powered content generation, translation, summarization, and SEO optimization with 11 provider support.
---

The JamboApi AI Assistant brings artificial intelligence directly into your content workflow. Accessible from the content entry editor toolbar, it offers one-click content generation, translation, summarization, and SEO optimization.

## Provider Architecture

The AI system supports **11 providers** with a unified abstraction layer managed by `AiContentService`. Each provider can be independently enabled or disabled, and configured with API keys and models.

### Supported Providers

| # | Provider | Default Model | Endpoint |
|---|----------|--------------|----------|
| 1 | **OpenAI** | `gpt-4o` | `https://api.openai.com/v1/chat/completions` |
| 2 | **Anthropic** | `claude-sonnet-4-6` | `https://api.anthropic.com/v1/messages` |
| 3 | **DeepSeek** | `deepseek-chat` | `https://api.deepseek.com/chat/completions` |
| 4 | **Ollama** | `llama3.2` | Configurable (default `http://localhost:11434`) |
| 5 | **Gemini** | `gemini-2.0-flash` | `https://generativelanguage.googleapis.com/v1beta/models/` |
| 6 | **OpenRouter** | `openai/gpt-4o` | `https://openrouter.ai/api/v1/chat/completions` |
| 7 | **Mistral** | `mistral-large-latest` | `https://api.mistral.ai/v1/chat/completions` |
| 8 | **Groq** | `llama-3.3-70b-versatile` | `https://api.groq.com/openai/v1/chat/completions` |
| 9 | **xAI (Grok)** | `grok-2-latest` | `https://api.x.ai/v1/chat/completions` |
| 10 | **Perplexity** | `sonar-pro` | `https://api.perplexity.ai/chat/completions` |
| 11 | **Qwen (Alibaba)** | `qwen-max` | `https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions` |

### Semantic Model Aliases

| Alias | Maps To | Use Case |
|-------|---------|----------|
| `fast` | `gpt-4o-mini` | Quick operations (translation, summarization) |
| `smart` | `claude-sonnet-4-6` | Complex content generation |
| `local` | `llama3.2` | Local inference via Ollama |

### Provider Configuration

Configure providers in **Admin Settings > AI Providers**. Each provider has:

| Setting | Description |
|---------|-------------|
| Enabled | Toggle the provider on/off |
| API Key | Authentication key for the provider |
| Model | Select a model from the provider's available list (fetched dynamically) |
| URL | Custom endpoint URL (for Ollama and custom setups) |

Configuration is stored in the database (`app_settings.aiProviders` JSON column) and can also fall back to environment variables.

## AI Toolbar

The AI toolbar appears as a gradient card in the content entry editor with four action buttons:

### Generate Content

Uses a natural language brief to populate entry fields. Describe what you want in plain text, and the AI analyzes the collection's field structure to produce matching content.

**Example brief:**
> "Write an article about the benefits of renewable energy, targeting homeowners in Europe. Include practical tips and recent statistics."

### Translate Content

Translates entry content into another locale while preserving the field structure. Select the target locale and optionally choose a specific field to translate.

The translation sends the JSON content structure to the AI with instructions to maintain the exact field structure and translate only text values. Non-text fields (numbers, booleans, relations, media) are preserved as-is.

### Optimize SEO

One-click generation of SEO metadata:

| Field | Description |
|-------|-------------|
| `metaTitle` | Search engine title tag |
| `metaDescription` | Meta description for search results |
| `slug` | SEO-optimized URL slug |
| `keywords` | Comma-separated keyword list |

### Summarize

Condenses the entry content into a configurable-length summary (default 80 words). Useful for excerpt fields, meta descriptions, or teaser text.

## Image Generation

Beyond text, the AI Assistant can generate images:

- **Provider:** DALL-E 3 (OpenAI) with Gemini Imagen fallback
- **Sizes:** Configurable (default `1024x1024`)
- **Workflow:** Generated images are uploaded to the project's media library and can be referenced in content fields

## System Prompt Context

When generating content, the AI is provided with:

- The **collection's field structure** (field names, types, required/optional)
- The **project's locales and settings**
- Content already in the fields (for updates and translations)

This context ensures the AI generates content that matches your schema exactly.

## Audit Logging

All AI operations are logged to the `audit_log` table with:

| Field | Description |
|-------|-------------|
| Tool name | Prefixed with `ai_` (e.g., `ai_generate_content`) |
| Source | Set to `'ai'` |
| Input | The prompt or content sent to the AI (sensitive fields redacted) |
| Output | The AI response (truncated at 10 KB) |
| Status | `success` or `failure` |
| Duration | Execution time in milliseconds |
| User | Who triggered the operation |

## Available Capabilities

The system exposes a capabilities endpoint at `/api/projects/{uuid}/studio/ai-capabilities` that returns:

```json
{
  "text": true,
  "images": true,
  "voice": false,
  "provider": "openai",
  "model": "gpt-4o",
  "image_provider": "openai",
  "limits": { "max_tokens": 4096 },
  "available": true
}
```

This is used by the Studio UI to enable/disable AI features based on current provider configuration.

## Automation Integration

AI operations can also be triggered through the **Flow Automation** system as workflow nodes:

| Node Type | Description |
|-----------|-------------|
| `ai.llm_call` | Free-form LLM call with custom prompt, system prompt, model, and temperature |
| `ai.generate_text` | Generate content from a prompt |
| `ai.summarize` | Summarize text with length control |
| `ai.translate` | Translate text to a target language (supports 12 languages) |
| `ai.classify` | Classify text into predefined categories |

These are configured in the **Automations** module and can be chained into multi-step workflows.
