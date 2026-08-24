import{b as r}from"./iframe-CdbO8ZWL.js";import{g as i}from"./utils-CjnDZgMw.js";import"./service-adapter-8tADcN_b.js";import"./text-field-BWVPyHXO.js";import"./base-field-_1zGY7FX.js";import"./focus-indicator-CP_rFuyY.js";import"./label-CVi-YE1S.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-CkU-F63k.js";import"./icon-button-CzzNgYJ5.js";import"./state-layer-BkRErCgp.js";import"./tyler-icons-CP3IuoxV.js";import"./linear-progress-D4Cj2MuD.js";import"./list-zoQskWC0.js";import"./popover-Br804OQS.js";import"./overlay-BkwGtAvs.js";import"./skeleton-CItCGZ0G.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
