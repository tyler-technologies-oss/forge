import{b as r}from"./iframe-oVCy0CKL.js";import{g as i}from"./utils-Cu3TicFl.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CipdUHVs.js";import"./base-field-DdZdsiFy.js";import"./focus-indicator-PC490wMa.js";import"./label-BDA3qcRk.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-BX-5w7dx.js";import"./icon-button-BkuiL2Hq.js";import"./state-layer-DRsbBcDh.js";import"./tyler-icons-B5QTbAtT.js";import"./linear-progress-BvuLf7up.js";import"./list-IUhRNIec.js";import"./popover-98RIrDc_.js";import"./overlay-BduRS6k-.js";import"./skeleton-0tvJWIW1.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
