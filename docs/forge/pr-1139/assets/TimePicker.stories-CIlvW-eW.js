import{b as r}from"./iframe-TpqQ2uGz.js";import{g as i}from"./utils-C7Mtdcaw.js";import"./service-adapter-8tADcN_b.js";import"./text-field-BYx17-83.js";import"./base-field-DWE2hSH6.js";import"./focus-indicator-DTY-3C7X.js";import"./label-BeWFARXA.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-DcebgIPw.js";import"./state-layer-Cnbc18vB.js";import"./button-toggle-group-v2p1uXTc.js";import"./checkbox-DrU_9U3f.js";import"./icon-button-QnQestmc.js";import"./tyler-icons-Br2O5XA1.js";import"./switch-FZyB0Nbu.js";import"./time-picker-DW8d19Az.js";import"./linear-progress-CKPFd0xY.js";import"./list-XqboNd41.js";import"./popover-DOF56Jav.js";import"./overlay-C_kqG4zZ.js";import"./skeleton-g_Ea1Wjh.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
