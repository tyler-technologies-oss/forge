import{x as i}from"./iframe-Dusku7t3.js";import{I as a,h as s}from"./icon-eJOvSyyv.js";import{s as n}from"./decorators-DtyRfpnz.js";import"./service-adapter-BykFeYYZ.js";import"./card-CJvhXslB.js";import"./button-DNlRsDtE.js";import"./focus-indicator-B6EU3cOJ.js";import"./state-layer-BRTtEqto.js";import"./index-CiLSBptl.js";import"./label-value-D_q4g7yi.js";const d="forge-card{--forge-card-padding: 0;max-width:768px}.grid-container{display:grid;grid-template-columns:repeat(12,1fr);gap:var(--forge-spacing-medium);align-items:center;border-left:4px solid var(--forge-theme-primary);padding:8px}.illustration-container{display:flex}.illustration-container img{max-width:64px;grid-column:1/2}.date-request{grid-column:2/9}.view-all{grid-column:9/13;justify-self:end}";a.define(s);const l={title:"Recipes/Card/Request",decorators:[n(d)],render:()=>i`
    <forge-card>
      <div class="grid-container">
        <div class="illustration-container">
          <img src="https://cdn.forge.tylertech.com/v1/images/spot/land-zoning-spot.png" alt="Land Zoning" />
        </div>
        <div class="date-request">
          <forge-label-value>
            <div slot="label">07/18/2019</div>
            <div slot="value">2 Pending requests to approve</div>
          </forge-label-value>
        </div>
        <div class="view-all">
          <forge-button>
            <a href="javascript: void(0);">
              View all
              <forge-icon name="open_in_new"></forge-icon>
            </a>
          </forge-button>
        </div>
      </div>
    </forge-card>
  `,parameters:{controls:{disable:!0},actions:{disable:!0}}},e={};var r,o,t;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:"{}",...(t=(o=e.parameters)==null?void 0:o.docs)==null?void 0:t.source}}};const c=["Demo"],h=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:c,default:l},Symbol.toStringTag,{value:"Module"}));export{e as D,h as R};
