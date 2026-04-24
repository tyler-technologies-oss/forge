import{b as r}from"./iframe-DUkN5F6u.js";import{g as i}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./text-field-DQaGBRQ4.js";import"./base-field-fIAFHhCf.js";import"./focus-indicator-W9h7yghR.js";import"./label-ChEf3nsR.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./button-BfDjVlOn.js";import"./state-layer-Cext-Euv.js";import"./button-toggle-group-d8VBhwh6.js";import"./checkbox-Zq5Z_KaC.js";import"./icon-button-BI3Gi8KU.js";import"./tyler-icons-JX1t2Wgz.js";import"./switch-DSFhR9rO.js";import"./time-picker-DRuQCNpV.js";import"./linear-progress-BUmXHJif.js";import"./list-BAO5WLfe.js";import"./popover-yu54Tcdl.js";import"./overlay-CsFRuuOm.js";import"./skeleton-CHpTOPKR.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
