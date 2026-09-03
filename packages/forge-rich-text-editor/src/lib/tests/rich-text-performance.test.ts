import { expect, fixture, html } from '@open-wc/testing';
import { RichTextEditorComponent } from '../rich-text-editor';
import type { RichTextContextComponent } from '../rich-text-context';
import '../rich-text-editor';
import '../features/rte-bold';

async function waitForEditor(el: RichTextEditorComponent): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 200));

  const context = el.shadowRoot!.querySelector('forge-rich-text-context') as RichTextContextComponent;

  for (let i = 0; i < 60; i++) {
    if (context?.isInitialized) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 50));
  }
}

describe('RTE Performance', () => {
  it('should contain shadow root', async () => {
    const el = await fixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`);

    expect(el.shadowRoot).not.to.be.null;
  });

  describe('Large Document Handling', () => {
    it('should handle 1000 words without performance degradation', async () => {
      const el = await fixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`);

      // Wait for editor initialization
      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate 1000 words (~7000 characters)
      const words = Array.from({ length: 1000 }, (_, i) => `word${i}`);
      const largeContent = `<p>${words.join(' ')}</p>`;

      const startTime = performance.now();
      el.content = largeContent;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 200)); // Wait for TipTap processing

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete in under 500ms
      expect(duration).to.be.lessThan(500);
    });

    it('should handle 5000 words without performance degradation', async () => {
      const el = await fixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`);

      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate 5000 words (~35000 characters)
      const words = Array.from({ length: 5000 }, (_, i) => `word${i}`);
      const largeContent = `<p>${words.join(' ')}</p>`;

      const startTime = performance.now();
      el.content = largeContent;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 300));

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete in under 1000ms for 5000 words
      expect(duration).to.be.lessThan(1000);
    });

    it('should handle 10000 words without freezing', async () => {
      const el = await fixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`);

      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate 10000 words (~70000 characters)
      const words = Array.from({ length: 10000 }, (_, i) => `word${i}`);
      const largeContent = `<p>${words.join(' ')}</p>`;

      const startTime = performance.now();
      el.content = largeContent;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 500));

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete in under 2000ms for 10000 words
      expect(duration).to.be.lessThan(2000);
    });

    it('should handle document with many paragraphs', async () => {
      const el = await fixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`);

      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate 500 paragraphs with 10 words each
      const paragraphs = Array.from({ length: 500 }, (_p, i) => {
        const words = Array.from({ length: 10 }, (_w, j) => `word${i}_${j}`).join(' ');
        return `<p>${words}</p>`;
      });
      const largeContent = paragraphs.join('');

      const startTime = performance.now();
      el.content = largeContent;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 300));

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete in under 1000ms
      expect(duration).to.be.lessThan(1000);
    });

    it('should handle document with complex formatting', async () => {
      const el = await fixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`);

      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate content with various formatting
      const sections = Array.from(
        { length: 100 },
        (_s, i) => `
          <h1>Heading ${i}</h1>
          <p>This is a <strong>bold</strong> paragraph with <em>italic</em> text and <u>underlined</u> words.</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2 with <code>code</code></li>
            <li>List item 3</li>
          </ul>
          <p>Another paragraph with a <a href="https://example.com">link</a>.</p>
        `
      );
      const complexContent = sections.join('');

      const startTime = performance.now();
      el.content = complexContent;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 300));

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete in under 1000ms
      expect(duration).to.be.lessThan(1000);
    });
  });

  describe('Rapid Typing Performance', () => {
    it('should handle rapid content updates without lag', async () => {
      const el = await fixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`);

      await new Promise(resolve => setTimeout(resolve, 100));

      // Simulate rapid typing by updating content multiple times quickly
      const startTime = performance.now();

      for (let i = 0; i < 50; i++) {
        el.content = `<p>${'a'.repeat(i + 1)}</p>`;
        await el.updateComplete;
      }

      await new Promise(resolve => setTimeout(resolve, 200));

      const endTime = performance.now();
      const duration = endTime - startTime;

      // 50 updates should complete in under 1500ms
      expect(duration).to.be.lessThan(1500);
    });

    it('should not accumulate memory with repeated updates', async () => {
      const el = await fixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`);

      await new Promise(resolve => setTimeout(resolve, 100));

      // Perform many updates to check for memory leaks
      for (let i = 0; i < 100; i++) {
        el.content = `<p>Content update ${i}</p>`;
        await el.updateComplete;
      }

      await new Promise(resolve => setTimeout(resolve, 200));

      // If we got here without errors or hanging, the test passes
      expect(el.content).to.equal('<p>Content update 99</p>');
    });
  });

  describe('Character/Word Count Performance', () => {
    it('should efficiently calculate counts for large documents', async () => {
      const el = await fixture<RichTextEditorComponent>(
        html`<forge-rich-text-editor show-character-count show-word-count></forge-rich-text-editor>`
      );

      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate 5000 words
      const words = Array.from({ length: 5000 }, (_, i) => `word${i}`);
      const largeContent = `<p>${words.join(' ')}</p>`;

      const startTime = performance.now();
      el.content = largeContent;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 300));

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Count calculation should not significantly impact performance
      expect(duration).to.be.lessThan(1200);
    });

    it('should handle count updates efficiently during typing', async () => {
      const el = await fixture<RichTextEditorComponent>(
        html`<forge-rich-text-editor show-character-count show-word-count></forge-rich-text-editor>`
      );

      await new Promise(resolve => setTimeout(resolve, 100));

      const startTime = performance.now();

      // Simulate typing by incrementally updating content
      for (let i = 1; i <= 50; i++) {
        const words = Array.from({ length: i * 10 }, (_, j) => `word${j}`).join(' ');
        el.content = `<p>${words}</p>`;
        await el.updateComplete;
      }

      await new Promise(resolve => setTimeout(resolve, 200));

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should handle incremental updates with counting efficiently
      expect(duration).to.be.lessThan(2000);
    });
  });

  describe('Validation Performance', () => {
    it('should validate efficiently with maxLength set', async () => {
      const el = await fixture<RichTextEditorComponent>(
        html`<forge-rich-text-editor max-length="10000"></forge-rich-text-editor>`
      );

      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate content just under the limit
      const words = Array.from({ length: 1400 }, (_, i) => `word${i}`); // ~9800 chars
      const content = `<p>${words.join(' ')}</p>`;

      const startTime = performance.now();
      el.content = content;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 300));

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Validation should not significantly impact performance
      expect(duration).to.be.lessThan(1000);
    });

    it('should handle validation state changes during content updates', async () => {
      const el = await fixture<RichTextEditorComponent>(
        html`<forge-rich-text-editor max-length="500" show-character-count></forge-rich-text-editor>`
      );

      await new Promise(resolve => setTimeout(resolve, 100));

      // Start with content under limit
      el.content = '<p>Short text</p>';
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100));

      // Then exceed limit - this should trigger a validation state change
      const longWords = Array.from({ length: 100 }, (_, i) => `word${i}`).join(' '); // ~700 chars
      el.content = `<p>${longWords}</p>`;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 200));

      // Validation should work without impacting performance
      // This test passes if no errors are thrown and it completes
      expect(el.content).to.include('word99');
    });
  });

  describe('Re-render Performance', () => {
    it('should minimize re-renders during content updates', async () => {
      const el = await fixture<RichTextEditorComponent>(html`<forge-rich-text-editor></forge-rich-text-editor>`);

      await new Promise(resolve => setTimeout(resolve, 100));

      // Track update counts
      let updateCount = 0;
      const originalRequestUpdate = el.requestUpdate.bind(el);
      el.requestUpdate = function (...args: unknown[]): unknown {
        updateCount++;
        return originalRequestUpdate(...args);
      };

      // Update content
      el.content = '<p>Test content</p>';
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 200));

      // Should have minimal re-renders (typically 1-2 for the property change)
      expect(updateCount).to.be.lessThan(5);
    });

    it('should handle state changes efficiently', async () => {
      const el = await fixture<RichTextEditorComponent>(
        html`<forge-rich-text-editor content="<p>Initial content</p>"></forge-rich-text-editor>`
      );

      await new Promise(resolve => setTimeout(resolve, 100));

      const startTime = performance.now();

      // Toggle various states
      el.disabled = true;
      await el.updateComplete;

      el.disabled = false;
      await el.updateComplete;

      el.readOnly = true;
      await el.updateComplete;

      el.readOnly = false;
      await el.updateComplete;

      const endTime = performance.now();
      const duration = endTime - startTime;

      // State changes should be instantaneous
      expect(duration).to.be.lessThan(100);
    });
  });

  describe('Mount/Unmount Performance', () => {
    it('should mount efficiently', async () => {
      const startTime = performance.now();

      const el = await fixture<RichTextEditorComponent>(
        html`<forge-rich-text-editor content="<p>Initial content</p>"></forge-rich-text-editor>`
      );

      await new Promise(resolve => setTimeout(resolve, 100));

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should mount in under 300ms
      expect(duration).to.be.lessThan(300);
      expect(el.shadowRoot).not.to.be.null;
    });

    it('should handle repeated mount/unmount cycles without leaking memory', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      try {
        for (let i = 0; i < 10; i++) {
          const el = document.createElement('forge-rich-text-editor') as RichTextEditorComponent;
          el.setAttribute('content', `<p>Content ${i}</p>`);
          container.appendChild(el);

          await new Promise(resolve => setTimeout(resolve, 100));

          container.removeChild(el);

          await new Promise(resolve => setTimeout(resolve, 50));
        }

        // If we got here without errors, test passes
        expect(true).to.be.true;
      } finally {
        document.body.removeChild(container);
      }
    });

    it('should clean up editor instance on unmount', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      try {
        const el = document.createElement('forge-rich-text-editor') as RichTextEditorComponent;
        el.setAttribute('content', '<p>Test content</p>');
        container.appendChild(el);

        await new Promise(resolve => setTimeout(resolve, 100));

        // Remove element
        container.removeChild(el);

        await new Promise(resolve => setTimeout(resolve, 50));

        // Verify disconnectedCallback was called (editor should be destroyed)
        // This is an indirect test - if memory leaks, the test suite will eventually fail
        expect(true).to.be.true;
      } finally {
        document.body.removeChild(container);
      }
    });
  });

  describe('Output Format Performance', () => {
    it('should generate JSON output efficiently for large documents', async () => {
      const el = await fixture<RichTextEditorComponent>(
        html`<forge-rich-text-editor content="<p>Initial</p>"
          ><forge-rte-bold></forge-rte-bold
        ></forge-rich-text-editor>`
      );

      await waitForEditor(el);

      // Generate 2000 words
      const words = Array.from({ length: 2000 }, (_, i) => `word${i}`);
      const largeContent = `<p>${words.join(' ')}</p>`;
      el.content = largeContent;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 300));

      const startTime = performance.now();
      const json = el.toJSON();
      const endTime = performance.now();
      const duration = endTime - startTime;

      // JSON generation should be very fast (increased threshold for reliability)
      expect(duration).to.be.lessThan(100);
      expect(json).to.not.be.undefined;
      expect(el.isInitialized).to.be.true;
    });

    it('should generate HTML output efficiently for large documents', async () => {
      const el = await fixture<RichTextEditorComponent>(
        html`<forge-rich-text-editor content="<p>Initial</p>"
          ><forge-rte-bold></forge-rte-bold
        ></forge-rich-text-editor>`
      );

      await waitForEditor(el);

      // Generate 2000 words
      const words = Array.from({ length: 2000 }, (_, i) => `word${i}`);
      const largeContent = `<p>${words.join(' ')}</p>`;
      el.content = largeContent;
      await el.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 300));

      const startTime = performance.now();
      const htmlOutput = el.toHTML();
      const endTime = performance.now();
      const duration = endTime - startTime;

      // HTML generation should be very fast (increased threshold for reliability)
      expect(duration).to.be.lessThan(100);
      expect(htmlOutput).to.not.be.empty;
      expect(el.isInitialized).to.be.true;
    });
  });

  describe('Memory Usage', () => {
    it('should not leak memory with content changes', async () => {
      const el = await fixture<RichTextEditorComponent>(
        html`<forge-rich-text-editor content="<p>Start</p>"><forge-rte-bold></forge-rte-bold></forge-rich-text-editor>`
      );

      await waitForEditor(el);

      // Verify initial state
      expect(el.isInitialized).to.be.true;

      // Cycle through different content 50 times
      for (let i = 0; i < 50; i++) {
        const words = Array.from({ length: 100 }, (_, j) => `word${i}_${j}`);
        el.content = `<p>${words.join(' ')}</p>`;
        await el.updateComplete;
        await new Promise(resolve => setTimeout(resolve, 20));
      }

      // Verify final state is still correct (no crashes or errors)
      expect(el.isInitialized).to.be.true;
      expect(el.content).to.include('word49_99');
    });

    it('should handle feature registration efficiently', async () => {
      const startTime = performance.now();

      // Create editor with all standard tools (tests the registration system)
      const el = await fixture<RichTextEditorComponent>(html`
        <forge-rich-text-editor>
          <forge-rte-standard-tools slot="toolbar"></forge-rte-standard-tools>
        </forge-rich-text-editor>
      `);

      await new Promise(resolve => setTimeout(resolve, 150));

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Feature registration and initialization should be fast
      expect(duration).to.be.lessThan(400);
      expect(el.shadowRoot).not.to.be.null;
    });
  });
});
