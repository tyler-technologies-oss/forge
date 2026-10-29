import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-C-z8vi0w.js";import{_ as a,l as o,m as s,n as c,s as l,t as u}from"./utils-BktKkMbo.js";import{t as d}from"./class-map-DEew1OiS.js";import{t as f}from"./class-map-8zp5OV2u.js";import{o as p,t as m}from"./icon-BrLOytZD.js";import{Ft as h,K as g,i as _,t as v}from"./tyler-icons-CLXzO0Q_.js";import{t as y}from"./button-BCGxI4mr.js";import{r as b,t as x}from"./style-map-C_WKUe4Y.js";import{t as S}from"./floating-action-button-B57wGQnb.js";var C=t({CSSOnly:()=>k,Demo:()=>E,Extended:()=>D,WithAnchor:()=>O,__namedExportsOrder:()=>A,default:()=>T}),w,T,E,D,O,k,A;function j(){return(j=e((()=>{i(),s(),x(),f(),v(),m(),S(),y(),w=`forge-fab`,p.define([g,_,h]),T={title:`Components/Floating Action Button`,render:e=>{let t=o(e),i=t?b(t):r;return n`
      <forge-fab
        .theme=${e.theme}
        .density=${e.density}
        .elevation=${e.elevation}
        .popoverIcon=${e.popoverIcon}
        .disabled=${e.disabled}
        .dense=${e.dense}
        style=${i}
        aria-label="Favorite">
        <forge-icon name="favorite"></forge-icon>
      </forge-fab>
    `},component:w,parameters:{actions:{disable:!0}},argTypes:{...l({tagName:w,exclude:[`type`,`name`,`value`,`form`],controls:{theme:{control:`select`,options:c},density:{control:`select`,options:u},elevation:{control:`select`,options:[`raised`,`lowered`]}}})},args:{theme:`secondary`,density:`medium`,elevation:`raised`,disabled:!1,popoverIcon:!1,dense:!1}},E={},D={render:e=>{let t=o(e),i=t?b(t):r;return n`
      <forge-fab
        .theme=${e.theme}
        .density=${e.density}
        .elevation=${e.elevation}
        .popoverIcon=${e.popoverIcon}
        .disabled=${e.disabled}
        .dense=${e.dense}
        style=${i}>
        <forge-icon name="add"></forge-icon>
        <span slot="label">Create</span>
      </forge-fab>
    `}},O={...a,render:e=>n`
    <forge-fab>
      <a href="javascript: void(0);" aria-label="FAB with anchor">
        <forge-icon name="open_in_new"></forge-icon>
      </a>
    </forge-fab>
  `},k={parameters:{controls:{include:/^--|density|extended|disabled|elevation/}},args:{extended:!1},render:({extended:e,density:t,disabled:i,elevation:a,...s})=>{let c=o(s),l=c?b(c):r;return n`<button class=${d({"forge-fab":!0,"forge-fab--extended":e,"forge-fab--small":t===`small`,"forge-fab--large":t===`large`,"forge-fab--flat":a===`lowered`})} style=${l} aria-label="Floating Action Button Demo" .disabled=${i}>
      <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z" />
      </svg>
      ${e?n`<span>Extended</span>`:r}
    </button>`}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html\`
      <forge-fab
        .theme=\${args.theme}
        .density=\${args.density}
        .elevation=\${args.elevation}
        .popoverIcon=\${args.popoverIcon}
        .disabled=\${args.disabled}
        .dense=\${args.dense}
        style=\${style}>
        <forge-icon name="add"></forge-icon>
        <span slot="label">Create</span>
      </forge-fab>
    \`;
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: args => html\`
    <forge-fab>
      <a href="javascript: void(0);" aria-label="FAB with anchor">
        <forge-icon name="open_in_new"></forge-icon>
      </a>
    </forge-fab>
  \`
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: /^--|density|extended|disabled|elevation/
    }
  },
  args: {
    extended: false
  },
  render: ({
    extended,
    density,
    disabled,
    elevation,
    ...args
  }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-fab': true,
      'forge-fab--extended': extended,
      'forge-fab--small': density === 'small',
      'forge-fab--large': density === 'large',
      'forge-fab--flat': elevation === 'lowered'
    };
    return html\`<button class=\${classMap(classes)} style=\${style} aria-label="Floating Action Button Demo" .disabled=\${disabled}>
      <svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z" />
      </svg>
      \${extended ? html\`<span>Extended</span>\` : nothing}
    </button>\`;
  }
}`,...k.parameters?.docs?.source}}},A=[`Demo`,`Extended`,`WithAnchor`,`CSSOnly`]})))()}export{O as a,C as i,E as n,j as o,D as r,k as t};