import{b as r}from"./iframe-DN09JPRV.js";import{g as i}from"./utils-Ck-gGzab.js";import"./service-adapter-8tADcN_b.js";import"./text-field-Cr1Ip05x.js";import"./base-field-COrAwxit.js";import"./focus-indicator-h9nBYyaY.js";import"./label-Hgv3Nrmm.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-DkpvNBOQ.js";import"./state-layer-CezKS0dV.js";import"./button-toggle-group-BOZrH4Oe.js";import"./checkbox-Cj9BmxaH.js";import"./icon-button-L1vH1jaS.js";import"./tyler-icons-BYsm4hFB.js";import"./switch-JyqrCZx1.js";import"./time-picker-AIZ4o9mJ.js";import"./linear-progress-Do3VWKo6.js";import"./list-C6KTZLjy.js";import"./popover-B1xBEbVI.js";import"./overlay-D2OUOcFY.js";import"./skeleton-CHMON4uU.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
