---
title: Gérer le contenu
description: Vue d'ensemble de la gestion de contenu dans Jambo — statuts, locales et workflows.
---

Le contenu dans Jambo est organisé par **collection**. Chaque collection a sa propre liste d'entrées accessible depuis la barre latérale du projet.

## Statuts du contenu

Chaque entrée a l'un de deux statuts :

| Statut | Description |
|--------|-------------|
| `brouillon` | Non visible dans l'API publique par défaut |
| `publié` | Visible dans l'API publique |

## Locales

Si votre projet a plusieurs locales activées, chaque entrée appartient à une locale. Pour afficher du contenu en plusieurs langues, créez des entrées séparées — une par locale.

## Versionnement

Jambo sauvegarde un historique de versions pour chaque entrée. Cliquez sur **Historique** dans l'éditeur pour voir les versions précédentes et en restaurer une.

## Suppression douce (corbeille)

Supprimer une entrée la déplace vers la corbeille — elle disparaît de l'API publique mais n'est pas supprimée définitivement. Pour la supprimer définitivement, allez dans **Contenu → Corbeille**.

## Recherche

Utilisez la barre de recherche en haut de la liste de contenu pour trouver des entrées par leurs champs texte. Si Meilisearch est configuré, la recherche est en texte intégral sur tous les champs texte.
