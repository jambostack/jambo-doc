---
title: Traduction IA
description: Traduire automatiquement les entradas de contenu entre idiomas avec l'IA.
---

La fonctionnalité de traduction IA vous permet de traduire une entrada de contenu complète d'une idioma à une autre en un seul clic.

## Cómo usar

1. Ouvrez une entrada de contenu dans le panneau d'administration
2. Dans le sélecteur de idioma, cliquez sur **Traduire depuis [idioma source]**
3. Confirmez la idioma cible et la idioma source
4. Cliquez sur **Traduire**

Jambo envoie tous les campos traduisibles au provider IA configuré et crée une nouvelle entrada dans la idioma cible.

## Campos traduisibles

| Type de campo | Traduit ? |
|---------------|-----------|
| `text` | ✅ |
| `longtext` | ✅ |
| `richtext` | ✅ (préserve les balises HTML) |
| `slug` | ✅ (translittéré) |
| `enumeration` | ❌ (valeur préservée) |
| `media` | ❌ (même archivo) |
| `relation` | ❌ (même référence) |
| `number` / `boolean` / `date` | ❌ (préservé) |

## Traduction en masse

Pour traduire plusieurs entradas à la fois, utilisez le **Studio IA** avec la commande `/data` :

```
/data Traduire tous les articles publicados de l'anglais vers le français
```
