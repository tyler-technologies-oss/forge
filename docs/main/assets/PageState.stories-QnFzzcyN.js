import"./lit-element-Dk2-kgKT.js";import{k as p,D as d}from"./lit-html-DZH-Jm0H.js";import{g as u,b as f}from"./utils-CRuDW25z.js";import{s as b}from"./style-map-DxfbqtuX.js";import"./constants-DjE6emXm.js";import"./page-state-AJOtakTm.js";import"./button-C5f1g9CL.js";import"./focus-indicator-_fDu4ZqT.js";import"./index-Dh0vMUMR.js";import"./state-layer-DTKAXCUq.js";const s="forge-page-state",h={title:"Components/Page State",render:o=>p`
    <forge-page-state>
      <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/404-error-spot-hero.svg" alt="" slot="graphic" />
      <div slot="title">Nothing but tumbleweeds here...</div>
      <p slot="message">Even our best explorer couldn't find the page you're looking for. It might have been removed or you may have mistyped the URL.</p>
      <forge-button variant="raised" slot="action"> Go back </forge-button>
      <forge-button variant="outlined" slot="action"> Refresh </forge-button>
    </forge-page-state>
  `,component:s,parameters:{actions:{disable:!0}},argTypes:{...u({tagName:s})},args:{}},e={},t={render:o=>{const r=f(o),m=r?b(r):d;return p`
      <div class="forge-page-state" style=${m}>
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
    `}};var a,n,g;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(g=(n=e.parameters)==null?void 0:n.docs)==null?void 0:g.source}}};var i,c,l;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(l=(c=t.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const v=["Demo","CSSOnly"],O=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:t,Demo:e,__namedExportsOrder:v,default:h},Symbol.toStringTag,{value:"Module"}));export{t as C,e as D,O as P};
