import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Slice, Fragment, Node as ProseMirrorNode } from '@tiptap/pm/model';
import { sanitizeHTML } from './sanitize-utils';

export interface PasteHandlerOptions {
  /**
   * Whether to allow pasted content to retain formatting.
   * When false, all pasted content is treated as plain text.
   */
  readonly allowPasteFormatting: boolean;

  /**
   * Whether to allow images to be pasted into the editor.
   * When false, image elements are stripped from pasted content.
   */
  readonly allowPasteImages: boolean;
}

/**
 * Extension that provides enhanced paste handling with sanitization and formatting options.
 *
 * Features:
 * - Strip dangerous HTML (scripts, iframes, etc.)
 * - Control whether formatting is preserved or stripped
 * - Control whether images are allowed
 * - Keyboard shortcut (Ctrl/Cmd+Shift+V) for plain text paste
 */
export const PasteHandler = Extension.create<PasteHandlerOptions>({
  name: 'pasteHandler',

  addOptions() {
    return {
      allowPasteFormatting: true,
      allowPasteImages: false
    };
  },

  addKeyboardShortcuts() {
    return {
      // Ctrl+Shift+V / Cmd+Shift+V for plain text paste
      'Mod-Shift-v': () => {
        const { view } = this.editor;

        // Read clipboard — rebuild transaction from current view.state inside .then()
        // to avoid using stale selection positions captured before the async gap.
        navigator.clipboard
          .readText()
          .then(text => {
            const { state } = view;
            const { from, to } = state.selection;
            const ccExt = this.editor.extensionManager.extensions.find(e => e.name === 'characterCount');
            const maxLength = ccExt?.options?.limit as number | undefined;
            if (maxLength) {
              const currentChars = state.doc.textContent.length - (to - from);
              const available = maxLength - currentChars;
              if (available <= 0) {
                return;
              }
              text = text.slice(0, available);
            }
            const tr = state.tr.replaceWith(from, to, state.schema.text(text));
            view.dispatch(tr);
          })
          .catch(err => {
            console.warn('Failed to read clipboard for plain text paste:', err);
          });

        return true;
      }
    };
  },

  addProseMirrorPlugins() {
    const options = this.options;

    return [
      new Plugin({
        key: new PluginKey('pasteHandler'),
        props: {
          // Handle paste events
          transformPastedHTML: (html: string) => {
            // If formatting not allowed, strip all HTML tags
            if (!options.allowPasteFormatting) {
              const doc = new DOMParser().parseFromString(html, 'text/html');
              return doc.body.textContent || '';
            }

            // Sanitize HTML to remove dangerous content
            return sanitizeHTML(html, options.allowPasteImages);
          },

          // Handle pasted slices (for advanced sanitization)
          transformPasted: (slice: Slice) => {
            // If images not allowed, strip them from the slice
            if (!options.allowPasteImages) {
              return new Slice(stripImagesFromFragment(slice.content), slice.openStart, slice.openEnd);
            }

            return slice;
          }
        }
      })
    ];
  }
});

/**
 * Recursively strips image nodes from a ProseMirror fragment.
 *
 * @param fragment The fragment to process
 * @returns A new fragment with images removed
 */
function stripImagesFromFragment(fragment: Fragment): Fragment {
  const nodes: ProseMirrorNode[] = [];

  fragment.forEach((node: ProseMirrorNode) => {
    // Skip image nodes
    if (node.type.name === 'image') {
      return;
    }

    // Recursively process child nodes
    if (node.content.size > 0) {
      const newContent = stripImagesFromFragment(node.content);
      nodes.push(node.copy(newContent));
    } else {
      nodes.push(node);
    }
  });

  return Fragment.fromArray(nodes);
}
