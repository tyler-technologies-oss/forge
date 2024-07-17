import{x as p}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{g as l}from"./utils-BJOK626P.js";import"./constants-DjE6emXm.js";import"./time-picker-DY7LK46Y.js";import"./index-Dh0vMUMR.js";import"./text-field-RvdQEqTJ.js";import"./base-field-DI05trcI.js";import"./focus-indicator-BPFZRBe9.js";import"./label-u49DyhbP.js";import"./button-BZEZMHKM.js";import"./state-layer-D8bHAvjj.js";import"./button-toggle-group-CVRZEG3N.js";import"./checkbox-an-Xb1xB.js";import"./icon-button-B2LQlK1e.js";import"./icon-DjINFoyU.js";import"./switch-CiP8pWu1.js";import"./linear-progress-CVy9jv9h.js";import"./list-D6JyyFFB.js";import"./popover-Cuxqrsc4.js";import"./overlay-CyEwb-fW.js";import"./skeleton-yxWgwnDD.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
      <forge-time-picker
        .allowSeconds=${o.allowSeconds}
        .masked=${o.masked}
        .showMaskFormat=${o.showMaskFormat}
        .use24HourTime=${o.use24HourTime}
        .allowInvalidTime=${o.allowInvalidTime}
        .step=${o.step}
        .allowInput=${o.allowInput}
        .allowDropdown=${o.allowDropdown}
        .showNow=${o.showNow}
        .showHourOptions=${o.showHourOptions}
        .disabled=${o.disabled}>
        <forge-text-field>
          <input id="time-picker" type="text" />
          <label for="time-picker">Time</label>
        </forge-text-field>
      </forge-time-picker>
    `,component:t,parameters:{actions:{disable:!0}},argTypes:{...l({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};var r,i,m;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:"{}",...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const a=["Demo"],N=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:a,default:s},Symbol.toStringTag,{value:"Module"}));export{e as D,N as T};
