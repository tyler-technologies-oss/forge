// Top-level `const NAME = ...` declarations, scoped per source file, since common local names
// (e.g. `strings`, `numbers`) are reused across many `*-constants.ts` files.
const CONSTS_BY_FILE = new Map();

// `packageLinkPhase` isn't passed `ts`, so we cache the instance from an earlier phase.
let cachedTs;

function isTopLevelVariableDeclaration(ts, node) {
  return (
    ts.isVariableDeclaration(node) &&
    ts.isVariableDeclarationList(node.parent) &&
    ts.isVariableStatement(node.parent.parent) &&
    ts.isSourceFile(node.parent.parent.parent)
  );
}

function getPropertyAccessChain(ts, node) {
  const path = [];
  let current = node;
  while (ts.isPropertyAccessExpression(current)) {
    path.unshift(current.name.getText());
    current = current.expression;
  }
  return ts.isIdentifier(current) ? { root: current.getText(), path } : undefined;
}

// Resolves the root identifier by searching every collected file's top-level consts.
// Bails (returns undefined) if the name is ambiguous across files, since we don't
// resolve import specifiers to a specific module.
function resolveRoot(name) {
  let match;
  for (const fileConsts of CONSTS_BY_FILE.values()) {
    if (fileConsts.has(name)) {
      if (match) {
        return undefined;
      }
      match = fileConsts.get(name);
    }
  }
  return match;
}

// Resolves a plain identifier reference within the module it's used in (e.g. a
// shorthand property assignment referencing a local sibling const).
function resolveLocalIdentifier(ts, node) {
  let current = node;
  while (current && ts.isIdentifier(current)) {
    const fileConsts = CONSTS_BY_FILE.get(current.getSourceFile().fileName);
    current = fileConsts?.get(current.getText());
  }
  return current;
}

function resolveChain(ts, root, path) {
  let current = resolveRoot(root);

  for (const segment of path) {
    if (current && ts.isIdentifier(current)) {
      current = resolveLocalIdentifier(ts, current);
    }

    if (!current || !ts.isObjectLiteralExpression(current)) {
      return undefined;
    }

    const property = current.properties.find(prop => prop.name?.getText() === segment);
    if (!property) {
      return undefined;
    }

    current = ts.isShorthandPropertyAssignment(property) ? property.name : property.initializer;
  }

  return ts.isIdentifier(current) ? resolveLocalIdentifier(ts, current) : current;
}

function inferTypeFromLiteral(ts, node) {
  switch (node?.kind) {
    case ts.SyntaxKind.TrueKeyword:
    case ts.SyntaxKind.FalseKeyword:
      return 'boolean';
    case ts.SyntaxKind.StringLiteral:
    case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
      return 'string';
    case ts.SyntaxKind.NumericLiteral:
      return 'number';
    default:
      return undefined;
  }
}

/**
 * Infers a class field's `type` when it's assigned a property-access initializer
 * (e.g. `public label = SOME_CONSTANTS.strings.LABEL;`), which the analyzer's own
 * type inference and initializer resolution don't cover.
 */
export default function forgeInferPropertyAccessTypePlugin() {
  return {
    name: 'FORGE - INFER-PROPERTY-ACCESS-TYPE',

    collectPhase({ ts, node }) {
      cachedTs = ts;

      if (isTopLevelVariableDeclaration(ts, node) && ts.isIdentifier(node.name) && node.initializer) {
        const fileName = node.getSourceFile().fileName;
        if (!CONSTS_BY_FILE.has(fileName)) {
          CONSTS_BY_FILE.set(fileName, new Map());
        }
        CONSTS_BY_FILE.get(fileName).set(node.name.getText(), node.initializer);
      }
    },

    analyzePhase({ ts, node, moduleDoc }) {
      if (!ts.isPropertyDeclaration(node) || node.type || !node.initializer || !ts.isClassDeclaration(node.parent)) {
        return;
      }

      const chain = getPropertyAccessChain(ts, node.initializer);
      if (!chain) {
        return;
      }

      const declaration = moduleDoc.declarations?.find(decl => decl.name === node.parent.name?.getText());
      const member = declaration?.members?.find(m => m.kind === 'field' && m.name === node.name.getText());

      if (member && !member.type) {
        member.forgePropertyChain = chain;
      }
    },

    packageLinkPhase({ customElementsManifest }) {
      customElementsManifest?.modules?.forEach(mod => {
        mod?.declarations?.forEach(declaration => {
          declaration?.members
            ?.filter(member => member.forgePropertyChain)
            ?.forEach(member => {
              const { root, path } = member.forgePropertyChain;
              const resolved = resolveChain(cachedTs, root, path);
              const inferredType = inferTypeFromLiteral(cachedTs, resolved);

              if (inferredType && !member.type) {
                member.type = { text: inferredType };
              }

              delete member.forgePropertyChain;
            });
        });
      });
    }
  };
}
