import DOMPurify from 'dompurify';
import { afterEach, describe, expect, it } from 'vitest';
import { renderInlineMarkdown, renderMarkdown, resolveTrustedOrigin, setTrustedImageOrigin } from './markdown.js';

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
      const doc = renderDoc('![alt text](data:image/png;base64,iVBORw0KGgo=)');

      expect(doc.querySelector('img')?.getAttribute('src')).toBe('data:image/png;base64,iVBORw0KGgo=');
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

    it('should strip style attributes and keep the rest of the element', () => {
      const doc = renderDoc('<p style="background:url(javascript:alert(1))">p</p>');
      const p = doc.querySelector('p');

      expect(p?.textContent).toBe('p');
      expect(p?.hasAttribute('style')).toBe(false);
      expect(doc.body.innerHTML).not.toContain('javascript:');
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

const OUTSIDE_HOST = 'external.invalid';

function parseBody(markup: string): HTMLElement {
  return parse(markup).body;
}

// Every non-link attribute that would make the browser fetch the outside host on render.
function fetchingReferences(html: string): string[] {
  return Array.from(parseBody(html).querySelectorAll('*'))
    .filter(el => el.tagName !== 'A')
    .flatMap(el =>
      Array.from(el.attributes)
        .filter(attr => attr.value.includes(OUTSIDE_HOST))
        .map(attr => `<${el.localName} ${attr.name}>`)
    );
}

const renderers: Array<[string, (content: string) => string]> = [
  ['renderMarkdown', content => renderMarkdown(content, { streaming: false })],
  ['renderInlineMarkdown', content => renderInlineMarkdown(content)]
];

describe('markdown media and sanitizer hardening', () => {
  renderers.forEach(([name, render]) => {
    describe(name, () => {
      [
        ['inline markdown image', `![status](https://${OUTSIDE_HOST}/p.png?q=secret)`],
        ['protocol-relative markdown image', `![status](//${OUTSIDE_HOST}/p.png?q=secret)`],
        ['raw img', `<img alt="status" src="https://${OUTSIDE_HOST}/p.png?q=secret">`],
        ['hidden raw img', `<img alt="status" style="display:none" src="https://${OUTSIDE_HOST}/p.png?q=secret">`]
      ].forEach(([label, content]) => {
        it(`should replace an outside ${label} with a link naming the host`, () => {
          const html = render(content);
          const link = parseBody(html).querySelector('a');
          const href = new URL(link?.getAttribute('href') ?? '');

          expect(fetchingReferences(html)).toEqual([]);
          expect(parseBody(html).querySelector('img')).toBeNull();
          expect(`${href.host}${href.pathname}${href.search}`).toBe(`${OUTSIDE_HOST}/p.png?q=secret`);
          expect(link?.textContent).toBe(`status (${OUTSIDE_HOST})`);
          expect(link?.getAttribute('target')).toBe('_blank');
          expect(link?.getAttribute('rel')).toBe('noreferrer noopener');
        });
      });

      it('should label an outside image without alt text as "Image"', () => {
        const link = parseBody(render(`![](https://${OUTSIDE_HOST}/p.png)`)).querySelector('a');

        expect(link?.textContent).toBe(`Image (${OUTSIDE_HOST})`);
      });

      it('should render an outside image inside a link as text naming the host, keeping the link destination', () => {
        const html = render(`[![status](https://${OUTSIDE_HOST}/p.png)](https://example.com/page)`);
        const links = parseBody(html).querySelectorAll('a');

        expect(fetchingReferences(html)).toEqual([]);
        expect(links).toHaveLength(1);
        expect(links[0].getAttribute('href')).toBe('https://example.com/page');
        expect(links[0].textContent).toBe(`status (${OUTSIDE_HOST})`);
      });

      [
        ['video', `<video src="https://${OUTSIDE_HOST}/a.mp4" title="Demo">fallback</video>`, 'Demo'],
        ['audio', `<audio src="https://${OUTSIDE_HOST}/a.mp3"></audio>`, 'Audio'],
        ['video with a source child', `<video><source src="https://${OUTSIDE_HOST}/a.mp4"></video>`, 'Video']
      ].forEach(([label, content, linkLabel]) => {
        it(`should replace ${label} with a link naming the host`, () => {
          const html = render(content);
          const link = parseBody(html).querySelector('a');

          expect(fetchingReferences(html)).toEqual([]);
          expect(parseBody(html).querySelector('video, audio')).toBeNull();
          expect(link?.getAttribute('href')).toContain(OUTSIDE_HOST);
          expect(link?.textContent).toBe(`${linkLabel} (${OUTSIDE_HOST})`);
        });
      });

      it('should replace same-origin media with a link instead of loading it', () => {
        const html = render('<video src="/api/files/demo.mp4" controls>Download <a href="/x">here</a></video>');
        const links = parseBody(html).querySelectorAll('a');

        expect(parseBody(html).querySelector('video')).toBeNull();
        expect(links).toHaveLength(1);
        expect(links[0].getAttribute('href')).toBe(new URL('/api/files/demo.mp4', document.baseURI).href);
        expect(links[0].textContent).toBe(`Video (${window.location.host})`);
      });

      it('should render media without a source as its label', () => {
        const html = render('<video controls></video>');

        expect(parseBody(html).querySelector('video, a')).toBeNull();
        expect(parseBody(html).textContent?.trim()).toBe('Video');
      });

      [
        ['srcset', `<img src="/ok.png" srcset="https://${OUTSIDE_HOST}/a.png 1x">`],
        ['picture/source', `<picture><source srcset="https://${OUTSIDE_HOST}/a.png"><img src="/ok.png"></picture>`],
        ['video poster', `<video poster="https://${OUTSIDE_HOST}/a.png"></video>`],
        ['video src', `<video src="https://${OUTSIDE_HOST}/a.mp4"></video>`],
        ['audio src', `<audio src="https://${OUTSIDE_HOST}/a.mp3"></audio>`],
        ['source src', `<video><source src="https://${OUTSIDE_HOST}/a.mp4"></video>`],
        ['track src', `<video><track src="https://${OUTSIDE_HOST}/a.vtt"></video>`],
        ['svg image', `<svg><image href="https://${OUTSIDE_HOST}/a.png"></image></svg>`],
        ['svg feImage', `<svg><filter id="f"><feImage href="https://${OUTSIDE_HOST}/a.png"></feImage></filter></svg>`],
        ['svg presentation url()', `<svg><rect fill="url(https://${OUTSIDE_HOST}/a.svg#p)"></rect></svg>`],
        ['CSS-escaped svg url()', `<svg><rect fill="\\75 rl(https://${OUTSIDE_HOST}/a.svg#p)"></rect></svg>`],
        ['CSS-escaped svg mask url()', `<svg><rect mask="\\75 rl('https://${OUTSIDE_HOST}/a.svg#m')"></rect></svg>`],
        ['svg mask image-set()', `<svg><rect mask="image-set('https://${OUTSIDE_HOST}/a.png' 1x)"></rect></svg>`],
        ['mathml mglyph', `<math><mi><mglyph src="https://${OUTSIDE_HOST}/a.png" alt="g"></mglyph></mi></math>`],
        ['style url()', `<div style="background-image:url(https://${OUTSIDE_HOST}/a.png)">x</div>`],
        ['background attribute', `<table background="https://${OUTSIDE_HOST}/a.png"><tr><td>x</td></tr></table>`],
        ['input type=image', `<input type="image" src="https://${OUTSIDE_HOST}/a.png">`]
      ].forEach(([label, content]) => {
        it(`should strip raw HTML that would fetch on render: ${label}`, () => {
          expect(fetchingReferences(render(content))).toEqual([]);
        });
      });

      it('should drop a CSS function in an svg presentation attribute on an HTML element', () => {
        const html = render(`<a href="/x" title="https://${OUTSIDE_HOST}/a.png" mask="image-set(attr(title) 1x)">x</a>`);

        expect(parseBody(html).querySelector('a')?.hasAttribute('mask')).toBe(false);
      });

      it('should keep parentheses in an ordinary HTML attribute', () => {
        const html = render('<span aria-label="Revenue (USD)">x</span>');

        expect(parseBody(html).querySelector('span')?.getAttribute('aria-label')).toBe('Revenue (USD)');
      });
    });
  });

  describe('svg and mathml', () => {
    [
      ['image-set(attr()) via title', `title="https://${OUTSIDE_HOST}/a.png" mask="image-set(attr(title) 1x)"`],
      ['image-set(attr()) via data-*', `data-x="https://${OUTSIDE_HOST}/a.png" mask="image-set(attr(data-x) 1x)"`],
      ['-webkit-image-set(attr())', `title="https://${OUTSIDE_HOST}/a.png" mask="-webkit-image-set(attr(title) 1x)"`]
    ].forEach(([label, attributes]) => {
      it(`should drop an svg mask that loads a URL from another attribute: ${label}`, () => {
        const html = renderMarkdown(`<svg><path ${attributes}></path></svg>`, { streaming: false });

        expect(parseBody(html).querySelector('path')?.hasAttribute('mask')).toBe(false);
      });
    });

    [
      ['a same-document url() fragment', 'url(#grad)'],
      ['an rgb() color', 'rgb(10, 20, 30)']
    ].forEach(([label, fill]) => {
      it(`should keep an svg fill set to ${label}`, () => {
        const html = renderMarkdown(`<svg><rect fill="${fill}"></rect></svg>`, { streaming: false });

        expect(parseBody(html).querySelector('rect')?.getAttribute('fill')).toBe(fill);
      });
    });

    it('should keep an svg transform made of transform functions', () => {
      const html = renderMarkdown('<svg><path transform="translate(2, 2) rotate(10)"></path></svg>', {
        streaming: false
      });

      expect(parseBody(html).querySelector('path')?.getAttribute('transform')).toBe('translate(2, 2) rotate(10)');
    });

    it('should check a long svg attribute in linear time', () => {
      const value = 'aB-'.repeat(40_000);
      const started = performance.now();
      const html = renderMarkdown(`<svg><path d="M0 0h9v9z" data-x="${value}"></path></svg>`, { streaming: false });

      expect(performance.now() - started).toBeLessThan(1_000);
      expect(parseBody(html).querySelector('path')?.getAttribute('data-x')).toBe(value);
    });

    it('should keep svg text and mathml', () => {
      const html = renderMarkdown('<svg><text>Q3 revenue</text></svg> <math><mi>x</mi><mo>=</mo><mn>2</mn></math>', {
        streaming: false
      });

      expect(parseBody(html).querySelector('svg text')?.textContent).toBe('Q3 revenue');
      expect(parseBody(html).querySelector('math')?.textContent).toBe('x=2');
    });
  });

  describe('complete content', () => {
    ['Cost<Budget Review Q3', 'price<limit and x<y'].forEach(message => {
      it(`should keep the text after a "<" in a finished message: ${message}`, () => {
        expect(parseBody(renderMarkdown(message, { streaming: false })).textContent?.trim()).toBe(message);
      });
    });

    it('should still hide a tag that is only partly streamed', () => {
      expect(parseBody(renderMarkdown('Partial reply <cust')).textContent?.trim()).toBe('Partial reply');
    });
  });

  describe('renderInlineMarkdown without links', () => {
    it('should render links as their text', () => {
      const html = renderInlineMarkdown('Opened [parcel 4471](https://example.com/parcel/4471) and <a href="/x">x</a>', {
        links: false
      });

      expect(parseBody(html).querySelector('a')).toBeNull();
      expect(parseBody(html).textContent).toBe('Opened parcel 4471 and x');
    });

    it('should render an outside image as text naming the host', () => {
      const html = renderInlineMarkdown(`![status](https://${OUTSIDE_HOST}/p.png)`, { links: false });

      expect(fetchingReferences(html)).toEqual([]);
      expect(parseBody(html).querySelector('a, img')).toBeNull();
      expect(parseBody(html).textContent).toBe(`status (${OUTSIDE_HOST})`);
    });
  });

  it('should replace an outside reference-style markdown image with a link', () => {
    const html = renderMarkdown(`![status][r]\n\n[r]: https://${OUTSIDE_HOST}/p.png?q=secret`, { streaming: false });

    expect(fetchingReferences(html)).toEqual([]);
    expect(parseBody(html).querySelector('a')?.textContent).toBe(`status (${OUTSIDE_HOST})`);
  });

  it('should replace an outside image while streaming', () => {
    const html = renderMarkdown(`Here: ![status](https://${OUTSIDE_HOST}/p.png?q=secret)`);

    expect(fetchingReferences(html)).toEqual([]);
  });

  [
    ['root-relative', '/api/files/chart.png'],
    ['document-relative', 'chart.png'],
    ['same-origin absolute', `${window.location.origin}/logo.png`],
    ['data:image', 'data:image/png;base64,iVBORw0KGgo=']
  ].forEach(([label, src]) => {
    it(`should keep an allowed ${label} image inline as written`, () => {
      const img = parseBody(renderMarkdown(`![chart](${src})`, { streaming: false })).querySelector('img');

      expect(img?.getAttribute('src')).toBe(src);
      expect(img?.getAttribute('alt')).toBe('chart');
    });
  });

  it('should not load an opaque-origin source inline', () => {
    const html = renderMarkdown('<img alt="status" src="cid:part1@example">', { streaming: false });

    expect(parseBody(html).querySelector('img')).toBeNull();
    expect(parseBody(html).textContent).toBe('status');
  });

  it('should render a non-image data: URI as alt text', () => {
    const html = renderMarkdown('![x](data:text/html;base64,PHNjcmlwdD4=)', { streaming: false });

    expect(parseBody(html).querySelector('img, a')).toBeNull();
    expect(parseBody(html).textContent).toContain('x');
  });

  it('should render an outside non-http image as alt text', () => {
    const html = renderMarkdown(`<img alt="status" src="ftp://${OUTSIDE_HOST}/p.png">`, { streaming: false });

    expect(fetchingReferences(html)).toEqual([]);
    expect(parseBody(html).querySelector('a')).toBeNull();
    expect(parseBody(html).textContent).toBe('status');
  });

  it('should render an image with an unparseable source as alt text', () => {
    const html = renderMarkdown('<img alt="status" src="http://[bad">', { streaming: false });

    expect(parseBody(html).querySelector('img, a')).toBeNull();
    expect(parseBody(html).textContent).toBe('status');
  });

  it('should leave an image without a source untouched', () => {
    const html = renderMarkdown('<img alt="status">', { streaming: false });

    expect(parseBody(html).querySelector('img')?.getAttribute('alt')).toBe('status');
  });

  it('should keep code block scroll region attributes', () => {
    const pre = parseBody(renderMarkdown('```js\nx\n```', { streaming: false })).querySelector('pre');

    expect(pre?.getAttribute('data-scroll-region')).toBe('code');
    expect(pre?.getAttribute('aria-label')).toBe('Code block');
  });

  it('should keep table alignment and scroll region attributes', () => {
    const table = parseBody(renderMarkdown('|a|b|\n|:-|-:|\n|1|2|', { streaming: false }));

    expect(table.querySelector('[data-scroll-region="table"]')?.getAttribute('aria-label')).toBe('Tabular data');
    expect(table.querySelector('th')?.getAttribute('align')).toBe('left');
  });

  it('should leave the host app DOMPurify sanitize calls untouched', () => {
    renderMarkdown(`![status](https://${OUTSIDE_HOST}/p.png)`, { streaming: false });

    const img = parseBody(DOMPurify.sanitize('<img src="https://cdn.example.com/logo.png" style="width:10px">')).querySelector('img');

    expect(img?.getAttribute('src')).toBe('https://cdn.example.com/logo.png');
    expect(img?.getAttribute('style')).toBe('width:10px');
  });

  it('should apply hooks the host app registers on the shared DOMPurify instance', () => {
    const stripStorageHref = (node: Element): void => {
      if (node.getAttribute('href')?.startsWith('s3:')) {
        node.removeAttribute('href');
      }
    };
    DOMPurify.addHook('afterSanitizeAttributes', stripStorageHref);
    try {
      const html = renderMarkdown('[Y.pdf][ref]\n\n[ref]: s3://bucket/Y.pdf', { streaming: false });

      expect(parseBody(html).querySelector('a')?.hasAttribute('href')).toBe(false);
    } finally {
      DOMPurify.removeHook('afterSanitizeAttributes', stripStorageHref);
    }
  });

  it('should remove its hooks when sanitizing throws', () => {
    const throwOnce = (): void => {
      throw new Error('boom');
    };
    DOMPurify.addHook('uponSanitizeElement', throwOnce);
    try {
      expect(() => renderMarkdown('x', { streaming: false })).toThrow('boom');
    } finally {
      DOMPurify.removeHook('uponSanitizeElement', throwOnce);
    }

    const html = DOMPurify.sanitize(`<img src="https://${OUTSIDE_HOST}/p.png">`);

    expect(parseBody(html).querySelector('img')?.getAttribute('src')).toContain(OUTSIDE_HOST);
  });
});

describe('resolveTrustedOrigin', () => {
  it('should use the origin that served the module', () => {
    expect(resolveTrustedOrigin({ moduleUrl: 'https://cdn.example.com/forge-ai/md.js', pageOrigin: 'https://app.test' })).toBe('https://cdn.example.com');
  });

  ['file:///build/md.js', 'blob:https://app.test/1234', 'not a url', '{}'].forEach(moduleUrl => {
    it(`should fall back to the page origin for a module URL of ${moduleUrl}`, () => {
      expect(resolveTrustedOrigin({ moduleUrl, pageOrigin: 'https://app.test' })).toBe('https://app.test');
    });
  });
});

describe('setTrustedImageOrigin', () => {
  const SERVICE = 'https://service.invalid';

  afterEach(() => setTrustedImageOrigin(window.location.origin));

  it('should keep an image from the configured origin inline', () => {
    setTrustedImageOrigin(`${SERVICE}/api/agents`);
    const img = parseBody(renderMarkdown(`![chart](${SERVICE}/api/files/chart.png)`, { streaming: false })).querySelector('img');

    expect(img?.getAttribute('src')).toBe(`${SERVICE}/api/files/chart.png`);
  });

  it('should resolve a relative image against the configured origin and write it back absolute', () => {
    setTrustedImageOrigin(SERVICE);
    const img = parseBody(renderMarkdown('![chart](/api/files/chart.png)', { streaming: false })).querySelector('img');

    expect(img?.getAttribute('src')).toBe(`${SERVICE}/api/files/chart.png`);
  });

  it('should render an image from the host page as a link once another origin is trusted', () => {
    setTrustedImageOrigin(SERVICE);
    const body = parseBody(renderMarkdown(`![logo](${window.location.origin}/logo.png)`, { streaming: false }));

    expect(body.querySelector('img')).toBeNull();
    expect(body.querySelector('a')?.textContent).toBe(`logo (${window.location.host})`);
  });

  it('should resolve a relative link against the configured origin', () => {
    setTrustedImageOrigin(SERVICE);
    const body = parseBody(renderMarkdown('[docs](/docs/x) [top](#top) [mail](mailto:a@b.invalid)', { streaming: false }));
    const hrefs = Array.from(body.querySelectorAll('a')).map(a => a.getAttribute('href'));

    expect(hrefs).toEqual([`${SERVICE}/docs/x`, '#top', 'mailto:a@b.invalid']);
  });

  it('should leave relative links alone when the page origin is trusted', () => {
    const href = parseBody(renderMarkdown('[docs](/docs/x)', { streaming: false }))
      .querySelector('a')
      ?.getAttribute('href');

    expect(href).toBe('/docs/x');
  });

  it('should trust no origin for a URL that is not http(s)', () => {
    setTrustedImageOrigin('file:///build');
    const html = renderMarkdown(`![logo](${window.location.origin}/logo.png)`, { streaming: false });

    expect(parseBody(html).querySelector('img')).toBeNull();
  });
});

describe('anchors', () => {
  it('should not add target or rel to an anchor whose href a host hook removed', () => {
    const stripStorageHref = (node: Element): void => {
      if (node.getAttribute('href')?.startsWith('s3:')) {
        node.removeAttribute('href');
      }
    };
    DOMPurify.addHook('afterSanitizeAttributes', stripStorageHref);
    try {
      const anchor = parseBody(renderMarkdown('[Y.pdf][ref]\n\n[ref]: s3://bucket/Y.pdf', { streaming: false })).querySelector('a');

      expect(anchor?.hasAttribute('target')).toBe(false);
      expect(anchor?.hasAttribute('rel')).toBe(false);
    } finally {
      DOMPurify.removeHook('afterSanitizeAttributes', stripStorageHref);
    }
  });
});

describe('defences that only one rule provides', () => {
  it('should drop an svg attribute whose CSS function name is written with escapes', () => {
    const html = renderMarkdown(`<svg><path title="https://${OUTSIDE_HOST}/a.png" mask="image-se\\74(att\\72(title) 1x)"></path></svg>`, { streaming: false });

    expect(parseBody(html).querySelector('path')?.hasAttribute('mask')).toBe(false);
  });

  it('should drop a style attribute that references another origin without url()', () => {
    const html = renderMarkdown(`<div style="background-image:image-set('https://${OUTSIDE_HOST}/a.png' 1x)">x</div>`, { streaming: false });

    expect(parseBody(html).querySelector('div')?.hasAttribute('style')).toBe(false);
    expect(fetchingReferences(html)).toEqual([]);
  });

  it('should drop a style attribute even when a host hook force-keeps it', () => {
    const keepStyle = (_node: Element, data: { attrName: string; forceKeepAttr?: boolean }): void => {
      if (data.attrName === 'style') {
        data.forceKeepAttr = true;
      }
    };
    DOMPurify.addHook('uponSanitizeAttribute', keepStyle);
    try {
      const html = renderMarkdown(`<div style="background:url(https://${OUTSIDE_HOST}/a.png)">x</div>`, { streaming: false });

      expect(fetchingReferences(html)).toEqual([]);
    } finally {
      DOMPurify.removeHook('uponSanitizeAttribute', keepStyle);
    }
  });

  it('should keep its forbid lists when the host app has called DOMPurify.setConfig()', () => {
    DOMPurify.setConfig({ ADD_ATTR: ['data-x'] });
    try {
      const html = renderMarkdown(
        [
          `<img src="/ok.png" srcset="https://${OUTSIDE_HOST}/a.png 1x">`,
          `<picture><source srcset="https://${OUTSIDE_HOST}/b.png"><img src="/ok.png"></picture>`,
          `<svg><image href="https://${OUTSIDE_HOST}/c.png"></image></svg>`,
          `<table background="https://${OUTSIDE_HOST}/d.png"><tr><td>x</td></tr></table>`,
          `<div style="background-image:image-set('https://${OUTSIDE_HOST}/e.png' 1x)">x</div>`
        ].join('\n'),
        { streaming: false }
      );

      expect(fetchingReferences(html)).toEqual([]);
    } finally {
      DOMPurify.clearConfig();
    }
  });
});

describe('accessibility attributes', () => {
  [
    ['an svg aria-label with an apostrophe', `<svg aria-label="Q3's revenue" role="img"></svg>`, 'svg', 'aria-label', "Q3's revenue"],
    ['an html aria-label mentioning url()', '<span aria-label="see url(docs) for more">x</span>', 'span', 'aria-label', 'see url(docs) for more']
  ].forEach(([label, content, selector, attr, value]) => {
    it(`should keep ${label}`, () => {
      expect(
        parseBody(renderMarkdown(content, { streaming: false }))
          .querySelector(selector)
          ?.getAttribute(attr)
      ).toBe(value);
    });
  });
});
