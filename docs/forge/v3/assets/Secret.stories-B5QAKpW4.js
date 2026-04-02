import{b,A as _}from"./iframe-BXOKh2ua.js";import{s as x,g as S,b as v,c as q}from"./utils-QQyHyWEl.js";import{o as h}from"./style-map-BijFJRqK.js";import{n as f,e as g}from"./ref-Co0h5Efn.js";import"./service-adapter-8tADcN_b.js";import"./secret-BjE-SF6A.js";import"./icon-button-LWSA5EEi.js";import"./focus-indicator-BYmmK4Oj.js";import"./state-layer-CK5iHsfr.js";import"./tyler-icons-NX4jhktm.js";import"./button-DNvYR89W.js";import"./tooltip-C_eok51I.js";import"./overlay-CsFRuuOm.js";const y="forge-secret",k={title:"Components/Secret",tags:["new"],render:o=>{const n=v(o),s=n?h(n):_,e=q(y,o);return e.textContent=o.text,s&&e.setAttribute("style",String(s)),e},component:y,parameters:{actions:{disable:!0}},argTypes:{...S({tagName:y,exclude:["name"],controls:{variant:{control:"select",options:["blur","masked","noise"]},buttonPosition:{control:"select",options:["start","end"]}}}),text:{control:"text"}},args:{text:"Secret content here",open:!1,variant:"blur",mask:"",maskCharacter:"●",unmaskedCharacters:"",block:!1,buttonPosition:"end",showOnHover:!1}},l={},u={...x,render:()=>b`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-secret name="secrets">Lorem ipsum</forge-secret>
      <forge-secret name="secrets">Dolor sit amet</forge-secret>
      <forge-secret name="secrets">Consectetur adipiscing elit</forge-secret>
    </div>
  `},d={...x,render:()=>b`
    <forge-secret block>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </forge-secret>
  `},p={...x,render:()=>{const o=g(),n=g(),s=()=>{const e=o.value,t=n.value;if(!e||!t)return;const r=t.getAttribute("aria-expanded")!=="true";t.setAttribute("aria-expanded",r.toString());const i=e.querySelector(".forge-secret__content");i&&i.toggleAttribute("inert",!r);const a=t.querySelector("forge-icon");a&&(a.name=r?"eye_closed":"eye_outline");const c=e.querySelector("forge-tooltip");c&&(c.textContent=r?"Hide":"Show")};return b`
      <span ${f(o)} class="forge-secret forge-secret--blur" id="css-only-secret" role="group" aria-label="Secret">
        <span class="forge-secret__content" inert>Secret content here</span>
        <forge-icon-button
          ${f(n)}
          @click=${s}
          class="forge-secret__button"
          aria-labelledby="css-only-secret"
          aria-expanded="false"
          aria-controls="css-only-secret">
          <forge-icon class="forge-secret__icon" name="eye_outline"></forge-icon>
        </forge-icon-button>
        <forge-tooltip position="top">Show</forge-tooltip>
      </span>
    `}},m={...x,render:()=>{const o=g(),n=g(),s=()=>{const e=o.value,t=n.value;if(!e||!t)return;const r=t.getAttribute("aria-expanded")!=="true";t.setAttribute("aria-expanded",r.toString());const i=e.querySelector(".forge-secret__content");i&&i.toggleAttribute("inert",!r);const a=t.querySelector("forge-icon");a&&(a.name=r?"eye_closed":"eye_outline");const c=t.querySelector("span");c&&(c.textContent=r?"Hide":"Show")};return b`
      <div ${f(o)} class="forge-secret forge-secret--block forge-secret--blur" id="css-only-block-secret" role="group" aria-label="Secret">
        <div class="forge-secret__content" inert>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <forge-button ${f(n)} @click=${s} class="forge-secret__text-button" aria-expanded="false" aria-controls="css-only-block-secret">
          <forge-icon class="forge-secret__icon" name="eye_outline"></forge-icon>
          <span>Show</span>
        </forge-button>
      </div>
    `}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-secret name="secrets">Lorem ipsum</forge-secret>
      <forge-secret name="secrets">Dolor sit amet</forge-secret>
      <forge-secret name="secrets">Consectetur adipiscing elit</forge-secret>
    </div>
  \`
}`,...u.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-secret block>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </forge-secret>
  \`
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};const R=["Demo","NamedGroup","Block","CssOnly","CssOnlyBlock"],N=Object.freeze(Object.defineProperty({__proto__:null,Block:d,CssOnly:p,CssOnlyBlock:m,Demo:l,NamedGroup:u,__namedExportsOrder:R,default:k},Symbol.toStringTag,{value:"Module"}));export{d as B,p as C,l as D,u as N,N as S,m as a};
