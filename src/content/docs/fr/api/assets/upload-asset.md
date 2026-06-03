---
title: Uploader un asset
description: Uploader un fichier dans la médiathèque du projet.
---

```http
POST /api/{projectId}/files
```

## Requête

Envoyez une requête `multipart/form-data` avec le fichier dans le champ `file` :

```bash
curl -X POST https://votre-domaine.com/api/{projectId}/files \
  -H "Authorization: Bearer VOTRE_TOKEN_API" \
  -F "file=@/chemin/vers/image.jpg"
```

Depuis JavaScript :

```js
const form = new FormData();
form.append('file', fileInput.files[0]);

const res = await fetch(`/api/${projectId}/files`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}` },
  body: form,
});
const asset = await res.json();
```

## Réponse

Retourne l'asset uploadé avec HTTP `201 Created` :

```json
{
  "uuid": "new-asset-uuid",
  "filename": "image.jpg",
  "mime_type": "image/jpeg",
  "size": 102400,
  "url": "/uploads/media/new-asset-uuid/image.jpg"
}
```
