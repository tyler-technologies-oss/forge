import"./lit-element-CYrSCkDY.js";import{E as m,x as s}from"./lit-html-CuBe1DX_.js";import{g as W,s as E,b as P,c as R}from"./utils-wd6cBJ9K.js";import{d as x}from"./index-RsKXMDm2.js";import{I as j}from"./icon-D5yjdXv8.js";import{o as D}from"./style-map-CeP1Mntv.js";import"./feature-detection-CY6TVbRZ.js";import"./avatar-CVjn8Dcc.js";import{A as N}from"./avatar-constants-DnyqlPAz.js";import"./icon-button-4fx-LScl.js";import"./focus-indicator-NbLDNrYT.js";import"./index-CiLSBptl.js";import"./state-layer-sxQMIn2c.js";const c="forge-avatar",V={title:"Components/Avatar",render:({text:r,letterCount:i,imageUrl:U,...$})=>{const g=P($),O=g?D(g):m;return s`<forge-avatar
      style=${O}
      text=${r}
      letter-count=${i!==N.numbers.DEFAULT_LETTER_COUNT?i:m}
      image-url=${U??m}></forge-avatar>`},component:c,parameters:{actions:{disable:!0}},argTypes:{...W({tagName:c})},args:{text:"Tyler Forge",letterCount:2}},e={},a={parameters:{controls:{include:/^--|imageUrl/}},args:{imageUrl:"./ruby.jpg"},render:({imageUrl:r})=>s` <forge-avatar image-url=${r}></forge-avatar> `},o={parameters:{controls:{include:/^--/}},render:()=>(j.define(x),s`
      <forge-avatar>
        <forge-icon name="person"></forge-icon>
      </forge-avatar>
    `)},t={...E,render:r=>s` <forge-icon-button aria-label="Icon button with avatar"> ${R(c,r)} </forge-icon-button> `},n={...E,render:()=>s`<div class="forge-avatar">A</div>`};var l,p,u;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(u=(p=e.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var d,f,v;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(v=(f=a.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var y,S,b;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(b=(S=o.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var A,I,h;t.parameters={...t.parameters,docs:{...(A=t.parameters)==null?void 0:A.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: args => {
    return html\` <forge-icon-button aria-label="Icon button with avatar"> \${customElementStoryRenderer(component, args)} </forge-icon-button> \`;
  }
}`,...(h=(I=t.parameters)==null?void 0:I.docs)==null?void 0:h.source}}};var T,_,C;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`<div class="forge-avatar">A</div>\`;
  }
}`,...(C=(_=n.parameters)==null?void 0:_.docs)==null?void 0:C.source}}};const w=["Demo","WithImage","WithIcon","WithIconButton","CSSOnly"],Y=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:n,Demo:e,WithIcon:o,WithIconButton:t,WithImage:a,__namedExportsOrder:w,default:V},Symbol.toStringTag,{value:"Module"}));export{Y as A,n as C,e as D,o as W,a,t as b};
