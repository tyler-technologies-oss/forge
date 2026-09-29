import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { readFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface VersionMigrationInput extends ToolInput {
  from?: string;
  to?: string;
}

export class VersionMigrationTool extends BaseToolHandler<VersionMigrationInput> {
  constructor() {
    super(
      'get_version_migration_guide',
      'Get comprehensive migration guides for upgrading between Tyler Forge versions, including breaking changes, API mappings, and upgrade instructions',
    );
  }

  public getTool(): Tool {
    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        type: 'object',
        properties: {
          from: {
            type: 'string',
            description: 'Source version to migrate from (default: "v2")',
            default: 'v2',
          },
          to: {
            type: 'string',
            description: 'Target version to migrate to (default: "v3")',
            default: 'v3',
          },
        },
        required: [],
      },
    };
  }

  public async execute(
    args: VersionMigrationInput,
  ): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    const { from = 'v2', to = 'v3' } = args;

    // Validate supported version combinations
    if (!this._isValidVersionCombination(from, to)) {
      throw new Error(
        `Unsupported version migration from ${from} to ${to}. Currently supported: v2 → v3`,
      );
    }

    try {
      const content = await this._loadMigrationContent(from, to);
      return this._createTextResponse(content);
    } catch (error) {
      throw new Error(
        `Failed to load migration guide for ${from} → ${to}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  private _isValidVersionCombination(from: string, to: string): boolean {
    // Currently only support v2 to v3 migration
    // Future versions can be added here
    const supportedMigrations = [{ from: 'v2', to: 'v3' }];

    return supportedMigrations.some(
      migration => migration.from === from && migration.to === to,
    );
  }

  private async _loadMigrationContent(
    from: string,
    to: string,
  ): Promise<string> {
    // Determine template directory based on target version
    const templateDir = resolve(__dirname, '../../../templates/migrations', to);

    // Load the migration content
    const migrationContentPath = resolve(templateDir, 'migrate.md');
    const migrationContent = await readFile(migrationContentPath, 'utf-8');

    return migrationContent;
  }
}
