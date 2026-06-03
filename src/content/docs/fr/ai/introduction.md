---
title: Fonctionnalités IA — Introduction
description: Vue d'ensemble des fonctionnalités IA dans Jambo CMS.
---

Jambo intègre l'IA dans tout le CMS pour vous aider à travailler plus vite — de la conception de schémas à la traduction de contenu et à la génération d'images.

## Vue d'ensemble des fonctionnalités IA

| Fonctionnalité | Où | Ce qu'elle fait |
|----------------|-----|-----------------|
| [Studio IA](/fr/studio/schema-builder/) | Paramètres → Studio | Constructeur de schéma par chat et agent IA |
| [Assistant IA](/fr/ai/ai-assistant/) | Éditeur de contenu | Répondre aux questions, réécrire du texte |
| [Outils de contenu inline](/fr/ai/inline-tools/) | Éditeur richtext | Traduire, résumer, développer, réécrire le texte sélectionné |
| [Traduction IA](/fr/ai/ai-translation/) | Entrées de contenu | Traduire des entrées complètes entre locales |
| [Serveur MCP](/fr/ai/mcp-server/) | Paramètres du projet | Exposer votre projet comme serveur MCP pour les agents IA |

## Providers IA supportés

| Provider | Texte | Vision | Génération d'images |
|----------|-------|--------|---------------------|
| **OpenAI** (GPT-4o, o1) | ✅ | ✅ | ✅ (DALL-E 3) |
| **Anthropic** (Claude) | ✅ | ✅ | ❌ |
| **Google Gemini** | ✅ | ✅ | ✅ |
| **DeepSeek** | ✅ | ❌ | ❌ |
| **Ollama** (local) | ✅ | Selon le modèle | ❌ |

Configurez les providers dans **Admin → Paramètres → Studio IA**.

## Démarrage

1. Allez dans **Admin → Paramètres → Studio IA**
2. Ajoutez votre clé API pour au moins un provider
3. Ouvrez un projet → **Paramètres → Studio** pour commencer à utiliser le chat IA
