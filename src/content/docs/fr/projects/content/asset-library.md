---
title: Médiathèque
description: Gérer les images, vidéos et documents dans la médiathèque Jambo.
---

La médiathèque stocke tous les fichiers médias d'un projet — images, vidéos, PDFs et autres documents.

## Uploader des fichiers

### Glisser-déposer

Glissez des fichiers directement sur la page de la médiathèque pour les uploader.

### Bouton Upload

Cliquez sur **+ Uploader** et sélectionnez un ou plusieurs fichiers depuis votre ordinateur.

### Depuis l'éditeur de contenu

Lors de l'édition d'un champ `media`, cliquez sur **Sélectionner / Uploader** pour ouvrir le sélecteur de médias.

### Via l'API

```bash
curl -X POST https://votre-domaine.com/api/{projectId}/files \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -F "file=@image.jpg"
```

## Types de fichiers supportés

Tout type de fichier peut être uploadé. Les images (JPEG, PNG, WebP, GIF, SVG) bénéficient de fonctionnalités supplémentaires comme la génération de miniatures et les transformations d'images.

## Transformations d'images

Jambo peut redimensionner et recadrer les images à la volée :

```
/uploads/media/uuid/image.jpg?w=800&h=600&fit=cover
```

| Paramètre | Description |
|-----------|-------------|
| `w` | Largeur en pixels |
| `h` | Hauteur en pixels |
| `fit` | `cover`, `contain` ou `fill` |
| `q` | Qualité (1–100, défaut 85) |
| `f` | Format : `webp`, `jpeg`, `png` |
