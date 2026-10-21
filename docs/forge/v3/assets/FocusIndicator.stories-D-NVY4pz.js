import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,o as r,t as i}from"./lit-html-SpIZ5SkX.js";import{l as a,m as o,s}from"./utils-C3ow8Ikc.js";import{t as c}from"./class-map-DEew1OiS.js";import{t as l}from"./class-map-8zp5OV2u.js";import{t as u}from"./focus-indicator-CVAX304-.js";import{r as d,t as f}from"./style-map-C_WKUe4Y.js";import{t as p}from"./card-CQv5a3n_.js";var m=t({CSSOnly:()=>y,CSSOnlyWithSentinel:()=>b,Demo:()=>_,WithCard:()=>v,__namedExportsOrder:()=>x,default:()=>g}),h,g,_,v,y,b,x;function S(){return(S=e((()=>{r(),f(),l(),o(),u(),p(),h=`forge-focus-indicator`,g={title:`Components/Focus Indicator`,render:e=>{let t=a(e),r=t?d(t):i;return n`
      <div style="position: relative; display: inline flex;">
        <button id="target-btn" style="height: 100px; width: 100px; outline: none;">Focus me</button>
        <forge-focus-indicator
          target="target-btn"
          .active=${e.active}
          .inward=${e.inward}
          .circular=${e.circular}
          .allowFocus=${e.allowFocus}
          .focusMode=${e.focusMode}
          style=${r}>
        </forge-focus-indicator>
      </div>
    `},component:h,parameters:{actions:{disable:!0}},argTypes:{...s({tagName:h,exclude:[`targetElement`,`target`],controls:{focusMode:{control:{type:`select`},options:[`focusin`,`focus`]}}})},args:{active:!1,inward:!1,circular:!1,allowFocus:!1,focusMode:`focusin`}},_={},v={parameters:{controls:{include:/^--|active|inward/}},render:e=>{let t={width:`300px`,outline:`none`,position:`relative`};return n`
      <forge-card role="button" tabindex="0" aria-label="Click me" style=${d(t)}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
        <forge-focus-indicator
          .active=${e.active}
          .inward=${e.inward}
          .circular=${e.circular}
          .allowFocus=${e.allowFocus}
          .focusMode=${e.focusMode}
          style=${t}>
        </forge-focus-indicator>
      </forge-card>
    `}},y={parameters:{controls:{include:/^--|active|inward/}},render:({active:e,inward:t,...r})=>{let o=a(r),s=o?d(o):i;return n` <button type="button" class=${c({"forge-focus-indicator":!0,"forge-focus-indicator__target":!0,"forge-focus-indicator--active":e,"forge-focus-indicator--inward":t})} style=${s}>CSS-only Button</button> `}},b={parameters:{controls:{include:/^--|active|inward/}},render:({active:e,inward:t,...r})=>{let o=a(r),s=o?d(o):i;return n`
      <button type="button" class="forge-focus-indicator__target">
        CSS-only Button w/Sentinel Element
        <div class=${c({"forge-focus-indicator":!0,"forge-focus-indicator--active":e,"forge-focus-indicator--inward":t})} style=${s}></div>
      </button>
    `}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: /^--|active|inward/
    }
  },
  render: args => {
    const style = {
      width: '300px',
      outline: 'none',
      position: 'relative'
    };
    return html\`
      <forge-card role="button" tabindex="0" aria-label="Click me" style=\${styleMap(style)}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
        <forge-focus-indicator
          .active=\${args.active}
          .inward=\${args.inward}
          .circular=\${args.circular}
          .allowFocus=\${args.allowFocus}
          .focusMode=\${args.focusMode}
          style=\${style}>
        </forge-focus-indicator>
      </forge-card>
    \`;
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: /^--|active|inward/
    }
  },
  render: ({
    active,
    inward,
    ...args
  }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-focus-indicator': true,
      'forge-focus-indicator__target': true,
      'forge-focus-indicator--active': active,
      'forge-focus-indicator--inward': inward
    };
    return html\` <button type="button" class=\${classMap(classes)} style=\${style}>CSS-only Button</button> \`;
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: /^--|active|inward/
    }
  },
  render: ({
    active,
    inward,
    ...args
  }) => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-focus-indicator': true,
      'forge-focus-indicator--active': active,
      'forge-focus-indicator--inward': inward
    };
    return html\`
      <button type="button" class="forge-focus-indicator__target">
        CSS-only Button w/Sentinel Element
        <div class=\${classMap(classes)} style=\${style}></div>
      </button>
    \`;
  }
}`,...b.parameters?.docs?.source}}},x=[`Demo`,`WithCard`,`CSSOnly`,`CSSOnlyWithSentinel`]})))()}export{S as a,v as i,_ as n,m as r,y as t};