import{b as r}from"./iframe-D7yGoXUc.js";import{g as i}from"./utils-BAJ2NYw0.js";import"./service-adapter-8tADcN_b.js";import"./text-field-DlJG8uyW.js";import"./base-field-BnfSyDU8.js";import"./focus-indicator-C_ZgqUBS.js";import"./label-C2aoKVOL.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-Cq-ljBAf.js";import"./state-layer-cKdDztbm.js";import"./button-toggle-group-CJ3R-Ddh.js";import"./checkbox-B0ryUDnH.js";import"./icon-button-gU_wqqLD.js";import"./tyler-icons-DQPVwFP_.js";import"./switch-DbZlW4o-.js";import"./time-picker-CfNKN-Ph.js";import"./linear-progress-DLb8lZjg.js";import"./list-DS45qf86.js";import"./popover-CCF5Rgnf.js";import"./overlay-BcO3gIlA.js";import"./skeleton-jvDFel5Y.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
