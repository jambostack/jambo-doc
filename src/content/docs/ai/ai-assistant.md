---
title: AI Assistant
description: Use the AI assistant to write and improve content in the Jambo editor.
---

The AI Assistant is available inside the content editor to help you write, rewrite, and improve text directly in the admin panel.

## Accessing the assistant

Click the **✨ AI** button in the top toolbar of any content entry form. A sidebar opens where you can type instructions.

## What you can do

### Generate content

Ask the assistant to write content for you:

```
Write a 200-word introduction about sustainable packaging
```

```
Create 5 FAQ items for a SaaS pricing page
```

### Rewrite existing content

Select text in any field, then ask the assistant to rewrite it:

```
Make this shorter and more professional
```

```
Translate this paragraph to French
```

### Answer questions about your schema

The assistant knows your current collections and fields:

```
What fields does the products collection have?
```

```
How do I reference an author from the posts collection?
```

## Attaching files

Click the **📎** button next to the message input to attach a file. Supported formats:

- **Images** (PNG, JPG, WebP) — the AI analyzes the image visually (requires a vision-capable provider like GPT-4o or Claude)
- **CSV / JSON** — the AI reads the data and can create entries from it
- **Text files** (TXT, MD, PDF) — the AI reads the content and answers questions about it

## Requirements

- An AI provider must be configured in **Admin → Settings → AI Studio**
- Vision features require OpenAI, Anthropic, or Google Gemini
