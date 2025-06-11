import{E,x as u}from"./iframe-DR_NrJWq.js";import{g as O,s as A,a as P}from"./utils-CwQ2mEzo.js";import{o as R}from"./style-map-BfZov6hb.js";import{n as _,e as h}from"./ref-BYG0RNTX.js";import{e as V}from"./class-map-DX3H7TE8.js";import"./feature-detection-CY6TVbRZ.js";import"./expansion-panel-D_Sh7JhR.js";import"./index-CiLSBptl.js";import"./card-F9a7MO8H.js";const{action:C}=__STORYBOOK_MODULE_ACTIONS__,d="forge-expansion-panel",j=C("forge-expansion-panel-toggle"),H=C("forge-expansion-panel-animation-complete"),W={title:"Components/Expansion Panel",component:d,render:e=>{const n=P(e),o=n?R(n):E,t=h();function p(l){var c;j(),(c=t.value)==null||c.setAttribute("aria-expanded",l.detail.toString())}return u`
      <forge-expansion-panel
        .open=${e.open}
        .animationType=${e.animationType}
        .orientation=${e.orientation}
        style=${o}
        @forge-expansion-panel-toggle=${p}
        @forge-expansion-panel-animation-complete=${H}>
        <button ${_(t)} slot="header" type="button" aria-expanded=${e.open} aria-controls="content">Toggle</button>
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
    `},argTypes:{...O({tagName:d,controls:{orientation:{control:"select",options:["horizontal","vertical"]},animationType:{control:"select",options:["default","none"]}}})},args:{open:!1,orientation:"vertical",animationType:"default"}},r={},i={render:({open:e,animationType:n,orientation:o})=>u`
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
    `},a={...A,render:()=>u`<button id="button-id">Toggle</button>
      <forge-card>
        <forge-expansion-panel trigger="button-id">
          <div slot="header" role="button" tabindex="0" style="display: flex; justify-content: space-between;">
            <div>Header text</div>
            <forge-open-icon></forge-open-icon>
          </div>
          <p>Content text</p>
        </forge-expansion-panel>
      </forge-card>`},s={parameters:{controls:{include:["open"]}},render:({open:e})=>{const n=h();return u`
      <button
        type="button"
        aria-expanded=${e}
        id="my-button"
        @click=${o=>{var p,l;const t=!((p=n.value)!=null&&p.classList.contains("forge-expansion-panel--open"));o.target.setAttribute("aria-expanded",`${t}`),(l=n.value)==null||l.classList.toggle("forge-expansion-panel--open",t)}}>
        Toggle
      </button>
      <div
        ${_(n)}
        class=${V({"forge-expansion-panel":!0,"forge-expansion-panel--open":e})}>
        <div class="forge-expansion-panel__content">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae recusandae ullam facilis ipsa deleniti temporibus modi nam, eveniet, dolore aut rem,
          tempore excepturi! Porro corporis culpa quis modi ab corrupti?
        </div>
      </div>
    `}};var m,g,f;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(f=(g=r.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var b,x,v;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(v=(x=i.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var y,q,$;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...($=(q=a.parameters)==null?void 0:q.docs)==null?void 0:$.source}}};var T,L,S;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(S=(L=s.parameters)==null?void 0:L.docs)==null?void 0:S.source}}};const w=["Demo","WithCard","WithUnslottedButton","CSSOnly"],K=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:s,Demo:r,WithCard:i,WithUnslottedButton:a,__namedExportsOrder:w,default:W},Symbol.toStringTag,{value:"Module"}));export{s as C,r as D,K as E,i as W,a};
