---
title: S3 Compatible Services
description: Use S3-compatible storage like MinIO, Cloudflare R2, or DigitalOcean Spaces with Jambo.
---

:::note
هذه الصفحة متاحة باللغة الإنجليزية. الترجمة العربية قيد الإعداد.
:::


Jambo's S3 integration works with any S3-compatible object storage service. Popular alternatives to AWS S3:

| Service | Notes |
|---------|-------|
| **Cloudflare R2** | No egress fees, global CDN included |
| **DigitalOcean Spaces** | Simple pricing, built-in CDN |
| **MinIO** | Self-hosted, on-premises |
| **Backblaze B2** | Very low cost |
| **Hetzner Object Storage** | European data centers |

## Configuration

S3-compatible services require an additional `AWS_ENDPOINT_URL` variable:

```ini
STORAGE_DRIVER=s3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_DEFAULT_REGION=auto
AWS_BUCKET=my-bucket
AWS_URL=https://your-cdn-url.com
AWS_ENDPOINT_URL=https://your-provider-endpoint.com
```

## Cloudflare R2 example

```ini
STORAGE_DRIVER=s3
AWS_ACCESS_KEY_ID=your-r2-access-key
AWS_SECRET_ACCESS_KEY=your-r2-secret-key
AWS_DEFAULT_REGION=auto
AWS_BUCKET=jambo-media
AWS_URL=https://pub-xxxx.r2.dev
AWS_ENDPOINT_URL=https://account-id.r2.cloudflarestorage.com
```

## DigitalOcean Spaces example

```ini
STORAGE_DRIVER=s3
AWS_ACCESS_KEY_ID=your-spaces-key
AWS_SECRET_ACCESS_KEY=your-spaces-secret
AWS_DEFAULT_REGION=nyc3
AWS_BUCKET=jambo-media
AWS_URL=https://jambo-media.nyc3.cdn.digitaloceanspaces.com
AWS_ENDPOINT_URL=https://nyc3.digitaloceanspaces.com
```

## MinIO (self-hosted) example

```ini
STORAGE_DRIVER=s3
AWS_ACCESS_KEY_ID=minioadmin
AWS_SECRET_ACCESS_KEY=minioadmin
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=jambo-media
AWS_URL=http://localhost:9000/jambo-media
AWS_ENDPOINT_URL=http://localhost:9000
```

See [AWS S3 Configuration](/configuration/aws-s3/) for the bucket policy and CORS setup — the same configuration applies to all S3-compatible providers.
