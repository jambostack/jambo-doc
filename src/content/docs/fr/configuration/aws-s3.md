---
title: Configuration AWS S3
description: Stocker les fichiers médias Jambo sur Amazon S3.
---

Par défaut, Jambo stocke les fichiers uploadés localement dans `public/uploads/`. Pour la production, configurez **Amazon S3**.

## Configuration

Ajoutez ceci dans votre `.env` :

```ini
STORAGE_DRIVER=s3
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_DEFAULT_REGION=eu-west-3
AWS_BUCKET=mon-jambo-media
AWS_URL=https://mon-jambo-media.s3.eu-west-3.amazonaws.com
```

## Politique de bucket

Pour rendre les fichiers uploadés publiquement lisibles :

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::mon-jambo-media/*"
  }]
}
```

## Migrer les fichiers existants

```bash
aws s3 sync public/uploads/ s3://mon-jambo-media/ --acl public-read
```
