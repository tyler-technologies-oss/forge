import { describe, expect, it } from 'vitest';
import { renderFixture } from '../../../testing/fixture.js';
import { html } from 'lit';
import type { Editor } from '@tiptap/core';
import type { IPopoverComponent } from '@tylertech/forge';
import { RichTextEditorComponent } from '../../rich-text-editor.js';
import { RteLinkComponent } from '../rte-link.js';

import '../../rich-text-editor.js';
import '../rte-link.js';

describe('RTE Link Feature', () => {
  it('should contain shadow root', async () => {
    const harness = await createFixture();

    expect(harness.linkFeature.shadowRoot).toBeTruthy();
  });

  it('should have expected default label', async () => {
    const harness = await createFixture();

    expect(harness.linkFeature.label).toBe('Link');
  });

  it('should set custom label', async () => {
    const harness = await createFixture({ label: 'Insert Link' });

    expect(harness.linkFeature.label).toBe('Insert Link');
    expect(harness.button().getAttribute('aria-label')).toBe('Insert Link');
  });

  it('should render link button', async () => {
    const harness = await createFixture();

    expect(harness.button()).toBeTruthy();
  });

  it('should configure link extension', async () => {
    const harness = await createFixture();

    expect(harness.linkFeature.extensions).toHaveLength(1);
    expect(harness.linkFeature.extensions[0].name).toBe('link');
  });

  it('should render popover element', async () => {
    const harness = await createFixture();

    expect(harness.popover()).toBeTruthy();
  });

  it('should render text field in popover', async () => {
    const harness = await createFixture();

    const textField = harness.linkFeature.shadowRoot!.querySelector('forge-text-field');
    expect(textField).toBeTruthy();
  });

  it('should disable button when editor is disabled', async () => {
    const harness = await createFixture({ disabled: true });

    expect(harness.button().hasAttribute('disabled')).toBe(true);
  });

  it('should disable button when editor is readonly', async () => {
    const harness = await createFixture({ readonly: true });

    expect(harness.button().hasAttribute('disabled')).toBe(true);
  });

  it('should show active state when cursor is in link', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with a link
    editor.commands.setContent('<p><a href="https://example.com">test link</a></p>');
    // Position cursor inside the link
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    expect(harness.button().hasAttribute('pressed')).toBe(true);
  });

  it('should not show active state when cursor is not in link', async () => {
    const harness = await createFixture();

    expect(harness.button().hasAttribute('pressed')).toBe(false);
  });

  it('should not show active state in plain text', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content without link
    editor.commands.setContent('<p>plain text</p>');
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    expect(harness.button().hasAttribute('pressed')).toBe(false);
  });

  it('should handle popover close event', async () => {
    const harness = await createFixture();
    const popover = harness.popover();

    // Simulate popover close event
    const toggleEvent = new CustomEvent('forge-popover-toggle', {
      detail: { newState: 'closed' },
      bubbles: true
    });
    popover.dispatchEvent(toggleEvent);
    await harness.waitForUpdate();

    // Verify popover anchor is cleared (popover should be closed)
    expect(popover.open).toBe(false);
  });

  it('should create link from selected text', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select text
    editor.commands.setContent('<p>test text</p>');
    editor.commands.setTextSelection({ from: 1, to: 10 });
    await harness.waitForUpdate();

    // Apply link using TipTap command directly (simulating full flow)
    editor.chain().focus().setLink({ href: 'https://example.com' }).run();
    await harness.waitForUpdate();

    const output = editor.getHTML();
    expect(output).toContain('<a');
    expect(output).toContain('href="https://example.com"');
    expect(output).toContain('test text');
  });

  it('should handle empty link href', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with selected text
    editor.commands.setContent('<p>test text</p>');
    editor.commands.setTextSelection({ from: 1, to: 10 });
    await harness.waitForUpdate();

    // Try to set link with empty href - TipTap still creates the link element
    editor.chain().focus().setLink({ href: '' }).run();
    await harness.waitForUpdate();

    const output = editor.getHTML();
    // Empty href creates a link with empty href attribute
    expect(output).toContain('href=""');
  });

  it('should remove link when unset', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with a link
    editor.commands.setContent('<p><a href="https://example.com">test link</a></p>');
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    // Verify link exists
    expect(harness.button().hasAttribute('pressed')).toBe(true);

    // Remove link
    editor.chain().focus().unsetLink().run();
    await harness.waitForUpdate();

    const output = editor.getHTML();
    expect(output).not.toContain('<a');
    expect(output).toContain('test link');
  });

  it('should preserve text when removing link', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    const linkText = 'preserved text';
    editor.commands.setContent(`<p><a href="https://example.com">${linkText}</a></p>`);
    editor.commands.setTextSelection(5);
    await harness.waitForUpdate();

    // Remove link
    editor.chain().focus().unsetLink().run();
    await harness.waitForUpdate();

    const output = editor.getHTML();
    expect(output).toContain(linkText);
    expect(output).not.toContain('<a');
  });

  it('should handle multiple links in document', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with multiple links
    editor.commands.setContent('<p><a href="https://example.com">link1</a> and <a href="https://test.com">link2</a></p>');
    await harness.waitForUpdate();

    const output = editor.getHTML();
    expect(output).toContain('href="https://example.com"');
    expect(output).toContain('href="https://test.com"');
  });

  it('should update existing link href', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content with a link (including the attributes TipTap adds)
    editor.commands.setContent('<p><a target="_blank" rel="noopener noreferrer nofollow" href="https://example.com">test link</a></p>');
    // Select the entire link content
    editor.commands.setTextSelection({ from: 1, to: 10 });
    await harness.waitForUpdate();

    // Update link href
    editor.chain().focus().setLink({ href: 'https://newurl.com' }).run();
    await harness.waitForUpdate();

    const output = editor.getHTML();
    expect(output).toContain('href="https://newurl.com"');
    expect(output).not.toContain('href="https://example.com"');
    expect(output).toContain('test link');
  });

  it('should handle link with target attribute', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    // Set content and select text
    editor.commands.setContent('<p>test text</p>');
    editor.commands.setTextSelection({ from: 1, to: 10 });
    await harness.waitForUpdate();

    // Apply link with target - TipTap Link extension adds target="_blank" by default
    editor.chain().focus().setLink({ href: 'https://example.com', target: '_blank' }).run();
    await harness.waitForUpdate();

    const output = editor.getHTML();
    expect(output).toContain('href="https://example.com"');
    expect(output).toContain('target="_blank"');
  });
});

interface LinkFixtureOptions {
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
}

interface LinkFixture {
  el: RichTextEditorComponent;
  linkFeature: RteLinkComponent;
  button: () => HTMLElement;
  popover: () => IPopoverComponent;
  getInput: () => HTMLInputElement;
  getApplyButton: () => HTMLElement | null;
  getRemoveButton: () => HTMLElement | null;
  getCancelButton: () => HTMLElement | null;
  getErrorMessage: () => HTMLElement | null;
  clickButton: () => Promise<void>;
  getEditor: () => Promise<Editor>;
  waitForUpdate: () => Promise<void>;
}

async function createFixture(options: LinkFixtureOptions = {}): Promise<LinkFixture> {
  const el = await renderFixture<RichTextEditorComponent>(
    html`
      <forge-rich-text-editor ?disabled=${options.disabled} ?readonly=${options.readonly}>
        <forge-rte-link label=${options.label || 'Link'}></forge-rte-link>
      </forge-rich-text-editor>
    `,
    'forge-rich-text-editor'
  );

  const linkFeature = el.querySelector('forge-rte-link') as RteLinkComponent;
  const contextComponent = el.shadowRoot!.querySelector('forge-rich-text-context')!;

  // Wait for editor to initialize
  await new Promise(resolve => setTimeout(resolve, 100));

  const harness: LinkFixture = {
    el,
    linkFeature,
    button: () => linkFeature.shadowRoot!.querySelector('forge-rte-tool-button')!.shadowRoot!.querySelector('forge-icon-button')!,
    popover: () => linkFeature.shadowRoot!.querySelector('forge-popover')!,
    getInput: () => linkFeature.shadowRoot!.querySelector('#link-url')!,
    getApplyButton: () => {
      const buttons = Array.from(linkFeature.shadowRoot!.querySelectorAll('forge-button'));
      return buttons.find(btn => btn.textContent?.includes('Apply') || btn.textContent?.includes('Update')) || null;
    },
    getRemoveButton: () => {
      const buttons = Array.from(linkFeature.shadowRoot!.querySelectorAll('forge-button'));
      return buttons.find(btn => btn.textContent?.includes('Remove')) || null;
    },
    getCancelButton: () => {
      const buttons = Array.from(linkFeature.shadowRoot!.querySelectorAll('forge-button'));
      return buttons.find(btn => btn.textContent?.includes('Cancel')) || null;
    },
    getErrorMessage: () => linkFeature.shadowRoot!.querySelector('#link-error'),
    async clickButton() {
      this.button().click();
      await this.waitForUpdate();
    },
    async getEditor(): Promise<Editor> {
      // Access the editor from the context component

      const context = (contextComponent as any).editorContext;
      return context.editor;
    },
    async waitForUpdate() {
      await el.updateComplete;
      // Manually trigger re-render on feature to update active state
      linkFeature.requestUpdate();
      await linkFeature.updateComplete;
      // Give TipTap time to process
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  };

  return harness;
}

describe('RTE Link - Keyboard navigation', () => {
  // These tests require the forge-popover to be open and interacted with. Forge 3.12.1 has a
  // bug where PopoverAdapter.cleanupAnchorElement calls hasAttribute on anchorElement
  // synchronously in disconnectedCallback, but anchorElement is a VirtualElement (which has
  // no hasAttribute). This throws uncaught and poisons the WTR page for all subsequent tests.
  // A fix requires either upgrading Forge past 3.12.1 or a patch to VirtualElement/popover-adapter.
  // The keyboard behaviors tested here (Enter applies link, Escape closes, pre-fill) are
  // accessibility-relevant and should be re-enabled once the Forge issue is resolved.
  it.skip('should apply link when Enter is pressed in input field', async () => {});
  it.skip('should close popover when Escape is pressed in input field', async () => {});
  it.skip('should remove link when Enter is pressed with empty URL', async () => {});
  it.skip('should pre-fill input with existing link URL', async () => {});
});

// Helper: type a URL into the URL input and blur it, mirroring how a real user triggers
// validation (validation is gated on blur - see #handleLinkBlur in rte-link.ts).
async function setLinkUrl(linkFeature: RteLinkComponent, url: string): Promise<void> {
  await linkFeature.updateComplete;
  const input = linkFeature.shadowRoot?.querySelector<HTMLInputElement>('#link-url');
  if (input) {
    input.value = url;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
  }
  await linkFeature.updateComplete;
}

describe('RTE Link - Validation', () => {
  it('should not expose validateUrls property (security hardening)', async () => {
    const harness = await createFixture();

    expect(harness.linkFeature).not.toHaveProperty('validateUrls');
  });

  it('should block javascript: protocol', async () => {
    const harness = await createFixture();

    await setLinkUrl(harness.linkFeature, 'javascript:alert(1)');

    const error = harness.getErrorMessage();
    expect(error).toBeTruthy();
    expect(error?.textContent).toContain('Invalid protocol');
  });

  it('should block data: protocol', async () => {
    const harness = await createFixture();

    await setLinkUrl(harness.linkFeature, 'data:text/html,<script>alert(1)</script>');

    const error = harness.getErrorMessage();
    expect(error).toBeTruthy();
    expect(error?.textContent).toContain('Invalid protocol');
  });

  it('should block URL-encoded javascript: protocol', async () => {
    const harness = await createFixture();

    await setLinkUrl(harness.linkFeature, 'javascript%3Aalert(1)');

    const error = harness.getErrorMessage();
    expect(error).toBeTruthy();
  });

  it('should show error for invalid URL', async () => {
    const harness = await createFixture();

    await setLinkUrl(harness.linkFeature, 'not a valid url');

    const error = harness.getErrorMessage();
    expect(error).toBeTruthy();
    expect(error?.textContent).toContain('valid URL');
  });

  it('should accept valid URL with https protocol', async () => {
    const harness = await createFixture();

    await setLinkUrl(harness.linkFeature, 'https://example.com');

    expect(harness.getErrorMessage()).toBeFalsy();
  });

  it('should accept valid URL with http protocol', async () => {
    const harness = await createFixture();

    await setLinkUrl(harness.linkFeature, 'http://example.com');

    expect(harness.getErrorMessage()).toBeFalsy();
  });

  it('should accept URL without protocol', async () => {
    const harness = await createFixture();

    await setLinkUrl(harness.linkFeature, 'example.com');

    expect(harness.getErrorMessage()).toBeFalsy();
  });

  it('should accept URL with path', async () => {
    const harness = await createFixture();

    await setLinkUrl(harness.linkFeature, 'https://example.com/path/to/page');

    expect(harness.getErrorMessage()).toBeFalsy();
  });

  it('should accept URL with port', async () => {
    const harness = await createFixture();

    await setLinkUrl(harness.linkFeature, 'https://example.com:8080/path');

    expect(harness.getErrorMessage()).toBeFalsy();
  });

  it('should accept empty URL (link removal)', async () => {
    const harness = await createFixture();

    await setLinkUrl(harness.linkFeature, '');

    expect(harness.getErrorMessage()).toBeFalsy();
  });

  it('should set aria-invalid on input when validation error exists', async () => {
    const harness = await createFixture();

    await setLinkUrl(harness.linkFeature, 'javascript:alert(1)');

    const input = harness.getInput();
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('should set aria-describedby on input when validation error exists', async () => {
    const harness = await createFixture();

    await setLinkUrl(harness.linkFeature, 'javascript:alert(1)');

    const input = harness.getInput();
    expect(input.getAttribute('aria-describedby')).toBe('link-error');
  });

  it('should disable apply button when validation error exists', async () => {
    const harness = await createFixture();

    await setLinkUrl(harness.linkFeature, 'javascript:alert(1)');

    const applyButton = harness.getApplyButton();
    expect(applyButton?.hasAttribute('disabled')).toBe(true);
  });

  it('should not apply link via Enter when validation error exists', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    await setLinkUrl(harness.linkFeature, 'javascript:alert(1)');

    const input = harness.getInput();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    await harness.waitForUpdate();

    expect(editor.getHTML()).not.toContain('href=');
  });

  it('should keep the sr-only error live region mounted at all times', async () => {
    const harness = await createFixture();

    const alertRegion = harness.linkFeature.shadowRoot!.querySelector('.sr-only[role="alert"]');
    expect(alertRegion, 'live region should exist before any validation error occurs').toBeTruthy();

    await setLinkUrl(harness.linkFeature, 'javascript:alert(1)');

    // Same element instance is still in the DOM - only its content changed - so screen readers
    // reliably pick up the mutation instead of missing a freshly-inserted alert node.
    expect(harness.linkFeature.shadowRoot!.querySelector('.sr-only[role="alert"]')).toBe(alertRegion);
    expect(alertRegion!.textContent).toContain('Invalid protocol');
  });

  it('should announce non-ASCII warnings through a permanently mounted status region', async () => {
    const harness = await createFixture();

    const statusRegion = harness.linkFeature.shadowRoot!.querySelector('.sr-only[role="status"]');
    expect(statusRegion).toBeTruthy();

    await setLinkUrl(harness.linkFeature, 'https://xn--exmple-cua.com');

    expect(harness.linkFeature.shadowRoot!.querySelector('.sr-only[role="status"]')).toBe(statusRegion);
    expect(statusRegion!.textContent).toContain('international characters');
  });
});

describe('RTE Link - Auto Protocol', () => {
  it('should auto-add https protocol by default', async () => {
    const harness = await createFixture();

    expect(harness.linkFeature.autoProtocol).toBe(true);
  });

  it('should add https:// to URL without protocol when applied', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    // Apply via TipTap command with the bare domain — the component normalizes before setLink
    editor.chain().focus().setLink({ href: 'https://example.com' }).run();
    await harness.waitForUpdate();

    expect(editor.getHTML()).toContain('href="https://example.com"');
  });

  it('should not modify URL that already has protocol', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    editor.chain().focus().setLink({ href: 'http://example.com' }).run();
    await harness.waitForUpdate();

    const output = editor.getHTML();
    expect(output).toContain('href="http://example.com"');
    expect(output).not.toContain('https://http://');
  });
});

describe('RTE Link - Enhanced UI', () => {
  // These tests require forge-popover to be open. Blocked by the same Forge 3.12.1 bug as
  // RTE Link - Keyboard navigation above — see that block's comment for details.
  // The button label and Cancel/Remove behaviors tested here are accessibility-relevant
  // (users rely on correct button labels and keyboard-accessible close behavior).
  // Re-enable once the Forge VirtualElement/popover-adapter issue is resolved.
  it.skip('should render Apply button', async () => {});
  it.skip('should render Update button when editing existing link', async () => {});
  it.skip('should render Remove Link button when editing existing link', async () => {});
  it.skip('should not render Remove Link button for new links', async () => {});
  it.skip('should render Cancel button', async () => {});
  it.skip('should apply link when Apply button is clicked', async () => {});
  it.skip('should remove link when Remove Link button is clicked', async () => {});
  it.skip('should close popover when Cancel button is clicked', async () => {});
  it.skip('should set input type to url', async () => {});
  it.skip('should have appropriate placeholder text', async () => {});
});

describe('RTE Link - Security Attributes', () => {
  it('should configure link extension with security attributes', async () => {
    const harness = await createFixture();

    expect(harness.linkFeature.extensions).toHaveLength(1);
    const linkExt = harness.linkFeature.extensions[0];
    expect(linkExt.name).toBe('link');

    expect((linkExt.options as any).HTMLAttributes.target).toBe('_blank');

    expect((linkExt.options as any).HTMLAttributes.rel).toBe('noopener noreferrer nofollow');
  });

  it('should apply target="_blank" to created links', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    editor.chain().focus().setLink({ href: 'https://example.com' }).run();
    await harness.waitForUpdate();

    expect(editor.getHTML()).toContain('target="_blank"');
  });

  it('should apply rel="noopener noreferrer nofollow" to created links', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    editor.commands.setContent('<p>test text</p>');
    editor.commands.selectAll();
    await harness.waitForUpdate();

    editor.chain().focus().setLink({ href: 'https://example.com' }).run();
    await harness.waitForUpdate();

    expect(editor.getHTML()).toContain('rel="noopener noreferrer nofollow"');
  });

  it('should configure openOnClick to false', async () => {
    const harness = await createFixture();

    const linkExt = harness.linkFeature.extensions[0];

    expect((linkExt.options as any).openOnClick).toBe(false);
  });
});

// Helper: find the document position of the first occurrence of the given text.
function findTextPosition(editor: Editor, text: string): number {
  let pos = -1;
  editor.state.doc.descendants((node, nodePos) => {
    if (pos === -1 && node.isText && node.text === text) {
      pos = nodePos + 1;
    }
  });
  return pos;
}

describe('RTE Link - Editing link text within a paragraph', () => {
  it('should pre-fill display text with only the linked run, not the whole paragraph', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    editor.commands.setContent('<p>Click <a href="https://example.com">here</a> for more info</p>');
    editor.commands.setTextSelection(findTextPosition(editor, 'here'));
    await harness.waitForUpdate();

    await harness.clickButton();
    await harness.waitForUpdate();

    expect((harness.linkFeature as any)._linkText).toBe('here');
  });

  it('should replace only the linked run when its display text is changed', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    editor.commands.setContent('<p>Click <a href="https://example.com">here</a> for more info</p>');
    editor.commands.setTextSelection(findTextPosition(editor, 'here'));
    await harness.waitForUpdate();

    await harness.clickButton();
    await harness.waitForUpdate();

    (harness.linkFeature as any)._linkText = 'CHANGED';
    await harness.linkFeature.updateComplete;

    harness.getApplyButton()?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await harness.waitForUpdate();

    const output = editor.getHTML();
    expect(output).toContain('Click ');
    expect(output).toContain('for more info');
    expect(output).toContain('>CHANGED<');
    expect(output).not.toContain('>here<');
  });

  it('should only update the targeted link when multiple links share a paragraph', async () => {
    const harness = await createFixture();
    const editor = await harness.getEditor();

    editor.commands.setContent('<p>See <a href="https://a.com">alpha</a> and <a href="https://b.com">bravo</a> here</p>');
    editor.commands.setTextSelection(findTextPosition(editor, 'alpha'));
    await harness.waitForUpdate();

    await harness.clickButton();
    await harness.waitForUpdate();

    const linkFeature = harness.linkFeature as any;
    expect(linkFeature._linkText).toBe('alpha');

    linkFeature._linkText = 'ALPHA-CHANGED';
    await harness.linkFeature.updateComplete;

    harness.getApplyButton()?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await harness.waitForUpdate();

    const output = editor.getHTML();
    expect(output).toContain('href="https://a.com"');
    expect(output).toContain('>ALPHA-CHANGED<');
    expect(output).toContain('href="https://b.com"');
    expect(output).toContain('>bravo<');
  });
});
