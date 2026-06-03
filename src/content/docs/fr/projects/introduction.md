---
title: Projets — Introduction
description: Les projets sont les conteneurs de premier niveau pour votre contenu dans Jambo.
---

Un **projet** est le conteneur de premier niveau pour votre CMS. Chaque projet possède ses propres :

- Collections et champs
- Entrées de contenu
- Médiathèque
- Tokens API et paramètres d'accès
- Locales et paramètres de traduction
- Webhooks

Vous pouvez créer plusieurs projets sur une seule installation Jambo — par exemple, un projet par site web ou application.

## Créer un projet

1. Connectez-vous au panneau d'administration Jambo
2. Cliquez sur **+ Nouveau projet** depuis le tableau de bord
3. Entrez un nom et un slug de projet
4. Choisissez la locale par défaut
5. Cliquez sur **Créer**

Votre projet est immédiatement prêt avec un UUID auto-généré et un endpoint API.

## UUID du projet

Chaque projet possède un UUID unique (ex. `f99cb038-6611-44d3-b1c7-46cf62c1e232`). Cet UUID est utilisé dans toutes les requêtes API :

```
https://votre-domaine.com/api/{project-uuid}/slug-collection
```

Trouvez l'UUID de votre projet dans **Paramètres du projet → Accès API**.

## Étapes suivantes

- [Créer des projets](/fr/projects/creating-projects/) — Guide étape par étape
- [Collections](/fr/projects/collections/what-are-collections/) — Définir la structure du contenu
- [API de contenu](/fr/api/introduction/) — Connecter votre frontend
