import{b as r}from"./iframe-BlLbDnlR.js";import{g as i}from"./utils-BaIZrU9D.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CJFYHWJt.js";import"./base-field-ClmyUAzy.js";import"./focus-indicator-CIttc_vs.js";import"./label-hOmdyDz5.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./time-picker-DCBHQU9I.js";import"./icon-button-CyhNoOEa.js";import"./icon-CJqXyQad.js";import"./linear-progress-BuMeIIdZ.js";import"./list-C7kfQ7Om.js";import"./popover-COR2BVeW.js";import"./overlay-BwE7oRiM.js";import"./skeleton-CBQ6kPse.js";import"./list-item-BteMMJXx.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
