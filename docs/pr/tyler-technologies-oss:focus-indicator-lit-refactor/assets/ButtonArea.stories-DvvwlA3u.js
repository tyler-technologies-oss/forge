import{E as c,x as d}from"./iframe-B_AFpbKZ.js";import{o as g}from"./style-map-D63BE21Z.js";import{g as m,a as p}from"./utils-D0zOu5id.js";import"./service-adapter-BykFeYYZ.js";import{I as l,p as f,D as u}from"./icon-eJOvSyyv.js";import"./index-CiLSBptl.js";import"./card-DWXijWME.js";import"./button-area-BIwvdsYT.js";import"./focus-indicator-CyTlhlQD.js";import"./state-layer-BRTtEqto.js";import"./icon-button-U4pg755t.js";import"./tooltip-CRaofu57.js";import"./overlay-DWLd4_Vp.js";import{s as b}from"./decorators-CTyTE-Ei.js";const v="forge-card{--forge-card-padding: 0;width:320px;max-width:100%}.content{display:flex;align-items:center;gap:8px;padding:16px}.content>:first-child{margin-inline-end:auto}",{action:y}=__STORYBOOK_MODULE_ACTIONS__,r="forge-button-area";l.define([f,u]);const _=y("click"),h={title:"Components/Button Area",render:t=>{const e=p(t),s=e?g(e):c;return d`
      <forge-card>
        <forge-button-area ?disabled=${t.disabled} @click=${_} style=${s}>
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
    `},component:r,decorators:[b(v)],parameters:{actions:{disable:!0}},argTypes:{...m({tagName:r})},args:{}},o={};var a,i,n;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const x=["Demo"],F=Object.freeze(Object.defineProperty({__proto__:null,Demo:o,__namedExportsOrder:x,default:h},Symbol.toStringTag,{value:"Module"}));export{F as B,o as D};
