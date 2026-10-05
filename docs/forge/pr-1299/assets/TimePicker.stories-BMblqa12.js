import{b as r}from"./iframe-DuTL4nLl.js";import{g as i}from"./utils-CwE7tZFf.js";import"./service-adapter-8tADcN_b.js";import"./text-field-DvsEyAvv.js";import"./base-field-ZuZit9sw.js";import"./focus-indicator-DnG7A_bn.js";import"./label-Cs1b9vr6.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./time-picker-DWFX0k0Y.js";import"./icon-button-CJxY1IBT.js";import"./icon-BUzV7HWf.js";import"./linear-progress-BuMeIIdZ.js";import"./list-DNtySjlc.js";import"./popover-CLHAAODD.js";import"./overlay-i68906s2.js";import"./skeleton-DWKuOLCj.js";import"./list-item-BDyrHBxR.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
