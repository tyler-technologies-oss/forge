import { type Meta, type StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';
import { action } from 'storybook/actions';

import '@tylertech/forge-rich-text-editor';
import '@tylertech/forge-rich-text-editor/features';

const component = 'forge-rich-text-editor';

const changeAction = action('change');
const validationAction = action('validation');
const initializedAction = action('initialized');
const initializationErrorAction = action('initialization-error');
const errorAction = action('error');

const meta = {
  title: 'Rich Text Editor/Editor',
  render: args => html`
    <forge-rich-text-editor
      .content=${args.content}
      .disabled=${args.disabled}
      .readOnly=${args.readOnly}
      .maxLength=${args.maxLength}
      .errorMessage=${args.errorMessage}
      .showCharacterCount=${args.showCharacterCount}
      .showWordCount=${args.showWordCount}
      .allowPasteFormatting=${args.allowPasteFormatting}
      .allowPasteImages=${args.allowPasteImages}
      @change=${changeAction}
      @validation=${validationAction}
      @initialized=${initializedAction}
      @initialization-error=${initializationErrorAction}
      @error=${errorAction}>
      <forge-rte-standard-tools></forge-rte-standard-tools>
      ${args.showAdditionalFeatures
        ? html`
            <forge-rte-divider></forge-rte-divider>
            <forge-rte-code></forge-rte-code>
            <forge-rte-link .autoProtocol=${args.autoProtocol}></forge-rte-link>
          `
        : nothing}
    </forge-rich-text-editor>
  `,
  component,
  argTypes: {
    content: {
      control: 'text',
      description: 'The editor content. Accepts an HTML string or a ProseMirror document.'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the editor is disabled'
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the editor is in readonly mode'
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length allowed (0 = no limit)'
    },
    errorMessage: {
      control: 'text',
      description: 'Custom error message to display when validation fails'
    },
    showCharacterCount: {
      control: 'boolean',
      description: 'Whether to show character count below the editor'
    },
    showWordCount: {
      control: 'boolean',
      description: 'Whether to show word count below the editor'
    },
    allowPasteFormatting: {
      control: 'boolean',
      description: 'Whether pasted content retains formatting (false = plain text only)'
    },
    allowPasteImages: {
      control: 'boolean',
      description:
        'Preserves img elements through paste sanitization. No image extension is registered, so the schema still discards them - this option currently has no observable effect.'
    },
    showAdditionalFeatures: {
      control: 'boolean',
      description: 'Show the code and link features in addition to the standard tools'
    },
    autoProtocol: {
      control: 'boolean',
      description: 'Whether to automatically add https:// to a link URL that has no protocol'
    }
  },
  args: {
    content: '',
    disabled: false,
    readOnly: false,
    maxLength: 0,
    errorMessage: '',
    showCharacterCount: false,
    showWordCount: false,
    allowPasteFormatting: true,
    allowPasteImages: false,
    showAdditionalFeatures: true,
    autoProtocol: true
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Demo: Story = {};

export const BasicUsage: Story = {
  args: {
    showAdditionalFeatures: false
  },
  parameters: {
    docs: {
      description: {
        story:
          'A rich text editor with only the standard formatting tools. This is the recommended starting point for most applications. The toolbar is built by slotting feature elements, and each one contributes its own schema support - an editor with no features slotted keeps text but no formatting.'
      }
    }
  }
};

export const FullFeatured: Story = {
  args: {
    showAdditionalFeatures: true
  },
  parameters: {
    docs: {
      description: {
        story:
          'A fully-featured editor with code and hyperlink support in addition to the standard tools. Use this when you need maximum formatting flexibility.'
      }
    }
  }
};

export const ContentValidation: Story = {
  args: {
    maxLength: 500,
    showCharacterCount: true,
    showWordCount: true,
    errorMessage: 'Content exceeds the maximum length of 500 characters',
    content: '<p>Start typing to see character and word counts. Try exceeding 500 characters to see validation errors.</p>'
  },
  parameters: {
    docs: {
      description: {
        story:
          'The editor supports content validation with character limits, character counts, and word counts. Custom error messages are displayed when validation fails, and the `validation` event is emitted whenever validation state changes.'
      }
    }
  }
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    content: '<h2>Disabled Editor</h2><p>This editor is <strong>disabled</strong> and cannot be edited. All toolbar buttons are also disabled.</p>'
  },
  parameters: {
    docs: {
      description: {
        story: 'When disabled, the editor prevents all interactions. Content remains visible but cannot be modified, and toolbar buttons are disabled.'
      }
    }
  }
};

export const ReadOnlyState: Story = {
  args: {
    readOnly: true,
    content:
      '<h2>Read-Only Editor</h2><p>This editor is <strong>read-only</strong>. You can select and copy text, but cannot modify the content. Toolbar buttons are disabled.</p>'
  },
  parameters: {
    docs: {
      description: {
        story:
          'Read-only mode allows users to view and select content without making changes. Useful for content that should not be modified but may need to be copied.'
      }
    }
  }
};

export const PrePopulatedContent: Story = {
  args: {
    content: `
      <h1>Welcome to the Rich Text Editor</h1>
      <p>This editor comes pre-populated with <strong>formatted content</strong> including:</p>
      <ul>
        <li><p><strong>Bold</strong> and <em>italic</em> text</p></li>
        <li><p><u>Underlined</u> and <s>strikethrough</s> text</p></li>
        <li><p>Multiple heading levels</p></li>
      </ul>
      <h2>Formatting Examples</h2>
      <p style="text-align: center">This paragraph is center-aligned.</p>
      <p style="text-align: right">This paragraph is right-aligned.</p>
      <ol>
        <li><p>Numbered lists work too</p></li>
        <li><p>With multiple items</p></li>
      </ol>
      <p>Try selecting text and applying formatting with the toolbar above.</p>
    `
  },
  parameters: {
    docs: {
      description: {
        story:
          'The editor accepts pre-populated content through the `content` property, as either an HTML string or a ProseMirror document. Formatting that no slotted feature supports is dropped, and attributes held in `class` or `data-*` are stripped by the sanitizer.'
      }
    }
  }
};

export const PasteHandling: Story = {
  args: {
    allowPasteFormatting: false,
    content:
      '<p>Try pasting content from a word processor or any formatted source. With <code>allowPasteFormatting</code> set to <code>false</code>, only plain text is preserved.</p>'
  },
  parameters: {
    docs: {
      description: {
        story:
          'Control how pasted content is handled with `allowPasteFormatting`. When false, formatting is stripped and only plain text is inserted. Ctrl+Shift+V (Cmd+Shift+V on Mac) pastes as plain text regardless of the setting. Pasted markup is sanitized: dangerous elements are removed, and only schema-supported style declarations survive.'
      }
    }
  }
};
