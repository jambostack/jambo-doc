---
title: Accès API
description: Gérer les tokens API et les paramètres d'API publique pour votre proyecto.
---

Allez dans **Paramètres du proyecto → Accès API** pour gérer comment vos applications frontend se connectent à Jambo.

## UUID du proyecto

L'UUID de votre proyecto est l'identifiant utilisé dans chaque requête API :

```
https://votre-domaine.com/api/{project-uuid}/slug-colección
```

## Tokens API

Les tokens API authentifient vos applications frontend.

### Crear un token

1. Cliquez sur **+ Nouveau token**
2. Entrez un nom (ex. `Frontend Next.js`, `App mobile`)
3. Sélectionnez les scopes :

| Scope | Permite |
|-------|----------|
| `read` | Requêtes GET — lister et récupérer les entradas |
| `write` | POST et PATCH — créer et mettre à jour |
| `delete` | Requêtes DELETE |
| `admin` | Accès complet incluant la gestion des coleccións |

4. Cliquez sur **Créer**
5. **Copiez le token immédiatement** — il n'est affiché qu'une seule fois

### Révoquer un token

Cliquez sur l'icône de corbeille à côté d'un token pour le révoquer immédiatement.

## API publique

Quand l'**API publique** est activée, les requêtes GET anonymes (sans token) peuvent lire le contenu `publicado`.

:::caution
N'activez jamais l'API publique pour les proyectos contenant des données sensibles ou privées.
:::
