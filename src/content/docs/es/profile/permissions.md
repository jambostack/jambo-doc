---
title: Comprendre les permissions
description: Comment fonctionne le système de permissions dans Jambo — rols, proyectos et tokens API.
---

Jambo dispose de deux systèmes de permissions distincts : les **permissions admin** (pour les usuarios CMS) et les **permissions des tokens API** (pour vos applications).

## Permissions admin

Les usuarios admin se voient attribuer un **rol** qui control ce qu'ils peuvent faire dans le panneau. Les rols sont configurés dans [Gérer les rols](/es/profile/managing-roles/).

Les Super Admins contournent toutes les vérifications de permissions.

## Permissions des tokens API

Lors de la création d'un token API dans **Paramètres du proyecto → Accès API**, vous pouvez le limiter à des opérations spécifiques :

| Scope | Permite |
|-------|----------|
| `read` | Requêtes GET (lister et récupérer les entradas et assets) |
| `write` | POST et PATCH (créer et mettre à jour) |
| `delete` | Requêtes DELETE |
| `admin` | Accès complet incluant la gestion des coleccións |

## API publique

Si l'**API publique** est activée pour un proyecto, les requêtes anonymes (sans token) peuvent lire le contenu `publicado`. Les opérations d'écriture nécessitent toujours un token.
