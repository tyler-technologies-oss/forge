import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import * as path from 'path';
import * as ts from 'typescript';

const SERVICE_NAME = 'DynamicComponentService';
const LIBRARY_MARKER = 'forge-angular';

interface Finding {
  file: string;
  line: number;
  column: number;
  message: string;
}

interface TargetLike {
  options?: Record<string, unknown>;
  configurations?: Record<string, Record<string, unknown> | undefined>;
}

/**
 * Migration for @tylertech/forge-angular v8.
 *
 * `DynamicComponentService.create()` no longer accepts a `ComponentFactory` as its first argument,
 * nor an `NgModuleRef` as its fourth argument — both rely on Angular's deprecated `ComponentFactory`/
 * `ComponentFactoryResolver` APIs (removed in Angular 22). Its signature is now:
 *
 *   create<T>(component: Type<T>, target?: ViewContainerRef | HTMLElement, injector?: Injector)
 *
 * This migration does not auto-rewrite call sites (the correct replacement is app-specific — usually
 * a direct dynamic `import()` of the standalone component). Instead it reports every affected call
 * with its file and line so it can be addressed manually.
 */
export default function (): Rule {
  return async (tree: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(tree);
    const findings: Finding[] = [];
    const visited = new Set<string>();

    for (const [, project] of workspace.projects) {
      for (const tsConfigPath of collectTsConfigPaths(project)) {
        let program: ts.Program | undefined;
        try {
          program = createProgram(tsConfigPath);
        } catch {
          // Unparseable/missing tsconfig — skip rather than fail the whole update.
          continue;
        }
        if (!program) {
          continue;
        }

        const checker = program.getTypeChecker();
        for (const sourceFile of program.getSourceFiles()) {
          if (sourceFile.isDeclarationFile || visited.has(sourceFile.fileName)) {
            continue;
          }
          if (sourceFile.fileName.includes('node_modules')) {
            continue;
          }
          visited.add(sourceFile.fileName);
          collectFindings(sourceFile, checker, findings);
        }
      }
    }

    if (findings.length === 0) {
      context.logger.info(`[forge-angular] No '${SERVICE_NAME}.create()' calls relying on removed APIs were found. Nothing to migrate.`);
      return;
    }

    context.logger.warn(
      `[forge-angular] Found ${findings.length} '${SERVICE_NAME}.create()' call(s) using APIs removed in v8. ` +
        `Review each and migrate to 'create(component, target?, injector?)':`
    );
    for (const finding of findings) {
      context.logger.warn(`  - ${finding.file}:${finding.line}:${finding.column} — ${finding.message}`);
    }
  };
}

function collectTsConfigPaths(project: { targets: Iterable<[string, TargetLike]> }): string[] {
  const paths = new Set<string>();
  for (const [, target] of project.targets) {
    const option = target.options?.['tsConfig'];
    if (typeof option === 'string') {
      paths.add(option);
    }
    for (const configuration of Object.values(target.configurations ?? {})) {
      const configOption = configuration?.['tsConfig'];
      if (typeof configOption === 'string') {
        paths.add(configOption);
      }
    }
  }
  return [...paths];
}

function createProgram(tsConfigPath: string): ts.Program | undefined {
  const configPath = path.resolve(process.cwd(), tsConfigPath);
  const host: ts.ParseConfigFileHost = {
    ...ts.sys,
    onUnRecoverableConfigFileDiagnostic: () => undefined
  };
  const parsed = ts.getParsedCommandLineOfConfigFile(configPath, {}, host);
  if (!parsed || parsed.fileNames.length === 0) {
    return undefined;
  }
  return ts.createProgram({ rootNames: parsed.fileNames, options: parsed.options });
}

function collectFindings(sourceFile: ts.SourceFile, checker: ts.TypeChecker, findings: Finding[]): void {
  const visit = (node: ts.Node): void => {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === 'create' &&
      isDynamicComponentService(checker.getTypeAtLocation(node.expression.expression))
    ) {
      const messages: string[] = [];

      const firstArg = node.arguments[0];
      if (firstArg && symbolName(checker.getTypeAtLocation(firstArg)) === 'ComponentFactory') {
        messages.push('first argument is a ComponentFactory (no longer supported — pass the component Type instead)');
      }
      if (node.arguments.length >= 4) {
        messages.push('the 4th "moduleRef" argument was removed (use a module-scoped Injector via the 3rd argument instead)');
      }

      if (messages.length > 0) {
        const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile));
        findings.push({
          file: path.relative(process.cwd(), sourceFile.fileName).replace(/\\/g, '/'),
          line: line + 1,
          column: character + 1,
          message: messages.join('; ')
        });
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
}

function isDynamicComponentService(type: ts.Type): boolean {
  const symbol = type.getSymbol() ?? type.aliasSymbol;
  if (!symbol || symbol.getName() !== SERVICE_NAME) {
    return false;
  }
  const declarations = symbol.getDeclarations() ?? [];
  return declarations.some(declaration => declaration.getSourceFile().fileName.includes(LIBRARY_MARKER));
}

function symbolName(type: ts.Type): string | undefined {
  return (type.getSymbol() ?? type.aliasSymbol)?.getName();
}
