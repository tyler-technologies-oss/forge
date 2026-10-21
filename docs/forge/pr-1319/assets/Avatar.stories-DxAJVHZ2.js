import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CuAvrKn_.js";import{_ as a,l as o,m as s,s as c}from"./utils-Cppiha4b.js";import{o as l,t as u}from"./icon-DzM2_TPc.js";import{t as d,zt as f}from"./tyler-icons-CLXzO0Q_.js";import{t as p}from"./icon-button-Dibkr9Dk.js";import{r as m,t as h}from"./style-map-C_WKUe4Y.js";import{n as g,r as _}from"./avatar-BPz2EHCV.js";var v=t({CSSOnly:()=>E,Demo:()=>x,Empty:()=>T,WithIcon:()=>C,WithIconButton:()=>w,WithImage:()=>S,__namedExportsOrder:()=>D,default:()=>b}),y,b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{i(),s(),d(),u(),h(),g(),p(),y=`forge-avatar`,b={title:`Components/Avatar`,render:({text:e,letterCount:t,imageUrl:i,...a})=>{let s=o(a),c=s?m(s):r;return n`<forge-avatar
      style=${c}
      text=${e}
      letter-count=${t===_.numbers.DEFAULT_LETTER_COUNT?r:t}
      image-url=${i??r}></forge-avatar>`},component:y,parameters:{actions:{disable:!0}},argTypes:{...c({tagName:y})},args:{text:`Tyler Forge`,letterCount:2}},x={},S={parameters:{controls:{include:/^--|imageUrl/}},args:{imageUrl:`./ruby.jpg`},render:({imageUrl:e})=>n` <forge-avatar image-url=${e}></forge-avatar> `},C={parameters:{controls:{include:/^--/}},render:()=>(l.define(f),n`
      <forge-avatar>
        <forge-icon name="person"></forge-icon>
      </forge-avatar>
    `)},w={...a,render:({text:e})=>n`
    <forge-icon-button aria-label="Icon button with avatar">
      <forge-avatar text=${e}></forge-avatar>
    </forge-icon-button>
  `},T={render:()=>n`<forge-avatar></forge-avatar>`},E={...a,render:()=>n`<div class="forge-avatar">A</div>`},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: ({
    text
  }) => html\`
    <forge-icon-button aria-label="Icon button with avatar">
      <forge-avatar text=\${text}></forge-avatar>
    </forge-icon-button>
  \`
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => html\`<forge-avatar></forge-avatar>\`
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`<div class="forge-avatar">A</div>\`
}`,...E.parameters?.docs?.source}}},D=[`Demo`,`WithImage`,`WithIcon`,`WithIconButton`,`Empty`,`CSSOnly`]})))()}export{C as a,O as c,T as i,E as n,w as o,x as r,S as s,v as t};