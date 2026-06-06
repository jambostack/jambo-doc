---
title: تكوين مدة صلاحية رموز JWT
description: تعيين أوقات انتهاء صلاحية مخصصة لرموز JWT لكل مشروع.
---

يمكن لكل مشروع Jambo تجاوز أوقات انتهاء الصلاحية الافتراضية لرموز JWT.

```http
GET    /api/projects/{projectUuid}/settings/jwt-ttl
PATCH  /api/projects/{projectUuid}/settings/jwt-ttl
```

## المصادقة

يتطلب إما:
- **جلسة مسؤول** صالحة
- **رمز API** مع صلاحية `create`

```bash
Authorization: Bearer TOKEN_API
```

---

## GET — قراءة تكوين JWT TTL

```bash
curl https://your-domain.com/api/projects/{projectUuid}/settings/jwt-ttl \
  -H "Authorization: Bearer TOKEN_API"
```

### الاستجابة

```json
{
  "jwt_access_ttl": 900,
  "jwt_refresh_ttl": null,
  "defaults": {
    "access_ttl": 900,
    "refresh_ttl": 2592000
  }
}
```

---

## PATCH — تعديل تكوين JWT TTL

```bash
curl -X PATCH https://your-domain.com/api/projects/{projectUuid}/settings/jwt-ttl \
  -H "Authorization: Bearer TOKEN_API" \
  -H "Content-Type: application/json" \
  -d '{ "jwt_access_ttl": 300, "jwt_refresh_ttl": 604800 }'
```

| الحقل | النوع | الوصف |
|-------|------|-------------|
| `jwt_access_ttl` | `integer` أو `null` | بالثواني. الحد الأدنى: `60`. `0`/`null` = استعادة الافتراضي (900s) |
| `jwt_refresh_ttl` | `integer` أو `null` | بالثواني. الحد الأدنى: `60`. `0`/`null` = استعادة الافتراضي (2592000s) |

### أمثلة

**5 دقائق (أمان عالي):** `{ "jwt_access_ttl": 300 }`
**ساعة واحدة:** `{ "jwt_access_ttl": 3600 }`
**استعادة الافتراضيات:** `{ "jwt_access_ttl": 0, "jwt_refresh_ttl": 0 }`

## رموز الحالة

| الحالة | الوصف |
|--------|-------------|
| `200` | نجاح |
| `403` | تم رفض الوصول |
| `404` | المشروع غير موجود |
| `422` | TTL أقل من 60 ثانية |
