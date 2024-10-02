import"./lit-element-Dk2-kgKT.js";import{k as l,D as m}from"./lit-html-DZH-Jm0H.js";import{s as p}from"./style-map-DxfbqtuX.js";import{b as c,g as d}from"./utils-CRuDW25z.js";import"./constants-DjE6emXm.js";import"./skip-link-BFbD7EHn.js";const r="forge-skip-link",u={title:"Components/Skip Link",component:r,render:e=>{const o=c(e),i=o?p(o):m;return l`
      <forge-skip-link
        .target=${e.target}
        .theme=${e.theme}
        .muted=${e.muted}
        .persistent=${e.persistent}
        .inline=${e.inline}
        style=${i}></forge-skip-link>
    `},parameters:{actions:{disable:!0}},argTypes:{...d({tagName:r,controls:{target:{control:"text"},theme:{control:"select",options:["default","primary","secondary","tertiary","success","error","warning","info"]},muted:{control:"boolean"},persistent:{control:"boolean"},inline:{control:"boolean"}}})},args:{target:"main-content",theme:"default",muted:!1,persistent:!1,inline:!1}},t={};var s,n,a;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(a=(n=t.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const f=["Demo"],$=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:f,default:u},Symbol.toStringTag,{value:"Module"}));export{t as D,$ as S};
