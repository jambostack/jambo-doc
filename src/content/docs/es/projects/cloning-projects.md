---
title: Cloner des proyectos
description: Dupliquer un proyecto Jambo existant avec son schéma et optionnellement son contenu.
---

Cloner un proyecto crée une copie complète — incluant toutes les coleccións, les définitions de campos et les paramètres. Vous pouvez choisir d'inclure les entradas de contenu et les archivos médias.

## Quand cloner

- **Environnement de staging** — cloner la production pour tester des changements de schéma avant la mise en ligne
- **Nouveau proyecto client** — démarrer depuis un schéma existant plutôt que de zéro
- **Sauvegarde** — snapshot avant un refactoring majeur du schéma

## Comment cloner

1. Depuis le tableau de bord, trouvez le proyecto à cloner
2. Cliquez sur le menu **...** puis **Cloner le proyecto**
3. Configurez le clone :

| Option | Descripción |
|--------|-------------|
| **Nom du nouveau proyecto** | Nom d'affichage du proyecto cloné |
| **Slug du nouveau proyecto** | Identifiant API du nouveau proyecto |
| **Copier les entradas** | Cloner toutes les entradas de contenu (pas seulement le schéma) |
| **Copier les archivos médias** | Dupliquer les archivos de la biblioteca de medios |

4. Cliquez sur **Cloner**

Le clonage s'exécute en arrière-plan. Pour les grands proyectos, cela peut prendre quelques minutes.

## Après le clonage

Le proyecto cloné est totalement indépendant :
- Nouvel UUID et nouveaux tokens API (à générer dans **Paramètres → Accès API**)
- Mêmes coleccións et définitions de campos
- Les webhooks ne sont pas clonés — à configurer séparément
