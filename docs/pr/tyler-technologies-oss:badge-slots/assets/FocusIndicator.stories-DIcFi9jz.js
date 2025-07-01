import{E as d,x as i}from"./iframe-Cb3H7on6.js";import{o as l}from"./style-map-CxqmoKd_.js";import{e as _}from"./class-map-DouuGvrt.js";import{g as x,a as f}from"./utils-C--SryQs.js";import"./feature-detection-uS6p5jc8.js";import"./focus-indicator-IWpzSXYP.js";import"./index-CiLSBptl.js";import"./card-CN3bfTD2.js";const g="forge-focus-indicator",F={title:"Components/Focus Indicator",render:e=>{const t=f(e),r=t?l(t):d;return i`
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
    `},component:g,parameters:{actions:{disable:!0}},argTypes:{...x({tagName:g,exclude:["targetElement","target"],controls:{focusMode:{control:{type:"select"},options:["focusin","focus"]}}})},args:{active:!1,inward:!1,circular:!1,allowFocus:!1,focusMode:"focusin"}},s={},n={parameters:{controls:{include:/^--|active|inward/}},render:e=>{const t={width:"300px",outline:"none",position:"relative"};return i`
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
    `}},a={parameters:{controls:{include:/^--|active|inward/}},render:({active:e,inward:t,...r})=>{const o=f(r),u=o?l(o):d;return i` <button type="button" class=${_({"forge-focus-indicator":!0,"forge-focus-indicator__target":!0,"forge-focus-indicator--active":e,"forge-focus-indicator--inward":t})} style=${u}>CSS-only Button</button> `}},c={parameters:{controls:{include:/^--|active|inward/}},render:({active:e,inward:t,...r})=>{const o=f(r),u=o?l(o):d;return i`
      <button type="button" class="forge-focus-indicator__target">
        CSS-only Button w/Sentinel Element
        <div class=${_({"forge-focus-indicator":!0,"forge-focus-indicator--active":e,"forge-focus-indicator--inward":t})} style=${u}></div>
      </button>
    `}};var m,p,y;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(y=(p=s.parameters)==null?void 0:p.docs)==null?void 0:y.source}}};var v,w,b;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(b=(w=n.parameters)==null?void 0:w.docs)==null?void 0:b.source}}};var $,S,h;a.parameters={...a.parameters,docs:{...($=a.parameters)==null?void 0:$.docs,source:{originalSource:`{
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
}`,...(h=(S=a.parameters)==null?void 0:S.docs)==null?void 0:h.source}}};var C,M,V;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(V=(M=c.parameters)==null?void 0:M.docs)==null?void 0:V.source}}};const O=["Demo","WithCard","CSSOnly","CSSOnlyWithSentinel"],I=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,CSSOnlyWithSentinel:c,Demo:s,WithCard:n,__namedExportsOrder:O,default:F},Symbol.toStringTag,{value:"Module"}));export{a as C,s as D,I as F,n as W};
