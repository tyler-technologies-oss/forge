import{b as s,A as c}from"./iframe-D_XTYtAY.js";import{s as l,g as f,b as v}from"./utils-B4-1L4nS.js";import{I as b,e as y}from"./tyler-icons-B0WPf66k.js";import{o as S}from"./style-map-Ddjwr7NY.js";import"./service-adapter-CffG5Lhq.js";import"./avatar-DEN905QL.js";import{A}from"./avatar-constants-Blow1dga.js";import"./icon-button-CIFJv6NF.js";import"./focus-indicator-C7XSB6Sy.js";import"./state-layer-u9rLNX9t.js";import"./index-DTwfV0k0.js";const g="forge-avatar",I={title:"Components/Avatar",render:({text:r,letterCount:m,imageUrl:p,...d})=>{const i=v(d),u=i?S(i):c;return s`<forge-avatar
      style=${u}
      text=${r}
      letter-count=${m!==A.numbers.DEFAULT_LETTER_COUNT?m:c}
      image-url=${p??c}></forge-avatar>`},component:g,parameters:{actions:{disable:!0}},argTypes:{...f({tagName:g})},args:{text:"Tyler Forge",letterCount:2}},e={},a={parameters:{controls:{include:/^--|imageUrl/}},args:{imageUrl:"./ruby.jpg"},render:({imageUrl:r})=>s` <forge-avatar image-url=${r}></forge-avatar> `},t={parameters:{controls:{include:/^--/}},render:()=>(b.define(y),s`
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
  }) => html\` <forge-avatar image-url=\${imageUrl}></forge-avatar> \`
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
  }) => html\`
    <forge-icon-button aria-label="Icon button with avatar">
      <forge-avatar text=\${text}></forge-avatar>
    </forge-icon-button>
  \`
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`<div class="forge-avatar">A</div>\`
}`,...n.parameters?.docs?.source}}};const h=["Demo","WithImage","WithIcon","WithIconButton","CSSOnly"],D=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:n,Demo:e,WithIcon:t,WithIconButton:o,WithImage:a,__namedExportsOrder:h,default:I},Symbol.toStringTag,{value:"Module"}));export{D as A,n as C,e as D,t as W,a,o as b};
