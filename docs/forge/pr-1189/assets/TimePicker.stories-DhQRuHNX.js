import{b as r}from"./iframe-DhPPATOI.js";import{g as i}from"./utils-BUEgyQuR.js";import"./service-adapter-gy1PbA1l.js";import"./text-field-BWtqe7xr.js";import"./base-field-Mwf4T1kF.js";import"./focus-indicator-Cy6URCXv.js";import"./label-D4E_mm-6.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-BNX7fr4c.js";import"./icon-button-C2v-Sinx.js";import"./icon-DaCKLlYs.js";import"./linear-progress-BGu4ylYb.js";import"./list-BQeID-EI.js";import"./popover-B6Lyp91L.js";import"./overlay-DnA59UKB.js";import"./skeleton-D0Kw-TGm.js";import"./list-item-Czcdb5bP.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
