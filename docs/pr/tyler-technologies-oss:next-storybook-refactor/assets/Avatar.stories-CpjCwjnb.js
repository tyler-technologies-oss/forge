import{x as s}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{c as I,g as h,s as S}from"./constants-DbwyRGxi.js";import{t as W}from"./index-BAkJIYVL.js";import{I as U}from"./icon-PWjbsU_w.js";import"./avatar-DSHObdjp.js";import"./icon-button-IV8Ys-9G.js";import"./focus-indicator-CzUu7vMj.js";import"./index-Dh0vMUMR.js";import"./state-layer-BEljX9QG.js";const n="forge-avatar",_={title:"Components/Avatar",render:r=>I(n,r),component:n,parameters:{actions:{disable:!0}},argTypes:{...h({tagName:n})},args:{text:"Tyler Forge",letterCount:2}},e={},a={parameters:{controls:{include:/^--|imageUrl/}},args:{imageUrl:"/ruby.jpg"},render:({imageUrl:r})=>s`
      <forge-avatar image-url=${r}></forge-avatar>
    `},o={parameters:{controls:{include:/^--/}},render:()=>(U.define(W),s`
      <forge-avatar>
        <forge-icon name="person"></forge-icon>
      </forge-avatar>
    `)},t={...S,render:r=>s`
      <forge-icon-button aria-label="Icon button with avatar">
        ${I(n,r)}
      </forge-icon-button>
    `};var m,c,i;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(i=(c=e.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var g,l,p;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: /^--|imageUrl/
    }
  },
  args: {
    imageUrl: '/ruby.jpg'
  },
  render: ({
    imageUrl
  }) => {
    return html\`
      <forge-avatar image-url=\${imageUrl}></forge-avatar>
    \`;
  }
}`,...(p=(l=a.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var u,d,f;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(f=(d=o.parameters)==null?void 0:d.docs)==null?void 0:f.source}}};var b,y,v;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: args => {
    return html\`
      <forge-icon-button aria-label="Icon button with avatar">
        \${customElementStoryRenderer(component, args)}
      </forge-icon-button>
    \`;
  }
}`,...(v=(y=t.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};const P=["Demo","WithImage","WithIcon","WithIconButton"],w=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,WithIcon:o,WithIconButton:t,WithImage:a,__namedExportsOrder:P,default:_},Symbol.toStringTag,{value:"Module"}));export{w as A,e as D,o as W,a,t as b};
