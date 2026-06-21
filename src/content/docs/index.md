---
title: Jambo CMS Documentation
description: Open-source headless CMS built with Symfony 8 and PHP 8.4 — REST, GraphQL, AI-native, multi-tenant.
---

Jambo is a **headless CMS** for developers who need speed and flexibility. It exposes your content through REST and GraphQL APIs, with built-in AI tools for schema design, content generation, and translation.

## Quick links

- [Installation](/getting-started/installation/) — get Jambo running in minutes
- [Quick Start](/getting-started/quick-start/) — create your first project
- [Core Concepts](/getting-started/concepts/) — projects, collections, entries

## Key features

| Feature | Description |
|---|---|
| **REST + GraphQL** | Auto-generated APIs with filtering, pagination, multi-locale |
| **Multi-tenant** | Unlimited projects on a single install |
| **Flows** | No-code automation engine with 48 handlers |
| **Live Preview** | Real-time preview with click-to-edit |
| **AI Studio** | Schema builder by conversation (11 providers) |
| **MCP Server** | Expose your project to AI agents |
| **Media Library** | Folders, TUS resumable uploads, image transforms |
| **Auth** | 2FA, Social Login, JWT for end-users |

## Architecture

```
Your frontend → REST API / GraphQL → Jambo CMS → Database
                                    ↕
                              MCP Server (AI agents)
```
