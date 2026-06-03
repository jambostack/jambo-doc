---
title: Proyectos — Introduction
description: Les proyectos sont les conteneurs de premier niveau pour votre contenu dans Jambo.
---

Un **proyecto** est le conteneur de premier niveau pour votre CMS. Chaque proyecto possède ses propres :

- Coleccións et campos
- Entradas de contenu
- Biblioteca de medios
- Tokens API et paramètres d'accès
- Idiomas et paramètres de traduction
- Webhooks

Vous pouvez créer plusieurs proyectos sur une seule installation Jambo — par exemple, un proyecto par site web ou application.

## Crear un proyecto

1. Connectez-vous au panneau d'administration Jambo
2. Cliquez sur **+ Nouveau proyecto** depuis le tableau de bord
3. Entrez un nom et un slug de proyecto
4. Choisissez la idioma par défaut
5. Cliquez sur **Créer**

Votre proyecto est immédiatement prêt avec un UUID auto-généré et un endpoint API.

## UUID du proyecto

Chaque proyecto possède un UUID unique (ex. `f99cb038-6611-44d3-b1c7-46cf62c1e232`). Cet UUID est utilisé dans toutes les requêtes API :

```
https://votre-domaine.com/api/{project-uuid}/slug-colección
```

Trouvez l'UUID de votre proyecto dans **Paramètres du proyecto → Accès API**.

## Próximos pasos

- [Créer des proyectos](/es/projects/creating-projects/) — Guide étape par étape
- [Coleccións](/es/projects/coleccións/what-are-coleccións/) — Définir la structure du contenu
- [API de contenu](/es/api/introduction/) — Connecter votre frontend
