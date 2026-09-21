import{A as n,b as i}from"./iframe-BQuUdi9A.js";import{o as s}from"./style-map-DZMzP31B.js";import{g as c,b as d}from"./utils-CElmhe9Y.js";import"./service-adapter-DlT-lJx7.js";import{I as g,s as l,N as m}from"./tyler-icons--haAADqW.js";import"./card-D4nNosYG.js";import"./button-area-JSx8c1Ta.js";import"./icon-button-CqF7oM9r.js";import"./tooltip-Dq2Q0xN1.js";import"./overlay-DlXgJPae.js";import{s as p}from"./decorators-C9-Xxp52.js";const f="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",{action:u}=__STORYBOOK_MODULE_ACTIONS__,r="forge-button-area";g.define([l,m]);const b=u("click"),v={title:"Components/Button Area",render:t=>{const e=d(t),a=e?s(e):n;return i`
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
