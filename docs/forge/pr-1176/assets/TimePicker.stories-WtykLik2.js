import{b as r}from"./iframe-mEEp4vyl.js";import{g as i}from"./utils-C2rEPPUi.js";import"./service-adapter-8tADcN_b.js";import"./text-field-BLXUe1A3.js";import"./base-field-BISBlare.js";import"./focus-indicator-B-Oned0K.js";import"./label-BxzW7H-R.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-Bhi7bCnQ.js";import"./state-layer-CezKS0dV.js";import"./button-toggle-group-NJ8Db9ZQ.js";import"./checkbox-Ch9uDNN7.js";import"./icon-button-Bx-1oLBZ.js";import"./tyler-icons-Dd_50CiF.js";import"./switch-CCftY1Dm.js";import"./time-picker-Clardz0D.js";import"./linear-progress-Do3VWKo6.js";import"./list-DLqUJxC-.js";import"./popover-CU3EvxYx.js";import"./overlay-CJnoqSm4.js";import"./skeleton-D-1mhuaY.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
