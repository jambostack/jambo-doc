---
title: Comprendre les permissions
description: Comment fonctionne le système de permissions dans Jambo — rôles, projets et tokens API.
---

Jambo dispose de deux systèmes de permissions distincts : les **permissions admin** (pour les utilisateurs CMS) et les **permissions des tokens API** (pour vos applications).

## Permissions admin

Les utilisateurs admin se voient attribuer un **rôle** qui contrôle ce qu'ils peuvent faire dans le panneau. Les rôles sont configurés dans [Gérer les rôles](/fr/profile/managing-roles/).

Les Super Admins contournent toutes les vérifications de permissions.

## Permissions des tokens API

Lors de la création d'un token API dans **Paramètres du projet → Accès API**, vous pouvez le limiter à des opérations spécifiques :

| Scope | Autorise |
|-------|----------|
| `read` | Requêtes GET (lister et récupérer les entrées et assets) |
| `write` | POST et PATCH (créer et mettre à jour) |
| `delete` | Requêtes DELETE |
| `admin` | Accès complet incluant la gestion des collections |

## API publique

Si l'**API publique** est activée pour un projet, les requêtes anonymes (sans token) peuvent lire le contenu `publié`. Les opérations d'écriture nécessitent toujours un token.
