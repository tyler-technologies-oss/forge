import{b as r}from"./iframe-CWXjUqeX.js";import{g as i}from"./utils-C7Mtdcaw.js";import"./service-adapter-8tADcN_b.js";import"./text-field-Dk4H_-Ig.js";import"./base-field-DaIzzACG.js";import"./focus-indicator-BTv0QnKa.js";import"./label-CtJEE94F.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-PW1lPiFh.js";import"./state-layer-Cnbc18vB.js";import"./button-toggle-group-BC0QF8Zu.js";import"./checkbox-TumIk4PH.js";import"./icon-button-Cmf5mtcl.js";import"./tyler-icons-4d7AKKUw.js";import"./switch-BUv3KVhl.js";import"./time-picker-u8bU3YZ3.js";import"./linear-progress-CKPFd0xY.js";import"./list-DyUHSKMC.js";import"./popover-BwsK9BW2.js";import"./overlay-C5P-SFRG.js";import"./skeleton-g_Ea1Wjh.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
