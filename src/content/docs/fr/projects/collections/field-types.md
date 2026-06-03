---
title: Types de champs
description: Référence complète de tous les types de champs disponibles dans les collections Jambo.
---

Lorsque vous ajoutez des champs à une collection, vous choisissez un **type de champ** qui définit comment la donnée est stockée et validée.

## Texte & Contenu

| Type | Description | Exemple de valeur |
|------|-------------|-------------------|
| `text` | Texte court sur une ligne | `"Bonjour monde"` |
| `longtext` | Texte multi-ligne | `"Ligne 1\nLigne 2"` |
| `richtext` | Texte riche HTML (éditeur WYSIWYG) | `"<p>Bonjour <strong>monde</strong></p>"` |
| `slug` | Chaîne URL-safe, auto-générée depuis un autre champ | `"bonjour-monde"` |
| `email` | Adresse email avec validation | `"utilisateur@exemple.com"` |
| `password` | Mot de passe haché | _(écriture uniquement)_ |
| `color` | Valeur de couleur hexadécimale | `"#3b82f6"` |

## Nombres & Booléens

| Type | Description | Exemple de valeur |
|------|-------------|-------------------|
| `number` | Nombre entier | `42` |
| `decimal` | Nombre décimal | `19.99` |
| `boolean` | Vrai ou faux | `true` |

## Date & Heure

| Type | Description | Exemple de valeur |
|------|-------------|-------------------|
| `date` | Date uniquement | `"2024-01-15"` |
| `datetime` | Date et heure (ISO 8601) | `"2024-01-15T10:30:00+00:00"` |
| `time` | Heure uniquement | `"10:30"` |

## Structure

| Type | Description | Exemple de valeur |
|------|-------------|-------------------|
| `enumeration` | Une valeur parmi une liste prédéfinie | `"brouillon"` |
| `json` | Objet ou tableau JSON brut | `{"cle": "valeur"}` |

## Relations

| Type | Description | Exemple de valeur |
|------|-------------|-------------------|
| `media` | Référence à un fichier média (image, document, vidéo) | `{"uuid": "...", "url": "..."}` |
| `relation` | Référence à une entrée dans une autre collection | `{"uuid": "...", "fields": {...}}` |
