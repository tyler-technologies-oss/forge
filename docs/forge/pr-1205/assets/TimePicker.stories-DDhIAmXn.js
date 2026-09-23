import{b as r}from"./iframe-CCQPwMqK.js";import{g as i}from"./utils-71auwco3.js";import"./service-adapter-DlT-lJx7.js";import"./text-field-mdAFESNO.js";import"./base-field-D9i8FqrF.js";import"./focus-indicator-CoBrh689.js";import"./label-B4HdJcCr.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-Jd52_qXw.js";import"./icon-button-CCm6VdsQ.js";import"./tyler-icons-D_P4inVM.js";import"./linear-progress-Du-Ntegu.js";import"./list-DoWEQWCg.js";import"./popover-avDoFPUj.js";import"./overlay-ejBQU7cY.js";import"./skeleton-BMUbeM10.js";import"./list-item-BE2FE9nz.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
  `,component:t,parameters:{actions:{disable:!0}},argTypes:{...i({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const l=["Demo"],O=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:l,default:m},Symbol.toStringTag,{value:"Module"}));export{e as D,O as T};
