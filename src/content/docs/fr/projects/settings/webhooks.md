---
title: Webhooks
description: Configurer des webhooks pour recevoir des notifications lors des changements de contenu dans Jambo.
---

Les webhooks envoient des requêtes HTTP POST à votre endpoint lors des événements de contenu.

## Créer un webhook

1. Cliquez sur **+ Nouveau webhook**
2. Renseignez les détails :

| Champ | Description |
|-------|-------------|
| **URL** | L'URL de votre endpoint (ex. `https://mon-site.com/api/revalider`) |
| **Événements** | Les événements qui déclenchent ce webhook |
| **Actif** | Activer/désactiver sans supprimer |

## Événements

| Événement | Déclenché quand |
|-----------|-----------------|
| `entry.created` | Une entrée de contenu est créée |
| `entry.updated` | Une entrée de contenu est mise à jour |
| `entry.deleted` | Une entrée est supprimée (soft delete) |
| `entry.published` | Le statut d'une entrée passe à `publié` |
| `entry.unpublished` | Le statut d'une entrée passe à `brouillon` |
| `media.uploaded` | Un fichier est uploadé dans la médiathèque |
| `media.deleted` | Un fichier est supprimé de la médiathèque |

## Payload

Chaque webhook envoie un payload JSON :

```json
{
  "event": "entry.updated",
  "project": "f99cb038-...",
  "collection": "articles",
  "entry": {
    "uuid": "550e8400-...",
    "status": "published",
    "locale": "fr"
  },
  "timestamp": "2024-01-15T12:00:00+00:00"
}
```

## Prérequis

Les webhooks sont traités de manière asynchrone via la queue Symfony Messenger. Assurez-vous qu'un worker tourne — voir [Configuration des webhooks](/fr/deployment/webhook-setup/).
