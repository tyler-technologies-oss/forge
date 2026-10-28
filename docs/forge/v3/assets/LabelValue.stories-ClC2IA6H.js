import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-BMUBXmXw.js";import{_ as a,l as o,m as s,s as c}from"./utils-B_1gC6gM.js";import{t as l}from"./class-map-DEew1OiS.js";import{t as u}from"./class-map-8zp5OV2u.js";import{o as d,t as f}from"./icon-CNNuo8Sp.js";import{t as p,zt as m}from"./tyler-icons-CLXzO0Q_.js";import{r as h,t as g}from"./style-map-C_WKUe4Y.js";import{t as _}from"./label-value-CLHu4LzX.js";import{t as v}from"./lib-LVL5EjXT.js";var y=t({CSSOnly:()=>T,Demo:()=>S,Icon:()=>C,Inline:()=>w,__namedExportsOrder:()=>E,default:()=>x}),b,x,S,C,w,T,E;function D(){return(D=e((()=>{i(),s(),g(),u(),v(),p(),_(),f(),b=`forge-label-value`,x={title:`Components/Label Value`,render:e=>{let t=o(e),r=h({...t,width:e.ellipsis?`100px`:null});return n`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${r}>
        <span slot="label">Label</span>
        ${e.empty?n`<span slot="value">n/a</span>`:n`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:b,parameters:{actions:{disable:!0}},argTypes:{...c({tagName:b,exclude:[`dense`]})},args:{empty:!1,ellipsis:!1,inline:!1}},S={},C={...a,render:()=>(d.define([m]),n`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <span slot="label">Name</span>
        <span slot="value">John Doe</span>
      </forge-label-value>
    `)},w={...a,args:{inline:!0}},T={args:{withIcon:!1},render:({inline:e,empty:t,ellipsis:i,withIcon:a,...s})=>{let c=o(s)??{};i&&(c.maxWidth=`150px`);let u=c?h(c):r;return n`
      <div class=${l({"forge-label-value":!0,"forge-label-value--inline":e,"forge-label-value--empty":t,"forge-label-value--ellipsis":i})} style=${u}>
        ${a?n`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`:r}
        <span class="forge-label-value__label">Status</span>
        <span class="forge-label-value__value"> ${t?`n/a`:i?`Lorem ipsum dolor sit, amet consectetur adipisicing elit.`:`Active`} </span>
      </div>
    `}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define([tylIconPerson]);
    return html\`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <span slot="label">Name</span>
        <span slot="value">John Doe</span>
      </forge-label-value>
    \`;
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    inline: true
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    withIcon: false
  },
  render: ({
    inline,
    empty,
    ellipsis,
    withIcon,
    ...args
  }) => {
    const cssVarArgs = getCssVariableArgs(args) ?? {};
    if (ellipsis) {
      cssVarArgs.maxWidth = '150px';
    }
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-label-value': true,
      'forge-label-value--inline': inline,
      'forge-label-value--empty': empty,
      'forge-label-value--ellipsis': ellipsis
    };
    return html\`
      <div class=\${classMap(classes)} style=\${style}>
        \${withIcon ? html\`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>\` : nothing}
        <span class="forge-label-value__label">Status</span>
        <span class="forge-label-value__value"> \${empty ? 'n/a' : ellipsis ? 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.' : 'Active'} </span>
      </div>
    \`;
  }
}`,...T.parameters?.docs?.source}}},E=[`Demo`,`Icon`,`Inline`,`CSSOnly`]})))()}export{y as a,w as i,S as n,D as o,C as r,T as t};