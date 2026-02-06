import{b as t,A as k}from"./iframe-CMEs_sKn.js";import{s as f,b as p,g as u,c as y}from"./utils-CyDCReHh.js";import{e as h}from"./class-map-D--KkKNG.js";import{o as v}from"./style-map-qI3jyA2m.js";import"./service-adapter-CffG5Lhq.js";import"./skeleton-DllEP8un.js";const g="forge-skeleton",x={title:"Components/Skeleton",render:e=>y(g,e),component:g,parameters:{actions:{disable:!0}},argTypes:{...u({tagName:g})},args:{}},o={},r={...f,render:()=>t`
    <div style="width: 200px">
      <forge-skeleton avatar></forge-skeleton>
      <forge-skeleton text></forge-skeleton>
      <forge-skeleton text></forge-skeleton>
      <forge-skeleton text style="width: 75%;"></forge-skeleton>
    </div>
  `},s={...f,render:()=>t`
    <div style="width: 200px">
      <forge-skeleton list-item></forge-skeleton>
      <forge-skeleton list-item></forge-skeleton>
      <forge-skeleton list-item></forge-skeleton>
    </div>
  `},n={...f,render:()=>t`
    <div style="width: 200px">
      <forge-skeleton chip></forge-skeleton>
      <forge-skeleton chip></forge-skeleton>
      <forge-skeleton chip></forge-skeleton>
    </div>
  `},l={...f,render:()=>t`
    <div style="width: 200px">
      <forge-skeleton button></forge-skeleton>
      <forge-skeleton button></forge-skeleton>
      <forge-skeleton button></forge-skeleton>
    </div>
  `},a={...f,render:()=>t`
    <div style="width: 200px">
      <forge-skeleton form-field></forge-skeleton>
      <forge-skeleton form-field></forge-skeleton>
      <forge-skeleton form-field></forge-skeleton>
    </div>
  `},i={argTypes:{type:{options:["default","avatar","list-item","text","chip","button","form-field"],control:{type:"select"}}},args:{type:"default"},render:({type:e,...c})=>{const d=p(c),m=d?v(d):k;return t` <div class=${h({"forge-skeleton":!0,"forge-skeleton--avatar":e==="avatar","forge-skeleton--list-item":e==="list-tem","forge-skeleton--text":e==="text","forge-skeleton--chip":e==="chip","forge-skeleton--button":e==="button","forge-skeleton--form-field":e==="form-field"})} style=${m}></div> `}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="width: 200px">
      <forge-skeleton avatar></forge-skeleton>
      <forge-skeleton text></forge-skeleton>
      <forge-skeleton text></forge-skeleton>
      <forge-skeleton text style="width: 75%;"></forge-skeleton>
    </div>
  \`
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="width: 200px">
      <forge-skeleton list-item></forge-skeleton>
      <forge-skeleton list-item></forge-skeleton>
      <forge-skeleton list-item></forge-skeleton>
    </div>
  \`
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="width: 200px">
      <forge-skeleton chip></forge-skeleton>
      <forge-skeleton chip></forge-skeleton>
      <forge-skeleton chip></forge-skeleton>
    </div>
  \`
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="width: 200px">
      <forge-skeleton button></forge-skeleton>
      <forge-skeleton button></forge-skeleton>
      <forge-skeleton button></forge-skeleton>
    </div>
  \`
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="width: 200px">
      <forge-skeleton form-field></forge-skeleton>
      <forge-skeleton form-field></forge-skeleton>
      <forge-skeleton form-field></forge-skeleton>
    </div>
  \`
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};const S=["Demo","Profile","List","Chips","Buttons","FormField","CSSOnly"],F=Object.freeze(Object.defineProperty({__proto__:null,Buttons:l,CSSOnly:i,Chips:n,Demo:o,FormField:a,List:s,Profile:r,__namedExportsOrder:S,default:x},Symbol.toStringTag,{value:"Module"}));export{l as B,n as C,o as D,a as F,s as L,r as P,F as S,i as a};
