import{b as r}from"./iframe-BYDrRnOm.js";import{g as i}from"./utils-CxQpgtu2.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CUp5IOz8.js";import"./base-field-Deh_qvHC.js";import"./focus-indicator-fonQhWdU.js";import"./label-BD_Crkmm.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-B6oHvYnp.js";import"./state-layer-cKdDztbm.js";import"./button-toggle-group-D1nnZ6m9.js";import"./checkbox-NBvnyxeE.js";import"./icon-button-Lifo_E-f.js";import"./tyler-icons-DhQHOdPt.js";import"./switch-ClsoGOlp.js";import"./time-picker-CJKvc3I6.js";import"./linear-progress-DLb8lZjg.js";import"./list-Cez13ixY.js";import"./popover-lzJONmB4.js";import"./overlay-Ba1x-UC-.js";import"./skeleton-jvDFel5Y.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
