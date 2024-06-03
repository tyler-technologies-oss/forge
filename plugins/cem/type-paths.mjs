// The current file being processed that we use across modules when collecting types
let currentFilename = '';

// This is a map of all types we care about across all modules and their corresponding paths and line numbers
const ALL_TYPES = {};

/**
 * This plugin attempts to add root relative paths to each non-primitive type in the manifest.
 */
export default function forgeTypePathsPlugin() {
  return {
    name: 'FORGE - TYPE-PATHS',

    // Capture all types that we care about across all modules
    collectPhase({ ts, node }) {
      if (node?.fileName?.includes('node_modules')) {
        return;
      }
    
      if (node.kind === ts.SyntaxKind.SourceFile) {
        currentFilename = node.fileName;
      } else if (
        node.name?.escapedText &&
        (
          node.kind === ts.SyntaxKind.EnumDeclaration ||
          node.kind === ts.SyntaxKind.TypeAliasDeclaration ||
          node.kind === ts.SyntaxKind.UnionType ||
          node.kind === ts.SyntaxKind.InterfaceDeclaration ||
          node.kind === ts.SyntaxKind.ClassDeclaration ||
          node.kind === ts.SyntaxKind.TypeOperator ||
          node.kind === ts.SyntaxKind.IndexedAccessType
        )
      ) {
        const lineNumber = ts.getLineAndCharacterOfPosition(node.getSourceFile(), node.getStart()).line + 1;
        ALL_TYPES[node.name.escapedText] = {
          path: currentFilename,
          lineNumber,
        }
      }
    },

    // Inject our type map into the manifest
    packageLinkPhase({ customElementsManifest }) {
      customElementsManifest.forgeTypes = ALL_TYPES;
    }
  };
}
