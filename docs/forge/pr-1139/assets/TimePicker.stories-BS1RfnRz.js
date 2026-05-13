import{b as r}from"./iframe-BtwOG4Io.js";import{g as i}from"./utils-C7Mtdcaw.js";import"./service-adapter-8tADcN_b.js";import"./text-field-KiXeAjuO.js";import"./base-field-DDgoxYB3.js";import"./focus-indicator-Lnpimpqa.js";import"./label-BUPJsoNz.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-2FfP9-ZS.js";import"./state-layer-Cnbc18vB.js";import"./button-toggle-group-DchdA8ZH.js";import"./checkbox-C82KZfmi.js";import"./icon-button-CUurPQ5C.js";import"./tyler-icons-Chg9rfOc.js";import"./switch-CgbvNw52.js";import"./time-picker-DAgMYomI.js";import"./linear-progress-CKPFd0xY.js";import"./list-CBSolOyH.js";import"./popover-BQU0tJey.js";import"./overlay-CztEop_e.js";import"./skeleton-g_Ea1Wjh.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
