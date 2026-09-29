import{b as r}from"./iframe-CSIdYrZJ.js";import{g as i}from"./utils-CL5ue9IV.js";import"./service-adapter-8tADcN_b.js";import"./text-field-C5XkiU4l.js";import"./base-field-CFZKx8zr.js";import"./focus-indicator-Da-r1W3d.js";import"./label-BOLaqKZc.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-DEdOA6LR.js";import"./icon-button-RYDssO7r.js";import"./icon-D0ZxlEvQ.js";import"./linear-progress-kQO48laS.js";import"./list-DlI3fnDe.js";import"./popover-o0o6y1Gd.js";import"./overlay-C1ZJYdef.js";import"./skeleton-EUyK87zq.js";import"./list-item-Dby-tdmr.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
