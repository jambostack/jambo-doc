---
title: Localisation
description: Configurer les locales du projet et les paramètres de contenu multilingue.
---

Allez dans **Paramètres du projet → Localisation** pour gérer les langues supportées par votre projet.

## Ajouter une locale

1. Cliquez sur **+ Ajouter une locale**
2. Entrez le code de locale (ex. `fr`, `es`, `ar`, `de`)
3. Cliquez sur **Ajouter**

## Locale par défaut

La locale par défaut est utilisée quand :
- Une entrée de contenu est créée sans spécifier de locale
- Un appel API est effectué sans paramètre `?locale=`

## Support RTL

Les locales comme l'arabe (`ar`), l'hébreu (`he`) ou le persan (`fa`) utilisent l'écriture de droite à gauche. L'éditeur richtext passe automatiquement en mode RTL quand une locale RTL est sélectionnée.

## Codes de locale

Utilisez les codes de locale standard BCP 47 :

| Langue | Code |
|--------|------|
| Français | `fr` |
| Anglais | `en` |
| Espagnol | `es` |
| Arabe | `ar` |
| Allemand | `de` |
| Portugais | `pt` |
| Chinois simplifié | `zh` |
| Japonais | `ja` |
