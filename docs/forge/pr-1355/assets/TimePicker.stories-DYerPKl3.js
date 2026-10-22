import{b as r}from"./iframe-B2G4zKPj.js";import{g as i}from"./utils-2_OYILP2.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CStdahpR.js";import"./base-field-i1QPAbu6.js";import"./focus-indicator-bDn075UK.js";import"./label-D1p99XXI.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./time-picker-CzcPht0z.js";import"./icon-button-Dd9p4EqL.js";import"./icon-CzY8gUKj.js";import"./linear-progress-BNAgl3n6.js";import"./list-CWBEI486.js";import"./popover-l-fAYctd.js";import"./overlay-DWH89yjz.js";import"./skeleton-HIoiQfSw.js";import"./list-item-Cy6LxyEf.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
