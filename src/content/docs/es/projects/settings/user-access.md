---
title: Accès usuarios
description: Gérer les usuarios admin ayant accès à un proyecto et leurs rols.
---

Allez dans **Paramètres du proyecto → Accès usuarios** pour controlr qui peut accéder au proyecto.

## Membres du proyecto

Les Super Admins ont accès à tous les proyectos par défaut. Les autres usuarios admin doivent être ajoutés explicitement.

### Agregar un membre

1. Cliquez sur **+ Ajouter un membre**
2. Recherchez un usuario admin par nom ou email
3. Sélectionnez son **rol dans le proyecto** :

| Rol | Accès |
|------|-------|
| **Gestionnaire** | Accès complet au proyecto — contenu, coleccións, paramètres |
| **Éditeur** | Créer et modifier du contenu ; ne peut pas modifier les coleccións ni les paramètres |
| **Lecteur** | Accès en lecture seule au contenu ; pas d'édition |

4. Cliquez sur **Ajouter**

### Retirer un membre

Cliquez sur **Retirer** à côté d'un membre pour révoquer son accès au proyecto.

## Authentification end-user

Les **end-users** sont les usuarios de votre application — différents des usuarios admin.

Pour activer l'authentification end-user pour un proyecto :

1. Activez **Activer l'auth end-user**
2. Configurez l'expiration du token (défaut : 7 jours)

Les end-users peuvent s'inscrire et se connecter via :

```bash
POST /api/{projectId}/auth/register
{ "email": "usuario@exemple.com", "password": "..." }

POST /api/{projectId}/auth/login
{ "email": "usuario@exemple.com", "password": "..." }
```
