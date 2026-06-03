---
title: Gérer le contenu
description: Vue d'ensemble de la gestion de contenu dans Jambo — statuts, idiomas et workflows.
---

Le contenu dans Jambo est organisé par **colección**. Chaque colección a sa propre liste d'entradas accessible depuis la barre latérale du proyecto.

## Statuts du contenu

Chaque entrada a l'un de deux statuts :

| Estado | Descripción |
|--------|-------------|
| `borrador` | Non visible dans l'API publique par défaut |
| `publicado` | Visible dans l'API publique |

## Idiomas

Si votre proyecto a plusieurs idiomas activées, chaque entrada appartient à une idioma. Pour afficher du contenu en plusieurs langues, créez des entradas séparées — une par idioma.

## Versionnement

Jambo sauvegarde un historique de versions pour chaque entrada. Cliquez sur **Historique** dans l'éditeur pour voir les versions précédentes et en restaurer une.

## Suppression douce (corbeille)

Supprimer une entrada la déplace vers la corbeille — elle disparaît de l'API publique mais n'est pas eliminadoe définitivement. Pour la supprimer définitivement, allez dans **Contenu → Corbeille**.

## Recherche

Utilisez la barre de recherche en haut de la liste de contenu pour trouver des entradas par leurs campos texte. Si Meilisearch est configuré, la recherche est en texte intégral sur tous les campos texte.
