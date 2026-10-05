import{b as i}from"./iframe-Q5Y6f9_2.js";import{g as T}from"./utils-CMQDsowF.js";import"./service-adapter-8tADcN_b.js";import"./button-pGUTgqOB.js";import"./keyboard-shortcut-5eW5h7Wb.js";import"./text-field-BbVn4awb.js";import"./base-field-Du0AVBZp.js";import"./focus-indicator-DqJ5p9rG.js";import"./label-DixtrICL.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";const{action:u}=__STORYBOOK_MODULE_ACTIONS__,v="forge-keyboard-shortcut",C=5e3,w=["Alt","AltGraph","CapsLock","Control","Meta","NumLock","ScrollLock","Shift"],U=e=>w.includes(e.key),q=u("forge-keyboard-shortcut-activate"),B=u("activateCallback"),b={parameters:{controls:{disable:!0}}},x=e=>{const o=document.createElement("div");return o.setAttribute("aria-live","polite"),o.textContent=e,o},K={title:"Components/Keyboard Shortcut",render:e=>i`
      <div forge-keyboard-shortcut-scope @forge-keyboard-shortcut-activate=${n=>{q(n),alert("Keyboard shortcut activated")}}>
        <forge-button id="demo-shortcut-target" variant="raised">Shortcut target (${e.key})</forge-button>
        <forge-keyboard-shortcut
          anchor="demo-shortcut-target"
          .activateCallback=${B}
          .key=${e.key}
          .global=${e.global}
          .allowWhileTyping=${e.allowWhileTyping}
          .allowRepeat=${e.allowRepeat}
          .fallthrough=${e.fallthrough}
          .preventDefault=${e.preventDefault}
          .capture=${e.capture}
          .useCode=${e.useCode}
          .disabled=${e.disabled}
          .action=${e.action}
          .anchorAccessibility=${e.anchorAccessibility}>
        </forge-keyboard-shortcut>
      </div>
    `,component:v,argTypes:{...T({tagName:v,exclude:["activateCallback","keyBinding","target","anchor","anchorElement","scope","scopeElement"],controls:{action:{control:"select",options:["default","click"]},anchorAccessibility:{control:"select",options:["auto","none"]}}})},args:{key:"a",global:!1,allowWhileTyping:!1,allowRepeat:!1,fallthrough:!1,preventDefault:!0,capture:!1,useCode:!1,disabled:!1,action:"click",anchorAccessibility:"auto"}},a={},l={...b,render:()=>{const e=x("Focus an editor, then press Ctrl+B / Cmd+B."),o=n=>()=>{u(n)("clicked"),e.textContent=`${n} activated.`};return i`
      <div>
        <div style="display: flex; gap: 16px;">
          <div forge-keyboard-shortcut-scope tabindex="-1" style="border: 1px solid var(--forge-theme-outline); padding: 16px; flex: 1;">
            <p>Editor 1 — press Ctrl+B / Cmd+B</p>
            <forge-text-field>
              <label>Editor 1 Content</label>
              <textarea></textarea>
            </forge-text-field>
            <br />
            <forge-button id="bold-1" variant="outlined" @click=${o("bold-1")}>Bold</forge-button>
            <forge-keyboard-shortcut key="mod+b" anchor="bold-1" allow-while-typing .action=${"click"}></forge-keyboard-shortcut>
          </div>
          <div forge-keyboard-shortcut-scope tabindex="-1" style="border: 1px solid var(--forge-theme-outline); padding: 16px; flex: 1;">
            <p>Editor 2 — press Ctrl+B / Cmd+B</p>
            <forge-text-field>
              <label>Editor 2 Content</label>
              <textarea></textarea>
            </forge-text-field>
            <br />
            <forge-button id="bold-2" variant="outlined" @click=${o("bold-2")}>Bold</forge-button>
            <forge-keyboard-shortcut key="mod+b" anchor="bold-2" allow-while-typing .action=${"click"}></forge-keyboard-shortcut>
          </div>
        </div>
        <p>${e}</p>
      </div>
    `}},d={...b,render:()=>i`
    <div>
      <p>Press <kbd>/</kbd> anywhere on the page to focus the search field.</p>
      <forge-text-field>
        <label for="global-search">Search</label>
        <input type="text" id="global-search" />
      </forge-text-field>
      <forge-keyboard-shortcut
        key="/"
        anchor="global-search"
        global
        @forge-keyboard-shortcut-activate=${()=>{document.getElementById("global-search")?.focus()}}>
      </forge-keyboard-shortcut>
    </div>
  `},s={...b,render:()=>{const e="Click inside the panel to enable the shortcuts.",o="Panel focused — press one of the sequences above.",n=x(e);let g,p,c=!1;const r=t=>{clearTimeout(g),c=!1,n.textContent=t},h=(t,y)=>()=>{u(t)(y),r(`${t} — ${y}`)},S=t=>{p=t.detail},$=t=>{if(!U(t)&&(t.defaultPrevented&&t.stopPropagation(),t!==p)){if(t.defaultPrevented){r(`First chord registered — press the second chord within ${C/1e3}s.`),c=!0,g=setTimeout(()=>{c=!1,n.textContent="Sequence timed out — press the first chord again."},C);return}c&&r("Sequence cancelled.")}},E=t=>{t.currentTarget.contains(t.relatedTarget)||r(e)},f=h("comment","Ctrl+K > Ctrl+C"),m=h("uncomment","Ctrl+K > Ctrl+U"),k=h("toggle","Ctrl+/");return i`
      <div @keydown=${$}>
        <div
          forge-keyboard-shortcut-scope
          tabindex="-1"
          style="border: 1px solid var(--forge-theme-outline); padding: 16px;"
          @forge-keyboard-shortcut-activate=${S}
          @focusin=${()=>r(o)}
          @focusout=${E}>
          <p>Multi-step keyboard sequences with chords separated by a space:</p>
          <ul>
            <li><kbd>Ctrl+K</kbd> then <kbd>Ctrl+C</kbd> — Comment selection</li>
            <li><kbd>Ctrl+K</kbd> then <kbd>Ctrl+U</kbd> — Uncomment selection</li>
            <li><kbd>Ctrl+/</kbd> — Toggle comment (single chord alternative)</li>
          </ul>
          <p>After pressing the first chord, you have 1 second to press the second chord.</p>
          <div style="display: flex; gap: 8px;">
            <forge-button id="seq-comment-btn" variant="outlined" @click=${f}>Comment</forge-button>
            <forge-keyboard-shortcut
              key="Control+k Control+c"
              anchor="seq-comment-btn"
              @forge-keyboard-shortcut-activate=${f}></forge-keyboard-shortcut>

            <forge-button id="seq-uncomment-btn" variant="outlined" @click=${m}>Uncomment</forge-button>
            <forge-keyboard-shortcut
              key="Control+k Control+u"
              anchor="seq-uncomment-btn"
              @forge-keyboard-shortcut-activate=${m}></forge-keyboard-shortcut>

            <forge-button id="seq-toggle-btn" variant="outlined" @click=${k}>Toggle</forge-button>
            <forge-keyboard-shortcut key="Control+/" anchor="seq-toggle-btn" @forge-keyboard-shortcut-activate=${k}></forge-keyboard-shortcut>
          </div>
          <p>${n}</p>
        </div>
      </div>
    `}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...patternStoryParams,
  render: () => {
    const status = createStatus('Focus an editor, then press Ctrl+B / Cmd+B.');
    const handleBold = (label: string) => (): void => {
      action(label)('clicked');
      status.textContent = \`\${label} activated.\`;
    };
    return html\`
      <div>
        <div style="display: flex; gap: 16px;">
          <div forge-keyboard-shortcut-scope tabindex="-1" style="border: 1px solid var(--forge-theme-outline); padding: 16px; flex: 1;">
            <p>Editor 1 — press Ctrl+B / Cmd+B</p>
            <forge-text-field>
              <label>Editor 1 Content</label>
              <textarea></textarea>
            </forge-text-field>
            <br />
            <forge-button id="bold-1" variant="outlined" @click=\${handleBold('bold-1')}>Bold</forge-button>
            <forge-keyboard-shortcut key="mod+b" anchor="bold-1" allow-while-typing .action=\${'click'}></forge-keyboard-shortcut>
          </div>
          <div forge-keyboard-shortcut-scope tabindex="-1" style="border: 1px solid var(--forge-theme-outline); padding: 16px; flex: 1;">
            <p>Editor 2 — press Ctrl+B / Cmd+B</p>
            <forge-text-field>
              <label>Editor 2 Content</label>
              <textarea></textarea>
            </forge-text-field>
            <br />
            <forge-button id="bold-2" variant="outlined" @click=\${handleBold('bold-2')}>Bold</forge-button>
            <forge-keyboard-shortcut key="mod+b" anchor="bold-2" allow-while-typing .action=\${'click'}></forge-keyboard-shortcut>
          </div>
        </div>
        <p>\${status}</p>
      </div>
    \`;
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...patternStoryParams,
  render: () => html\`
    <div>
      <p>Press <kbd>/</kbd> anywhere on the page to focus the search field.</p>
      <forge-text-field>
        <label for="global-search">Search</label>
        <input type="text" id="global-search" />
      </forge-text-field>
      <forge-keyboard-shortcut
        key="/"
        anchor="global-search"
        global
        @forge-keyboard-shortcut-activate=\${() => {
    const input = document.getElementById('global-search') as HTMLInputElement;
    input?.focus();
  }}>
      </forge-keyboard-shortcut>
    </div>
  \`
}`,...d.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...patternStoryParams,
  render: () => {
    const UNFOCUSED = 'Click inside the panel to enable the shortcuts.';
    const FOCUSED = 'Panel focused — press one of the sequences above.';
    const status = createStatus(UNFOCUSED);
    let pendingTimer: ReturnType<typeof setTimeout> | undefined;
    let activatingEvent: KeyboardEvent | undefined;
    let pending = false;
    const setStatus = (text: string): void => {
      clearTimeout(pendingTimer);
      pending = false;
      status.textContent = text;
    };
    const handleSequence = (name: string, binding: string) => (): void => {
      action(name)(binding);
      setStatus(\`\${name} — \${binding}\`);
    };
    const recordActivation = (evt: CustomEvent<KeyboardEvent>): void => {
      activatingEvent = evt.detail;
    };

    // Runs after the scope has handled the key: prevented but not activated means a chord is being held open,
    // while an unhandled non-modifier key is what drops one
    const handleChordProgress = (evt: KeyboardEvent): void => {
      if (isModifierKeyEvent(evt)) {
        return;
      }

      // Storybook relays preview keydowns to its manager shortcuts from \`window.onkeydown\` without
      // checking \`defaultPrevented\`, so Ctrl+K would open its search and pull focus out of the panel
      if (evt.defaultPrevented) {
        evt.stopPropagation();
      }
      if (evt === activatingEvent) {
        return;
      }
      if (evt.defaultPrevented) {
        setStatus(\`First chord registered — press the second chord within \${SEQUENCE_TIMEOUT / 1000}s.\`);
        pending = true;
        pendingTimer = setTimeout(() => {
          pending = false;
          status.textContent = 'Sequence timed out — press the first chord again.';
        }, SEQUENCE_TIMEOUT);
        return;
      }
      if (pending) {
        setStatus('Sequence cancelled.');
      }
    };
    const handleFocusOut = (evt: FocusEvent): void => {
      if ((evt.currentTarget as HTMLElement).contains(evt.relatedTarget as Node | null)) {
        return;
      }
      setStatus(UNFOCUSED);
    };
    const handleComment = handleSequence('comment', 'Ctrl+K > Ctrl+C');
    const handleUncomment = handleSequence('uncomment', 'Ctrl+K > Ctrl+U');
    const handleToggle = handleSequence('toggle', 'Ctrl+/');
    return html\`
      <div @keydown=\${handleChordProgress}>
        <div
          forge-keyboard-shortcut-scope
          tabindex="-1"
          style="border: 1px solid var(--forge-theme-outline); padding: 16px;"
          @forge-keyboard-shortcut-activate=\${recordActivation}
          @focusin=\${() => setStatus(FOCUSED)}
          @focusout=\${handleFocusOut}>
          <p>Multi-step keyboard sequences with chords separated by a space:</p>
          <ul>
            <li><kbd>Ctrl+K</kbd> then <kbd>Ctrl+C</kbd> — Comment selection</li>
            <li><kbd>Ctrl+K</kbd> then <kbd>Ctrl+U</kbd> — Uncomment selection</li>
            <li><kbd>Ctrl+/</kbd> — Toggle comment (single chord alternative)</li>
          </ul>
          <p>After pressing the first chord, you have 1 second to press the second chord.</p>
          <div style="display: flex; gap: 8px;">
            <forge-button id="seq-comment-btn" variant="outlined" @click=\${handleComment}>Comment</forge-button>
            <forge-keyboard-shortcut
              key="Control+k Control+c"
              anchor="seq-comment-btn"
              @forge-keyboard-shortcut-activate=\${handleComment}></forge-keyboard-shortcut>

            <forge-button id="seq-uncomment-btn" variant="outlined" @click=\${handleUncomment}>Uncomment</forge-button>
            <forge-keyboard-shortcut
              key="Control+k Control+u"
              anchor="seq-uncomment-btn"
              @forge-keyboard-shortcut-activate=\${handleUncomment}></forge-keyboard-shortcut>

            <forge-button id="seq-toggle-btn" variant="outlined" @click=\${handleToggle}>Toggle</forge-button>
            <forge-keyboard-shortcut key="Control+/" anchor="seq-toggle-btn" @forge-keyboard-shortcut-activate=\${handleToggle}></forge-keyboard-shortcut>
          </div>
          <p>\${status}</p>
        </div>
      </div>
    \`;
  }
}`,...s.parameters?.docs?.source}}};const O=["Demo","ScopedEditors","GlobalShortcut","KeySequence"],Q=Object.freeze(Object.defineProperty({__proto__:null,Demo:a,GlobalShortcut:d,KeySequence:s,ScopedEditors:l,__namedExportsOrder:O,default:K},Symbol.toStringTag,{value:"Module"}));export{a as D,d as G,Q as K,l as S,s as a};
