import{E as s,x as i}from"./iframe-C-zGdqN1.js";import{o as a}from"./style-map-5dBbmg8m.js";import{g as l,a as m}from"./utils-C6yJXN8D.js";import"./service-adapter-CffG5Lhq.js";import"./skip-link-DV2rfVou.js";const r="forge-skip-link",c={title:"Components/Skip Link",tags:["new"],component:r,render:e=>{const o=m(e),n=o?a(o):s;return i`
      <div>
        <forge-skip-link
          target="main-content"
          .theme=${e.theme}
          .muted=${e.muted}
          .persistent=${e.persistent}
          .inline=${e.inline}
          style=${n}></forge-skip-link>
        <div id="main-content" tabindex="0">Target</div>
      </div>
    `},parameters:{actions:{disable:!0}},argTypes:{...l({tagName:r,controls:{theme:{control:"select",options:["default","primary","secondary","tertiary","success","error","warning","info"]},muted:{control:"boolean"},persistent:{control:"boolean"},inline:{control:"boolean"}}})},args:{theme:"default",muted:!1,persistent:!1,inline:!1}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const p=["Demo"],b=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:p,default:c},Symbol.toStringTag,{value:"Module"}));export{t as D,b as S};
