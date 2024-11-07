import"./lit-element-Dk2-kgKT.js";import{k as m,D as l}from"./lit-html-DZH-Jm0H.js";import{s as p}from"./style-map-DxfbqtuX.js";import{b as c,g as d}from"./utils-CkdzhxtS.js";import"./constants-DjE6emXm.js";import"./skip-link-CpnXO3q_.js";const r="forge-skip-link",u={title:"Components/Skip Link",component:r,render:e=>{const o=c(e),a=o?p(o):l;return m`
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
    `},parameters:{actions:{disable:!0}},argTypes:{...d({tagName:r,controls:{theme:{control:"select",options:["default","primary","secondary","tertiary","success","error","warning","info"]},muted:{control:"boolean"},persistent:{control:"boolean"},inline:{control:"boolean"}}})},args:{theme:"default",muted:!1,persistent:!1,inline:!1}},t={};var s,n,i;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(i=(n=t.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const f=["Demo"],v=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:f,default:u},Symbol.toStringTag,{value:"Module"}));export{t as D,v as S};
