import"./lit-element-CgJqSpuc.js";import{x as m,E as d}from"./lit-html-paDGiEfB.js";import{b as u,g as b}from"./utils-tyit5L24.js";import{o as f}from"./style-map-C9nPWcxA.js";import"./constants-CFf81ck9.js";import"./page-state-CVNRUclh.js";import"./button-CVZhEkBO.js";import"./focus-indicator-DesOnyyZ.js";import"./index-BmocOEUj.js";import"./state-layer-COSQHCpS.js";const a="forge-page-state",h={title:"Components/Page State",render:r=>{const e=u(r),s=e?f(e):d;return m`
      <forge-page-state style=${s}>
        <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/404-error-spot-hero.svg" alt="" slot="graphic" />
        <div slot="title">Nothing but tumbleweeds here...</div>
        <p slot="message">Even our best explorer couldn't find the page you're looking for. It might have been removed or you may have mistyped the URL.</p>
        <forge-button variant="raised" slot="action"> Go back </forge-button>
        <forge-button variant="outlined" slot="action"> Refresh </forge-button>
      </forge-page-state>
    `},component:a,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:a})},args:{}},t={},o={render:r=>{const e=u(r),s=e?f(e):d;return m`
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
