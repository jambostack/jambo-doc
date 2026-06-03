---
title: Cloner des projets
description: Dupliquer un projet Jambo existant avec son schéma et optionnellement son contenu.
---

Cloner un projet crée une copie complète — incluant toutes les collections, les définitions de champs et les paramètres. Vous pouvez choisir d'inclure les entrées de contenu et les fichiers médias.

## Quand cloner

- **Environnement de staging** — cloner la production pour tester des changements de schéma avant la mise en ligne
- **Nouveau projet client** — démarrer depuis un schéma existant plutôt que de zéro
- **Sauvegarde** — snapshot avant un refactoring majeur du schéma

## Comment cloner

1. Depuis le tableau de bord, trouvez le projet à cloner
2. Cliquez sur le menu **...** puis **Cloner le projet**
3. Configurez le clone :

| Option | Description |
|--------|-------------|
| **Nom du nouveau projet** | Nom d'affichage du projet cloné |
| **Slug du nouveau projet** | Identifiant API du nouveau projet |
| **Copier les entrées** | Cloner toutes les entrées de contenu (pas seulement le schéma) |
| **Copier les fichiers médias** | Dupliquer les fichiers de la médiathèque |

4. Cliquez sur **Cloner**

Le clonage s'exécute en arrière-plan. Pour les grands projets, cela peut prendre quelques minutes.

## Après le clonage

Le projet cloné est totalement indépendant :
- Nouvel UUID et nouveaux tokens API (à générer dans **Paramètres → Accès API**)
- Mêmes collections et définitions de champs
- Les webhooks ne sont pas clonés — à configurer séparément
