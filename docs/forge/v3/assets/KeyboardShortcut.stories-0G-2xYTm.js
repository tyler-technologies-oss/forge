import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-CebKObJP.js";import{m as i,s as a}from"./utils-C3ow8Ikc.js";import{t as o}from"./button-DoiHRyaz.js";import{t as s}from"./text-field-Ba2hY42s.js";import{t as c}from"./keyboard-shortcut-jatGmsnw.js";var l=t({Demo:()=>b,GlobalShortcut:()=>S,KeySequence:()=>C,ScopedEditors:()=>x,__namedExportsOrder:()=>w,default:()=>y}),u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{r(),i(),o(),c(),s(),{action:u}=__STORYBOOK_MODULE_ACTIONS__,d=`forge-keyboard-shortcut`,f=5e3,p=[`Alt`,`AltGraph`,`CapsLock`,`Control`,`Meta`,`NumLock`,`ScrollLock`,`Shift`],m=e=>p.includes(e.key),h=u(`forge-keyboard-shortcut-activate`),g=u(`activateCallback`),_={parameters:{controls:{disable:!0}}},v=e=>{let t=document.createElement(`div`);return t.setAttribute(`aria-live`,`polite`),t.textContent=e,t},y={title:`Components/Keyboard Shortcut`,render:e=>n`
      <div forge-keyboard-shortcut-scope @forge-keyboard-shortcut-activate=${e=>{h(e),alert(`Keyboard shortcut activated`)}}>
        <forge-button id="demo-shortcut-target" variant="raised">Shortcut target (${e.key})</forge-button>
        <forge-keyboard-shortcut
          anchor="demo-shortcut-target"
          .activateCallback=${g}
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
    `,component:d,argTypes:{...a({tagName:d,exclude:[`activateCallback`,`keyBinding`,`target`,`anchor`,`anchorElement`,`scope`,`scopeElement`],controls:{action:{control:`select`,options:[`default`,`click`]},anchorAccessibility:{control:`select`,options:[`auto`,`none`]}}})},args:{key:`a`,global:!1,allowWhileTyping:!1,allowRepeat:!1,fallthrough:!1,preventDefault:!0,capture:!1,useCode:!1,disabled:!1,action:`click`,anchorAccessibility:`auto`}},b={},x={..._,render:()=>{let e=v(`Focus an editor, then press Ctrl+B / Cmd+B.`),t=t=>()=>{u(t)(`clicked`),e.textContent=`${t} activated.`};return n`
      <div>
        <div style="display: flex; gap: 16px;">
          <div forge-keyboard-shortcut-scope tabindex="-1" style="border: 1px solid var(--forge-theme-outline); padding: 16px; flex: 1;">
            <p>Editor 1 — press Ctrl+B / Cmd+B</p>
            <forge-text-field>
              <label>Editor 1 Content</label>
              <textarea></textarea>
            </forge-text-field>
            <br />
            <forge-button id="bold-1" variant="outlined" @click=${t(`bold-1`)}>Bold</forge-button>
            <forge-keyboard-shortcut key="mod+b" anchor="bold-1" allow-while-typing .action=${`click`}></forge-keyboard-shortcut>
          </div>
          <div forge-keyboard-shortcut-scope tabindex="-1" style="border: 1px solid var(--forge-theme-outline); padding: 16px; flex: 1;">
            <p>Editor 2 — press Ctrl+B / Cmd+B</p>
            <forge-text-field>
              <label>Editor 2 Content</label>
              <textarea></textarea>
            </forge-text-field>
            <br />
            <forge-button id="bold-2" variant="outlined" @click=${t(`bold-2`)}>Bold</forge-button>
            <forge-keyboard-shortcut key="mod+b" anchor="bold-2" allow-while-typing .action=${`click`}></forge-keyboard-shortcut>
          </div>
        </div>
        <p>${e}</p>
      </div>
    `}},S={..._,render:()=>n`
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
        @forge-keyboard-shortcut-activate=${()=>{document.getElementById(`global-search`)?.focus()}}>
      </forge-keyboard-shortcut>
    </div>
  `},C={..._,render:()=>{let e=`Click inside the panel to enable the shortcuts.`,t=v(e),r,i,a=!1,o=e=>{clearTimeout(r),a=!1,t.textContent=e},s=(e,t)=>()=>{u(e)(t),o(`${e} — ${t}`)},c=e=>{i=e.detail},l=e=>{m(e)||(e.defaultPrevented&&e.stopPropagation(),e!==i&&(e.defaultPrevented?(o(`First chord registered — press the second chord within ${f/1e3}s.`),a=!0,r=setTimeout(()=>{a=!1,t.textContent=`Sequence timed out — press the first chord again.`},f)):a&&o(`Sequence cancelled.`)))},d=t=>{t.currentTarget.contains(t.relatedTarget)||o(e)},p=s(`comment`,`Ctrl+K > Ctrl+C`),h=s(`uncomment`,`Ctrl+K > Ctrl+U`),g=s(`toggle`,`Ctrl+/`);return n`
      <div @keydown=${l}>
        <div
          forge-keyboard-shortcut-scope
          tabindex="-1"
          style="border: 1px solid var(--forge-theme-outline); padding: 16px;"
          @forge-keyboard-shortcut-activate=${c}
          @focusin=${()=>o(`Panel focused — press one of the sequences above.`)}
          @focusout=${d}>
          <p>Multi-step keyboard sequences with chords separated by a space:</p>
          <ul>
            <li><kbd>Ctrl+K</kbd> then <kbd>Ctrl+C</kbd> — Comment selection</li>
            <li><kbd>Ctrl+K</kbd> then <kbd>Ctrl+U</kbd> — Uncomment selection</li>
            <li><kbd>Ctrl+/</kbd> — Toggle comment (single chord alternative)</li>
          </ul>
          <p>After pressing the first chord, you have 1 second to press the second chord.</p>
          <div style="display: flex; gap: 8px;">
            <forge-button id="seq-comment-btn" variant="outlined" @click=${p}>Comment</forge-button>
            <forge-keyboard-shortcut
              key="Control+k Control+c"
              anchor="seq-comment-btn"
              @forge-keyboard-shortcut-activate=${p}></forge-keyboard-shortcut>

            <forge-button id="seq-uncomment-btn" variant="outlined" @click=${h}>Uncomment</forge-button>
            <forge-keyboard-shortcut
              key="Control+k Control+u"
              anchor="seq-uncomment-btn"
              @forge-keyboard-shortcut-activate=${h}></forge-keyboard-shortcut>

            <forge-button id="seq-toggle-btn" variant="outlined" @click=${g}>Toggle</forge-button>
            <forge-keyboard-shortcut key="Control+/" anchor="seq-toggle-btn" @forge-keyboard-shortcut-activate=${g}></forge-keyboard-shortcut>
          </div>
          <p>${t}</p>
        </div>
      </div>
    `}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w=[`Demo`,`ScopedEditors`,`GlobalShortcut`,`KeySequence`]})))()}export{x as a,l as i,S as n,T as o,C as r,b as t};