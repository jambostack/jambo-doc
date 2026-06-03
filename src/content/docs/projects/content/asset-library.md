---
title: Asset Library
description: Manage images, videos, and documents in the Jambo media library.
---

The asset library stores all media files for a project — images, videos, PDFs, and other documents. Access it from the project sidebar under **Media**.

## Uploading files

### Drag and drop

Drag files directly onto the asset library page to upload them.

### Upload button

Click **+ Upload** and select one or multiple files from your computer.

### From the content editor

When editing a `media` field, click **Select / Upload** to open the asset picker, which lets you upload new files or select existing ones.

### Via API

Upload programmatically:

```bash
curl -X POST https://your-domain.com/api/{projectId}/files \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@image.jpg"
```

See [Upload an Asset](/api/assets/upload-asset/) for the full API reference.

## Supported file types

Any file type can be uploaded. Images (JPEG, PNG, WebP, GIF, SVG) get additional features like thumbnail generation and image transformations.

## Image transformations

Jambo can resize and crop images on the fly by appending query parameters to the image URL:

```
/uploads/media/uuid/image.jpg?w=800&h=600&fit=cover
```

| Parameter | Description |
|-----------|-------------|
| `w` | Width in pixels |
| `h` | Height in pixels |
| `fit` | `cover`, `contain`, or `fill` |
| `q` | Quality (1–100, default 85) |
| `f` | Format: `webp`, `jpeg`, `png` |

## Storage

By default, files are stored locally in `public/uploads/`. For production, configure S3-compatible storage in [AWS S3 Configuration](/configuration/aws-s3/).

## Deleting files

Click the trash icon on any asset to delete it permanently. This removes the file from storage. Any content entries referencing the deleted asset will have an empty media field.
