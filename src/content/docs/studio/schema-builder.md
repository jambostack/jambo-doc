---
title: Schema Builder
description: Design your content schema by chatting with an AI agent.
---

## Overview

The Jambo AI Studio lets you design and modify your content schema by describing what you need in plain language. No code required. The **AI agent** can also create content in bulk, generate images, translate entries, and more — see the [AI Agent](/studio/ai-agent/) page for full details.

## AI Agent — Intelligent assistant

Jambo Studio includes a powerful **AI agent** that goes far beyond schema generation. It has access to 8 real tools:

- **`explore_schema`** — Analyze your current collections and fields
- **`create_collections`** — Create collections + fields in one action
- **`create_entries`** — Bulk create up to 100 entries × multiple locales
- **`update_entries`** — Modify existing content
- **`delete_entries`** — Soft-delete entries
- **`generate_images`** — AI image generation (DALL‑E / Gemini) + auto‑upload
- **`translate_entries`** — Translate content between locales using AI

The agent detects your provider's capabilities (text, images) and adapts automatically. Read the complete guide: [AI Agent documentation](/studio/ai-agent/).

## How the chat works

There are two modes:

### Quick mode (`/schema`, `/data`, `/all`)

For small requests, use slash commands. The AI responds with a JSON preview and an "Apply" button.

```
/schema Create a blog with articles, categories, and authors
/data Generate 5 professional blog articles in French  
/all Build a complete e-commerce schema with sample data
```

### Agent mode

For complex, bulk, or multi-locale requests, the AI switches to **plan mode**. It presents an execution plan with a list of actions. Review the plan and click **Execute** to run everything automatically.

```
Create a full agency website with 6 portfolio projects,
8 client testimonials, and a blog — all in 4 languages.
```

The agent creates collections, generates entries, and uploads images — all without leaving the chat.

## Naming conventions

Jambo enforces strict naming rules automatically:

- Collection names: **PascalCase plural** (`BlogPosts`, `Products`)
- Singleton names: **PascalCase singular** (`Hero`, `Config`)
- Field names: **camelCase** (`publishedAt`, `featuredImage`)
- Slugs: **snake_case** (`blog_posts`, `published_at`)
- **EndUsers** is a built-in system collection — never create a new "Users" collection

## Supported field types

`text` · `longtext` · `richtext` · `slug` · `email` · `password` · `number` · `decimal` · `boolean` · `date` · `datetime` · `time` · `color` · `json` · `enumeration` · `media` · `relation`

## Bulk operations & multi-locale

The AI agent can handle bulk operations that would take hours manually:

- **Create 100 entries in 4 languages** (400 API calls) — one click
- **Translate an entire collection** from French to English, Spanish, Arabic
- **Generate AI images** for blog covers, hero sections, author avatars
- **Modify dozens of entries** at once (update categories, fix slugs, etc.)

## Provider capabilities

The agent detects what your AI provider can do. A badge shows current capabilities:

🟢 **Text** (active) · 🟢 **Images** (active) · 🔴 **Voice** (unavailable)

Configure providers in [Admin → App Settings → AI Providers](/admin/app-settings). The agent automatically uses the first enabled provider and falls back to the next one on failure.
