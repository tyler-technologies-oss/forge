import{E as f,x as p}from"./iframe-C2OLFiEs.js";import{g as b,s as x,a as v}from"./utils-Cqbxq2Mi.js";import{o as y}from"./style-map-B0Mvy1fp.js";import{n as u,e as c}from"./ref-ColnIQm7.js";import{e as q}from"./class-map-iWrBTVHa.js";import"./service-adapter-CffG5Lhq.js";import"./expansion-panel-CtPm9dI4.js";import"./index-5CPwzmQS.js";import"./card-BifDCE7y.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,l="forge-expansion-panel",$=d("forge-expansion-panel-toggle"),T=d("forge-expansion-panel-animation-complete"),L={title:"Components/Expansion Panel",component:l,render:e=>{const n=v(e),o=n?y(n):f,t=c();function m(g){$(),t.value?.setAttribute("aria-expanded",g.detail.toString())}return p`
      <forge-expansion-panel
        .open=${e.open}
        .animationType=${e.animationType}
        .orientation=${e.orientation}
        style=${o}
        @forge-expansion-panel-toggle=${m}
        @forge-expansion-panel-animation-complete=${T}>
        <button ${u(t)} slot="header" type="button" aria-expanded=${e.open} aria-controls="content">Toggle</button>
        <div id="content" role="group">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem
            nulla quod corporis similique consequuntur facere laborum veniam error eius.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem
            nulla quod corporis similique consequuntur facere laborum veniam error eius.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem
            nulla quod corporis similique consequuntur facere laborum veniam error eius.
          </p>
        </div>
      </forge-expansion-panel>
    `},argTypes:{...b({tagName:l,controls:{orientation:{control:"select",options:["horizontal","vertical"]},animationType:{control:"select",options:["default","none"]}}})},args:{open:!1,orientation:"vertical",animationType:"default"}},r={},i={render:({open:e,animationType:n,orientation:o})=>p`
      <forge-card>
        <forge-expansion-panel .open=${e} .animationType=${n} .orientation=${o}>
          <div slot="header" role="button" tabindex="0" style="display: flex; justify-content: space-between;">
            <div>Header text</div>
            <forge-open-icon></forge-open-icon>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem
            nulla quod corporis similique consequuntur facere laborum veniam error eius.
          </p>
        </forge-expansion-panel>
      </forge-card>
    `},a={...x,render:()=>p`<button id="button-id">Toggle</button>
      <forge-card>
        <forge-expansion-panel trigger="button-id">
          <div slot="header" role="button" tabindex="0" style="display: flex; justify-content: space-between;">
            <div>Header text</div>
            <forge-open-icon></forge-open-icon>
          </div>
          <p>Content text</p>
        </forge-expansion-panel>
      </forge-card>`},s={parameters:{controls:{include:["open"]}},render:({open:e})=>{const n=c();return p`
      <button
        type="button"
        aria-expanded=${e}
        id="my-button"
        @click=${o=>{const t=!n.value?.classList.contains("forge-expansion-panel--open");o.target.setAttribute("aria-expanded",`${t}`),n.value?.classList.toggle("forge-expansion-panel--open",t)}}>
        Toggle
      </button>
      <div
        ${u(n)}
        class=${q({"forge-expansion-panel":!0,"forge-expansion-panel--open":e})}>
        <div class="forge-expansion-panel__content">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae recusandae ullam facilis ipsa deleniti temporibus modi nam, eveniet, dolore aut rem,
          tempore excepturi! Porro corporis culpa quis modi ab corrupti?
        </div>
      </div>
    `}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: ({
    open,
    animationType,
    orientation
  }) => {
    return html\`
      <forge-card>
        <forge-expansion-panel .open=\${open} .animationType=\${animationType} .orientation=\${orientation}>
          <div slot="header" role="button" tabindex="0" style="display: flex; justify-content: space-between;">
            <div>Header text</div>
            <forge-open-icon></forge-open-icon>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem
            nulla quod corporis similique consequuntur facere laborum veniam error eius.
          </p>
        </forge-expansion-panel>
      </forge-card>
    \`;
  }
}`,...i.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`<button id="button-id">Toggle</button>
      <forge-card>
        <forge-expansion-panel trigger="button-id">
          <div slot="header" role="button" tabindex="0" style="display: flex; justify-content: space-between;">
            <div>Header text</div>
            <forge-open-icon></forge-open-icon>
          </div>
          <p>Content text</p>
        </forge-expansion-panel>
      </forge-card>\`;
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['open']
    }
  },
  render: ({
    open
  }) => {
    const panelRef = createRef();
    return html\`
      <button
        type="button"
        aria-expanded=\${open}
        id="my-button"
        @click=\${(evt: PointerEvent) => {
      const expanded = !panelRef.value?.classList.contains('forge-expansion-panel--open');
      (evt.target as HTMLButtonElement).setAttribute('aria-expanded', \`\${expanded}\`);
      panelRef.value?.classList.toggle('forge-expansion-panel--open', expanded);
    }}>
        Toggle
      </button>
      <div
        \${ref(panelRef)}
        class=\${classMap({
      'forge-expansion-panel': true,
      'forge-expansion-panel--open': open
    })}>
        <div class="forge-expansion-panel__content">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae recusandae ullam facilis ipsa deleniti temporibus modi nam, eveniet, dolore aut rem,
          tempore excepturi! Porro corporis culpa quis modi ab corrupti?
        </div>
      </div>
    \`;
  }
}`,...s.parameters?.docs?.source}}};const S=["Demo","WithCard","WithUnslottedButton","CSSOnly"],j=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:s,Demo:r,WithCard:i,WithUnslottedButton:a,__namedExportsOrder:S,default:L},Symbol.toStringTag,{value:"Module"}));export{s as C,r as D,j as E,i as W,a};
