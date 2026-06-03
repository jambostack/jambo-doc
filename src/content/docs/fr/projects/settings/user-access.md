---
title: Accès utilisateurs
description: Gérer les utilisateurs admin ayant accès à un projet et leurs rôles.
---

Allez dans **Paramètres du projet → Accès utilisateurs** pour contrôler qui peut accéder au projet.

## Membres du projet

Les Super Admins ont accès à tous les projets par défaut. Les autres utilisateurs admin doivent être ajoutés explicitement.

### Ajouter un membre

1. Cliquez sur **+ Ajouter un membre**
2. Recherchez un utilisateur admin par nom ou email
3. Sélectionnez son **rôle dans le projet** :

| Rôle | Accès |
|------|-------|
| **Gestionnaire** | Accès complet au projet — contenu, collections, paramètres |
| **Éditeur** | Créer et modifier du contenu ; ne peut pas modifier les collections ni les paramètres |
| **Lecteur** | Accès en lecture seule au contenu ; pas d'édition |

4. Cliquez sur **Ajouter**

### Retirer un membre

Cliquez sur **Retirer** à côté d'un membre pour révoquer son accès au projet.

## Authentification end-user

Les **end-users** sont les utilisateurs de votre application — différents des utilisateurs admin.

Pour activer l'authentification end-user pour un projet :

1. Activez **Activer l'auth end-user**
2. Configurez l'expiration du token (défaut : 7 jours)

Les end-users peuvent s'inscrire et se connecter via :

```bash
POST /api/{projectId}/auth/register
{ "email": "utilisateur@exemple.com", "password": "..." }

POST /api/{projectId}/auth/login
{ "email": "utilisateur@exemple.com", "password": "..." }
```
