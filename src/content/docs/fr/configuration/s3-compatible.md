---
title: Services compatibles S3
description: Utiliser des services compatibles S3 comme MinIO, Cloudflare R2 ou DigitalOcean Spaces avec Jambo.
---

L'intégration S3 de Jambo fonctionne avec n'importe quel service de stockage objet compatible S3.

| Service | Notes |
|---------|-------|
| **Cloudflare R2** | Pas de frais d'egress, CDN mondial inclus |
| **DigitalOcean Spaces** | Tarification simple, CDN intégré |
| **MinIO** | Self-hosted, sur site |
| **Backblaze B2** | Coût très bas |

## Configuration

Les services compatibles S3 nécessitent une variable `AWS_ENDPOINT_URL` supplémentaire :

```ini
STORAGE_DRIVER=s3
AWS_ACCESS_KEY_ID=votre-cle
AWS_SECRET_ACCESS_KEY=votre-secret
AWS_DEFAULT_REGION=auto
AWS_BUCKET=mon-bucket
AWS_URL=https://votre-url-cdn.com
AWS_ENDPOINT_URL=https://votre-endpoint-provider.com
```

## Exemple Cloudflare R2

```ini
STORAGE_DRIVER=s3
AWS_ACCESS_KEY_ID=votre-cle-r2
AWS_SECRET_ACCESS_KEY=votre-secret-r2
AWS_DEFAULT_REGION=auto
AWS_BUCKET=jambo-media
AWS_URL=https://pub-xxxx.r2.dev
AWS_ENDPOINT_URL=https://account-id.r2.cloudflarestorage.com
```

Consultez [Configuration AWS S3](/fr/configuration/aws-s3/) pour la politique de bucket et la configuration CORS — elles s'appliquent à tous les providers compatibles S3.
