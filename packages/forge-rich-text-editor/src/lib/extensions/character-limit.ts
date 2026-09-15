import { Extension } from '@tiptap/core';
import { Node as ProseMirrorNode } from '@tiptap/pm/model';
import { Plugin, PluginKey } from '@tiptap/pm/state';

/**
 * Counts the characters in a document, treating each block boundary as one character.
 *
 * TipTap's `CharacterCount` reads `textBetween(0, size, undefined, ' ')` - the third argument is
 * the block separator, and passing `undefined` joins blocks with nothing at all. Paragraph breaks
 * therefore cost zero, so a document at its character limit could still grow indefinitely through
 * `Enter`: the count stayed pinned at the limit while blank paragraphs accumulated. Counting the
 * separator matches what a textarea with `maxlength` does and makes the limit cover structure as
 * well as text.
 */
export function countCharacters(doc: ProseMirrorNode): number {
  return doc.textBetween(0, doc.content.size, '\n', ' ').length;
}

export interface CharacterLimitOptions {
  /** The maximum number of characters allowed. Values of 0 or less disable the limit. */
  limit: number;
}

/**
 * Rejects transactions that would push the document past its character limit.
 *
 * A transaction that leaves the count unchanged or reduces it is always allowed, so content that
 * arrives over the limit can still be edited back down rather than becoming uneditable.
 */
export const CharacterLimit = Extension.create<CharacterLimitOptions>({
  name: 'rteCharacterLimit',

  addOptions() {
    return { limit: 0 };
  },

  addProseMirrorPlugins() {
    const { limit } = this.options;

    return [
      new Plugin({
        key: new PluginKey('rteCharacterLimit'),
        filterTransaction: (transaction, state) => {
          if (!transaction.docChanged || limit <= 0) {
            return true;
          }

          const next = countCharacters(transaction.doc);
          return next <= limit || next <= countCharacters(state.doc);
        }
      })
    ];
  }
});
