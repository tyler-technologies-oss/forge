import{b as r}from"./iframe-BgRf1TIz.js";import{g as i}from"./utils-C-EU7_QI.js";import"./service-adapter-8tADcN_b.js";import"./text-field-MEI4fPKh.js";import"./base-field-DLD_aOaf.js";import"./focus-indicator-Ddo_7foI.js";import"./label-CpMUNpM9.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./time-picker-DbgPa_oW.js";import"./icon-button-DplwJpAj.js";import"./icon-BF2rMxkr.js";import"./linear-progress-BuMeIIdZ.js";import"./list-BguBqZQ5.js";import"./popover-CGb2usu3.js";import"./overlay-COLivfx5.js";import"./skeleton-C-3--dH7.js";import"./list-item-s49tr2Wv.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
