import"./lit-element-JplMEnZc.js";import{x as u,E as S}from"./lit-html-paDGiEfB.js";import{a as $}from"./index-Cf3axooF.js";import{b as E,g as _}from"./utils-DWPQW4DQ.js";import{o as h}from"./style-map-C9nPWcxA.js";import{n as L,e as T}from"./ref-DJjbfkOF.js";import{e as C}from"./class-map-D55lQyt8.js";import"./feature-detection-DRCh51Sa.js";import"./expansion-panel-ZMnNMdaj.js";import"./card-C10NOeAn.js";const c="forge-expansion-panel",A=$("forge-expansion-panel-toggle"),R=$("forge-expansion-panel-animation-complete"),V={title:"Components/Expansion Panel",component:c,render:e=>{const n=E(e),o=n?h(n):S,t=T();function s(p){var l;A(),(l=t.value)==null||l.setAttribute("aria-expanded",p.detail.toString())}return u`
      <forge-expansion-panel
        .open=${e.open}
        .animationType=${e.animationType}
        .orientation=${e.orientation}
        style=${o}
        @forge-expansion-panel-toggle=${s}
        @forge-expansion-panel-animation-complete=${R}>
        <button ${L(t)} slot="header" type="button" aria-expanded=${e.open} aria-controls="content">Toggle</button>
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
    `},argTypes:{..._({tagName:c,controls:{orientation:{control:"select",options:["horizontal","vertical"]},animationType:{control:"select",options:["default","none"]}}})},args:{open:!1,orientation:"vertical",animationType:"default"}},i={},r={render:({open:e,animationType:n,orientation:o})=>u`
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
    `},a={parameters:{controls:{include:["open"]}},render:({open:e})=>{const n=T();return u`
      <button
        type="button"
        aria-expanded=${e}
        id="my-button"
        @click=${o=>{var s,p;const t=!((s=n.value)!=null&&s.classList.contains("forge-expansion-panel--open"));o.target.setAttribute("aria-expanded",`${t}`),(p=n.value)==null||p.classList.toggle("forge-expansion-panel--open",t)}}>
        Toggle
      </button>
      <div
        ${L(n)}
        class=${C({"forge-expansion-panel":!0,"forge-expansion-panel--open":e})}>
        <div class="forge-expansion-panel__content">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae recusandae ullam facilis ipsa deleniti temporibus modi nam, eveniet, dolore aut rem,
          tempore excepturi! Porro corporis culpa quis modi ab corrupti?
        </div>
      </div>
    `}};var m,d,g;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(g=(d=i.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var f,b,x;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(x=(b=r.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var v,q,y;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(y=(q=a.parameters)==null?void 0:q.docs)==null?void 0:y.source}}};const P=["Demo","WithCard","CSSOnly"],B=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:i,WithCard:r,__namedExportsOrder:P,default:V},Symbol.toStringTag,{value:"Module"}));export{a as C,i as D,B as E,r as W};
