---
title: Paramètres du projet
description: Configurer les paramètres généraux du projet dans Jambo.
---

Accédez aux paramètres du projet via **Paramètres → Projet** dans la barre latérale.

## Général

| Paramètre | Description |
|-----------|-------------|
| **Nom** | Nom d'affichage du projet |
| **Description** | Description optionnelle |
| **Locale par défaut** | Langue principale utilisée quand aucune locale n'est spécifiée dans les appels API |
| **Stockage** | Disque local (`public`) ou stockage compatible S3 |

## JWT Token TTL

Configurez la durée d'expiration des tokens d'authentification :

| Paramètre | Défaut | Description |
|-----------|--------|-------------|
| **Access Token TTL** | 900s (15 min) | Durée de vie des tokens d'accès en secondes. Min : 60. Laisser vide pour le défaut. |
| **Refresh Token TTL** | 2 592 000s (30 jours) | Durée de vie des tokens de rafraîchissement en secondes. Min : 60. Laisser vide pour le défaut. |

Ces paramètres s'appliquent aux tokens émis via `POST /api/{projectId}/auth/login`. Modifier le TTL n'affecte que les **nouveaux tokens**.

## SMTP Mailer

Chaque projet peut avoir sa propre configuration SMTP. Voir la section **SMTP Mailer** dans les paramètres du projet.

## Zone dangereuse

| Action | Description |
|--------|-------------|
| **Archiver le projet** | Masque le projet du tableau de bord ; l'API continue de fonctionner |
| **Supprimer le projet** | Supprime définitivement le projet, toutes les collections, entrées et fichiers médias |

:::caution
La suppression d'un projet est irréversible. Toutes les données sont supprimées définitivement.
:::
