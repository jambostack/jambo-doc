---
title: Webhooks
description: Configurer des webhooks pour recevoir des notifications lors des changements de contenu dans Jambo.
---

Les webhooks envoient des requêtes HTTP POST à votre endpoint lors des événements de contenu.

## Crear un webhook

1. Cliquez sur **+ Nouveau webhook**
2. Renseignez les détails :

| Campo | Descripción |
|-------|-------------|
| **URL** | L'URL de votre endpoint (ex. `https://mon-site.com/api/revalider`) |
| **Événements** | Les événements qui déclenchent ce webhook |
| **Actif** | Activer/désactiver sans supprimer |

## Événements

| Événement | Déclenché quand |
|-----------|-----------------|
| `entry.created` | Une entrada de contenu est creadoe |
| `entry.updated` | Une entrada de contenu est mise à jour |
| `entry.deleted` | Une entrada est eliminadoe (soft delete) |
| `entry.published` | Le statut d'une entrada passe à `publicado` |
| `entry.unpublished` | Le statut d'une entrada passe à `borrador` |
| `media.uploaded` | Un archivo est uploadé dans la biblioteca de medios |
| `media.deleted` | Un archivo est eliminado de la biblioteca de medios |

## Payload

Chaque webhook envoie un payload JSON :

```json
{
  "event": "entry.updated",
  "project": "f99cb038-...",
  "colección": "articles",
  "entry": {
    "uuid": "550e8400-...",
    "status": "published",
    "idioma": "fr"
  },
  "timestamp": "2024-01-15T12:00:00+00:00"
}
```

## Requisitos previos

Les webhooks sont traités de manière asynchrone via la queue Symfony Messenger. Assurez-vous qu'un worker tourne — voir [Configuration des webhooks](/es/deployment/webhook-setup/).
