import{b as r}from"./iframe-oAO0QRyC.js";import{g as i}from"./utils-BUadP3tW.js";import"./service-adapter-8tADcN_b.js";import"./text-field-Cm3IZ4rz.js";import"./base-field-R00t77-F.js";import"./focus-indicator-DF5CnxaH.js";import"./label-DWc44Up3.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./time-picker-Swar9kA3.js";import"./icon-button-BUDykOqB.js";import"./icon-BNaE2C0t.js";import"./linear-progress-BuMeIIdZ.js";import"./list-c_yY3uTR.js";import"./popover-DCnuFbj-.js";import"./overlay-DWOSAut5.js";import"./skeleton-ZraD1p-1.js";import"./list-item-BYmRBlrw.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
