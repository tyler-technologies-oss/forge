import{b as r}from"./iframe-B5kixTUA.js";import{g as i}from"./utils-C2rEPPUi.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CeMW75GH.js";import"./base-field-CS3WuGUd.js";import"./focus-indicator-C4H0Z-Oe.js";import"./label-B2DgDty_.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-D8CfmJ6z.js";import"./state-layer-CezKS0dV.js";import"./button-toggle-group-Cc8RdE5a.js";import"./checkbox-DY7NS6Tz.js";import"./icon-button-CLEGMrxU.js";import"./tyler-icons-BIZLfBgS.js";import"./switch-j6pTSyQO.js";import"./time-picker-C9f4QEud.js";import"./linear-progress-Do3VWKo6.js";import"./list-CEdkemxi.js";import"./popover-PP0PBtnE.js";import"./overlay-B5Gi9o4o.js";import"./skeleton-BE_elVrP.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
  `,component:t,parameters:{actions:{disable:!0}},argTypes:{...i({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const p=["Demo"],g=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:p,default:m},Symbol.toStringTag,{value:"Module"}));export{e as D,g as T};
