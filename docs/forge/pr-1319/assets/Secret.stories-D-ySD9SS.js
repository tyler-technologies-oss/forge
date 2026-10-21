import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CuAvrKn_.js";import{_ as a,l as o,m as s,o as c,s as l}from"./utils-Cppiha4b.js";import{t as u}from"./icon-button-Dibkr9Dk.js";import{t as d}from"./tooltip-Ke7Idkd8.js";import{t as f}from"./button-oXbpcqR0.js";import{r as p,t as m}from"./style-map-C_WKUe4Y.js";import{i as h,n as g,t as _}from"./ref-UkViCfGj.js";import{t as v}from"./secret-CP_HeGxO.js";var y=t({Block:()=>w,CssOnly:()=>T,CssOnlyBlock:()=>E,Demo:()=>S,NamedGroup:()=>C,__namedExportsOrder:()=>D,default:()=>x}),b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{i(),s(),m(),_(),v(),u(),f(),d(),b=`forge-secret`,x={title:`Components/Secret`,tags:[`new`],render:e=>{let t=o(e),n=t?p(t):r,i=c(b,e);return i.textContent=e.text,n&&i.setAttribute(`style`,String(n)),i},component:b,parameters:{actions:{disable:!0}},argTypes:{...l({tagName:b,exclude:[`name`],controls:{variant:{control:`select`,options:[`blur`,`masked`,`noise`]},buttonPosition:{control:`select`,options:[`start`,`end`]}}}),text:{control:`text`}},args:{text:`Secret content here`,open:!1,variant:`blur`,mask:``,maskCharacter:`●`,unmaskedCharacters:``,block:!1,buttonPosition:`end`,showOnHover:!1}},S={},C={...a,render:()=>n`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-secret name="secrets">Lorem ipsum</forge-secret>
      <forge-secret name="secrets">Dolor sit amet</forge-secret>
      <forge-secret name="secrets">Consectetur adipiscing elit</forge-secret>
    </div>
  `},w={...a,render:()=>n`
    <forge-secret block>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </forge-secret>
  `},T={...a,render:()=>{let e=g(),t=g();return n`
      <span ${h(e)} class="forge-secret forge-secret--blur" id="css-only-secret" role="group" aria-label="Secret">
        <span class="forge-secret__content" inert>Secret content here</span>
        <forge-icon-button
          ${h(t)}
          @click=${()=>{let n=e.value,r=t.value;if(!n||!r)return;let i=r.getAttribute(`aria-expanded`)!==`true`;r.setAttribute(`aria-expanded`,i.toString());let a=n.querySelector(`.forge-secret__content`);a&&a.toggleAttribute(`inert`,!i);let o=r.querySelector(`forge-icon`);o&&(o.name=i?`eye_closed`:`eye_outline`);let s=n.querySelector(`forge-tooltip`);s&&(s.textContent=i?`Hide`:`Show`)}}
          class="forge-secret__button"
          aria-labelledby="css-only-secret"
          aria-expanded="false"
          aria-controls="css-only-secret">
          <forge-icon class="forge-secret__icon" name="eye_outline"></forge-icon>
        </forge-icon-button>
        <forge-tooltip position="top">Show</forge-tooltip>
      </span>
    `}},E={...a,render:()=>{let e=g(),t=g();return n`
      <div ${h(e)} class="forge-secret forge-secret--block forge-secret--blur" id="css-only-block-secret" role="group" aria-label="Secret">
        <div class="forge-secret__content" inert>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <forge-button ${h(t)} @click=${()=>{let n=e.value,r=t.value;if(!n||!r)return;let i=r.getAttribute(`aria-expanded`)!==`true`;r.setAttribute(`aria-expanded`,i.toString());let a=n.querySelector(`.forge-secret__content`);a&&a.toggleAttribute(`inert`,!i);let o=r.querySelector(`forge-icon`);o&&(o.name=i?`eye_closed`:`eye_outline`);let s=r.querySelector(`span`);s&&(s.textContent=i?`Hide`:`Show`)}} class="forge-secret__text-button" aria-expanded="false" aria-controls="css-only-block-secret">
          <forge-icon class="forge-secret__icon" name="eye_outline"></forge-icon>
          <span>Show</span>
        </forge-button>
      </div>
    `}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-secret name="secrets">Lorem ipsum</forge-secret>
      <forge-secret name="secrets">Dolor sit amet</forge-secret>
      <forge-secret name="secrets">Consectetur adipiscing elit</forge-secret>
    </div>
  \`
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-secret block>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </forge-secret>
  \`
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const secretRef: Ref<HTMLElement> = createRef();
    const buttonRef: Ref<HTMLElement> = createRef();
    const handleClick = (): void => {
      const secret = secretRef.value;
      const button = buttonRef.value;
      if (!secret || !button) {
        return;
      }
      const isExpanded = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', isExpanded.toString());
      const content = secret.querySelector('.forge-secret__content');
      if (content) {
        content.toggleAttribute('inert', !isExpanded);
      }
      const icon = button.querySelector('forge-icon');
      if (icon) {
        icon.name = isExpanded ? 'eye_closed' : 'eye_outline';
      }
      const tooltip = secret.querySelector('forge-tooltip');
      if (tooltip) {
        tooltip.textContent = isExpanded ? 'Hide' : 'Show';
      }
    };
    return html\`
      <span \${ref(secretRef)} class="forge-secret forge-secret--blur" id="css-only-secret" role="group" aria-label="Secret">
        <span class="forge-secret__content" inert>Secret content here</span>
        <forge-icon-button
          \${ref(buttonRef)}
          @click=\${handleClick}
          class="forge-secret__button"
          aria-labelledby="css-only-secret"
          aria-expanded="false"
          aria-controls="css-only-secret">
          <forge-icon class="forge-secret__icon" name="eye_outline"></forge-icon>
        </forge-icon-button>
        <forge-tooltip position="top">Show</forge-tooltip>
      </span>
    \`;
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const secretRef: Ref<HTMLElement> = createRef();
    const buttonRef: Ref<HTMLElement> = createRef();
    const handleClick = (): void => {
      const secret = secretRef.value;
      const button = buttonRef.value;
      if (!secret || !button) {
        return;
      }
      const isExpanded = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', isExpanded.toString());
      const content = secret.querySelector('.forge-secret__content');
      if (content) {
        content.toggleAttribute('inert', !isExpanded);
      }
      const icon = button.querySelector('forge-icon');
      if (icon) {
        icon.name = isExpanded ? 'eye_closed' : 'eye_outline';
      }
      const span = button.querySelector('span');
      if (span) {
        span.textContent = isExpanded ? 'Hide' : 'Show';
      }
    };
    return html\`
      <div \${ref(secretRef)} class="forge-secret forge-secret--block forge-secret--blur" id="css-only-block-secret" role="group" aria-label="Secret">
        <div class="forge-secret__content" inert>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <forge-button \${ref(buttonRef)} @click=\${handleClick} class="forge-secret__text-button" aria-expanded="false" aria-controls="css-only-block-secret">
          <forge-icon class="forge-secret__icon" name="eye_outline"></forge-icon>
          <span>Show</span>
        </forge-button>
      </div>
    \`;
  }
}`,...E.parameters?.docs?.source}}},D=[`Demo`,`NamedGroup`,`Block`,`CssOnly`,`CssOnlyBlock`]})))()}export{C as a,S as i,T as n,y as o,E as r,O as s,w as t};