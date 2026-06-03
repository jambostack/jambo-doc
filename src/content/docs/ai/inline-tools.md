---
title: Inline Content Tools
description: AI-powered editing tools available directly inside the rich text editor.
---

Inline content tools are AI actions that appear inside the **rich text editor** when you select text. They let you transform content without leaving the editor.

## How to use

1. Open a content entry with a `richtext` field
2. Select some text in the editor
3. A toolbar appears above the selection — click **AI** (✨)
4. Choose an action from the menu

## Available actions

| Action | What it does |
|--------|--------------|
| **Improve writing** | Fix grammar, improve clarity and flow |
| **Make shorter** | Summarize or condense selected text |
| **Make longer** | Expand with more detail |
| **Simplify** | Rewrite in simpler language |
| **Fix grammar** | Correct spelling and grammar only |
| **Translate** | Translate selection to another language |
| **Change tone** | Rewrite as Professional / Casual / Friendly / Formal |

## Custom instructions

Select text and click **AI → Custom instruction** to type your own prompt:

```
Rewrite this as a list of bullet points
```

```
Add a call-to-action at the end
```

## Accepting changes

After the AI generates a replacement, you see a **diff view** showing the original vs. the new text. Click:
- **Accept** — replace the selection with the AI's version
- **Discard** — keep the original text
- **Try again** — regenerate with the same instruction

## Requirements

An AI provider with text support must be configured in **Admin → Settings → AI Studio**.
