import{A as n,b as i}from"./iframe-CjzVpfqS.js";import{o as s}from"./style-map-BHakPK_e.js";import{g as c,b as d}from"./utils-Bqf6WcF-.js";import"./service-adapter-8tADcN_b.js";import{I as g,p as l,G as m}from"./tyler-icons-J8-UQPDE.js";import"./card-lohytUav.js";import"./button-area-CSAqYybg.js";import"./icon-button-Y8A9ultm.js";import"./tooltip-DD6ZsOiy.js";import"./overlay-BUaUM1sf.js";import{s as p}from"./decorators-Cehc2pnO.js";const f="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",{action:u}=__STORYBOOK_MODULE_ACTIONS__,r="forge-button-area";g.define([l,m]);const b=u("click"),v={title:"Components/Button Area",render:t=>{const e=d(t),a=e?s(e):n;return i`
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
    `},component:r,decorators:[p(f)],parameters:{actions:{disable:!0}},argTypes:{...c({tagName:r})},args:{}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const y=["Demo"],k=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:y,default:v},Symbol.toStringTag,{value:"Module"}));export{k as B,o as D};
