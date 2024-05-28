/**
 * Parses custom tags from JSDoc comments and adds them to the custom element declaration.
 */
export default function forgeCustomTagsPlugin() {
  return {
    name: 'FORGE - CUSTOM-TAGS',
    analyzePhase({ ts, node, moduleDoc }) {
      switch (node.kind) {
        case ts.SyntaxKind.ClassDeclaration: {
          const className = node.name.getText();
          const classDoc = moduleDoc?.declarations?.find(declaration => declaration.name === className);
          const customTags = ['dependency'];

          node.jsDoc?.forEach(jsDoc => {
            jsDoc?.tags?.forEach(tag => {
              const tagName = tag.tagName.getText();
              switch (tagName) {
                case 'dependency':
                  if (!Array.isArray(classDoc['dependencies'])) {
                    classDoc['dependencies'] = [];
                  }
                  classDoc['dependencies'].push(tag.comment);
                  break;
              }
            });
          });
        }
      }
    }
  }
}
