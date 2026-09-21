import{b as r}from"./iframe-DwkZy6ch.js";import{g as i}from"./utils-CElmhe9Y.js";import"./service-adapter-DlT-lJx7.js";import"./text-field-CV-bF5Ih.js";import"./base-field-5Se0asf2.js";import"./focus-indicator-BtaUH7my.js";import"./label-70FYznpm.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-CKBED7L1.js";import"./icon-button-DXyGa-P5.js";import"./tyler-icons-9EkLoMUE.js";import"./linear-progress-VpC6qUWa.js";import"./list-Bduf0Zil.js";import"./popover-C4YB0wev.js";import"./overlay-B-1J0zGL.js";import"./skeleton-Bcd9Y6-A.js";import"./list-item-CIx9kMCC.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
