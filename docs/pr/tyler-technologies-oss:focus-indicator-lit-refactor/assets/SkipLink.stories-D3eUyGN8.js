import{E as l,x as m}from"./iframe-Dusku7t3.js";import{o as c}from"./style-map-C8mGDCe8.js";import{g as p,a as d}from"./utils-D0zOu5id.js";import"./service-adapter-BykFeYYZ.js";import"./skip-link-CK1TOyBG.js";const r="forge-skip-link",u={title:"Components/Skip Link",tags:["new"],component:r,render:e=>{const o=d(e),a=o?c(o):l;return m`
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
    `},parameters:{actions:{disable:!0}},argTypes:{...p({tagName:r,controls:{theme:{control:"select",options:["default","primary","secondary","tertiary","success","error","warning","info"]},muted:{control:"boolean"},persistent:{control:"boolean"},inline:{control:"boolean"}}})},args:{theme:"default",muted:!1,persistent:!1,inline:!1}},t={};var n,s,i;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(s=t.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const f=["Demo"],_=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:f,default:u},Symbol.toStringTag,{value:"Module"}));export{t as D,_ as S};
