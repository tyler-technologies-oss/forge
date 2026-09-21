import{A as n,b as i}from"./iframe-BaLQ_A2d.js";import{o as s}from"./style-map-CyLVt2T4.js";import{g as c,b as d}from"./utils-CElmhe9Y.js";import"./service-adapter-DlT-lJx7.js";import{I as g,s as l,N as m}from"./tyler-icons-DfIaYIv7.js";import"./card-BdewD5or.js";import"./button-area-BmWGh6OZ.js";import"./icon-button-IKvoqhNZ.js";import"./tooltip-C0ic2qYj.js";import"./overlay-DFZfpbSi.js";import{s as p}from"./decorators-Dq8gzDyS.js";const f="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",{action:u}=__STORYBOOK_MODULE_ACTIONS__,r="forge-button-area";g.define([l,m]);const b=u("click"),v={title:"Components/Button Area",render:t=>{const e=d(t),a=e?s(e):n;return i`
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
