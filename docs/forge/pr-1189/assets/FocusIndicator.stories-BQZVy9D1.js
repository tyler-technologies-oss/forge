import{A as p,b as u}from"./iframe-C0tv50se.js";import{o as n}from"./style-map-Cm5o70SV.js";import{e as y}from"./class-map-Dh7hYSBM.js";import{b as f,g as v}from"./utils-QdjzOY7l.js";import"./service-adapter-8tADcN_b.js";import"./focus-indicator-CI-XZz-0.js";import"./card-BpiIHOjQ.js";const g="forge-focus-indicator",w={title:"Components/Focus Indicator",render:e=>{const t=f(e),r=t?n(t):p;return u`
      <div style="position: relative; display: inline flex;">
        <button id="target-btn" style="height: 100px; width: 100px; outline: none;">Focus me</button>
        <forge-focus-indicator
          target="target-btn"
          .active=${e.active}
          .inward=${e.inward}
          .circular=${e.circular}
          .allowFocus=${e.allowFocus}
          .focusMode=${e.focusMode}
          .topLayer=${e.topLayer}
          style=${r}>
        </forge-focus-indicator>
      </div>
    `},component:g,parameters:{actions:{disable:!0}},argTypes:{...v({tagName:g,exclude:["targetElement","target"],controls:{focusMode:{control:{type:"select"},options:["focusin","focus"]}}})},args:{active:!1,inward:!1,circular:!1,allowFocus:!1,focusMode:"focusin",topLayer:!1}},s={},a={parameters:{controls:{include:/^--|active|inward/}},render:e=>{const t={width:"300px",outline:"none",position:"relative"};return u`
      <forge-card role="button" tabindex="0" aria-label="Click me" style=${n(t)}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
        <forge-focus-indicator
          .active=${e.active}
          .inward=${e.inward}
          .circular=${e.circular}
          .allowFocus=${e.allowFocus}
          .focusMode=${e.focusMode}
          .topLayer=${e.topLayer}
          style=${t}>
        </forge-focus-indicator>
      </forge-card>
    `}},c={parameters:{controls:{include:/^--|active|inward|topLayer/}},args:{topLayer:!0},render:e=>{const t={position:"relative",display:"flex",justifyContent:"center",alignItems:"center",height:"100px",width:"100px",overflow:"hidden",outline:"1px dotted black"},r={height:"96px",width:"96px",outline:"none"};return u`
      <div style=${n(t)}>
        <button id="top-layer-btn" style=${n(r)}>Focus me</button>
        <forge-focus-indicator
          target="top-layer-btn"
          .active=${e.active}
          .inward=${e.inward}
          .circular=${e.circular}
          .allowFocus=${e.allowFocus}
          .focusMode=${e.focusMode}
          .topLayer=${e.topLayer}>
        </forge-focus-indicator>
      </div>
    `}},i={parameters:{controls:{include:/^--|active|inward/}},render:({active:e,inward:t,...r})=>{const o=f(r),d=o?n(o):p;return u` <button type="button" class=${y({"forge-focus-indicator":!0,"forge-focus-indicator__target":!0,"forge-focus-indicator--active":e,"forge-focus-indicator--inward":t})} style=${d}>CSS-only Button</button> `}},l={parameters:{controls:{include:/^--|active|inward/}},render:({active:e,inward:t,...r})=>{const o=f(r),d=o?n(o):p;return u`
      <button type="button" class="forge-focus-indicator__target">
        CSS-only Button w/Sentinel Element
        <div class=${y({"forge-focus-indicator":!0,"forge-focus-indicator--active":e,"forge-focus-indicator--inward":t})} style=${d}></div>
      </button>
    `}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
          .topLayer=\${args.topLayer}
          style=\${style}>
        </forge-focus-indicator>
      </forge-card>
    \`;
  }
}`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: /^--|active|inward|topLayer/
    }
  },
  args: {
    topLayer: true
  },
  render: args => {
    const containerStyle = {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100px',
      width: '100px',
      overflow: 'hidden',
      outline: '1px dotted black'
    };
    const buttonStyle = {
      height: '96px',
      width: '96px',
      outline: 'none'
    };
    return html\`
      <div style=\${styleMap(containerStyle)}>
        <button id="top-layer-btn" style=\${styleMap(buttonStyle)}>Focus me</button>
        <forge-focus-indicator
          target="top-layer-btn"
          .active=\${args.active}
          .inward=\${args.inward}
          .circular=\${args.circular}
          .allowFocus=\${args.allowFocus}
          .focusMode=\${args.focusMode}
          .topLayer=\${args.topLayer}>
        </forge-focus-indicator>
      </div>
    \`;
  }
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const $=["Demo","WithCard","TopLayer","CSSOnly","CSSOnlyWithSentinel"],F=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:i,CSSOnlyWithSentinel:l,Demo:s,TopLayer:c,WithCard:a,__namedExportsOrder:$,default:w},Symbol.toStringTag,{value:"Module"}));export{i as C,s as D,F,c as T,a as W};
