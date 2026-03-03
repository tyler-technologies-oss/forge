import{b as p,A as b}from"./iframe-B1rDg3rc.js";import{s as x,g as q,b as v}from"./utils-dyGV7reF.js";import{o as y}from"./style-map-yQANZLc0.js";import{n as c,e as m}from"./ref-DeV6-h_u.js";import{e as $}from"./class-map-BHZp-y-a.js";import"./service-adapter-CoGDs2_3.js";import"./expansion-panel-C3GW3TPs.js";import"./open-icon-C85rqQKN.js";import"./card-CXNgjeRn.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,l="forge-expansion-panel",L=d("forge-expansion-panel-toggle"),T=d("forge-expansion-panel-animation-complete"),h={title:"Components/Expansion Panel",component:l,render:e=>{const n=v(e),o=n?y(n):b,i=m();function g(f){L(),i.value?.setAttribute("aria-expanded",f.detail.toString())}return p`
      <forge-expansion-panel
        .open=${e.open}
        .animationType=${e.animationType}
        .orientation=${e.orientation}
        style=${o}
        @forge-expansion-panel-toggle=${g}
        @forge-expansion-panel-animation-complete=${T}>
        <button ${c(i)} slot="header" type="button" aria-expanded=${e.open} aria-controls="content">Toggle</button>
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
    `},argTypes:{...q({tagName:l,controls:{orientation:{control:"select",options:["horizontal","vertical"]},animationType:{control:"select",options:["default","none"]}}})},args:{open:!1,orientation:"vertical",animationType:"default"}},t={},r={render:({open:e,animationType:n,orientation:o})=>p`
    <forge-card>
      <forge-expansion-panel .open=${e} .animationType=${n} .orientation=${o}>
        <div slot="header" role="button" tabindex="0" style="display: flex; justify-content: space-between;">
          <div>Header text</div>
          <forge-open-icon></forge-open-icon>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla
          quod corporis similique consequuntur facere laborum veniam error eius.
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
      </forge-card>`},s={render:({animationType:e,orientation:n})=>p`
    <forge-expansion-panel name="panel-group" .animationType=${e} .orientation=${n}>
      <button slot="header">Panel 1</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla
        quod corporis similique consequuntur facere laborum veniam error eius.
      </p>
    </forge-expansion-panel>
    <forge-expansion-panel name="panel-group" .animationType=${e} .orientation=${n}>
      <button slot="header">Panel 2</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla
        quod corporis similique consequuntur facere laborum veniam error eius.
      </p>
    </forge-expansion-panel>
    <forge-expansion-panel name="panel-group" .animationType=${e} .orientation=${n}>
      <button slot="header">Panel 3</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla
        quod corporis similique consequuntur facere laborum veniam error eius.
      </p>
    </forge-expansion-panel>
  `},u={parameters:{controls:{include:["open"]}},render:({open:e})=>{const n=m();return p`
      <button
        type="button"
        aria-expanded=${e}
        id="my-button"
        @click=${o=>{const i=!n.value?.classList.contains("forge-expansion-panel--open");o.target.setAttribute("aria-expanded",`${i}`),n.value?.classList.toggle("forge-expansion-panel--open",i)}}>
        Toggle
      </button>
      <div
        ${c(n)}
        class=${$({"forge-expansion-panel":!0,"forge-expansion-panel--open":e})}>
        <div class="forge-expansion-panel__content">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae recusandae ullam facilis ipsa deleniti temporibus modi nam, eveniet, dolore aut rem,
          tempore excepturi! Porro corporis culpa quis modi ab corrupti?
        </div>
      </div>
    `}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: ({
    open,
    animationType,
    orientation
  }) => html\`
    <forge-card>
      <forge-expansion-panel .open=\${open} .animationType=\${animationType} .orientation=\${orientation}>
        <div slot="header" role="button" tabindex="0" style="display: flex; justify-content: space-between;">
          <div>Header text</div>
          <forge-open-icon></forge-open-icon>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla
          quod corporis similique consequuntur facere laborum veniam error eius.
        </p>
      </forge-expansion-panel>
    </forge-card>
  \`
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`<button id="button-id">Toggle</button>
      <forge-card>
        <forge-expansion-panel trigger="button-id">
          <div slot="header" role="button" tabindex="0" style="display: flex; justify-content: space-between;">
            <div>Header text</div>
            <forge-open-icon></forge-open-icon>
          </div>
          <p>Content text</p>
        </forge-expansion-panel>
      </forge-card>\`
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: ({
    animationType,
    orientation
  }) => html\`
    <forge-expansion-panel name="panel-group" .animationType=\${animationType} .orientation=\${orientation}>
      <button slot="header">Panel 1</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla
        quod corporis similique consequuntur facere laborum veniam error eius.
      </p>
    </forge-expansion-panel>
    <forge-expansion-panel name="panel-group" .animationType=\${animationType} .orientation=\${orientation}>
      <button slot="header">Panel 2</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla
        quod corporis similique consequuntur facere laborum veniam error eius.
      </p>
    </forge-expansion-panel>
    <forge-expansion-panel name="panel-group" .animationType=\${animationType} .orientation=\${orientation}>
      <button slot="header">Panel 3</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla
        quod corporis similique consequuntur facere laborum veniam error eius.
      </p>
    </forge-expansion-panel>
  \`
}`,...s.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};const S=["Demo","WithCard","WithUnslottedButton","NamedGroup","CSSOnly"],H=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:u,Demo:t,NamedGroup:s,WithCard:r,WithUnslottedButton:a,__namedExportsOrder:S,default:h},Symbol.toStringTag,{value:"Module"}));export{u as C,t as D,H as E,s as N,r as W,a};
