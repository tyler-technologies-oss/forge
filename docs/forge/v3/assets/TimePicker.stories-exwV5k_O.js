import{b as r}from"./iframe-B_lgGbu6.js";import{g as i}from"./utils-m5ghmQjV.js";import"./service-adapter-8tADcN_b.js";import"./text-field-D_cgkpeu.js";import"./base-field-gOSZhYCf.js";import"./focus-indicator-CrcLkhkn.js";import"./label-CTco8L8H.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-BMbGVygj.js";import"./icon-button-BAkeg8m8.js";import"./state-layer-BHOa6Zo2.js";import"./tyler-icons-CEN2klhX.js";import"./linear-progress-Dwb4-mcz.js";import"./list-C6iz0ERj.js";import"./popover-t5fdcmFc.js";import"./overlay-B8JeDFYN.js";import"./skeleton-CrysVSv4.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
