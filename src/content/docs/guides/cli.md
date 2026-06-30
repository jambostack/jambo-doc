---
title: CLI (Command Line)
description: Complete reference of all Jambo CLI commands available via `php bin/console`.
---

Jambo ships with a comprehensive CLI to manage your CMS directly from the terminal. All commands are under the `jambo:` namespace.

> Run commands from the project root: `cd /var/www/jambo && php bin/console <command>`

## Quick Reference

| Category | Commands |
|----------|----------|
| Projects | `list`, `create` |
| Collections | `list`, `create` |
| Fields | `list`, `create` |
| Content | `list`, `show`, `count`, `delete`, `purge` |
| Import / Export | `import:csv`, `export:csv` |
| End Users (frontend) | `list`, `create`, `status`, `delete` |
| API Tokens | `list`, `create`, `revoke` |
| System | `info`, `deploy`, `sync-schema` |

---

## Projects

### `jambo:project:list`

Lists all projects with their UUID, name, locale and public API status.

```bash
php bin/console jambo:project:list
```

**Output:**
```
 UUID                                   Nom                    Locale   API Publique
 -------------------------------------- ---------------------- -------- --------------
 a8ba18b8-3002-4c53-93ea-2e0c76ded4ba   My Project             en       Oui
```

### `jambo:project:create`

Creates a new project.

```bash
php bin/console jambo:project:create "My New Project" \
  --description="My description" \
  --locale=fr
```

**Options:**
| Option | Alias | Default | Description |
|--------|-------|---------|-------------|
| `--description` | `-d` | `""` | Project description |
| `--locale` | `-l` | `"en"` | Default locale |

---

## Collections

### `jambo:collection:list`

Lists all collections in a project. Accepts a full UUID or the first 6+ characters.

```bash
php bin/console jambo:collection:list a8ba18
```

### `jambo:collection:create`

Creates a new collection in a project.

```bash
php bin/console jambo:collection:create a8ba18 "Articles" \
  --slug=articles \
  --singleton
```

**Options:**
| Option | Alias | Description |
|--------|-------|-------------|
| `--slug` | `-s` | Slug (auto-generated if omitted) |
| `--singleton` | | Single-record collection |

---

## Fields

### `jambo:field:list`

```bash
php bin/console jambo:field:list a8ba18 articles
```

### `jambo:field:create`

```bash
php bin/console jambo:field:create a8ba18 articles "Title" \
  --type=text \
  --required
```

**Field types:** `text`, `number`, `boolean`, `media`, `relation`, `textarea`, `email`, `url`, `color`, `date`, `json`

---

## Content

### `jambo:content:list`

```bash
php bin/console jambo:content:list a8ba18 articles --limit=10 --status=draft
```

### `jambo:content:show`

Displays all field values of an entry.

```bash
php bin/console jambo:content:show a8ba18 articles <entry-uuid>
```

### `jambo:content:count`

Counts entries per collection for a project.

```bash
php bin/console jambo:content:count a8ba18
```

### `jambo:content:delete`

Soft-deletes an entry (marks as deleted, keeps in database).

```bash
php bin/console jambo:content:delete <entry-uuid>
```

### `jambo:content:purge`

Removes ALL entries from a collection. Supports partial UUID (6+ chars) to identify the project.

```bash
php bin/console jambo:content:purge a8ba18 articles --force
```

**Options:**
| Option | Alias | Description |
|--------|-------|-------------|
| `--force` | `-f` | Skip confirmation prompt |
| `--hard` | | Physical DELETE instead of soft delete (removes field values too) |

---

## Import / Export

### `jambo:import:csv`

Imports a CSV file into a collection.

```bash
php bin/console jambo:import:csv a8ba18 articles ./data.csv \
  --locale=en \
  --status=draft \
  --delimiter=";"
```

The CSV headers are used as field slugs. A slug is auto-generated from each header name and matched against the collection schema.

### `jambo:export:csv`

Exports a collection to a CSV file.

```bash
php bin/console jambo:export:csv a8ba18 articles ./export.csv
```

The export includes UUID, slug, status, locale and all field values.

---

## End Users (Frontend Users)

### `jambo:enduser:list`

```bash
php bin/console jambo:enduser:list a8ba18 --limit=50
```

### `jambo:enduser:create`

```bash
php bin/console jambo:enduser:create a8ba18 user@example.com "s3cur3P@ss" \
  --name="John Doe"
```

### `jambo:enduser:status`

Activate or deactivate an end user.

```bash
php bin/console jambo:enduser:status <uuid> 1   # activate
php bin/console jambo:enduser:status <uuid> 0   # deactivate
```

### `jambo:enduser:delete`

Permanently deletes an end user.

```bash
php bin/console jambo:enduser:delete <uuid>
```

---

## API Tokens

### `jambo:token:list`

```bash
php bin/console jambo:token:list
```

### `jambo:token:create`

Creates a new API token. The plain token is shown **only once** — store it safely!

```bash
php bin/console jambo:token:create a8ba18 \
  --name="CI/CD Pipeline" \
  --abilities="read,create"
```

**Abilities:** `read`, `create`, `write`, `delete` (comma-separated)

### `jambo:token:revoke`

```bash
php bin/console jambo:token:revoke 3
```

---

## System

### `jambo:info`

Displays system information: PHP version, environment, project/content/end-user counts.

```bash
php bin/console jambo:info
```

**Output:**
```
 Métrique              Valeur
 --------------------- --------
 PHP                   8.5.4
 Environnement         dev
 Projets               3
 Collections           5
 Entrées de contenu    1300
 Utilisateurs admin    1
 EndUsers (frontend)   0
```

### `jambo:deploy`

Exports a project as a deployable ZIP.

```bash
php bin/console jambo:deploy a8ba18 --with-content --with-media
```

### `jambo:sync-schema`

Synchronises the schema between two projects.

```bash
php bin/console jambo:sync-schema <source-uuid> <target-uuid>
```

---

## Tips

- **Partial UUIDs:** Project UUIDs can be shortened to the first 6+ characters: `a8ba18` instead of `a8ba18b8-3002-4c53-93ea-2e0c76ded4ba`
- **Help:** Add `--help` to any command for full details: `php bin/console jambo:import:csv --help`
- **Aliases:** All `jambo:` commands are also available under shorter aliases where applicable
