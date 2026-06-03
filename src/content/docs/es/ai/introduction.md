---
title: Fonctionnalités IA — Introduction
description: Vue d'ensemble des fonctionnalités IA dans Jambo CMS.
---

Jambo intègre l'IA dans tout le CMS pour vous aider à travailler plus vite — de la conception de schémas à la traduction de contenu et à la génération d'images.

## Descripción general des fonctionnalités IA

| Funcionalidad | Où | Ce qu'elle fait |
|----------------|-----|-----------------|
| [Studio IA](/es/studio/schema-builder/) | Paramètres → Studio | Constructeur de schéma par chat et agent IA |
| [Assistant IA](/es/ai/ai-assistant/) | Éditeur de contenu | Répondre aux questions, réécrire du texte |
| [Outils de contenu inline](/es/ai/inline-tools/) | Éditeur richtext | Traduire, résumer, développer, réécrire le texte sélectionné |
| [Traduction IA](/es/ai/ai-translation/) | Entradas de contenu | Traduire des entradas complètes entre idiomas |
| [Serveur MCP](/es/ai/mcp-server/) | Paramètres du proyecto | Exposer votre proyecto comme serveur MCP pour les agents IA |

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
3. Ouvrez un proyecto → **Paramètres → Studio** pour commencer à utiliser le chat IA
