---
title: Types de campos
description: Référence complète de tous les types de campos disponibles dans les coleccións Jambo.
---

Lorsque vous ajoutez des campos à une colección, vous choisissez un **type de campo** qui définit comment la donnée est stockée et validée.

## Texte & Contenu

| Tipo | Descripción | Exemple de valeur |
|------|-------------|-------------------|
| `text` | Texte court sur une ligne | `"Bonjour monde"` |
| `longtext` | Texte multi-ligne | `"Ligne 1\nLigne 2"` |
| `richtext` | Texte riche HTML (éditeur WYSIWYG) | `"<p>Bonjour <strong>monde</strong></p>"` |
| `slug` | Chaîne URL-safe, auto-générée depuis un autre campo | `"bonjour-monde"` |
| `email` | Adresse email avec validation | `"usuario@exemple.com"` |
| `password` | Mot de passe haché | _(écriture uniquement)_ |
| `color` | Valeur de couleur hexadécimale | `"#3b82f6"` |

## Nombres & Booléens

| Tipo | Descripción | Exemple de valeur |
|------|-------------|-------------------|
| `number` | Nombre entier | `42` |
| `decimal` | Nombre décimal | `19.99` |
| `boolean` | Vrai ou faux | `true` |

## Date & Heure

| Tipo | Descripción | Exemple de valeur |
|------|-------------|-------------------|
| `date` | Date uniquement | `"2024-01-15"` |
| `datetime` | Date et heure (ISO 8601) | `"2024-01-15T10:30:00+00:00"` |
| `time` | Heure uniquement | `"10:30"` |

## Structure

| Tipo | Descripción | Exemple de valeur |
|------|-------------|-------------------|
| `enumeration` | Une valeur parmi une liste prédéfinie | `"borrador"` |
| `json` | Objet ou tableau JSON brut | `{"cle": "valeur"}` |

## Relations

| Tipo | Descripción | Exemple de valeur |
|------|-------------|-------------------|
| `media` | Référence à un archivo média (image, document, vidéo) | `{"uuid": "...", "url": "..."}` |
| `relation` | Référence à une entrada dans une autre colección | `{"uuid": "...", "fields": {...}}` |
