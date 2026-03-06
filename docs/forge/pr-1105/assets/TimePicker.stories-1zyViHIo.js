import{b as r}from"./iframe-C07_izNT.js";import{g as i}from"./utils-B3m7KQiq.js";import"./service-adapter-8tADcN_b.js";import"./text-field-BXpA3LZ6.js";import"./base-field-CEekToEX.js";import"./focus-indicator-CXn9rWMK.js";import"./label-C6FUeE-w.js";import"./index-DTwfV0k0.js";import"./button-BHFcZZh0.js";import"./state-layer-BsCfz34t.js";import"./button-toggle-group-fHeSNXzP.js";import"./checkbox-gX6kE-qO.js";import"./icon-button-DM1nATYu.js";import"./tyler-icons-fP-z9z1i.js";import"./switch-CK2cqgnY.js";import"./time-picker-BnA1wokk.js";import"./linear-progress-g34J3BlM.js";import"./list-D_-uWQM4.js";import"./popover-DSGvC3fA.js";import"./overlay-Bcsgewax.js";import"./skeleton-C_yfi0NG.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
  `,component:t,parameters:{actions:{disable:!0}},argTypes:{...i({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const p=["Demo"],y=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:p,default:m},Symbol.toStringTag,{value:"Module"}));export{e as D,y as T};
