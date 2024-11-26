import"./lit-element-CgJqSpuc.js";import{x as c}from"./lit-html-paDGiEfB.js";import{c as A,g as P,s as C}from"./utils-CUtp3IhO.js";import{t as U}from"./index-ByifSpfC.js";import{I as _}from"./icon-FszQmWVN.js";import"./constants-CFf81ck9.js";import"./avatar-BlmOt8Ln.js";import"./icon-button-DxSYWoFH.js";import"./focus-indicator-DesOnyyZ.js";import"./index-BmocOEUj.js";import"./state-layer-COSQHCpS.js";const s="forge-avatar",O={title:"Components/Avatar",render:r=>A(s,r),component:s,parameters:{actions:{disable:!0}},argTypes:{...P({tagName:s})},args:{text:"Tyler Forge",letterCount:2}},e={},a={parameters:{controls:{include:/^--|imageUrl/}},args:{imageUrl:"./ruby.jpg"},render:({imageUrl:r})=>c` <forge-avatar image-url=${r}></forge-avatar> `},o={parameters:{controls:{include:/^--/}},render:()=>(_.define(U),c`
      <forge-avatar>
        <forge-icon name="person"></forge-icon>
      </forge-avatar>
    `)},t={...C,render:r=>c` <forge-icon-button aria-label="Icon button with avatar"> ${A(s,r)} </forge-icon-button> `},n={...C,render:()=>c`<div class="forge-avatar">A</div>`};var m,i,g;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(g=(i=e.parameters)==null?void 0:i.docs)==null?void 0:g.source}}};var l,p,u;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var d,f,v;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(v=(f=o.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var y,S,b;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: args => {
    return html\` <forge-icon-button aria-label="Icon button with avatar"> \${customElementStoryRenderer(component, args)} </forge-icon-button> \`;
  }
}`,...(b=(S=t.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var I,h,W;n.parameters={...n.parameters,docs:{...(I=n.parameters)==null?void 0:I.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`<div class="forge-avatar">A</div>\`;
  }
}`,...(W=(h=n.parameters)==null?void 0:h.docs)==null?void 0:W.source}}};const j=["Demo","WithImage","WithIcon","WithIconButton","CSSOnly"],N=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:n,Demo:e,WithIcon:o,WithIconButton:t,WithImage:a,__namedExportsOrder:j,default:O},Symbol.toStringTag,{value:"Module"}));export{N as A,n as C,e as D,o as W,a,t as b};
