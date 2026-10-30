import { Component, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ForgeRteModule, RichTextEditorComponent, RteToolButtonComponent } from '../src/public-api';

/**
 * Every element the generated proxies cover. Each module registers its element in its own
 * constructor, so importing the aggregate proves both that the aggregate wires up all 18 modules
 * and that every generated module points at a real `defineXComponent()`.
 */
const TAG_NAMES = [
  'forge-rich-text-content',
  'forge-rich-text-context',
  'forge-rich-text-editor',
  'forge-rich-text-renderer',
  'forge-rte-align',
  'forge-rte-bold',
  'forge-rte-bullet-list',
  'forge-rte-code',
  'forge-rte-divider',
  'forge-rte-heading',
  'forge-rte-italic',
  'forge-rte-link',
  'forge-rte-ordered-list',
  'forge-rte-standard-tools',
  'forge-rte-strike',
  'forge-rte-tool-button',
  'forge-rte-underline',
  'forge-rte-undo-redo'
];

@Component({
  selector: 'lib-test-editor-host',
  // The feature elements read the editor context on render and throw without one, so only
  // `forge-rte-tool-button` - which has no context dependency - is rendered standalone here.
  template: `
    <forge-rich-text-editor>
      <forge-rte-standard-tools></forge-rte-standard-tools>
    </forge-rich-text-editor>
    <forge-rte-tool-button></forge-rte-tool-button>
  `,
  imports: [ForgeRteModule],
  standalone: true
})
class TestEditorHostComponent {
  public editor = viewChild.required(RichTextEditorComponent);
  public toolButton = viewChild.required(RteToolButtonComponent);
}

describe('generated angular proxies', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  const createHost = (): TestEditorHostComponent => {
    const fixture = TestBed.createComponent(TestEditorHostComponent);
    fixture.detectChanges();
    return fixture.componentInstance;
  };

  it('should register every element when ForgeRteModule is imported', () => {
    createHost();

    for (const tagName of TAG_NAMES) {
      expect(customElements.get(tagName), tagName).toBeDefined();
    }
  });

  it('should render the underlying custom element', () => {
    const host = createHost();

    expect(host.editor().nativeElement.tagName.toLowerCase()).toBe('forge-rich-text-editor');
    expect(host.editor().nativeElement).toBeInstanceOf(customElements.get('forge-rich-text-editor')!);
  });

  it('should proxy a string input to the native element property', () => {
    const host = createHost();

    host.toolButton().keyboardShortcut = 'Control+B';

    expect(host.toolButton().nativeElement.keyboardShortcut).toBe('Control+B');
  });

  it('should proxy a boolean input to the native element property', () => {
    const host = createHost();

    host.toolButton().disabled = true;

    expect(host.toolButton().nativeElement.disabled).toBe(true);
  });

  it('should read a property back through the proxy getter', () => {
    const host = createHost();

    host.toolButton().nativeElement.label = 'Bold';

    expect(host.toolButton().label).toBe('Bold');
  });

  it('should project slotted feature elements into the editor', () => {
    const host = createHost();

    expect(host.editor().nativeElement.querySelector('forge-rte-standard-tools')).toBeTruthy();
  });
});
