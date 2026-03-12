import{b as r}from"./iframe-B9Mn3MTF.js";import{g as i}from"./utils-Dr8ZxV_m.js";import"./service-adapter-8tADcN_b.js";import"./text-field-DluAQgMq.js";import"./base-field-B7MphIDB.js";import"./focus-indicator-CYJ4ta_a.js";import"./label-Dxps7CO4.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./button-4-N4P9ye.js";import"./state-layer-D0SSeJ16.js";import"./button-toggle-group-84yse_00.js";import"./checkbox-T1_XI6FM.js";import"./icon-button-2xWdivGS.js";import"./tyler-icons-Cfjef8Hp.js";import"./switch-9JcCyNt4.js";import"./time-picker-DuD9LB-a.js";import"./linear-progress-C9rKJPwB.js";import"./list-DpG-mQpV.js";import"./popover-BCVIx3D1.js";import"./overlay-Cgb5IAlb.js";import"./skeleton-7bCDpj6R.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
