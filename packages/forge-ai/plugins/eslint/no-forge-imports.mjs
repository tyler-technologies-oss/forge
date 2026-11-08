/**
 * ESLint rule to prevent imports from forge packages
 */

// Packages to block with their specific suggestion messages
const BLOCKED_PACKAGES = [
  {
    name: '@tylertech/forge',
    suggestion: ' Use CSS-only components from "@tylertech/forge" instead.'
  },
  {
    name: '@tylertech/forge-core',
    suggestion: ' Forge JS is not available at runtime in this package.'
  },
  {
    name: '@tylertech/tyler-icons',
    suggestion: 'Use inline SVGs for icons instead.'
  }
];

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow imports from forge packages',
      recommended: false
    },
    fixable: null,
    schema: [],
    messages: {
      noForgeImports: 'Importing from "{{packageName}}" is not allowed in this package.{{suggestion}}'
    }
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const source = node.source.value;

        if (typeof source === 'string') {
          // Check if the import matches any blocked package (exact match or subpath)
          for (const { name, suggestion } of BLOCKED_PACKAGES) {
            if (source === name || source.startsWith(`${name}/`)) {
              context.report({
                node: node.source,
                messageId: 'noForgeImports',
                data: {
                  packageName: source,
                  suggestion
                }
              });
              break; // Only report once per import
            }
          }
        }
      }
    };
  }
};
