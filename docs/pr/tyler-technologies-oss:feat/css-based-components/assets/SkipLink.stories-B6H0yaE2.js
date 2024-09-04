import{x as l,T as m}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{o as p}from"./style-map-D0ILlpbs.js";import{b as c,g as d}from"./utils-DnAZaZRm.js";import"./constants-DjE6emXm.js";import"./skip-link-DZ8VMP9K.js";const r="forge-skip-link",u={title:"Components/Skip Link",component:r,render:e=>{const o=c(e),a=o?p(o):m;return l`
      <forge-skip-link
        .target=${e.target}
        .theme=${e.theme}
        .muted=${e.muted}
        .persistent=${e.persistent}
        .inline=${e.inline}
        style=${a}></forge-skip-link>
    `},parameters:{actions:{disable:!0}},argTypes:{...d({tagName:r,controls:{target:{control:"text"},theme:{control:"select",options:["default","primary","secondary","tertiary","success","error","warning","info"]},muted:{control:"boolean"},persistent:{control:"boolean"},inline:{control:"boolean"}}})},args:{target:"main-content",theme:"default",muted:!1,persistent:!1,inline:!1}},t={};var n,s,i;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(s=t.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const f=["Demo"],$=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:f,default:u},Symbol.toStringTag,{value:"Module"}));export{t as D,$ as S};
