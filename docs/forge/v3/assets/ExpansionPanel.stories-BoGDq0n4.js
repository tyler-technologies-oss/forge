import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CebKObJP.js";import{_ as a,l as o,m as s,s as c}from"./utils-C3ow8Ikc.js";import{t as l}from"./class-map-DEew1OiS.js";import{t as u}from"./class-map-8zp5OV2u.js";import{t as d}from"./open-icon-Dfx9GFw4.js";import{t as f}from"./expansion-panel-lNIHr9B5.js";import{r as p,t as m}from"./style-map-C_WKUe4Y.js";import{i as h,n as g,t as _}from"./ref-DN8O4ptj.js";import{t as v}from"./card-CQv5a3n_.js";var y=t({CSSOnly:()=>k,Demo:()=>T,NamedGroup:()=>O,WithCard:()=>E,WithUnslottedButton:()=>D,__namedExportsOrder:()=>A,default:()=>w}),b,x,S,C,w,T,E,D,O,k,A;function j(){return(j=e((()=>{i(),s(),m(),_(),u(),f(),v(),d(),{action:b}=__STORYBOOK_MODULE_ACTIONS__,x=`forge-expansion-panel`,S=b(`forge-expansion-panel-toggle`),C=b(`forge-expansion-panel-animation-complete`),w={title:`Components/Expansion Panel`,component:x,render:e=>{let t=o(e),i=t?p(t):r,a=g();function s(e){S(),a.value?.setAttribute(`aria-expanded`,e.detail.toString())}return n`
      <forge-expansion-panel
        .open=${e.open}
        .animationType=${e.animationType}
        .orientation=${e.orientation}
        style=${i}
        @forge-expansion-panel-toggle=${s}
        @forge-expansion-panel-animation-complete=${C}>
        <button ${h(a)} slot="header" type="button" aria-expanded=${e.open} aria-controls="content">Toggle</button>
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
    `},argTypes:{...c({tagName:x,controls:{orientation:{control:`select`,options:[`horizontal`,`vertical`]},animationType:{control:`select`,options:[`default`,`none`]}}})},args:{open:!1,orientation:`vertical`,animationType:`default`}},T={},E={render:({open:e,animationType:t,orientation:r})=>n`
    <forge-card>
      <forge-expansion-panel .open=${e} .animationType=${t} .orientation=${r}>
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
  `},D={...a,render:()=>n`<button id="button-id">Toggle</button>
      <forge-card>
        <forge-expansion-panel trigger="button-id">
          <div slot="header" role="button" tabindex="0" style="display: flex; justify-content: space-between;">
            <div>Header text</div>
            <forge-open-icon></forge-open-icon>
          </div>
          <p>Content text</p>
        </forge-expansion-panel>
      </forge-card>`},O={render:({animationType:e,orientation:t})=>n`
    <forge-expansion-panel name="panel-group" .animationType=${e} .orientation=${t}>
      <button slot="header">Panel 1</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla
        quod corporis similique consequuntur facere laborum veniam error eius.
      </p>
    </forge-expansion-panel>
    <forge-expansion-panel name="panel-group" .animationType=${e} .orientation=${t}>
      <button slot="header">Panel 2</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla
        quod corporis similique consequuntur facere laborum veniam error eius.
      </p>
    </forge-expansion-panel>
    <forge-expansion-panel name="panel-group" .animationType=${e} .orientation=${t}>
      <button slot="header">Panel 3</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla
        quod corporis similique consequuntur facere laborum veniam error eius.
      </p>
    </forge-expansion-panel>
  `},k={parameters:{controls:{include:[`open`]}},render:({open:e})=>{let t=g();return n`
      <button
        type="button"
        aria-expanded=${e}
        id="my-button"
        @click=${e=>{let n=!t.value?.classList.contains(`forge-expansion-panel--open`);e.target.setAttribute(`aria-expanded`,`${n}`),t.value?.classList.toggle(`forge-expansion-panel--open`,n)}}>
        Toggle
      </button>
      <div
        ${h(t)}
        class=${l({"forge-expansion-panel":!0,"forge-expansion-panel--open":e})}>
        <div class="forge-expansion-panel__content">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae recusandae ullam facilis ipsa deleniti temporibus modi nam, eveniet, dolore aut rem,
          tempore excepturi! Porro corporis culpa quis modi ab corrupti?
        </div>
      </div>
    `}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}},A=[`Demo`,`WithCard`,`WithUnslottedButton`,`NamedGroup`,`CSSOnly`]})))()}export{E as a,O as i,T as n,D as o,y as r,j as s,k as t};