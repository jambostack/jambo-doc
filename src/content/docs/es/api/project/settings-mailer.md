---
title: Configurar el SMTP Mailer del proyecto
description: Leer, modificar y probar la configuración SMTP para un proyecto específico.
---

Cada proyecto Jambo puede tener su propio servidor SMTP. El mailer se usa para enviar correos (formularios de contacto, restablecimiento de contraseña, etc.). La contraseña se cifra del lado del servidor con XSalsa20-Poly1305.

```http
GET    /api/projects/{projectUuid}/settings/mailer
PUT    /api/projects/{projectUuid}/settings/mailer
POST   /api/projects/{projectUuid}/settings/mailer/test
```

## Autenticación

Requiere:
- Una **sesión de administrador** válida (cookie, para la UI de administración)
- Un **token API** con la habilidad `create`

```bash
Authorization: Bearer TU_TOKEN_API
```

---

## GET — Leer la configuración SMTP

```bash
curl https://tu-dominio.com/api/projects/{projectUuid}/settings/mailer \
  -H "Authorization: Bearer TU_TOKEN_API"
```

### Respuesta (configurado)

```json
{
  "data": {
    "host": "smtp.resend.com",
    "port": 587,
    "username": "resend",
    "encryption": "tls",
    "from_email": "noreply@ejemplo.com",
    "from_name": "Mi Proyecto",
    "enabled": true
  }
}
```

### Respuesta (no configurado)

```json
{ "data": null }
```

---

## PUT — Crear o modificar la configuración SMTP

```bash
curl -X PUT https://tu-dominio.com/api/projects/{projectUuid}/settings/mailer \
  -H "Authorization: Bearer TU_TOKEN_API" \
  -H "Content-Type: application/json" \
  -d '{
    "host": "smtp.gmail.com",
    "port": 587,
    "username": "apikey",
    "password": "tu-contraseña-app",
    "encryption": "tls",
    "from_email": "noreply@ejemplo.com",
    "from_name": "Mi Proyecto",
    "enabled": true
  }'
```

### Cuerpo de la solicitud

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `host` | `string` | No | Host SMTP (validado: sin IPs privadas) |
| `port` | `integer` | No | Puerto SMTP. Permitidos: `25`, `465`, `587`, `2525` |
| `username` | `string` | No | Nombre de usuario SMTP |
| `password` | `string` | No | Contraseña SMTP (cifrada en reposo) |
| `encryption` | `string` | No | `tls`, `ssl`, o `none` |
| `from_email` | `string` | No | Email del remitente |
| `from_name` | `string` | No | Nombre del remitente |
| `enabled` | `boolean` | No | Activar o desactivar el mailer |

---

## POST — Enviar email de prueba

```bash
curl -X POST https://tu-dominio.com/api/projects/{projectUuid}/settings/mailer/test \
  -H "Authorization: Bearer TU_TOKEN_API"
```

### Respuesta (éxito)

```json
{ "sent": true }
```

### Respuesta (fallo)

```json
{ "error": "Error al enviar. Verifique su configuración SMTP." }
```

## Códigos de estado

| Estado | Descripción |
|--------|-------------|
| `200` | Configuración leída o modificada exitosamente |
| `400` | Host inválido (IP privada) o puerto inválido |
| `403` | Acceso denegado |
| `404` | Proyecto no encontrado |
| `422` | Mailer no configurado o desactivado |

## Envío programático

```php
use App\Service\ProjectMailerService;
use App\Message\Attachment;

$mailerService->send(
    project: $project,
    to: 'cliente@ejemplo.com',
    subject: '¡Bienvenido!',
    body: 'Texto plano de respaldo',
    htmlBody: '<h1>¡Bienvenido!</h1><p>Gracias por registrarte.</p>',
    replyTo: 'soporte@ejemplo.com',
    cc: ['gerente@ejemplo.com'],
    bcc: ['archivo@ejemplo.com'],
    attachments: [
        new Attachment(
            content: file_get_contents('/ruta/informe.pdf'),
            filename: 'informe_mensual.pdf',
            mimeType: 'application/pdf',
        ),
    ],
);
```

Los correos se envían de forma **asíncrona** vía Symfony Messenger y se registran en la tabla `email_log`.
