import"./lit-element-JplMEnZc.js";import{x as t,E as D}from"./lit-html-paDGiEfB.js";import{c as L,g as M,s as f,b as j}from"./utils-BXcMlS4H.js";import{e as z}from"./class-map-D55lQyt8.js";import{o as N}from"./style-map-C9nPWcxA.js";import"./feature-detection-ONR9WHvu.js";import"./skeleton-Dfdgg-pt.js";const g="forge-skeleton",R={title:"Components/Skeleton",render:e=>L(g,e),component:g,parameters:{actions:{disable:!0}},argTypes:{...M({tagName:g})},args:{}},o={},r={...f,render:()=>t`
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
  `},i={argTypes:{type:{options:["default","avatar","list-item","text","chip","button","form-field"],control:{type:"select"}}},args:{type:"default"},render:({type:e,...$})=>{const d=j($),B=d?N(d):D;return t` <div class=${z({"forge-skeleton":!0,"forge-skeleton--avatar":e==="avatar","forge-skeleton--list-item":e==="list-tem","forge-skeleton--text":e==="text","forge-skeleton--chip":e==="chip","forge-skeleton--button":e==="button","forge-skeleton--form-field":e==="form-field"})} style=${B}></div> `}};var c,m,p;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(p=(m=o.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var k,u,y;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="width: 200px">
      <forge-skeleton avatar></forge-skeleton>
      <forge-skeleton text></forge-skeleton>
      <forge-skeleton text></forge-skeleton>
      <forge-skeleton text style="width: 75%;"></forge-skeleton>
    </div>
  \`
}`,...(y=(u=r.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var h,v,x;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="width: 200px">
      <forge-skeleton list-item></forge-skeleton>
      <forge-skeleton list-item></forge-skeleton>
      <forge-skeleton list-item></forge-skeleton>
    </div>
  \`
}`,...(x=(v=s.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var S,b,w;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="width: 200px">
      <forge-skeleton chip></forge-skeleton>
      <forge-skeleton chip></forge-skeleton>
      <forge-skeleton chip></forge-skeleton>
    </div>
  \`
}`,...(w=(b=n.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var P,C,A;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="width: 200px">
      <forge-skeleton button></forge-skeleton>
      <forge-skeleton button></forge-skeleton>
      <forge-skeleton button></forge-skeleton>
    </div>
  \`
}`,...(A=(C=l.parameters)==null?void 0:C.docs)==null?void 0:A.source}}};var V,_,F;a.parameters={...a.parameters,docs:{...(V=a.parameters)==null?void 0:V.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="width: 200px">
      <forge-skeleton form-field></forge-skeleton>
      <forge-skeleton form-field></forge-skeleton>
      <forge-skeleton form-field></forge-skeleton>
    </div>
  \`
}`,...(F=(_=a.parameters)==null?void 0:_.docs)==null?void 0:F.source}}};var O,T,E;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(E=(T=i.parameters)==null?void 0:T.docs)==null?void 0:E.source}}};const q=["Demo","Profile","List","Chips","Buttons","FormField","CSSOnly"],X=Object.freeze(Object.defineProperty({__proto__:null,Buttons:l,CSSOnly:i,Chips:n,Demo:o,FormField:a,List:s,Profile:r,__namedExportsOrder:q,default:R},Symbol.toStringTag,{value:"Module"}));export{l as B,n as C,o as D,a as F,s as L,r as P,X as S,i as a};
