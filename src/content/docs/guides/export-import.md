---
title: Export / Import
description: Export and import Jambo CMS projects — structure, content, media, settings, and end users.
---

Jambo CMS provides a full project export and import system, allowing you to move entire projects between environments, back up configurations, or share project templates.

The system is implemented in `src/Service/ExportImport/` and supports five sections:

| Section | Data Included |
|---|---|
| Structure | Collections, fields, field groups, taxonomies |
| Content | All content entries across all collections |
| Media | Uploaded files and media library metadata |
| Settings | Project configuration, workflows, roles |
| End Users | End-user accounts and their metadata |

## Export

### Via Admin Interface

Navigate to Project Settings > Export/Import. Select which sections to include and click Export. The system generates a ZIP archive containing:

```text
export.zip
  manifest.json         # Version, exported_at, project info, included sections
  structure.json        # Collection and field definitions
  content.json          # All content entries
  media/                # Uploaded files
  media.json            # Media metadata
  settings.json         # Project settings and workflow config
  end_users.json        # End-user accounts
```

### Using the Console

```bash
php bin/console app:project:export <project-uuid> --sections=structure,content,media
```

Options:

| Option | Description |
|---|---|
| `--sections` | Comma-separated: `structure`, `content`, `media`, `settings`, `end_users` |
| `--output` | Output path for the ZIP file |

### Export Architecture

The `ProjectExporter` class orchestrates the export:

1. Creates a temporary working directory
2. Iterates over enabled export handlers (each implements `ExportHandlerInterface`)
3. Each handler writes its section data (JSON or files) into the temp directory
4. Generates a `manifest.json` with version, export timestamp, and included sections
5. Creates a ZIP archive from the temp directory
6. Cleans up the temp directory

Export handlers available:

- `Export\StructureExportHandler` — Collections and field definitions
- `Export\ContentExportHandler` — All content entries
- `Export\MediaExportHandler` — Media files and metadata
- `Export\SettingsExportHandler` — Project configuration
- `Export\EndUserExportHandler` — End-user accounts

For programmatic export:

```php
use App\Service\ExportImport\ProjectExporter;
use App\Service\ExportImport\ExportOptions;

$options = new ExportOptions(
    includeStructure: true,
    includeContent: true,
    includeMedia: true,
    includeSettings: false,
    includeEndUsers: false,
);

$zipPath = $projectExporter->export($project, $options);
// Returns BinaryFileResponse for download
$response = $projectExporter->streamExport($project, $options);
```

## Import

### Import Via Admin

Navigate to Project Settings > Export/Import. Upload a previously exported ZIP file. The system:

1. Extracts the ZIP to a temporary directory
2. Validates the `manifest.json`
3. Previews conflicts (entries, media, or users that already exist)
4. Imports data in dependency order

### Conflict Resolution

Before importing, the system runs a conflict preview across all included sections. Each handler implements `ConflictResolverInterface` and returns `ConflictItem[]` with the conflict type and details.

Conflicts are resolved automatically where possible (UUID matching). The import options control the behavior:

```php
use App\Service\ExportImport\ImportOptions;

$options = new ImportOptions(
    overwriteExisting: true,
    skipOnConflict: false,
);

$projectImporter->import($project, $extractedDir, $options, $conflictResolver);
```

### Import Order

The import runs in a specific order to handle cross-references:

1. **Structure** — Creates collections and fields first (other imports depend on these)
2. **Media** — Imports files and creates media records
3. **Content** — Creates content entries (may reference media and structure)
4. **End Users** — Creates end-user accounts
5. **Settings** — Applies configuration (runs last to avoid conflicts)

A UUID map is passed between handlers so that cross-references (e.g., a content entry referencing a media file) are correctly mapped to the new UUIDs.

### Import Handlers

- `Import\StructureImportHandler` — Creates collections and fields
- `Import\ContentImportHandler` — Creates content entries
- `Import\MediaImportHandler` — Imports media files
- `Import\SettingsImportHandler` — Applies settings
- `Import\EndUserImportHandler` — Creates end users

## Manifest Format

The `manifest.json` inside the export ZIP follows this structure:

```json
{
  "version": "1.0",
  "exported_at": "2026-06-21T10:00:00+00:00",
  "project": {
    "name": "My Project",
    "uuid": "550e8400-e29b-41d4-a716-446655440000"
  },
  "sections": ["structure", "content", "media", "settings", "end_users"]
}
```

## Use Cases

- **Environment sync**: Export from production, import to staging for testing
- **Project templating**: Export a project structure (without content) as a reusable template
- **Backup**: Regular exports of content and media for offsite backup
- **Migration**: Move a project between Jambo CMS instances
