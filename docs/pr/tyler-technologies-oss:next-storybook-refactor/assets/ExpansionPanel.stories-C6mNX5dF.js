import{x as g,T as x}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as f}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{a as v,g as y}from"./constants-DbTVzGEo.js";import{o as T}from"./style-map-CkvVWuL1.js";import{n as $,e as L}from"./ref-BHUNCdUQ.js";import"./expansion-panel-rVkpI7lI.js";import"./open-icon-CjBJW9UF.js";import"./card-YglgFion.js";const s="forge-expansion-panel",h=f("forge-expansion-panel-toggle"),E=f("forge-expansion-panel-animation-complete"),V={title:"Components/Expansion Panel",component:s,render:e=>{const i=v(e),r=i?T(i):x,t=L();function b(q){var a;h(),(a=t.value)==null||a.setAttribute("aria-expanded",q.detail.toString())}return g`
      <forge-expansion-panel
        .open=${e.open}
        .animationType=${e.animationType}
        .orientation=${e.orientation}
        style=${r}
        @forge-expansion-panel-toggle=${b}
        @forge-expansion-panel-animation-complete=${E}>
        <button ${$(t)} slot="header" type="button" aria-expanded=${e.open} aria-controls="content">Toggle</button>
        <div id="content" role="group">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla quod corporis similique consequuntur facere laborum veniam error eius.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla quod corporis similique consequuntur facere laborum veniam error eius.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla quod corporis similique consequuntur facere laborum veniam error eius.</p>
        </div>
      </forge-expansion-panel>
    `},argTypes:{...y({tagName:s,controls:{orientation:{control:"select",options:["horizontal","vertical"]},animationType:{control:"select",options:["default","none"]}}})},args:{open:!1,orientation:"vertical",animationType:"default"}},o={},n={render:({open:e,animationType:i,orientation:r})=>g`
      <forge-card>
        <forge-expansion-panel .open=${e} .animationType=${i} .orientation=${r}>
          <div slot="header" role="button" tabindex="0" style="display: flex; justify-content: space-between;">
            <div>Header text</div>
            <forge-open-icon></forge-open-icon>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla quod corporis similique consequuntur facere laborum veniam error eius.</p>
        </forge-expansion-panel>
      </forge-card>
    `};var u,p,l;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(l=(p=o.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var m,c,d;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla quod corporis similique consequuntur facere laborum veniam error eius.</p>
        </forge-expansion-panel>
      </forge-card>
    \`;
  }
}`,...(d=(c=n.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const A=["Demo","WithCard"],H=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,WithCard:n,__namedExportsOrder:A,default:V},Symbol.toStringTag,{value:"Module"}));export{o as D,H as E};
