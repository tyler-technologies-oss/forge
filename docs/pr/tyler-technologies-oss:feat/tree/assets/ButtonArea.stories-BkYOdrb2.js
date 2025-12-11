import{E as i,x as n}from"./iframe-aLJo785t.js";import{o as s}from"./style-map-B_8c-ch3.js";import{g as c,a as d}from"./utils-CWNZ6DqN.js";import"./service-adapter-CffG5Lhq.js";import{I as g,p as m,D as p}from"./icon-Uwxy940_.js";import"./index-DTwfV0k0.js";import"./card-BAfhtDfB.js";import"./button-area-Bv3HrM8U.js";import"./focus-indicator-BYHHNw4I.js";import"./state-layer-BEEsPoZf.js";import"./icon-button-B9l1618B.js";import"./tooltip-KOXasit9.js";import"./overlay-DbqVLn-W.js";import{s as l}from"./decorators-DRUNm1ly.js";const f="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",{action:u}=__STORYBOOK_MODULE_ACTIONS__,r="forge-button-area";g.define([m,p]);const b=u("click"),v={title:"Components/Button Area",render:t=>{const e=d(t),a=e?s(e):i;return n`
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
