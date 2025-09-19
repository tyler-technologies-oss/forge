import{E as d,x as i}from"./iframe-CIxyDGlH.js";import{o as l}from"./style-map-l48G0zrc.js";import{e as m}from"./class-map-DSbjH6Po.js";import{g as y,a as f}from"./utils-D7XrLKwY.js";import"./feature-detection-BwPJgXni.js";import"./focus-indicator-B9KMEBVK.js";import"./index-5CPwzmQS.js";import"./card-CcH8hNVZ.js";const g="forge-focus-indicator",v={title:"Components/Focus Indicator",render:e=>{const t=f(e),r=t?l(t):d;return i`
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
    `},component:g,parameters:{actions:{disable:!0}},argTypes:{...y({tagName:g,exclude:["targetElement","target"],controls:{focusMode:{control:{type:"select"},options:["focusin","focus"]}}})},args:{active:!1,inward:!1,circular:!1,allowFocus:!1,focusMode:"focusin"}},s={},n={parameters:{controls:{include:/^--|active|inward/}},render:e=>{const t={width:"300px",outline:"none",position:"relative"};return i`
      <forge-card role="button" tabindex="0" aria-label="Click me" style=${l(t)}>
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
    `}},a={parameters:{controls:{include:/^--|active|inward/}},render:({active:e,inward:t,...r})=>{const o=f(r),u=o?l(o):d;return i` <button type="button" class=${m({"forge-focus-indicator":!0,"forge-focus-indicator__target":!0,"forge-focus-indicator--active":e,"forge-focus-indicator--inward":t})} style=${u}>CSS-only Button</button> `}},c={parameters:{controls:{include:/^--|active|inward/}},render:({active:e,inward:t,...r})=>{const o=f(r),u=o?l(o):d;return i`
      <button type="button" class="forge-focus-indicator__target">
        CSS-only Button w/Sentinel Element
        <div class=${m({"forge-focus-indicator":!0,"forge-focus-indicator--active":e,"forge-focus-indicator--inward":t})} style=${u}></div>
      </button>
    `}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};const w=["Demo","WithCard","CSSOnly","CSSOnlyWithSentinel"],A=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,CSSOnlyWithSentinel:c,Demo:s,WithCard:n,__namedExportsOrder:w,default:v},Symbol.toStringTag,{value:"Module"}));export{a as C,s as D,A as F,n as W};
