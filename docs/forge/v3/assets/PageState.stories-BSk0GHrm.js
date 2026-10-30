import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{g as i}from"./iframe-B8S20_VI.js";import{l as a,m as o,s}from"./utils-BifgMLEM.js";import{t as c}from"./button-I2ZLPCXL.js";import{r as l,t as u}from"./style-map-C_WKUe4Y.js";import{t as d}from"./page-state-CrQCSEcy.js";var f=t({CSSOnly:()=>g,Demo:()=>h,__namedExportsOrder:()=>_,default:()=>m}),p,m,h,g,_;function v(){return(v=e((()=>{i(),o(),u(),d(),c(),p=`forge-page-state`,m={title:`Components/Page State`,render:e=>{let t=a(e),i=t?l(t):r;return n`
      <forge-page-state style=${i}>
        <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/404-error-spot-hero.svg" alt="" slot="graphic" />
        <div slot="title">Nothing but tumbleweeds here...</div>
        <p slot="message">Even our best explorer couldn't find the page you're looking for. It might have been removed or you may have mistyped the URL.</p>
        <forge-button variant="raised" slot="action"> Go back </forge-button>
        <forge-button variant="outlined" slot="action"> Refresh </forge-button>
      </forge-page-state>
    `},component:p,parameters:{actions:{disable:!0}},argTypes:{...s({tagName:p})},args:{}},h={},g={render:e=>{let t=a(e),i=t?l(t):r;return n`
      <div class="forge-page-state" style=${i}>
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
    `}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}},_=[`Demo`,`CSSOnly`]})))()}export{v as i,h as n,f as r,g as t};