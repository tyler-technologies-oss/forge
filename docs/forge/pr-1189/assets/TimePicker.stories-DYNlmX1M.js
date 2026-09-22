import{b as r}from"./iframe-BTsZxqzu.js";import{g as i}from"./utils-B0J9t6hU.js";import"./service-adapter-DlT-lJx7.js";import"./text-field-Ch1FWqHZ.js";import"./base-field-CobvQUzz.js";import"./focus-indicator-BxamY3-n.js";import"./label-OjWKjQls.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-B_FvMdr4.js";import"./icon-button-CSxHjIC-.js";import"./tyler-icons-DhRbvloE.js";import"./linear-progress-VpC6qUWa.js";import"./list-DxnPa9SU.js";import"./popover-CdNzs7fC.js";import"./overlay-knVFCZgv.js";import"./skeleton-DBZT6LKu.js";import"./list-item-BTfzPPjj.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
