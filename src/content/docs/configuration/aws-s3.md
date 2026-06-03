---
title: AWS S3 Configuration
description: Store Jambo media files on Amazon S3.
---

By default, Jambo stores uploaded files locally in `public/uploads/`. For production environments, configure **Amazon S3** to store files on a reliable, scalable object storage service.

## Prerequisites

- An AWS account
- An S3 bucket
- An IAM user with `s3:GetObject`, `s3:PutObject`, `s3:DeleteObject` permissions on the bucket

## Configuration

Add the following to your `.env`:

```ini
# S3 storage
STORAGE_DRIVER=s3
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=my-jambo-media
AWS_URL=https://my-jambo-media.s3.us-east-1.amazonaws.com
```

| Variable | Description |
|----------|-------------|
| `STORAGE_DRIVER` | Set to `s3` to enable S3 storage |
| `AWS_ACCESS_KEY_ID` | IAM access key ID |
| `AWS_SECRET_ACCESS_KEY` | IAM secret key |
| `AWS_DEFAULT_REGION` | AWS region of your bucket |
| `AWS_BUCKET` | S3 bucket name |
| `AWS_URL` | Public base URL for file access |

## Bucket policy

Make uploaded files publicly readable (for public-facing media):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-jambo-media/*"
    }
  ]
}
```

## CORS configuration

If your frontend loads files directly from S3, add a CORS rule:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET"],
    "AllowedOrigins": ["https://your-frontend.com"],
    "MaxAgeSeconds": 3000
  }
]
```

## Migrating existing files

To migrate files from local storage to S3:

```bash
aws s3 sync public/uploads/ s3://my-jambo-media/ --acl public-read
```

After migrating, update your `.env` and restart the application.
