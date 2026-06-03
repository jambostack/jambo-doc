---
title: AI Features — Introduction
description: Overview of the AI-powered features in Jambo CMS.
---

:::note
هذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.
:::


Jambo integrates AI throughout the CMS to help you work faster — from designing schemas to translating content and generating images.

## AI features overview

| Feature | Where | What it does |
|---------|-------|--------------|
| [AI Studio](/studio/schema-builder/) | Settings → Studio | Chat-based schema builder and AI agent |
| [AI Assistant](/ai/ai-assistant/) | Content editor | Answer questions, rewrite text inline |
| [Inline Content Tools](/ai/inline-tools/) | Rich text editor | Translate, summarize, expand, rewrite selected text |
| [AI Translation](/ai/ai-translation/) | Content entries | Translate full entries between locales |
| [MCP Server](/ai/mcp-server/) | Project settings | Expose your project as an MCP server for AI agents |

## Supported AI providers

Jambo works with any of these providers:

| Provider | Text | Vision | Image generation |
|----------|------|--------|-----------------|
| **OpenAI** (GPT-4o, o1) | ✅ | ✅ | ✅ (DALL-E 3) |
| **Anthropic** (Claude) | ✅ | ✅ | ❌ |
| **Google Gemini** | ✅ | ✅ | ✅ |
| **DeepSeek** | ✅ | ❌ | ❌ |
| **Ollama** (local) | ✅ | Depends on model | ❌ |

Configure providers in **Admin → Settings → AI Studio**. See [AI Providers](/studio/ai-providers/) for the full setup guide.

## Getting started

1. Go to **Admin → Settings → AI Studio**
2. Add your API key for at least one provider
3. Open any project → **Settings → Studio** to start using the AI chat
4. Use [Inline Tools](/ai/inline-tools/) in the rich text editor for content-level AI
