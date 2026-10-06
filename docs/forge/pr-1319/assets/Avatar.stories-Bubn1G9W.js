import{b as r,A as m}from"./iframe-BgRf1TIz.js";import{s as p,g as v,b as y}from"./utils-C-EU7_QI.js";import{i as b}from"./tyler-icons-_o7MAz4c.js";import"./service-adapter-8tADcN_b.js";import{I as S}from"./icon-BF2rMxkr.js";import{o as A}from"./style-map-DF6HnqQP.js";import"./avatar-CreChVbB.js";import{A as h}from"./avatar-constants-DUcpY0bU.js";import"./icon-button-DplwJpAj.js";const l="forge-avatar",I={title:"Components/Avatar",render:({text:e,letterCount:i,imageUrl:d,...u})=>{const g=y(u),f=g?A(g):m;return r`<forge-avatar
      style=${f}
      text=${e}
      letter-count=${i!==h.numbers.DEFAULT_LETTER_COUNT?i:m}
      image-url=${d??m}></forge-avatar>`},component:l,parameters:{actions:{disable:!0}},argTypes:{...v({tagName:l})},args:{text:"Tyler Forge",letterCount:2}},a={},o={parameters:{controls:{include:/^--|imageUrl/}},args:{imageUrl:"./ruby.jpg"},render:({imageUrl:e})=>r` <forge-avatar image-url=${e}></forge-avatar> `},t={parameters:{controls:{include:/^--/}},render:()=>(S.define(b),r`
      <forge-avatar>
        <forge-icon name="person"></forge-icon>
      </forge-avatar>
    `)},n={...p,render:({text:e})=>r`
    <forge-icon-button aria-label="Icon button with avatar">
      <forge-avatar text=${e}></forge-avatar>
    </forge-icon-button>
  `},s={render:()=>r`<forge-avatar></forge-avatar>`},c={...p,render:()=>r`<div class="forge-avatar">A</div>`};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: ({
    text
  }) => html\`
    <forge-icon-button aria-label="Icon button with avatar">
      <forge-avatar text=\${text}></forge-avatar>
    </forge-icon-button>
  \`
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{\n  render: () => html`<forge-avatar></forge-avatar>`\n}",...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`<div class="forge-avatar">A</div>\`
}`,...c.parameters?.docs?.source}}};const T=["Demo","WithImage","WithIcon","WithIconButton","Empty","CSSOnly"],j=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:c,Demo:a,Empty:s,WithIcon:t,WithIconButton:n,WithImage:o,__namedExportsOrder:T,default:I},Symbol.toStringTag,{value:"Module"}));export{j as A,c as C,a as D,s as E,t as W,o as a,n as b};
