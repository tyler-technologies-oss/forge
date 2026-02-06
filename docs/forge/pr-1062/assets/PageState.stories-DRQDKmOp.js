import{A as n,b as g}from"./iframe-DdIHyASQ.js";import{b as i,g as l}from"./utils-CahvXhhw.js";import{o as c}from"./style-map-DcrAbPhX.js";import"./service-adapter-CffG5Lhq.js";import"./page-state-BU7mMB2L.js";import"./button-BicBGy8b.js";import"./focus-indicator-uodH7OpA.js";import"./state-layer-u9rLNX9t.js";const a="forge-page-state",p={title:"Components/Page State",render:r=>{const e=i(r),s=e?c(e):n;return g`
      <forge-page-state style=${s}>
        <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/404-error-spot-hero.svg" alt="" slot="graphic" />
        <div slot="title">Nothing but tumbleweeds here...</div>
        <p slot="message">Even our best explorer couldn't find the page you're looking for. It might have been removed or you may have mistyped the URL.</p>
        <forge-button variant="raised" slot="action"> Go back </forge-button>
        <forge-button variant="outlined" slot="action"> Refresh </forge-button>
      </forge-page-state>
    `},component:a,parameters:{actions:{disable:!0}},argTypes:{...l({tagName:a})},args:{}},t={},o={render:r=>{const e=i(r),s=e?c(e):n;return g`
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
    `}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};const m=["Demo","CSSOnly"],S=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:o,Demo:t,__namedExportsOrder:m,default:p},Symbol.toStringTag,{value:"Module"}));export{o as C,t as D,S as P};
