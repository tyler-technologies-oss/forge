import"./lit-element-JplMEnZc.js";import{x as m,E as l}from"./lit-html-paDGiEfB.js";import{o as p}from"./style-map-C9nPWcxA.js";import{b as c,g as d}from"./utils-DyehaB2W.js";import"./feature-detection-ONR9WHvu.js";import"./skip-link-CPV51f4Z.js";const r="forge-skip-link",u={title:"Components/Skip Link",tags:["new"],component:r,render:e=>{const o=c(e),a=o?p(o):l;return m`
      <div>
        <forge-skip-link
          target="main-content"
          .theme=${e.theme}
          .muted=${e.muted}
          .persistent=${e.persistent}
          .inline=${e.inline}
          style=${a}></forge-skip-link>
        <div id="main-content" tabindex="0">Target</div>
      </div>
    `},parameters:{actions:{disable:!0}},argTypes:{...d({tagName:r,controls:{theme:{control:"select",options:["default","primary","secondary","tertiary","success","error","warning","info"]},muted:{control:"boolean"},persistent:{control:"boolean"},inline:{control:"boolean"}}})},args:{theme:"default",muted:!1,persistent:!1,inline:!1}},t={};var n,s,i;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(s=t.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const f=["Demo"],v=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:f,default:u},Symbol.toStringTag,{value:"Module"}));export{t as D,v as S};
