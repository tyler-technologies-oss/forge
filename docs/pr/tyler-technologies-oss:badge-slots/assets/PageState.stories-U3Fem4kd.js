import"./lit-element-BuSzPo2N.js";import{E as m,x as d}from"./lit-html-Ox1a2bD1.js";import{g as b,b as u}from"./utils-C9ubTmun.js";import{o as f}from"./style-map-CeIg-cuG.js";import"./feature-detection-CY6TVbRZ.js";import"./page-state-Bl7puESY.js";import"./button-CC-L5W3b.js";import"./focus-indicator-Cgfkaa3d.js";import"./index-CiLSBptl.js";import"./state-layer-BVsNuAhs.js";const a="forge-page-state",h={title:"Components/Page State",render:r=>{const e=u(r),s=e?f(e):m;return d`
      <forge-page-state style=${s}>
        <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/404-error-spot-hero.svg" alt="" slot="graphic" />
        <div slot="title">Nothing but tumbleweeds here...</div>
        <p slot="message">Even our best explorer couldn't find the page you're looking for. It might have been removed or you may have mistyped the URL.</p>
        <forge-button variant="raised" slot="action"> Go back </forge-button>
        <forge-button variant="outlined" slot="action"> Refresh </forge-button>
      </forge-page-state>
    `},component:a,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:a})},args:{}},t={},o={render:r=>{const e=u(r),s=e?f(e):m;return d`
      <div class="forge-page-state" style=${s}>
        <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/404-error-spot-hero.svg" class="forge-page-state__graphic" alt="" />
        <div class="forge-page-state__title">Nothing but tumbleweeds here...</div>
        <div class="forge-page-state__message">
          Even our best explorer couldn't find the page you're looking for. It might have been removed or you may have mistyped the URL.
        </div>
        <div class="forge-page-state__actions">
          <button class="forge-button forge-button--raised">Go back</button>
          <button class="forge-button forge-button--outlined">Refresh</button>
        </div>
      </div>
    `}};var n,g,i;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(i=(g=t.parameters)==null?void 0:g.docs)==null?void 0:i.source}}};var c,l,p;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html\`
      <div class="forge-page-state" style=\${style}>
        <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/404-error-spot-hero.svg" class="forge-page-state__graphic" alt="" />
        <div class="forge-page-state__title">Nothing but tumbleweeds here...</div>
        <div class="forge-page-state__message">
          Even our best explorer couldn't find the page you're looking for. It might have been removed or you may have mistyped the URL.
        </div>
        <div class="forge-page-state__actions">
          <button class="forge-button forge-button--raised">Go back</button>
          <button class="forge-button forge-button--outlined">Refresh</button>
        </div>
      </div>
    \`;
  }
}`,...(p=(l=o.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const v=["Demo","CSSOnly"],O=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:o,Demo:t,__namedExportsOrder:v,default:h},Symbol.toStringTag,{value:"Module"}));export{o as C,t as D,O as P};
