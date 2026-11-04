import { Component, ViewChild, ElementRef } from '@angular/core';
import { ForgeRteModule } from '../public-api';
import type { RichTextEditorComponent, RichTextRendererContent } from '@tylertech/forge-rich-text-editor';

// The editor takes HTML, but the renderer takes ProseMirror JSON - the shape the editor's
// `change` event emits. They are deliberately different formats.
const SAMPLE_HTML = '<p>Some <strong>bold</strong>, <em>italic</em> and <a href="https://tylertech.com">linked</a> text.</p>';

const SAMPLE_DOC = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Some ' },
        { type: 'text', text: 'bold', marks: [{ type: 'bold' }] },
        { type: 'text', text: ', ' },
        { type: 'text', text: 'italic', marks: [{ type: 'italic' }] },
        { type: 'text', text: ' and ' },
        { type: 'text', text: 'linked', marks: [{ type: 'link', attrs: { href: 'https://tylertech.com' } }] },
        { type: 'text', text: ' text.' }
      ]
    }
  ]
} as unknown as RichTextRendererContent;

/**
 * Exercises the generated proxies the way a consumer would: one `ForgeRteModule` import, feature
 * elements written into the template, and inputs and outputs bound through Angular.
 */
@Component({
  selector: 'app-root',
  imports: [ForgeRteModule],
  template: `
    <main>
      <h1>Rich Text Editor — Angular</h1>

      <section>
        <h2>Standard tools</h2>
        <forge-rich-text-editor
          #editor
          [maxLength]="500"
          [showCharacterCount]="true"
          [showWordCount]="true"
          (change)="onEvent('change', $event)"
          (validation)="onEvent('validation', $event)"
          (initialized)="onEvent('initialized', $event)"
          (error)="onEvent('error', $event)">
          <forge-rte-standard-tools></forge-rte-standard-tools>
          <forge-rte-code></forge-rte-code>
          <forge-rte-link></forge-rte-link>
        </forge-rich-text-editor>
        <output>{{ lastEvent }}</output>
      </section>

      <section>
        <h2>Read only</h2>
        <forge-rich-text-editor [readOnly]="true" [content]="sampleHtml"></forge-rich-text-editor>
      </section>

      <section>
        <h2>Disabled</h2>
        <forge-rich-text-editor [disabled]="true" [content]="sampleHtml"></forge-rich-text-editor>
      </section>

      <section>
        <h2>Document content (editor)</h2>
        <!--
          The same ProseMirror document the renderer gets, bound to an EDITOR through Angular.
          Document input is strict: ProseMirror discards the whole document if a mark has no
          registered extension, so the features carrying bold, italic and link must be slotted in
          or this renders empty and fires the error event.
        -->
        <forge-rich-text-editor [content]="sampleDoc" (error)="onEvent('error (doc editor)', $event)">
          <forge-rte-standard-tools></forge-rte-standard-tools>
          <forge-rte-link></forge-rte-link>
        </forge-rich-text-editor>
      </section>

      <section>
        <h2>Renderer</h2>
        <forge-rich-text-renderer [content]="sampleDoc"></forge-rich-text-renderer>
      </section>

      <section>
        <h2>Output</h2>
        <button type="button" (click)="dump()">Log toJSON / toHTML / toMarkdown</button>
        <pre>{{ output }}</pre>
      </section>
    </main>
  `
})
export class AppComponent {
  @ViewChild('editor', { read: ElementRef })
  private readonly _editor?: ElementRef<RichTextEditorComponent>;

  public readonly sampleHtml = SAMPLE_HTML;
  public readonly sampleDoc = SAMPLE_DOC;
  public lastEvent = '(none)';
  public output = '';

  public onEvent(type: string, event: Event): void {
    const detail = (event as CustomEvent).detail;
    this.lastEvent = `${type}: ${JSON.stringify(detail)}`;
    console.log(type, detail);
  }

  public dump(): void {
    const editor = this._editor?.nativeElement;
    if (!editor) {
      return;
    }

    this.output = [
      `toJSON():      ${JSON.stringify(editor.toJSON())}`,
      `toHTML():      ${editor.toHTML()}`,
      `toMarkdown():  ${editor.toMarkdown()}`,
      `isInitialized: ${editor.isInitialized}`
    ].join('\n\n');
  }
}
