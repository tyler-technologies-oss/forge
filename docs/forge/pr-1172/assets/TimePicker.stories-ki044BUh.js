import{b as r}from"./iframe-ZvzVysMB.js";import{g as i}from"./utils-D5x2rMta.js";import"./service-adapter-8tADcN_b.js";import"./text-field-DtSml0Xe.js";import"./base-field-C3qoTWst.js";import"./focus-indicator-D_djYoC-.js";import"./label-DLG3xkby.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-B8ecmhvI.js";import"./button-toggle-group-DGSVgR77.js";import"./checkbox-BVNiu6nH.js";import"./icon-button-wfw28VlB.js";import"./tyler-icons-H8C0T-24.js";import"./switch-CCh3ISmz.js";import"./time-picker-JhCbDo4r.js";import"./linear-progress-Bb0VsHdX.js";import"./list-BXM5oFgP.js";import"./popover-qCA9PGyj.js";import"./overlay-DZcAclZS.js";import"./skeleton-QEOzuRnR.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
