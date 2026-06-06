---
title: Configurer le SMTP Mailer du projet
description: Lire, modifier et tester la configuration SMTP pour un projet spécifique.
---

Chaque projet Jambo peut avoir son propre serveur SMTP. Le mailer est utilisé pour envoyer des emails (formulaires de contact, réinitialisation de mot de passe, etc.). Le mot de passe est chiffré côté serveur avec XSalsa20-Poly1305.

```http
GET    /api/projects/{projectUuid}/settings/mailer
PUT    /api/projects/{projectUuid}/settings/mailer
POST   /api/projects/{projectUuid}/settings/mailer/test
```

## Authentification

Nécessite soit :
- Une **session admin** valide (cookie, pour l'interface d'administration)
- Un **token API** avec l'ability `create`

```bash
Authorization: Bearer VOTRE_TOKEN_API
```

---

## GET — Lire la configuration SMTP

```bash
curl https://votre-domaine.com/api/projects/{projectUuid}/settings/mailer \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

### Réponse (configuré)

```json
{
  "data": {
    "host": "smtp.resend.com",
    "port": 587,
    "username": "resend",
    "encryption": "tls",
    "from_email": "noreply@exemple.com",
    "from_name": "Mon Projet",
    "enabled": true
  }
}
```

### Réponse (non configuré)

```json
{
  "data": null
}
```

---

## PUT — Créer ou modifier la configuration SMTP

```bash
curl -X PUT https://votre-domaine.com/api/projects/{projectUuid}/settings/mailer \
  -H "Authorization: Bearer VOTRE_TOKEN_API" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "smtp.gmail.com",
    "port": 587,
    "username": "apikey",
    "password": "votre-mot-de-passe-app",
    "encryption": "tls",
    "from_email": "noreply@exemple.com",
    "from_name": "Mon Projet",
    "enabled": true
  }'
```

### Corps de la requête

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| `host` | `string` | Non | Hôte SMTP (validé : pas d'IPs privées) |
| `port` | `integer` | Non | Port SMTP. Autorisés : `25`, `465`, `587`, `2525` |
| `username` | `string` | Non | Nom d'utilisateur SMTP |
| `password` | `string` | Non | Mot de passe SMTP (chiffré au repos, mis à jour si fourni) |
| `encryption` | `string` | Non | `tls`, `ssl`, ou `none` |
| `from_email` | `string` | Non | Adresse email expéditeur (email valide requis) |
| `from_name` | `string` | Non | Nom affiché de l'expéditeur |
| `enabled` | `boolean` | Non | Activer ou désactiver le mailer |

### Réponse

```json
{
  "data": {
    "host": "smtp.gmail.com",
    "port": 587,
    "username": "apikey",
    "encryption": "tls",
    "from_email": "noreply@exemple.com",
    "from_name": "Mon Projet",
    "enabled": true
  }
}
```

---

## POST — Envoyer un email de test

Envoie un email de test à l'adresse `from_email` configurée.

```bash
curl -X POST https://votre-domaine.com/api/projects/{projectUuid}/settings/mailer/test \
  -H "Authorization: Bearer VOTRE_TOKEN_API"
```

### Réponse (succès)

```json
{ "sent": true }
```

### Réponse (échec)

```json
{ "error": "Échec de l'envoi. Vérifiez votre configuration SMTP." }
```

## Codes de statut

| Statut | Description |
|--------|-------------|
| `200` | Configuration lue ou modifiée avec succès |
| `400` | Hôte invalide (IP privée) ou port invalide |
| `403` | Accès refusé |
| `404` | Projet introuvable |
| `422` | Mailer non configuré ou désactivé |

## Envoi d'emails (programmatique)

Pour envoyer des emails depuis votre application, utilisez le `ProjectMailerService` :

```php
use App\Service\ProjectMailerService;
use App\Message\Attachment;

$mailerService->send(
    project: $project,
    to: 'client@exemple.com',
    subject: 'Bienvenue !',
    body: 'Texte brut de fallback',
    htmlBody: '<h1>Bienvenue !</h1><p>Merci de votre inscription.</p>',
    replyTo: 'support@exemple.com',
    cc: ['manager@exemple.com'],
    bcc: ['archive@exemple.com'],
    attachments: [
        new Attachment(
            content: file_get_contents('/chemin/rapport.pdf'),
            filename: 'rapport_mensuel.pdf',
            mimeType: 'application/pdf',
        ),
    ],
);
```

Les emails sont envoyés de manière **asynchrone** via Symfony Messenger et journalisés dans la table `email_log`.
