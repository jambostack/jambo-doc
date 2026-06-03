---
title: Détails du proyecto
description: Comprendre le tableau de bord proyecto et les informations clés dans Jambo.
---

Le tableau de bord proyecto vous donne une vue d'ensemble de votre proyecto. Accédez-y en cliquant sur un proyecto depuis le tableau de bord principal.

## Descripción general du tableau de bord

| Section | Descripción |
|---------|-------------|
| **Coleccións** | Nombre de coleccións avec liens d'accès rapide |
| **Entradas** | Total des entradas de contenu sur toutes les coleccións |
| **Médias** | Nombre de archivos dans la biblioteca de medios et espace utilisé |
| **API** | Copie rapide de l'UUID du proyecto et de l'URL de base API |
| **Activité récente** | Les 10 dernières modifications avec auteur et horodatage |

## UUID du proyecto

L'UUID du proyecto est l'identifiant unique utilisé dans chaque appel API :

```
https://votre-domaine.com/api/{project-uuid}/slug-colección
```

## URL de base de l'API

Copiez l'URL de base de l'API depuis le tableau de bord et collez-la dans le `.env` de votre frontend :

```ini
NEXT_PUBLIC_JAMBO_API=https://votre-domaine.com/api/f99cb038-...
JAMBO_TOKEN=votre-token-api
```

## Résumé du contenu

Le tableau de bord affiche le nombre d'entradas par colección, réparties en :
- **Publicadoes** — visibles dans l'API publique
- **Borradors** — masquées de l'API publique
- **Corbeille** — suppression douce, dans la corbeille

## Actions rapides

Depuis le tableau de bord proyecto vous pouvez :
- **Ouvrir le Studio** — lancer le chat IA pour la génération de schéma et de contenu
- **Voir la doc API** — ouvrir la spec OpenAPI auto-générée dans Swagger UI
- **Copier l'URL API** — copier l'URL de base de l'API dans le presse-papiers
