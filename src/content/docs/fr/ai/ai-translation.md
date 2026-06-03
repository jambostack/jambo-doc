---
title: Traduction IA
description: Traduire automatiquement les entrées de contenu entre locales avec l'IA.
---

La fonctionnalité de traduction IA vous permet de traduire une entrée de contenu complète d'une locale à une autre en un seul clic.

## Comment utiliser

1. Ouvrez une entrée de contenu dans le panneau d'administration
2. Dans le sélecteur de locale, cliquez sur **Traduire depuis [locale source]**
3. Confirmez la locale cible et la locale source
4. Cliquez sur **Traduire**

Jambo envoie tous les champs traduisibles au provider IA configuré et crée une nouvelle entrée dans la locale cible.

## Champs traduisibles

| Type de champ | Traduit ? |
|---------------|-----------|
| `text` | ✅ |
| `longtext` | ✅ |
| `richtext` | ✅ (préserve les balises HTML) |
| `slug` | ✅ (translittéré) |
| `enumeration` | ❌ (valeur préservée) |
| `media` | ❌ (même fichier) |
| `relation` | ❌ (même référence) |
| `number` / `boolean` / `date` | ❌ (préservé) |

## Traduction en masse

Pour traduire plusieurs entrées à la fois, utilisez le **Studio IA** avec la commande `/data` :

```
/data Traduire tous les articles publiés de l'anglais vers le français
```
