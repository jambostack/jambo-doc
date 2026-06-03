---
title: Serveur MCP
description: Connectez des agents IA directement à Jambo API via le Model Context Protocol.
---

## Qu'est-ce que MCP ?

Le Model Context Protocol (MCP) permet aux agents IA (Claude, Cursor, agents personnalisés) d'interagir directement avec votre CMS — lire du contenu, créer des entrées, gérer le schéma — sans écrire d'intégrations sur mesure.

## Endpoint

```
https://votre-domaine.com/mcp
```

## Catégories d'outils

| Catégorie | Description |
|---|---|
| **Exploration** | Parcourir les projets, collections, schémas |
| **Contenu** | Lister, créer, modifier, supprimer des entrées |
| **Schéma** | Gérer les collections et les champs |
| **Médias** | Téléverser et interroger les assets |
| **Utilisateurs finaux** | Gérer les utilisateurs front-end |
| **Outils IA** | Génération de contenu, recherche, versionnage |

## Connecter Claude Desktop

Ajoutez à votre `claude_desktop_config.json` :

```json
{
  "mcpServers": {
    "jambo": {
      "url": "https://votre-domaine.com/mcp",
      "headers": {
        "Authorization": "Bearer VOTRE_TOKEN_MCP"
      }
    }
  }
}
```

Créez un token MCP dans **Projet → Paramètres → Accès MCP**.
