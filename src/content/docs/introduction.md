---
title: Introduction
description: Jambo is an open-source headless CMS built with Symfony 8 and PHP 8.4 — fast, developer-friendly, and AI-native.
---

Jambo is an open-source **headless CMS** built with Symfony 8 and PHP 8.4. It exposes your content through a REST API and a GraphQL endpoint, with built-in AI tools to help you design schemas, generate content, and translate entries automatically.

## Key features

- **REST & GraphQL APIs** — auto-generated from your collections, with filtering, pagination, and multi-locale support
- **AI Studio** — chat-based schema builder powered by any LLM (OpenAI, Anthropic, Gemini, DeepSeek, Ollama)
- **AI Agent** — bulk operations: create collections, generate entries, upload images in one prompt
- **Multi-locale** — per-entry locale management with translation tools
- **MCP Server** — expose your project as an MCP server for AI agents
- **Media library** — file upload, image transformations, S3-compatible storage
- **Roles & permissions** — granular access control for teams and API clients
- **Webhooks** — push notifications on content events
- **End-user auth** — built-in JWT authentication for your end-users (registration, login, profile)

## Architecture

```
Your frontend / mobile app
        │
        ▼
REST API  /api/{projectId}/{collection}
GraphQL   /api/projects/{projectId}/graphql
Files     /api/{projectId}/files
        │
        ▼
   Jambo CMS (Symfony + PHP 8.4)
        │
        ▼
Database (MySQL / PostgreSQL / SQLite)
```

Jambo is **headless** — it only serves data as JSON. Your frontend can be any framework: Next.js, Nuxt, Astro, mobile apps, or even a static site generator.

## Quick start

1. [Install Jambo](/installation/) on your server or locally
2. Create a project and your first collection via the admin UI
3. Fetch your content from the API:

```bash
curl https://your-domain.com/api/{project-uuid}/posts
```

## Community

- **GitHub** — [github.com/jambostack/jambo-api](https://github.com/jambostack/jambo-api)
- **Issues & feature requests** — open an issue on GitHub
