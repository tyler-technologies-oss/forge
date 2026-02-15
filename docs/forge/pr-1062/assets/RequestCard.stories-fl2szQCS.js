import{b as r}from"./iframe-Br1mfaAs.js";import{I as o,h as t}from"./tyler-icons-B0WPf66k.js";import{s as i}from"./decorators-Q7IxZu7y.js";import"./service-adapter-CffG5Lhq.js";import"./card-RBnanZtN.js";import"./button-BkmAR2k8.js";import"./focus-indicator-BiiSvd6u.js";import"./state-layer-u9rLNX9t.js";import"./index-DTwfV0k0.js";import"./label-value-D-KSqHDU.js";const a="forge-card{--forge-card-padding: 0;max-width:768px}.grid-container{display:grid;grid-template-columns:repeat(12,1fr);gap:var(--forge-spacing-medium);align-items:center;border-left:4px solid var(--forge-theme-primary);padding:8px}.illustration-container{display:flex}.illustration-container img{max-width:64px;grid-column:1/2}.date-request{grid-column:2/9}.view-all{grid-column:9/13;justify-self:end}";o.define(t);const s={title:"Recipes/Card/Request",decorators:[i(a)],render:()=>r`
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
  `,parameters:{controls:{disable:!0},actions:{disable:!0}}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const n=["Demo"],y=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:n,default:s},Symbol.toStringTag,{value:"Module"}));export{e as D,y as R};
