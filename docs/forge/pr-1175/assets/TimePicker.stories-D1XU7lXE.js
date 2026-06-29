import{b as r}from"./iframe-CtvU57LK.js";import{g as i}from"./utils-B8Y87ww2.js";import"./service-adapter-8tADcN_b.js";import"./text-field-DD0S4gDU.js";import"./base-field-CsJ9C7m3.js";import"./focus-indicator-CERzR5p8.js";import"./label-DrjywKzI.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-Bjwh-7Py.js";import"./state-layer-cKdDztbm.js";import"./button-toggle-group-5dgB_v-7.js";import"./checkbox-BPq8DyKa.js";import"./icon-button-D9I8PnM-.js";import"./tyler-icons-BbfxUxRd.js";import"./switch-t04-ZD27.js";import"./time-picker-bEA0uZ8W.js";import"./linear-progress-DLb8lZjg.js";import"./list-B4D_o8Wi.js";import"./popover-B58F_IdX.js";import"./overlay-CYTwEvsd.js";import"./skeleton-jvDFel5Y.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
