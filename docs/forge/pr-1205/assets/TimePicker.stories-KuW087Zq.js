import{b as r}from"./iframe-DucEJqMh.js";import{g as i}from"./utils-DgK06r1C.js";import"./service-adapter-8tADcN_b.js";import"./text-field-DwmImSRz.js";import"./base-field-Yl7ZFpTq.js";import"./focus-indicator-DXw8Y8hB.js";import"./label-D3aO7fYn.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-BegJpIav.js";import"./icon-button-7uqnM-R4.js";import"./state-layer-e2HqliqN.js";import"./tyler-icons-gd947w-D.js";import"./linear-progress-LQTwNhb5.js";import"./list-BpgKZh9Q.js";import"./popover-CSRiiy_0.js";import"./overlay-B2h4Qxq4.js";import"./skeleton-BqxN4Nno.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
