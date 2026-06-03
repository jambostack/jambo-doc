---
title: Créer une entrada
description: Créer une nouvelle entrada de contenu dans une colección.
---

Crée une nouvelle entrada de contenu dans une colección.

```http
POST /api/{projectId}/{colecciónSlug}
```

## Cuerpo de la solicitud

```json
{
  "status": "published",
  "idioma": "fr",
  "fields": {
    "titre": "Mon nouvel article",
    "slug": "mon-nouvel-article",
    "corps": "<p>Contenu ici...</p>"
  }
}
```

| Campo | Tipo | Defecto | Descripción |
|-------|------|--------|-------------|
| `status` | string | `draft` | `draft` ou `published` |
| `idioma` | string | défaut du proyecto | Idioma de l'entrada |
| `fields` | object | `{}` | Valeurs des campos par slug |

## Solicitud

```bash
curl -X POST https://votre-domaine.com/api/{projectId}/articles \
  -H "Authorization: Bearer VOTRE_TOKEN_API" \
  -H "Content-Type: application/json" \
  -d '{"status":"published","idioma":"fr","fields":{"titre":"Mon article"}}'
```

## Respuesta

Retourne l'entrada creadoe avec HTTP `201 Created`.

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `201` | Creado avec éxito |
| `403` | Permisos insuficientes |
| `404` | Colección no encontrado |
| `409` | La colección singleton a déjà une entrada |
| `422` | Idioma ou valeurs de campos invalides |
