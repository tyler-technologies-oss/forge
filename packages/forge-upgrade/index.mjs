#!/usr/bin/env node

import { replaceInFile } from 'replace-in-file';
import ora from 'ora';
import path from 'canonical-path';
import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import { glob } from 'glob';
import { fileURLToPath } from 'url';
import { executeHtmlMigrations, executeJscodeshiftMigrations, executeJsonMigrations } from './migration-utils.mjs';
import { logInfo, logError, logSuccess, logWarn, logBreak } from './log.mjs';

const filename = fileURLToPath(import.meta.url);
const packageRoot = path.join(path.dirname(fs.realpathSync(filename)));
const argv = yargs(hideBin(process.argv)).argv;
const DEFAULT_UPGRADE_CONFIGURATION = 'forge-3.0';

if (argv.usage || argv.help) {
  console.log(`
  Usage: forge-upgrade [options]

  Options:
    --path                 Specify the root path for the upgrade (default: current directory)
    --dry-run              Perform a dry run without modifying any files
    --no-replace           Disables replace operations.
    --no-migrate           Disables code migrations.
    --ignore               Comma-separated list of globs to ignore during the upgrade
    --configuration        Specify the upgrade configuration (default: ${DEFAULT_UPGRADE_CONFIGURATION})
    --verbose              Enable verbose logging
  `);
  process.exit(0);
}

const CONFIGURATION_MIGRATION_MAP = {
  'forge-3.0': {
    html: [
      { name: 'Forge Typography Class', path: './migrations/html/v3/posthtml-forge-typography.mjs' },
      { name: 'Forge Card', path: './migrations/html/v3/posthtml-forge-card.mjs' },
      { name: 'Forge Density', path: './migrations/html/v3/posthtml-forge-density.mjs' },
      { name: 'Forge Buttons', path: './migrations/html/v3/posthtml-forge-button.mjs' },
      { name: 'Forge Checkboxes, Radios, Switches', path: './migrations/html/v3/posthtml-forge-checkbox-radio-switch.mjs' },
      { name: 'Forge Lists and List Items', path: './migrations/html/v3/posthtml-forge-list.mjs' },
      { name: 'Forge Tabs', path: './migrations/html/v3/posthtml-forge-tabs.mjs' },
      { name: 'Forge Tooltip', path: './migrations/html/v3/posthtml-forge-tooltip.mjs' },
      { name: 'Forge Label Value', path: './migrations/html/v3/posthtml-forge-label-value.mjs' },
      { name: 'Forge Badge', path: './migrations/html/v3/posthtml-forge-badge.mjs' },
      { name: 'Forge Field', path: './migrations/html/v3/posthtml-forge-field.mjs' },
      { name: 'Forge Button Toggle', path: './migrations/html/v3/posthtml-forge-button-toggle.mjs' }
    ],
    jsx: [
      { name: 'Forge Card', path: './migrations/jsx/v3/jscodeshift-forge-card.cjs' },
      { name: 'Forge Density', path: './migrations/jsx/v3/jscodeshift-forge-density.cjs' },
      { name: 'Forge Buttons', path: './migrations/jsx/v3/jscodeshift-forge-button.cjs' },
      { name: 'Forge Checkboxes, Radios, Switches', path: './migrations/jsx/v3/jscodeshift-forge-checkbox-radio-switch.cjs' },
      { name: 'Forge Lists and List Items', path: './migrations/jsx/v3/jscodeshift-forge-list.cjs' },
      { name: 'Forge Tabs', path: './migrations/jsx/v3/jscodeshift-forge-tabs.cjs' },
      { name: 'Forge Tooltip', path: './migrations/jsx/v3/jscodeshift-forge-tooltip.cjs' },
      { name: 'Forge Label Value', path: './migrations/jsx/v3/jscodeshift-forge-label-value.cjs' },
      { name: 'Forge Badge', path: './migrations/jsx/v3/jscodeshift-forge-badge.cjs' },
      { name: 'Forge Field', path: './migrations/jsx/v3/jscodeshift-forge-field.cjs' },
      { name: 'Forge Button Toggle', path: './migrations/jsx/v3/jscodeshift-forge-button-toggle.cjs' }
    ],
    js: [{ name: 'Dialog Options', path: './migrations/js/v3/jscodeshift-dialog-options.cjs' }]
  },
  'forge-extended-migration': {
    json: [{ name: 'Package Dependencies', path: './migrations/json/forge-extended/package-json-rewrite.cjs' }],
    jsx: [
      { name: 'Forge Extended Imports', path: './migrations/js/forge-extended/jscodeshift-forge-extended-imports.cjs' },
      { name: 'Forge Extended Angular Imports', path: './migrations/js/forge-extended/jscodeshift-forge-extended-angular-imports.cjs' },
      { name: 'Forge Extended React Imports', path: './migrations/js/forge-extended/jscodeshift-forge-extended-react-imports.cjs' }
    ],
    js: [
      { name: 'Forge Extended Imports', path: './migrations/js/forge-extended/jscodeshift-forge-extended-imports.cjs' },
      { name: 'Forge Extended Angular Imports', path: './migrations/js/forge-extended/jscodeshift-forge-extended-angular-imports.cjs' },
      { name: 'Forge Extended React Imports', path: './migrations/js/forge-extended/jscodeshift-forge-extended-react-imports.cjs' }
    ]
  }
};

const NODE_MODULES_GLOB = '**/node_modules/**';

try {
  const dryRun = argv.dryRun ?? false;
  const replace = argv.replace ?? true;
  const migrate = argv.migrate ?? true;
  const verbose = argv.verbose ?? false;
  const ignoreGlobs = argv.ignore
    ? argv.ignore
        .split(',')
        .map(p => p.trim())
        .filter(p => !!p)
    : [];
  const configuration = argv.configuration ?? DEFAULT_UPGRADE_CONFIGURATION;
  const filePath = path.join(packageRoot, 'configurations', `${configuration}.json`);
  const file = fs.readFileSync(filePath, 'utf-8');
  const { name, operations = [] } = JSON.parse(file);
  const rootPath = argv.path ?? '.';
  const changedFiles = new Set();

  if (!name) {
    throw new Error(`Invalid upgrade configuration specified: "${configuration}"`);
  }

  if (!rootPath) {
    throw new Error('A valid `--path` argument must be provided.');
  }

  if (dryRun) {
    logWarn('This is a dry run. No files will be modified.\n');
  }

  logInfo(`Using path: "${path.resolve(rootPath)}"`);
  logInfo(`Using upgrade configuration: "${name}" (${configuration})`);

  // Replace operations
  if (replace && operations.length) {
    logInfo(`Found ${operations.length} replace operation(s)\n`);

    const initial = await prompt('Is this the first time running this upgrade for this project? (y/n) ', 'boolean');
    logBreak();

    if (!initial) {
      logInfo(`Skipping all one-time upgrade operations.\n`);
    } else {
      logInfo(`Performing all upgrade operations, including one-time operations.\n`);
    }

    const spinner = ora(`Performing upgrade operation (this may take a while)...\n\n`);
    try {
      spinner.start();

      for (const { files, patterns, once } of operations) {
        const sources = path.join(rootPath, files);
        const from = patterns.map(p => new RegExp(p.from, 'g'));

        if (once && !initial) {
          continue;
        }

        const to = patterns.map(p => p.to);
        const modifiedFiles = await executeReplaceOperation({ files: sources, from, to, dry: dryRun, ignore: ignoreGlobs });
        modifiedFiles.forEach(file => changedFiles.add(file));
      }

      spinner.succeed();
    } catch (e) {
      spinner.fail();
      logBreak();
      logError(e.stack);
    }
  }

  // Migrations
  if (migrate && CONFIGURATION_MIGRATION_MAP[configuration]) {
    // HTML
    const htmlMigrations = CONFIGURATION_MIGRATION_MAP[configuration].html;
    if (htmlMigrations?.length) {
      const globPath = path.join(rootPath, '**/*.{html, html.erb}');
      const htmlFiles = await glob(globPath, { ignore: [NODE_MODULES_GLOB, ...ignoreGlobs] });
      if (htmlFiles.length) {
        logInfo(`Found ${htmlMigrations.length} HTML migration(s)\n`);

        const modifiedHtmlFiles = await executeHtmlMigrations({
          files: htmlFiles,
          migrations: htmlMigrations,
          dryRun
        });
        modifiedHtmlFiles.forEach(file => changedFiles.add(file));
      }
    }

    // JSX/TSX
    const jsxMigrations = CONFIGURATION_MIGRATION_MAP[configuration].jsx;
    if (jsxMigrations?.length) {
      const globPath = path.join(rootPath, '**/*.{jsx,tsx}');
      const jsxFiles = await glob(globPath, { ignore: [NODE_MODULES_GLOB, ...ignoreGlobs] });
      if (jsxFiles.length) {
        logInfo(`Found ${jsxMigrations.length} JSX/TSX migration(s)\n`);

        const modifiedJSXFiles = await executeJscodeshiftMigrations({
          files: jsxFiles,
          migrations: jsxMigrations,
          dryRun,
          verbose,
          parser: 'tsx'
        });
        modifiedJSXFiles.forEach(file => changedFiles.add(file));
      }
    }

    // JS/TS
    const jsMigrations = CONFIGURATION_MIGRATION_MAP[configuration].js;
    if (jsMigrations?.length) {
      const globPath = path.join(rootPath, '**/*.{js,ts}');
      const jsFiles = await glob(globPath, { ignore: [NODE_MODULES_GLOB, ...ignoreGlobs] });
      if (jsFiles.length) {
        logInfo(`Found ${jsMigrations.length} JS/TS migration(s)\n`);

        const modifiedJSFiles = await executeJscodeshiftMigrations({
          files: jsFiles,
          migrations: jsMigrations,
          dryRun,
          verbose,
          parser: 'ts'
        });
        modifiedJSFiles.forEach(file => changedFiles.add(file));
      }
    }

    // JSON (e.g. package.json)
    const jsonMigrations = CONFIGURATION_MIGRATION_MAP[configuration].json;
    if (jsonMigrations?.length) {
      const globPath = path.join(rootPath, '**/package.json');
      const jsonFiles = await glob(globPath, { ignore: [NODE_MODULES_GLOB, ...ignoreGlobs] });
      if (jsonFiles.length) {
        logInfo(`Found ${jsonMigrations.length} JSON migration(s)\n`);

        const modifiedJsonFiles = await executeJsonMigrations({
          files: jsonFiles,
          migrations: jsonMigrations,
          dryRun
        });
        modifiedJsonFiles.forEach(file => changedFiles.add(file));
      }
    }
  }

  logBreak();

  if (changedFiles.size) {
    const prefix = dryRun ? 'Would have modified' : 'Modified';
    logWarn(`${prefix} ${changedFiles.size} file${changedFiles.size > 1 ? 's' : ''}:`);
    changedFiles.forEach(file => console.log(`  ${chalk.greenBright('[Modified]')} ${file}`));
    logBreak();
    logSuccess(`Upgrade complete${dryRun ? chalk.yellow(' (dry run)') : ''}.`);
  } else {
    logBreak();
    if (dryRun) {
      logSuccess(`Upgrade complete ${chalk.yellow('(dry run)')}.`);
    } else {
      logWarn('Upgrade complete. No files were modified.');
    }
  }
} catch (e) {
  logBreak();
  logError(e.message ?? e);
}

async function executeReplaceOperation({ files, from, to, dry, ignore }) {
  const options = {
    files,
    from,
    to,
    dry,
    allowEmptyPaths: true,
    ignore: ['node_modules/**/*', '**/*/node_modules/**/*', ...ignore]
  };
  const results = await replaceInFile(options);
  return results.filter(result => result.hasChanged).map(result => result.file);
}

/**
 * Prompts the user for input.
 * @param {string} question - The question to ask the user.
 * @param {string} type - The type of input to expect.
 * @returns {Promise<string|boolean>} The user's input.
 */
async function prompt(question, type) {
  if (!question) {
    throw new Error('A question must be provided');
  }
  if (!type) {
    throw new Error('A type must be provided');
  }

  question = `${chalk.greenBright('?')} ${question}`;

  process.stdout.write(question);
  process.stdin.resume();
  process.stdin.setEncoding('utf-8');

  return new Promise(resolve => {
    process.stdin.once('data', data => {
      process.stdin.pause();
      const value = data.trim().toLowerCase();
      switch (type) {
        case 'boolean':
          resolve(value.toLowerCase() === 'y');
          break;
        default:
          resolve(value);
      }
    });
  });
}
