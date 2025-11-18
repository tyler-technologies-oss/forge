import{E as i,x as n}from"./iframe-CSGc-9i1.js";import{o as s}from"./style-map-Boc3J1bS.js";import{g as c,a as d}from"./utils-CW5S_tZJ.js";import"./service-adapter-CffG5Lhq.js";import{I as m}from"./icon-8E01u_jy.js";import"./index-5CPwzmQS.js";import{p as g,D as p}from"./tyler-icons-DSFxyJDy.js";import"./card-DHzr1c62.js";import"./button-area-DQUuz-xF.js";import"./focus-indicator-D44tT1xv.js";import"./state-layer-BEEsPoZf.js";import"./icon-button-Bg2-fVpI.js";import"./tooltip-B59ljHGY.js";import"./overlay-B5pGv-rV.js";import{s as l}from"./decorators-B8ICsM6K.js";const f="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",{action:u}=__STORYBOOK_MODULE_ACTIONS__,r="forge-button-area";m.define([g,p]);const b=u("click"),v={title:"Components/Button Area",render:t=>{const e=d(t),a=e?s(e):i;return n`
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
    `},component:r,decorators:[l(f)],parameters:{actions:{disable:!0}},argTypes:{...c({tagName:r})},args:{}},o={};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};const y=["Demo"],j=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:y,default:v},Symbol.toStringTag,{value:"Module"}));export{j as B,o as D};
