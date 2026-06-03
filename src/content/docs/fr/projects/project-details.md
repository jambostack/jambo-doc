---
title: Détails du projet
description: Comprendre le tableau de bord projet et les informations clés dans Jambo.
---

Le tableau de bord projet vous donne une vue d'ensemble de votre projet. Accédez-y en cliquant sur un projet depuis le tableau de bord principal.

## Vue d'ensemble du tableau de bord

| Section | Description |
|---------|-------------|
| **Collections** | Nombre de collections avec liens d'accès rapide |
| **Entrées** | Total des entrées de contenu sur toutes les collections |
| **Médias** | Nombre de fichiers dans la médiathèque et espace utilisé |
| **API** | Copie rapide de l'UUID du projet et de l'URL de base API |
| **Activité récente** | Les 10 dernières modifications avec auteur et horodatage |

## UUID du projet

L'UUID du projet est l'identifiant unique utilisé dans chaque appel API :

```
https://votre-domaine.com/api/{project-uuid}/slug-collection
```

## URL de base de l'API

Copiez l'URL de base de l'API depuis le tableau de bord et collez-la dans le `.env` de votre frontend :

```ini
NEXT_PUBLIC_JAMBO_API=https://votre-domaine.com/api/f99cb038-...
JAMBO_TOKEN=votre-token-api
```

## Résumé du contenu

Le tableau de bord affiche le nombre d'entrées par collection, réparties en :
- **Publiées** — visibles dans l'API publique
- **Brouillons** — masquées de l'API publique
- **Corbeille** — suppression douce, dans la corbeille

## Actions rapides

Depuis le tableau de bord projet vous pouvez :
- **Ouvrir le Studio** — lancer le chat IA pour la génération de schéma et de contenu
- **Voir la doc API** — ouvrir la spec OpenAPI auto-générée dans Swagger UI
- **Copier l'URL API** — copier l'URL de base de l'API dans le presse-papiers
