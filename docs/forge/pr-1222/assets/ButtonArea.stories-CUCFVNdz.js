import{A as i,b as n}from"./iframe-BPj94FGh.js";import{o as s}from"./style-map-DhpmFxzM.js";import{g as c,b as d}from"./utils-LbM5kS63.js";import"./service-adapter-8tADcN_b.js";import{I as g,p as m,K as l}from"./tyler-icons-D8NJqrYQ.js";import"./card-BOAJRdnh.js";import"./button-area-WtMFY0Pu.js";import"./icon-button-CR83Kg9m.js";import"./focus-indicator-DDCQz0qC.js";import"./state-layer-mJUCxnSJ.js";import"./tooltip-WnsCuOqb.js";import"./overlay-MMpEd-75.js";import{s as p}from"./decorators-DjZ1ytM-.js";const f="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",{action:u}=__STORYBOOK_MODULE_ACTIONS__,r="forge-button-area";g.define([m,l]);const b=u("click"),v={title:"Components/Button Area",render:t=>{const e=d(t),a=e?s(e):i;return n`
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
    `},component:r,decorators:[p(f)],parameters:{actions:{disable:!0}},argTypes:{...c({tagName:r})},args:{}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const y=["Demo"],R=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:y,default:v},Symbol.toStringTag,{value:"Module"}));export{R as B,o as D};
