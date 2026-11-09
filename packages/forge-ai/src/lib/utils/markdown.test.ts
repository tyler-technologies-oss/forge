import { describe, expect, it } from 'vitest';
import { renderInlineMarkdown, renderMarkdown } from './markdown.js';

function parse(htmlString: string): Document {
  return new DOMParser().parseFromString(htmlString, 'text/html');
}

function renderDoc(markdown: string, options?: { streaming?: boolean }): Document {
  return parse(renderMarkdown(markdown, options));
}

function allAttributes(doc: Document): Array<{ tag: string; name: string; value: string }> {
  return Array.from(doc.body.querySelectorAll('*')).flatMap(el =>
    Array.from(el.attributes).map(attr => ({ tag: el.tagName, name: attr.name, value: attr.value }))
  );
}

describe('renderMarkdown', () => {
  describe('typical rendering', () => {
    it('should render headings, emphasis, and lists', () => {
      const doc = renderDoc('# Title\n\nSome **bold** and *italic* text\n\n- one\n- two\n\n1. first\n2. second');

      expect(doc.querySelector('h1')?.textContent).toBe('Title');
      expect(doc.querySelector('strong')?.textContent).toBe('bold');
      expect(doc.querySelector('em')?.textContent).toBe('italic');
      expect(doc.querySelectorAll('ul > li')).toHaveLength(2);
      expect(doc.querySelectorAll('ol > li')).toHaveLength(2);
    });

    it('should treat single newlines as line breaks', () => {
      const doc = renderDoc('line one\nline two');

      expect(doc.querySelectorAll('p > br')).toHaveLength(1);
    });

    it('should render tables inside a labeled, focusable scroll region', () => {
      const doc = renderDoc('| a | b |\n| - | - |\n| 1 | 2 |');
      const region = doc.querySelector('[data-scroll-region="table"]');

      expect(region?.getAttribute('role')).toBe('group');
      expect(region?.getAttribute('tabindex')).toBe('0');
      expect(region?.getAttribute('aria-label')).toBe('Tabular data');
      expect(region?.querySelectorAll('th')).toHaveLength(2);
      expect(region?.querySelectorAll('td')).toHaveLength(2);
      expect(region?.querySelector('td')?.textContent).toBe('1');
    });

    it('should render fenced code blocks inside a labeled, focusable scroll region', () => {
      const doc = renderDoc('```ts\nconst a = 1 < 2;\n```');
      const pre = doc.querySelector('pre');

      expect(pre?.getAttribute('data-scroll-region')).toBe('code');
      expect(pre?.getAttribute('role')).toBe('group');
      expect(pre?.getAttribute('tabindex')).toBe('0');
      expect(pre?.getAttribute('aria-label')).toBe('Code block');
      expect(pre?.querySelector('code')?.textContent).toContain('const a = 1 < 2;');
    });

    it('should render inline code', () => {
      const doc = renderDoc('use `<div>` here');

      expect(doc.querySelector('p code')?.textContent).toBe('<div>');
      expect(doc.querySelector('p div')).toBeNull();
    });

    it('should force links to open in a new tab with a safe rel', () => {
      const doc = renderDoc('[Tyler](https://tylertech.com)');
      const a = doc.querySelector('a');

      expect(a?.getAttribute('href')).toBe('https://tylertech.com');
      expect(a?.getAttribute('target')).toBe('_blank');
      expect(a?.getAttribute('rel')).toBe('noreferrer noopener');
    });

    it('should force raw anchor markup to open in a new tab with a safe rel', () => {
      const doc = renderDoc('<a href="https://example.com" target="_self" rel="opener">x</a>');
      const a = doc.querySelector('a');

      expect(a?.getAttribute('target')).toBe('_blank');
      expect(a?.getAttribute('rel')).toBe('noreferrer noopener');
    });

    it('should autolink bare URLs', () => {
      const doc = renderDoc('visit https://example.com today');

      expect(doc.querySelector('a')?.getAttribute('href')).toBe('https://example.com');
    });

    it('should render images with safe sources', () => {
      const doc = renderDoc('![alt text](https://example.com/a.png)');

      expect(doc.querySelector('img')?.getAttribute('src')).toBe('https://example.com/a.png');
      expect(doc.querySelector('img')?.getAttribute('alt')).toBe('alt text');
    });

    it('should return an empty string for empty content', () => {
      expect(renderMarkdown('')).toBe('');
    });
  });

  describe('streaming partials (remend)', () => {
    it('should close unterminated bold', () => {
      const doc = renderDoc('this is **bold');

      expect(doc.querySelector('strong')?.textContent).toBe('bold');
    });

    it('should close unterminated italic', () => {
      const doc = renderDoc('this is *italic');

      expect(doc.querySelector('em')?.textContent).toBe('italic');
    });

    it('should close unterminated inline code', () => {
      const doc = renderDoc('run `npm install');

      expect(doc.querySelector('code')?.textContent).toBe('npm install');
    });

    it('should render an unterminated code fence as a code block', () => {
      const doc = renderDoc('```js\nconst a = 1;');

      expect(doc.querySelector('pre code')?.textContent).toContain('const a = 1;');
    });

    it('should not leak a dangling link into a broken anchor when streaming', () => {
      const doc = renderDoc('see [the docs](https://exa');
      const html = doc.body.innerHTML;

      expect(html).not.toContain('javascript:');
      for (const a of Array.from(doc.querySelectorAll('a'))) {
        expect(a.getAttribute('href') ?? '').not.toMatch(/^\s*javascript:/i);
      }
      expect(doc.body.textContent).toContain('the docs');
    });

    it('should leave link-like text intact when streaming is false', () => {
      const doc = renderDoc('type [text]( to start', { streaming: false });

      expect(doc.body.textContent).toContain('[text](');
      expect(doc.querySelector('a')).toBeNull();
    });

    it('should not throw on every prefix of a mixed document', () => {
      const source = '# Hi\n\n**bold** and `code` and [link](https://a.com)\n\n| a | b |\n| - | - |\n| 1 | 2 |\n\n```js\nlet x = 1;\n```\n';

      for (let i = 0; i <= source.length; i++) {
        expect(() => renderMarkdown(source.slice(0, i))).not.toThrow();
      }
    });
  });

  describe('sanitization', () => {
    it('should strip script tags', () => {
      const doc = renderDoc('before <script>window.__xss = 1</script> after');

      expect(doc.querySelector('script')).toBeNull();
      expect(doc.body.innerHTML).not.toContain('__xss');
    });

    it('should strip script tags nested in other markup', () => {
      const doc = renderDoc('<div><p>hi<script>alert(1)</script></p></div>');

      expect(doc.querySelector('script')).toBeNull();
      expect(doc.body.innerHTML).not.toContain('alert(1)');
    });

    it('should strip javascript: hrefs from markdown links', () => {
      const doc = renderDoc('[click](javascript:alert(1))');

      for (const a of Array.from(doc.querySelectorAll('a'))) {
        expect(a.getAttribute('href') ?? '').not.toMatch(/javascript:/i);
      }
    });

    it('should strip javascript: hrefs from raw anchors, including obfuscated forms', () => {
      const doc = renderDoc(
        [
          '<a href="javascript:alert(1)">a</a>',
          '<a href="JaVaScRiPt:alert(1)">b</a>',
          '<a href=" javascript:alert(1)">c</a>',
          '<a href="java&#x09;script:alert(1)">d</a>',
          '<a href="&#106;avascript:alert(1)">e</a>'
        ].join('\n\n')
      );

      expect(doc.querySelectorAll('a').length).toBeGreaterThan(0);
      for (const a of Array.from(doc.querySelectorAll('a'))) {
        const href = (a.getAttribute('href') ?? '').replaceAll(/\s/g, '');
        expect(href).not.toMatch(/^javascript:/i);
      }
    });

    it('should strip javascript: from markdown image sources', () => {
      const doc = renderDoc('![x](javascript:alert(1))');

      for (const img of Array.from(doc.querySelectorAll('img'))) {
        expect(img.getAttribute('src') ?? '').not.toMatch(/javascript:/i);
      }
    });

    it('should strip on* event-handler attributes', () => {
      const doc = renderDoc(
        [
          '<img src="x" onerror="window.__xss=1">',
          '<p onclick="window.__xss=1" onmouseover="window.__xss=1" onload="window.__xss=1">p</p>',
          '<div onfocus="window.__xss=1" onmouseenter="window.__xss=1" onpointerdown="window.__xss=1" tabindex="0">d</div>',
          '<svg onload="window.__xss=1"></svg>',
          '<details open ontoggle="window.__xss=1"><summary>s</summary></details>'
        ].join('\n\n')
      );

      const handlers = allAttributes(doc).filter(attr => attr.name.startsWith('on'));
      expect(handlers).toEqual([]);
    });

    it('should strip data: URIs that can execute script', () => {
      const doc = renderDoc(
        [
          '<a href="data:text/html,<script>alert(1)</script>">a</a>',
          '[b](data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==)',
          '<object data="data:text/html,<script>alert(1)</script>"></object>',
          '<embed src="data:text/html,<script>alert(1)</script>">'
        ].join('\n\n')
      );

      for (const a of Array.from(doc.querySelectorAll('a'))) {
        expect(a.getAttribute('href') ?? '').not.toMatch(/^\s*data:text\/html/i);
      }
      expect(doc.querySelector('object')).toBeNull();
      expect(doc.querySelector('embed')).toBeNull();
    });

    it('should strip iframes', () => {
      const doc = renderDoc('<iframe src="https://evil.example"></iframe>\n\n<iframe srcdoc="<script>alert(1)</script>"></iframe>');

      expect(doc.querySelector('iframe')).toBeNull();
      expect(doc.body.innerHTML).not.toContain('srcdoc');
    });

    it('should strip style elements and block CSS injection through style tags', () => {
      const doc = renderDoc('<style>body { display: none }</style>\n\ntext');

      expect(doc.querySelector('style')).toBeNull();
      expect(doc.body.innerHTML).not.toContain('display: none');
      expect(doc.body.textContent).toContain('text');
    });

    it('should keep style attributes as-is (current policy: not stripped, never produces script elements or handlers)', () => {
      const doc = renderDoc('<p style="background:url(javascript:alert(1))">p</p>');
      const p = doc.querySelector('p');

      expect(p?.getAttribute('style')).toBe('background:url(javascript:alert(1))');
      expect(allAttributes(doc).filter(a => a.name.startsWith('on'))).toEqual([]);
      expect(doc.querySelector('script, style')).toBeNull();
    });

    it('should strip forms and form controls', () => {
      const doc = renderDoc(
        '<form action="https://evil.example"><input name="pw"><select><option>a</option></select><textarea></textarea><button>go</button></form>'
      );

      for (const tag of ['form', 'input', 'select', 'textarea', 'button']) {
        expect(doc.querySelector(tag)).toBeNull();
      }
    });

    it('should strip object and embed elements', () => {
      const doc = renderDoc('<object data="https://evil.example/x.swf"></object>\n\n<embed src="https://evil.example/x.swf">');

      expect(doc.querySelector('object')).toBeNull();
      expect(doc.querySelector('embed')).toBeNull();
    });

    it('should neutralize mutation-XSS style payloads', () => {
      const doc = renderDoc(
        '<svg><style><img src=x onerror="window.__xss=1"></style></svg>\n\n<math><mtext><table><mglyph><style><img src=x onerror="window.__xss=1">'
      );

      expect(allAttributes(doc).filter(a => a.name.startsWith('on'))).toEqual([]);
    });

    it('should escape HTML inside code spans and fences instead of rendering it', () => {
      const doc = renderDoc('`<script>alert(1)</script>`\n\n```html\n<img src=x onerror=alert(1)>\n```');

      expect(doc.querySelector('script')).toBeNull();
      expect(doc.querySelector('img')).toBeNull();
      expect(doc.querySelector('pre code')?.textContent).toContain('<img src=x onerror=alert(1)>');
    });

    it('should strip vbscript: and unknown custom-scheme hrefs', () => {
      const doc = renderDoc(
        ['<a href="vbscript:msgbox(1)">a</a>', '<a href="foo:bar">b</a>', '<a href="custom-scheme://x">c</a>', '[d](foo:bar)', '[e](vbscript:msgbox(1))'].join(
          '\n\n'
        )
      );

      for (const a of Array.from(doc.querySelectorAll('a'))) {
        expect(a.getAttribute('href') ?? '').not.toMatch(/^\s*(vbscript|foo|custom-scheme):/i);
      }
    });

    it('should keep safe schemes on hrefs', () => {
      const doc = renderDoc(
        ['<a href="https://a.example">a</a>', '<a href="mailto:a@b.example">b</a>', '<a href="tel:+15555550100">c</a>', '<a href="/relative">d</a>'].join(
          '\n\n'
        )
      );

      expect(Array.from(doc.querySelectorAll('a')).map(a => a.getAttribute('href'))).toEqual([
        'https://a.example',
        'mailto:a@b.example',
        'tel:+15555550100',
        '/relative'
      ]);
    });

    it('should strip javascript: hrefs hidden behind control characters and character references', () => {
      const doc = renderDoc(
        [
          '<a href="java\u0001script:alert(1)">a</a>',
          '<a href="java&Tab;script:alert(1)">b</a>',
          '<a href="java&NewLine;script:alert(1)">c</a>',
          '<a href="javascript&colon;alert(1)">d</a>',
          '<a href="&#x6A;avascript:alert(1)">e</a>',
          '<a href="&#x6a&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3a;alert(1)">f</a>',
          '<a href="&#0000106avascript:alert(1)">g</a>',
          '<a href="\u0001javascript:alert(1)">h</a>'
        ].join('\n\n')
      );

      for (const a of Array.from(doc.querySelectorAll('a'))) {
        const href = (a.getAttribute('href') ?? '').replaceAll(/\s/g, '');
        expect(href).not.toMatch(/javascript:/i);
        expect(href).not.toMatch(/^java.*script:/i);
      }
    });

    it('should strip javascript: from svg and math xlink:href and href', () => {
      const doc = renderDoc(
        [
          '<svg><a xlink:href="javascript:alert(1)"><text>x</text></a></svg>',
          '<svg><a href="javascript:alert(1)"><text>y</text></a></svg>',
          '<math><mi xlink:href="javascript:alert(1)">z</mi></math>',
          '<math href="javascript:alert(1)"><mtext>w</mtext></math>'
        ].join('\n\n')
      );

      for (const el of Array.from(doc.querySelectorAll('*'))) {
        for (const attr of Array.from(el.attributes)) {
          expect(attr.value.replaceAll(/\s/g, '')).not.toMatch(/^javascript:/i);
        }
      }
    });

    it('should strip base and meta refresh elements', () => {
      const doc = renderDoc('<base href="https://evil.example/">\n\n<meta http-equiv="refresh" content="0;url=https://evil.example">\n\ntext');

      expect(doc.querySelector('base')).toBeNull();
      expect(doc.querySelector('meta')).toBeNull();
      expect(doc.body.textContent).toContain('text');
    });

    it('should strip formaction and form-related attributes', () => {
      const doc = renderDoc(
        '<button formaction="javascript:alert(1)">b</button>\n\n<input type="submit" formaction="https://evil.example">\n\n<div formaction="javascript:alert(1)">d</div>'
      );

      expect(allAttributes(doc).filter(a => a.name === 'formaction')).toEqual([]);
      expect(doc.querySelector('button')).toBeNull();
      expect(doc.querySelector('input')).toBeNull();
    });

    it('should not leave javascript: or unknown schemes in srcset', () => {
      const doc = renderDoc('<img srcset="javascript:alert(1) 1x, foo:bar 2x" alt="x">\n\n<img src="x" srcset="vbscript:msgbox(1) 1x" alt="y">');

      for (const attr of allAttributes(doc).filter(a => a.name === 'srcset')) {
        expect(attr.value).not.toMatch(/javascript:|vbscript:/i);
      }
    });

    it('should neutralize math and svg namespace-confusion mXSS payloads', () => {
      const w = window as unknown as { __xss?: number };
      delete w.__xss;
      const payloads = [
        '<math><mtext><table><mglyph><style><!--</style><img title="--&gt;&lt;img src=x onerror=window.__xss=1&gt;">',
        '<math><mtext></p><mglyph><style><img src=x onerror=window.__xss=1>',
        '<svg></p><style><a id="</style><img src=x onerror=window.__xss=1>">',
        '<form><math><mtext></form><form><mglyph><style></math><img src onerror=window.__xss=1>',
        '<noscript><p title="</noscript><img src=x onerror=window.__xss=1>">'
      ];
      const host = document.createElement('div');
      document.body.appendChild(host);

      for (const payload of payloads) {
        const output = renderMarkdown(payload);
        host.innerHTML = output;
        expect(allAttributes(parse(output)).filter(a => a.name.startsWith('on'))).toEqual([]);
        expect(allAttributes(parse(host.innerHTML)).filter(a => a.name.startsWith('on'))).toEqual([]);
      }

      expect(w.__xss).toBeUndefined();
      host.remove();
    });

    it('should not execute any payload when the sanitized output is inserted into the DOM', () => {
      const w = window as unknown as { __xss?: number };
      delete w.__xss;
      const host = document.createElement('div');
      document.body.appendChild(host);
      host.innerHTML = renderMarkdown(
        [
          '<img src=x onerror="window.__xss=1">',
          '<script>window.__xss=1</script>',
          '<a href="javascript:window.__xss=1" id="evil">x</a>',
          '<svg onload="window.__xss=1"></svg>',
          '<iframe srcdoc="<script>parent.__xss=1</script>"></iframe>'
        ].join('\n\n')
      );
      host.querySelector<HTMLAnchorElement>('#evil')?.click();

      expect(w.__xss).toBeUndefined();
      host.remove();
    });
  });
});

describe('renderInlineMarkdown', () => {
  it('should render inline markdown without block wrapping', () => {
    const html = renderInlineMarkdown('**bold** and `code`');
    const doc = parse(html);

    expect(doc.querySelector('p')).toBeNull();
    expect(doc.querySelector('strong')?.textContent).toBe('bold');
    expect(doc.querySelector('code')?.textContent).toBe('code');
  });

  it('should autolink bare URLs and force safe anchor attributes', () => {
    const a = parse(renderInlineMarkdown('see https://example.com')).querySelector('a');

    expect(a?.getAttribute('href')).toBe('https://example.com');
    expect(a?.getAttribute('target')).toBe('_blank');
    expect(a?.getAttribute('rel')).toBe('noreferrer noopener');
  });

  it('should leave plain values untouched', () => {
    expect(renderInlineMarkdown('INV-2024-0042')).toBe('INV-2024-0042');
  });

  it('should strip scripts, javascript: hrefs, event handlers, iframes, and data: URIs', () => {
    const doc = parse(
      renderInlineMarkdown(
        '<script>alert(1)</script><img src=x onerror="alert(1)"><iframe src="https://evil.example"></iframe><a href="javascript:alert(1)">a</a>[b](data:text/html,<script>alert(1)</script>)<style>*{display:none}</style>'
      )
    );

    expect(doc.querySelector('script')).toBeNull();
    expect(doc.querySelector('iframe')).toBeNull();
    expect(doc.querySelector('style')).toBeNull();
    expect(allAttributes(doc).filter(a => a.name.startsWith('on'))).toEqual([]);
    for (const a of Array.from(doc.querySelectorAll('a'))) {
      expect(a.getAttribute('href') ?? '').not.toMatch(/^\s*(javascript|data):/i);
    }
  });
});
