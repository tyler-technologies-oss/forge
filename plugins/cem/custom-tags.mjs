import { parse } from 'comment-parser';

function removeLeadingDash(string) {
  return string.replace(/^\s?-/, '').trim();
}

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
          const customTags = ['dependency', 'globalconfig'];
          let customComments = '/**';

          node.jsDoc?.forEach(jsDoc => {
            jsDoc?.tags?.forEach(tag => {
              const tagName = tag.tagName.getText();
              if (customTags.includes(tagName)) {
                customComments += `\n * @${tagName} ${tag.comment}`;
              }
            });
          });

          const parsed = parse(`${customComments}\n */`);
          parsed[0]?.tags?.forEach(t => {
            switch (t.tag) {
              case 'dependency':
                if (!Array.isArray(classDoc['dependencies'])) {
                  classDoc['dependencies'] = [];
                }
                classDoc['dependencies'].push(t.name);
                break;
              case 'globalconfig':
                if (!Array.isArray(classDoc['globalConfigProperties'])) {
                  classDoc['globalConfigProperties'] = [];
                }
                classDoc['globalConfigProperties'].push(t.name);
                break;
            }
          });
        }
      }
    }
  }
}
