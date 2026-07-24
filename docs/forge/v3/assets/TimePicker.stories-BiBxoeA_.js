import{b as r}from"./iframe-Mn2yrZLF.js";import{g as i}from"./utils-to_g9TuQ.js";import"./service-adapter-8tADcN_b.js";import"./text-field-B9jAZNVw.js";import"./base-field-DDbx8vUb.js";import"./focus-indicator-C6a41ErI.js";import"./label-Du9ipTdU.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-DjsNiStc.js";import"./state-layer-CezKS0dV.js";import"./button-toggle-group-VmWRlqup.js";import"./checkbox-Dl_LKvF_.js";import"./icon-button-Brku5vTm.js";import"./tyler-icons-tLrSflW5.js";import"./switch-Du10BOCe.js";import"./time-picker-Ca5oreEh.js";import"./linear-progress-Do3VWKo6.js";import"./list-ub7XwfpU.js";import"./popover-wpSlFi1q.js";import"./overlay-CizHeCMh.js";import"./skeleton-BGwEdhX-.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
