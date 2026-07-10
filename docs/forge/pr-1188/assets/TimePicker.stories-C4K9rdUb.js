import{b as r}from"./iframe-DC_N5IcN.js";import{g as i}from"./utils-DKoLLPTK.js";import"./service-adapter-8tADcN_b.js";import"./text-field-B5vK9fdP.js";import"./base-field-xze3y4FA.js";import"./focus-indicator-jaUmRQAW.js";import"./label-CyrlcG4M.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-CZW0UC5P.js";import"./state-layer-cKdDztbm.js";import"./button-toggle-group-BJQSg8JY.js";import"./checkbox-r7C9zLrI.js";import"./icon-button-DQohdgv8.js";import"./tyler-icons-BRdXe8nV.js";import"./switch--z0pAjmI.js";import"./time-picker-CwBTm2-R.js";import"./linear-progress-DLb8lZjg.js";import"./list-C9MM0Na1.js";import"./popover-CbRRoZuj.js";import"./overlay-DfNZRYj1.js";import"./skeleton-BOQ63418.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
