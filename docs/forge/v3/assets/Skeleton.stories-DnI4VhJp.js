import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-BMUBXmXw.js";import{_ as a,l as o,m as s,o as c,s as l}from"./utils-B_1gC6gM.js";import{t as u}from"./class-map-DEew1OiS.js";import{t as d}from"./class-map-8zp5OV2u.js";import{t as f}from"./skeleton-CIwRj0Wq.js";import{r as p,t as m}from"./style-map-C_WKUe4Y.js";var h=t({Buttons:()=>S,CSSOnly:()=>w,Chips:()=>x,Demo:()=>v,FormField:()=>C,List:()=>b,Profile:()=>y,__namedExportsOrder:()=>T,default:()=>_}),g,_,v,y,b,x,S,C,w,T;function E(){return(E=e((()=>{i(),s(),d(),m(),f(),g=`forge-skeleton`,_={title:`Components/Skeleton`,render:e=>c(g,e),component:g,parameters:{actions:{disable:!0}},argTypes:{...l({tagName:g})},args:{}},v={},y={...a,render:()=>n`
    <div style="width: 200px">
      <forge-skeleton avatar></forge-skeleton>
      <forge-skeleton text></forge-skeleton>
      <forge-skeleton text></forge-skeleton>
      <forge-skeleton text style="width: 75%;"></forge-skeleton>
    </div>
  `},b={...a,render:()=>n`
    <div style="width: 200px">
      <forge-skeleton list-item></forge-skeleton>
      <forge-skeleton list-item></forge-skeleton>
      <forge-skeleton list-item></forge-skeleton>
    </div>
  `},x={...a,render:()=>n`
    <div style="width: 200px">
      <forge-skeleton chip></forge-skeleton>
      <forge-skeleton chip></forge-skeleton>
      <forge-skeleton chip></forge-skeleton>
    </div>
  `},S={...a,render:()=>n`
    <div style="width: 200px">
      <forge-skeleton button></forge-skeleton>
      <forge-skeleton button></forge-skeleton>
      <forge-skeleton button></forge-skeleton>
    </div>
  `},C={...a,render:()=>n`
    <div style="width: 200px">
      <forge-skeleton form-field></forge-skeleton>
      <forge-skeleton form-field></forge-skeleton>
      <forge-skeleton form-field></forge-skeleton>
    </div>
  `},w={argTypes:{type:{options:[`default`,`avatar`,`list-item`,`text`,`chip`,`button`,`form-field`],control:{type:`select`}}},args:{type:`default`},render:({type:e,...t})=>{let i=o(t),a=i?p(i):r;return n` <div class=${u({"forge-skeleton":!0,"forge-skeleton--avatar":e===`avatar`,"forge-skeleton--list-item":e===`list-tem`,"forge-skeleton--text":e===`text`,"forge-skeleton--chip":e===`chip`,"forge-skeleton--button":e===`button`,"forge-skeleton--form-field":e===`form-field`})} style=${a}></div> `}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="width: 200px">
      <forge-skeleton avatar></forge-skeleton>
      <forge-skeleton text></forge-skeleton>
      <forge-skeleton text></forge-skeleton>
      <forge-skeleton text style="width: 75%;"></forge-skeleton>
    </div>
  \`
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="width: 200px">
      <forge-skeleton list-item></forge-skeleton>
      <forge-skeleton list-item></forge-skeleton>
      <forge-skeleton list-item></forge-skeleton>
    </div>
  \`
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="width: 200px">
      <forge-skeleton chip></forge-skeleton>
      <forge-skeleton chip></forge-skeleton>
      <forge-skeleton chip></forge-skeleton>
    </div>
  \`
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="width: 200px">
      <forge-skeleton button></forge-skeleton>
      <forge-skeleton button></forge-skeleton>
      <forge-skeleton button></forge-skeleton>
    </div>
  \`
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="width: 200px">
      <forge-skeleton form-field></forge-skeleton>
      <forge-skeleton form-field></forge-skeleton>
      <forge-skeleton form-field></forge-skeleton>
    </div>
  \`
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  argTypes: {
    type: {
      options: ['default', 'avatar', 'list-item', 'text', 'chip', 'button', 'form-field'],
      control: {
        type: 'select'
      }
    }
  },
  args: {
    type: 'default'
  },
  render: ({
    type,
    ...args
  }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-skeleton': true,
      'forge-skeleton--avatar': type === 'avatar',
      'forge-skeleton--list-item': type === 'list-tem',
      'forge-skeleton--text': type === 'text',
      'forge-skeleton--chip': type === 'chip',
      'forge-skeleton--button': type === 'button',
      'forge-skeleton--form-field': type === 'form-field'
    };
    return html\` <div class=\${classMap(classes)} style=\${style}></div> \`;
  }
}`,...w.parameters?.docs?.source}}},T=[`Demo`,`Profile`,`List`,`Chips`,`Buttons`,`FormField`,`CSSOnly`]})))()}export{C as a,h as c,v as i,E as l,w as n,b as o,x as r,y as s,S as t};