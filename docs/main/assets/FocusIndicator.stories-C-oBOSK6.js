import{x as d,A as f}from"./lit-html-Bzgct6Ob.js";import{o as m}from"./style-map-D0ILlpbs.js";import{a as g,g as $}from"./utils-Cceq4NFH.js";import"./constants-D32Jr2uy.js";import"./focus-indicator-DCOk5mvy.js";import"./index-Dh0vMUMR.js";import"./card-Dqt9DVr1.js";const a="forge-focus-indicator",v={title:"Components/Focus Indicator",render:e=>{const o=g(e),p=o?m(o):f;return d`
      <div style="position: relative; display: inline flex;">
        <button id="target-btn" style="height: 100px; width: 100px; outline: none;">Focus me</button>
        <forge-focus-indicator
          target="target-btn"
          .active=${e.active}
          .inward=${e.inward}
          .circular=${e.circular}
          .allowFocus=${e.allowFocus}
          .focusMode=${e.focusMode}
          style=${p}>
        </forge-focus-indicator>
      </div>
    `},component:a,parameters:{actions:{disable:!0}},argTypes:{...$({tagName:a,exclude:["targetElement","target"],controls:{focusMode:{control:{type:"select"},options:["focusin","focus"]}}})},args:{active:!1,inward:!1,circular:!1,allowFocus:!1,focusMode:"focusin"}},r={},t={parameters:{controls:{include:/^--|active|inward/}},render:e=>{const o={width:"300px",outline:"none",position:"relative"};return d`
      <forge-card role="button" tabindex="0" aria-label="Click me" style=${m(o)}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
        <forge-focus-indicator
          .active=${e.active}
          .inward=${e.inward}
          .circular=${e.circular}
          .allowFocus=${e.allowFocus}
          .focusMode=${e.focusMode}
          style=${o}>
        </forge-focus-indicator>
      </forge-card>
    `}};var i,s,n;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(n=(s=r.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};var c,l,u;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(u=(l=t.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const w=["Demo","WithCard"],_=Object.freeze(Object.defineProperty({__proto__:null,Demo:r,WithCard:t,__namedExportsOrder:w,default:v},Symbol.toStringTag,{value:"Module"}));export{r as D,_ as F,t as W};
