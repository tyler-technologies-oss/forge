import{x as g}from"./lit-element-Co407TGG.js";import"./lit-html-Cxzf5Fb2.js";import{a as d}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{c as f,a as v}from"./constants-DyS6XWk2.js";import"./expansion-panel-yGlp7Jdm.js";import"./card-BKl1SyCN.js";const a="forge-expansion-panel",b=d("forge-expansion-panel-toggle"),q=d("forge-expansion-panel-animation-complete"),x={title:"Components/Expansion Panel",component:a,render:r=>{const n=f(a,r),e=document.createElement("button");e.slot="header",e.textContent="Toggle",e.setAttribute("type","button"),e.setAttribute("aria-expanded","false"),e.setAttribute("aria-controls","content"),n.appendChild(e);const i=document.createElement("div");return i.id="content",i.setAttribute("role","group"),i.innerHTML=`
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet a, minima vero perferendis, neque tempora amet qui blanditiis cumque, nulla deserunt quo veniam facere aspernatur fuga fugit? Perferendis, et eligendi?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet a, minima vero perferendis, neque tempora amet qui blanditiis cumque, nulla deserunt quo veniam facere aspernatur fuga fugit? Perferendis, et eligendi?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet a, minima vero perferendis, neque tempora amet qui blanditiis cumque, nulla deserunt quo veniam facere aspernatur fuga fugit? Perferendis, et eligendi?</p>
    `,n.appendChild(i),n.addEventListener("forge-expansion-panel-toggle",b),n.addEventListener("forge-expansion-panel-animation-complete",q),n},argTypes:{...v({tagName:a,controls:{orientation:{control:"select",options:["horizontal","vertical"]},animationType:{control:"select",options:["default","none"]}}})},args:{open:!1,orientation:"vertical",animationType:"default"}},t={},o={render:({open:r,animationType:n,orientation:e})=>g`
      <forge-card>
        <forge-expansion-panel .open=${r} .animationType=${n} .orientation=${e}>
          <div slot="header" role="button" tabindex="0" style="display: flex; justify-content: space-between;">
            <div>Header text</div>
            <forge-open-icon></forge-open-icon>
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis minus ut illum corporis incidunt quod temporibus consequatur rem! Libero rem nulla quod corporis similique consequuntur facere laborum veniam error eius.</p>
        </forge-expansion-panel>
      </forge-card>
    `};var s,p,u;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var m,l,c;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(c=(l=o.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const y=["Demo","WithCard"],P=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,WithCard:o,__namedExportsOrder:y,default:x},Symbol.toStringTag,{value:"Module"}));export{t as D,P as E};
