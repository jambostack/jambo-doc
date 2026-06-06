---
title: Configurer le TTL des tokens JWT
description: Définir des durées d'expiration JWT personnalisées par projet.
---

Chaque projet Jambo peut remplacer les durées d'expiration par défaut des tokens JWT. Utile quand différents projets ont des exigences de sécurité différentes.

```http
GET    /api/projects/{projectUuid}/settings/jwt-ttl
PATCH  /api/projects/{projectUuid}/settings/jwt-ttl
```

## Authentification

Nécessite soit :
- Une **session admin** valide (cookie)
- Un **token API** avec l'ability `create`

```bash
Authorization: Bearer VOTRE_TOKEN_API
```

---

## GET — Lire la configuration JWT TTL

```bash
curl https://votre-domaine.com/api/projects/{projectUuid}/settings/jwt-ttl \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

### Réponse

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

- `jwt_access_ttl` — TTL actuel du token d'accès en secondes. `null` = utiliser la valeur par défaut (900s = 15 min).
- `jwt_refresh_ttl` — TTL actuel du token de rafraîchissement. `null` = défaut (2592000s = 30 jours).
- `defaults` — Les valeurs par défaut utilisées quand le paramètre projet est `null`.

---

## PATCH — Modifier la configuration JWT TTL

```bash
curl -X PATCH https://votre-domaine.com/api/projects/{projectUuid}/settings/jwt-ttl \
  -H "Authorization: Bearer VOTRE_TOKEN_API" \
  -H "Content-Type: application/json" \
  -d '{
    "jwt_access_ttl": 300,
    "jwt_refresh_ttl": 604800
  }'
```

### Corps de la requête

| Champ | Type | Description |
|-------|------|-------------|
| `jwt_access_ttl` | `integer` ou `null` | Durée de vie du token d'accès en secondes. Minimum : `60`. Mettre `0` ou `null` pour réinitialiser au défaut (900s). |
| `jwt_refresh_ttl` | `integer` ou `null` | Durée de vie du token de rafraîchissement en secondes. Minimum : `60`. Mettre `0` ou `null` pour réinitialiser au défaut (2592000s). |

### Exemples

**Tokens d'accès de 5 minutes (haute sécurité) :**
```json
{ "jwt_access_ttl": 300 }
```

**Tokens d'accès d'1 heure (confort) :**
```json
{ "jwt_access_ttl": 3600 }
```

**15 min accès + 7 jours rafraîchissement :**
```json
{ "jwt_access_ttl": 900, "jwt_refresh_ttl": 604800 }
```

**Réinitialiser aux valeurs par défaut :**
```json
{ "jwt_access_ttl": 0, "jwt_refresh_ttl": 0 }
```

## Codes de statut

| Statut | Description |
|--------|-------------|
| `200` | Configuration lue ou modifiée avec succès |
| `403` | Accès refusé |
| `404` | Projet introuvable |
| `422` | Valeur TTL inférieure à 60 secondes |

## Fonctionnement

Lorsqu'un utilisateur s'authentifie via `POST /api/{projectId}/auth/login`, le service JWT lit les paramètres TTL du projet :

- Si `jwtAccessTtl` est défini sur l'entité projet, cette valeur est utilisée pour la revendication `exp` du token d'accès.
- Si `jwtAccessTtl` est `null`, la valeur par défaut de **900 secondes (15 minutes)** est utilisée.
- La même logique s'applique aux tokens de rafraîchissement (défaut : **2 592 000 secondes = 30 jours**).

Modifier le TTL n'affecte que les **nouveaux tokens** émis après le changement. Les tokens existants conservent leur expiration d'origine.
