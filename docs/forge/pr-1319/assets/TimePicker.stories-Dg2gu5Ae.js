import{b as r}from"./iframe-Bsuj_4wG.js";import{g as i}from"./utils-Bq4aulu2.js";import"./service-adapter-8tADcN_b.js";import"./text-field-DQXkglfR.js";import"./base-field-CUFB2h0Q.js";import"./focus-indicator-6vgszVnP.js";import"./label-nfa9NigO.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./time-picker-B05yCVhA.js";import"./icon-button-BRi3tEJf.js";import"./icon-CCr3iGf2.js";import"./linear-progress-BuMeIIdZ.js";import"./list-B2ijZ_Q_.js";import"./popover-kdG4uISC.js";import"./overlay-BB4_WJc7.js";import"./skeleton-DHgAi1uJ.js";import"./list-item-D2ojZ1MM.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
