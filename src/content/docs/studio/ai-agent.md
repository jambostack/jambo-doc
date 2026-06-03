---
title: AI Agent
description: The Jambo Studio AI agent — an intelligent assistant that can explore, plan, and execute complex operations on your CMS.
---

The AI Agent is the most powerful feature of Jambo Studio. Unlike the basic chat (`/schema`, `/data`, `/all`), the agent has access to **8 real tools** that let it read your schema, create collections, generate content in bulk, translate entries, and even produce AI images — all with a single prompt.

## Agent mode vs. Basic mode

| Feature | Basic mode (`/schema`) | Agent mode |
|---|---|---|
| Schema generation | ✅ JSON preview → manual apply | ✅ Auto-created + saved |
| Content generation | 3–5 entries per collection | **up to 100 entries in one shot** |
| Multi-locale | Manual per locale | **auto, all configured locales at once** |
| Images | Manual upload via admin | **AI‑generated + auto‑upload** |
| Bulk operations | Not available | ✅ Create, update, delete dozens of entries |
| Schema exploration | Static context string | ✅ Real-time `explore_schema()` tool |
| Translation | Not available | ✅ `translate_entries()` tool |
| Plan preview | Not available | ✅ PlanCard with action list before execution |

## Provider capabilities

The agent automatically detects what your configured AI provider can do and adapts its behavior. A **capabilities badge** is displayed above the chat input at all times:

```
🟢 Text (claude-sonnet-4-6)  🟢 Images (dall-e-3)
```

If a capability is missing, the agent warns you and suggests how to enable it:

> ⚠️ No image provider configured. I'll use professional SVG placeholders instead.
> To get AI‑generated images, add OpenAI or Gemini in **Admin → App Settings → AI Providers**.

| Provider | Text | Images | Notes |
|---|---|---|---|
| **OpenAI** | ✅ GPT-4o, o1, etc. | ✅ DALL‑E 3 | Full capabilities |
| **Anthropic** | ✅ Claude Opus / Sonnet | ❌ | Text only |
| **Google Gemini** | ✅ Gemini Flash / Pro | ✅ Imagen | Full capabilities |
| **Ollama** | ⚠️ Quality limited | ❌ | Local model |
| **DeepSeek / Mistral / Groq / xAI / Perplexity / Qwen / OpenRouter** | ✅ | ❌ | Text only |

## The 8 agent tools

Each tool is a server-side function the AI can invoke. The agent chooses which tools to use based on your request.

### Read tools (always available, read-only)

| Tool | Description |
|---|---|
| `explore_schema` | Returns all collections with their fields, types, required flags, and relations. The agent calls this at the start of every session. |
| `read_entries` | Reads entries from a collection. Supports pagination and locale/status filters. |

### Write tools (execution rules)

| Tool | Confirmation | What it does |
|---|---|---|
| `create_collections` | **Auto** | Creates collections + fields directly in the database. Includes relation targets and enumeration values. |
| `create_entries` | **Auto** | Bulk creates entries. Supports up to 100 entries × N locales in a single call. |
| `update_entries` | **Preview required** | Modifies existing entries by UUID. Shows a diff before executing. |
| `delete_entries` | **Preview + Confirm** | Soft-deletes entries by UUID. Shows the list of affected entries before confirming. |
| `generate_images` | **Auto** | Generates images via DALL‑E or Gemini, uploads them to the media library, and returns UUIDs. Falls back to SVG placeholders if no image provider is available. |
| `translate_entries` | **Preview required** | Translates entries from a source locale to N target locales using the AI. Preserves slugs and structured data. |

### Confirmation rules

| Action | Behavior |
|---|---|
| **Create** anything | Executed immediately, no confirmation needed |
| **Modify** existing data | Preview shown first — click "Execute" to apply |
| **Delete** existing data | Preview shown first — click "Confirm" to delete |

## How to use the agent

### 1. Simple requests — automatic detection

For small requests (1–2 collections, 3–5 entries), use the standard `/schema`, `/data`, or `/all` commands. The agent will respond in classic JSON preview mode with "Apply" buttons.

```
/schema Create a blog with posts, categories, and comments
/data Generate 5 professional blog articles in French
/all Build a complete e-commerce schema with products
```

### 2. Bulk requests — agent mode

When you ask for **bulk operations**, the agent switches to **plan mode**:

```
Create a full agency website with a portfolio (6 projects),
testimonials (8 quotes), and a blog (5 articles).
Everything in French, English, Spanish, and Arabic.
Add professional hero images for each section.
```

The agent responds with a **PlanCard**:

```
┌────────────────────────────────────────────────┐
│ 📋 Plan                                        │
│                                                │
│ Create agency website with portfolio,          │
│ testimonials, blog — 4 languages               │
│                                                │
│ 1. explore_schema                              │
│ 2. create_collections  3 coll.                 │
│ 3. create_entries     76 entrées × 4 langues   │
│ 4. generate_images     12 images               │
│                                                │
│ [Execute plan]                                 │
└────────────────────────────────────────────────┘
```

Click **Execute plan** and the agent runs all actions sequentially, showing an **ExecutionLog**:

```
✅ explore_schema: OK
✅ create_collections: 3 collection(s)
✅ create_entries: 76 created, 0 errors
✅ generate_images: 12 images generated (DALL-E)
```

### 3. Explore and read

Ask the agent to analyze your project before making changes:

```
Explore my schema and tell me what's missing for a blog
Read the current testimonials and suggest improvements
What collections should I add for an e-learning platform?
```

## Tool execution endpoint

If you're building a custom integration, you can call the agent programmatically:

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

## Capabilities endpoint

```
GET /api/projects/{uuid}/studio/ai-capabilities
→ { "text": true, "images": true, "provider": "openai", "model": "gpt-4o", "limits": [] }
```

## Image generation

The agent can generate images when an image-capable provider (OpenAI or Gemini) is configured.

```
Generate a dark dashboard screenshot for the hero section
Create blog cover images for 3 articles about PHP performance
Add author avatars for the 6 testimonials
```

When no image provider is available, the agent falls back to **professional SVG placeholders** with the Jambo emerald color scheme.

## Tips

- **Be specific** — "Create 6 testimonials from freelance developers about switching from Strapi" works better than "Add testimonials"
- **Mention locales** — "In French and English" or "In all configured locales" triggers multi-locale generation
- **Iterate** — "Keep the first 3 testimonials, replace the last 3 with better ones"
- **Explore first** — "Analyze my schema and suggest blog improvements" before making changes
- **Images** — Describe the visual you want: "A futuristic dark dashboard with green data panels and analytics charts"
