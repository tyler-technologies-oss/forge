import{E as c,x as s}from"./iframe-BnJdS9oE.js";import{g as f,s as l,a as v}from"./utils-D7XrLKwY.js";import{I as y,e as b}from"./icon-FzRol6Tl.js";import{o as S}from"./style-map-DVE0Z-ag.js";import"./feature-detection-BwPJgXni.js";import"./avatar-DzJTtdPC.js";import{A}from"./avatar-constants-CDm3i50P.js";import"./icon-button-DpLi6_yQ.js";import"./focus-indicator-B9KMEBVK.js";import"./index-5CPwzmQS.js";import"./state-layer-CLjAHnoF.js";const g="forge-avatar",I={title:"Components/Avatar",render:({text:r,letterCount:m,imageUrl:u,...p})=>{const i=v(p),d=i?S(i):c;return s`<forge-avatar
      style=${d}
      text=${r}
      letter-count=${m!==A.numbers.DEFAULT_LETTER_COUNT?m:c}
      image-url=${u??c}></forge-avatar>`},component:g,parameters:{actions:{disable:!0}},argTypes:{...f({tagName:g})},args:{text:"Tyler Forge",letterCount:2}},e={},a={parameters:{controls:{include:/^--|imageUrl/}},args:{imageUrl:"./ruby.jpg"},render:({imageUrl:r})=>s` <forge-avatar image-url=${r}></forge-avatar> `},t={parameters:{controls:{include:/^--/}},render:()=>(y.define(b),s`
      <forge-avatar>
        <forge-icon name="person"></forge-icon>
      </forge-avatar>
    `)},o={...l,render:({text:r})=>s`
      <forge-icon-button aria-label="Icon button with avatar">
        <forge-avatar text=${r}></forge-avatar>
      </forge-icon-button>
    `},n={...l,render:()=>s`<div class="forge-avatar">A</div>`};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`<div class="forge-avatar">A</div>\`;
  }
}`,...n.parameters?.docs?.source}}};const h=["Demo","WithImage","WithIcon","WithIconButton","CSSOnly"],D=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:n,Demo:e,WithIcon:t,WithIconButton:o,WithImage:a,__namedExportsOrder:h,default:I},Symbol.toStringTag,{value:"Module"}));export{D as A,n as C,e as D,t as W,a,o as b};
