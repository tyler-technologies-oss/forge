import{E as c,x as s}from"./iframe-CE3HZkEz.js";import{g as W,s as C,a as E}from"./utils-CEkw6ujh.js";import{I as P,e as j}from"./icon-Bh1zyXYd.js";import{o as D}from"./style-map-Det8BwjZ.js";import"./feature-detection-CY6TVbRZ.js";import"./avatar-B0BW2QHY.js";import{A as N}from"./avatar-constants-ChSkI4j1.js";import"./icon-button-CuEKyh48.js";import"./focus-indicator-Cgfkaa3d.js";import"./index-CiLSBptl.js";import"./state-layer-BVsNuAhs.js";const g="forge-avatar",R={title:"Components/Avatar",render:({text:r,letterCount:m,imageUrl:U,...$})=>{const i=E($),O=i?D(i):c;return s`<forge-avatar
      style=${O}
      text=${r}
      letter-count=${m!==N.numbers.DEFAULT_LETTER_COUNT?m:c}
      image-url=${U??c}></forge-avatar>`},component:g,parameters:{actions:{disable:!0}},argTypes:{...W({tagName:g})},args:{text:"Tyler Forge",letterCount:2}},e={},a={parameters:{controls:{include:/^--|imageUrl/}},args:{imageUrl:"./ruby.jpg"},render:({imageUrl:r})=>s` <forge-avatar image-url=${r}></forge-avatar> `},t={parameters:{controls:{include:/^--/}},render:()=>(P.define(j),s`
      <forge-avatar>
        <forge-icon name="person"></forge-icon>
      </forge-avatar>
    `)},o={...C,render:({text:r})=>s`
      <forge-icon-button aria-label="Icon button with avatar">
        <forge-avatar text=${r}></forge-avatar>
      </forge-icon-button>
    `},n={...C,render:()=>s`<div class="forge-avatar">A</div>`};var l,u,p;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(p=(u=e.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var d,f,v;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: /^--|imageUrl/
    }
  },
  args: {
    imageUrl: './ruby.jpg'
  },
  render: ({
    imageUrl
  }) => {
    return html\` <forge-avatar image-url=\${imageUrl}></forge-avatar> \`;
  }
}`,...(v=(f=a.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var y,b,S;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: /^--/
    }
  },
  render: () => {
    IconRegistry.define(tylIconPerson);
    return html\`
      <forge-avatar>
        <forge-icon name="person"></forge-icon>
      </forge-avatar>
    \`;
  }
}`,...(S=(b=t.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var A,I,h;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: ({
    text
  }) => {
    return html\`
      <forge-icon-button aria-label="Icon button with avatar">
        <forge-avatar text=\${text}></forge-avatar>
      </forge-icon-button>
    \`;
  }
}`,...(h=(I=o.parameters)==null?void 0:I.docs)==null?void 0:h.source}}};var T,x,_;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`<div class="forge-avatar">A</div>\`;
  }
}`,...(_=(x=n.parameters)==null?void 0:x.docs)==null?void 0:_.source}}};const V=["Demo","WithImage","WithIcon","WithIconButton","CSSOnly"],K=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:n,Demo:e,WithIcon:t,WithIconButton:o,WithImage:a,__namedExportsOrder:V,default:R},Symbol.toStringTag,{value:"Module"}));export{K as A,n as C,e as D,t as W,a,o as b};
