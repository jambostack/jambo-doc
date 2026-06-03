---
title: Fournisseurs IA
description: Configurez les fournisseurs IA pour Jambo Studio.
---

## Fournisseurs supportés

| Fournisseur | Modèles | Texte | Images | Format API |
|---|---|---|---|---|
| **OpenAI** | GPT-4o, GPT-4o mini, GPT-4.1, o1, o3-mini | ✅ | ✅ DALL‑E 3 | Natif |
| **Anthropic** | Claude Opus, Sonnet, Haiku | ✅ | ❌ | Natif |
| **Google Gemini** | Gemini 2.0 Flash, Gemini 2.0 Pro | ✅ | ✅ Imagen | Natif |
| **DeepSeek** | DeepSeek Chat, DeepSeek Reasoner | ✅ | ❌ | Compatible OpenAI |
| **Mistral AI** | Mistral Large, Mistral Small, Codestral | ✅ | ❌ | Compatible OpenAI |
| **Groq** | Llama 3.3 70B, Mixtral 8x7B, Gemma 2 9B | ✅ | ❌ | Compatible OpenAI |
| **xAI (Grok)** | Grok 2, Grok 2 Vision | ✅ | ❌ | Compatible OpenAI |
| **Perplexity** | Sonar Pro, Sonar Reasoning Pro | ✅ | ❌ | Compatible OpenAI |
| **Alibaba Qwen** | Qwen Max, Qwen Plus, Qwen Turbo | ✅ | ❌ | Compatible OpenAI |
| **OpenRouter** | GPT-4o, Claude Sonnet, Gemini Flash, Llama 4 (passerelle multi-fournisseurs) | ✅ | ❌ | Compatible OpenAI |
| **Ollama** | Tout modèle installé localement (Llama 3, Mistral, Phi, etc.) | ⚠️ Local | ❌ | Compatible OpenAI (local) |

## Configuration

Rendez-vous dans **Admin → Paramètres de l'application → onglet Fournisseurs IA** et activez les fournisseurs que vous souhaitez utiliser. Les clés API sont stockées chiffrées dans la base de données — aucune variable d'environnement requise.

Chaque fournisseur nécessite :
- **Clé API** (sauf Ollama qui utilise une URL locale)
- **Modèle par défaut** — sélectionnez votre modèle préféré dans la liste déroulante

## Capacités des fournisseurs

L'agent IA du Studio Jambo détecte automatiquement ce que vos fournisseurs configurés peuvent faire. Un **badge de capacités** s'affiche dans le chat du Studio :

```
🟢 Texte (claude-sonnet-4-6)  🟢 Images (dall-e-3)
```

| Fournisseur | Génération de texte | Génération d'images |
|---|---|---|
| **OpenAI** | ✅ Qualité complète | ✅ DALL‑E 3 |
| **Anthropic** | ✅ Qualité complète | ❌ |
| **Google Gemini** | ✅ Qualité complète | ✅ Imagen |
| **Ollama** | ⚠️ Qualité limitée (dépend du modèle local) | ❌ |
| Tous les autres | ✅ | ❌ |

Si vous avez besoin de génération d'images IA pour les couvertures de blog, les images hero ou les avatars d'auteurs, activez **OpenAI** ou **Gemini** en plus de votre fournisseur de texte. Quand aucun fournisseur d'images n'est disponible, l'agent utilise des SVG professionnels en placeholder avec la palette émeraude de Jambo.

## Ollama (local)

Pour Ollama, saisissez l'URL du serveur (par défaut : `http://localhost:11434`) à la place d'une clé API. Cela permet d'utiliser les fonctionnalités IA entièrement hors ligne. Remarque : les modèles locaux ont une qualité limitée par rapport aux fournisseurs cloud. L'agent affichera un avertissement ⚠️ dans le chat.

## OpenRouter

OpenRouter est une passerelle API unifiée qui donne accès à plus de 200 modèles de plusieurs fournisseurs via une seule clé API. Utilisez le format de préfixe de modèle (ex. `openai/gpt-4o`, `anthropic/claude-sonnet-4-6`, `google/gemini-2.0-flash`).

Obtenez votre clé API sur [openrouter.ai](https://openrouter.ai/).

## Basculement multi-fournisseurs

Le Studio Jambo essaie automatiquement le premier fournisseur activé. En cas d'échec, il bascule sur le suivant — garantissant que vos fonctionnalités IA restent disponibles.
