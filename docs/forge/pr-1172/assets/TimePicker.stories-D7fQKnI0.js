import{b as r}from"./iframe-CjzVpfqS.js";import{g as i}from"./utils-Bqf6WcF-.js";import"./service-adapter-8tADcN_b.js";import"./text-field-B9xZ2Bp8.js";import"./base-field-Cab5qth9.js";import"./focus-indicator-DHikC1Y8.js";import"./label-DcyIgUN2.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-RZbwlICz.js";import"./button-toggle-group-CizYn0Bm.js";import"./checkbox-px03cLLv.js";import"./icon-button-Y8A9ultm.js";import"./tyler-icons-J8-UQPDE.js";import"./switch-xZjZ3ZX2.js";import"./time-picker-D2rLp28s.js";import"./linear-progress-CNsyrVbY.js";import"./list-DyIfwNHS.js";import"./popover-1VKXWetn.js";import"./overlay-BUaUM1sf.js";import"./skeleton-CVBYr5DN.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
