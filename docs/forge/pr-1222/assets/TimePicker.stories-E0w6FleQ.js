import{b as r}from"./iframe-CcCZn8Qo.js";import{g as i}from"./utils-BR1rLwc_.js";import"./service-adapter-8tADcN_b.js";import"./text-field-D815X8jF.js";import"./base-field-BYB1dcoa.js";import"./focus-indicator-CwT8THhK.js";import"./label-BhaR9I0r.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-DkHcXYkL.js";import"./icon-button-DuRpLS_m.js";import"./icon-BIdGKJqZ.js";import"./linear-progress-kQO48laS.js";import"./list-0iJnd8Jh.js";import"./popover-d2r_ayMy.js";import"./overlay-DNJ2GsC-.js";import"./skeleton-C4Wq8Idf.js";import"./list-item-P9WX-v0r.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
