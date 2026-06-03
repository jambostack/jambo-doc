---
title: Configuration des webhooks (Queues)
description: Configurer les workers en arrière-plan pour traiter les webhooks et tâches asynchrones.
---

Jambo utilise **Symfony Messenger** pour traiter les webhooks et autres tâches asynchrones en arrière-plan. Sans un worker en cours d'exécution, ces tâches s'accumulent dans la queue sans jamais être traitées.

## Configurer le transport

Dans `.env` :

```ini
# Recommandé pour la production : transport doctrine (fiable)
MESSENGER_TRANSPORT_DSN=doctrine://default?auto_setup=0

# Redis (plus rapide, nécessite un serveur Redis)
MESSENGER_TRANSPORT_DSN=redis://localhost:6379/messages
```

Pour le transport `doctrine`, créez la table de queue :

```bash
php bin/console messenger:setup-transports
```

## Lancer le worker

```bash
php bin/console messenger:consume async --time-limit=3600
```

## Production : Supervisor

```ini
[program:jambo-worker]
command=php /var/www/jambo-api/bin/console messenger:consume async --time-limit=3600
user=www-data
numprocs=2
autostart=true
autorestart=true
```

```bash
supervisorctl reread && supervisorctl update && supervisorctl start jambo-worker:*
```

## Vérifier la signature des webhooks

Chaque requête webhook inclut un header `X-Jambo-Signature` :

```php
$signature = 'sha256=' . hash_hmac('sha256', $rawBody, $secret);
if (!hash_equals($signature, $request->headers->get('X-Jambo-Signature'))) {
    // Signature invalide — rejeter la requête
}
```
