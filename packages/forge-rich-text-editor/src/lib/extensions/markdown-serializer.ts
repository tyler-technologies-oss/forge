import type { JSONContent } from '@tiptap/core';

interface MarkAttrs {
  type: string;
  attrs?: Record<string, unknown>;
}

/**
 * Serializes ProseMirror JSON content to Markdown format.
 *
 * Supports all rich text editor features:
 * - Text formatting: bold, italic, underline, strikethrough, code
 * - Headings: H1, H2, H3
 * - Lists: bullet lists, ordered lists
 * - Links
 * - Text alignment (converted to HTML comments for preservation)
 * - Paragraphs and line breaks
 */
export class MarkdownSerializer {
  /**
   * Converts ProseMirror JSON content to Markdown string.
   *
   * @param json - The ProseMirror JSON content from editor.getJSON()
   * @returns The Markdown string representation
   */
  public static serialize(json: JSONContent): string {
    if (!json || !json.content) {
      return '';
    }

    return this.#serializeNodes(json.content);
  }

  static #serializeNodes(nodes: JSONContent[]): string {
    return nodes.map(node => this.#serializeNode(node)).join('');
  }

  static #serializeNode(node: JSONContent): string {
    switch (node.type) {
      case 'paragraph':
        return this.#serializeParagraph(node);
      case 'heading':
        return this.#serializeHeading(node);
      case 'bulletList':
        return this.#serializeBulletList(node);
      case 'orderedList':
        return this.#serializeOrderedList(node);
      case 'listItem':
        return this.#serializeListItem(node);
      case 'text':
        return this.#serializeText(node);
      case 'hardBreak':
        return '  \n'; // Two spaces + newline for hard break in Markdown
      default: {
        // Unknown node type - serialize children if present
        if (node.content) {
          return this.#serializeNodes(node.content);
        }
        return '';
      }
    }
  }

  static #serializeParagraph(node: JSONContent): string {
    const content = node.content ? this.#serializeNodes(node.content) : '';
    const alignment = node.attrs?.textAlign;

    // Empty paragraphs
    if (!content.trim()) {
      return '\n';
    }

    // Add alignment as HTML comment if non-default
    if (alignment && alignment !== 'left' && alignment !== 'start') {
      return `<!-- align:${alignment} -->\n${content}\n\n`;
    }

    return `${content}\n\n`;
  }

  static #serializeHeading(node: JSONContent): string {
    const level = node.attrs?.level ?? 1;
    const content = node.content ? this.#serializeNodes(node.content) : '';
    const hashes = '#'.repeat(level);

    return `${hashes} ${content}\n\n`;
  }

  static #serializeBulletList(node: JSONContent): string {
    if (!node.content) {
      return '';
    }

    const items = node.content.map(item => this.#serializeBulletListItem(item)).join('');
    return `${items}\n`;
  }

  static #serializeOrderedList(node: JSONContent): string {
    if (!node.content) {
      return '';
    }

    const items = node.content.map((item, index) => this.#serializeOrderedListItem(item, index + 1)).join('');
    return `${items}\n`;
  }

  static #serializeBulletListItem(node: JSONContent): string {
    if (node.type !== 'listItem' || !node.content) {
      return '';
    }

    const content = this.#serializeListItemContent(node.content);
    return `- ${content}\n`;
  }

  static #serializeOrderedListItem(node: JSONContent, itemNumber: number): string {
    if (node.type !== 'listItem' || !node.content) {
      return '';
    }

    const content = this.#serializeListItemContent(node.content);
    return `${itemNumber}. ${content}\n`;
  }

  static #serializeListItem(node: JSONContent): string {
    // This is called for nested list items
    if (!node.content) {
      return '';
    }

    return this.#serializeListItemContent(node.content);
  }

  static #serializeListItemContent(nodes: JSONContent[]): string {
    // List items contain paragraphs - we want inline content
    return nodes
      .map(node => {
        if (node.type === 'paragraph') {
          return node.content ? this.#serializeNodes(node.content) : '';
        }
        return this.#serializeNode(node);
      })
      .join('');
  }

  static #serializeText(node: JSONContent): string {
    const hasCodeMark = node.marks?.some((m: MarkAttrs) => m.type === 'code');
    // Escape raw text unless it will be wrapped in a code span (backtick context)
    let text = hasCodeMark ? (node.text ?? '') : this.escape(node.text ?? '');

    // Apply marks in order: bold, italic, underline, strikethrough, code
    if (node.marks && node.marks.length > 0) {
      for (const mark of node.marks) {
        text = this.#applyMark(text, mark as MarkAttrs);
      }
    }

    return text;
  }

  static #applyMark(text: string, mark: MarkAttrs): string {
    switch (mark.type) {
      case 'bold': {
        const trimmed = text.trim();
        const leading = text.slice(0, text.length - text.trimStart().length);
        const trailing = text.slice(text.trimEnd().length);
        return `${leading}**${trimmed}**${trailing}`;
      }
      case 'italic':
        return `*${text}*`;
      case 'underline': {
        // Markdown doesn't support underline natively - use HTML
        return `<u>${text}</u>`;
      }
      case 'strike':
        return `~~${text}~~`;
      case 'code':
        return `\`${text}\``;
      case 'link': {
        const href = String(mark.attrs?.href ?? '');
        // Escape parens in href to avoid breaking Markdown link syntax
        const safeHref = href.replace(/\(/g, '%28').replace(/\)/g, '%29');
        return `[${text}](${safeHref})`;
      }
      default:
        return text;
    }
  }

  /**
   * Escapes special Markdown characters in text content.
   * Used for text that should not be interpreted as Markdown.
   *
   * @param text - The text to escape
   * @returns The escaped text
   */
  public static escape(text: string): string {
    // Only escape characters that break inline Markdown structure.
    // Do NOT escape `.`, `-`, `+`, `!`, `#` — they are only special at line-start
    // in block contexts, not inline, so escaping them here would corrupt normal text.
    return text
      .replace(/\\/g, '\\\\')
      .replace(/\*/g, '\\*')
      .replace(/_/g, '\\_')
      .replace(/`/g, '\\`')
      .replace(/\[/g, '\\[')
      .replace(/\]/g, '\\]')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/~/g, '\\~');
  }
}
