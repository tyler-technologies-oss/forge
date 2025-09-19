import{E as i,x as n}from"./iframe-BciiVb0K.js";import{o as s}from"./style-map-Djxu7jNR.js";import{g as c,a as d}from"./utils-D7XrLKwY.js";import"./feature-detection-BwPJgXni.js";import{I as g,p as m,D as p}from"./icon-FzRol6Tl.js";import"./index-5CPwzmQS.js";import"./card-D9hC1-P3.js";import"./button-area-CyLBxpnc.js";import"./focus-indicator-B9KMEBVK.js";import"./state-layer-CLjAHnoF.js";import"./icon-button-DpLi6_yQ.js";import"./tooltip-DcL6iv1E.js";import"./overlay-B72xXWi5.js";import{s as l}from"./decorators-Bjcxn9ch.js";const f="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",{action:u}=__STORYBOOK_MODULE_ACTIONS__,r="forge-button-area";g.define([m,p]);const b=u("click"),v={title:"Components/Button Area",render:t=>{const e=d(t),a=e?s(e):i;return n`
      <forge-card>
        <forge-button-area ?disabled=${t.disabled} @click=${b} style=${a}>
          <button slot="button" aria-labelledby="button-heading"></button>
          <div class="content">
            <div>
              <div id="button-heading">Heading</div>
              <div>Content</div>
            </div>
            <forge-icon-button forge-ignore>
              <forge-icon role="img" name="favorite" aria-label="A heart graphic"></forge-icon>
            </forge-icon-button>
            <forge-tooltip>Favorite</forge-tooltip>
            <forge-icon name="chevron_right"></forge-icon>
          </div>
        </forge-button-area>
      </forge-card>
    `},component:r,decorators:[l(f)],parameters:{actions:{disable:!0}},argTypes:{...c({tagName:r})},args:{}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const y=["Demo"],$=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:y,default:v},Symbol.toStringTag,{value:"Module"}));export{$ as B,o as D};
