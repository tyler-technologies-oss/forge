import{b as r}from"./iframe-CGF9490j.js";import{g as i}from"./utils-cbnKSSEt.js";import"./service-adapter-DlT-lJx7.js";import"./text-field-V39Mt-6S.js";import"./base-field-D8CxI0Jj.js";import"./focus-indicator-BuzCXwAm.js";import"./label-CtoUkODo.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-BCZ6_qqy.js";import"./icon-button-D1wmfd79.js";import"./tyler-icons-CM84cyec.js";import"./linear-progress-Du-Ntegu.js";import"./list-EiOoI77I.js";import"./popover-CBkkBxnw.js";import"./overlay-iu-_ABPF.js";import"./skeleton-ZvFpE85R.js";import"./list-item-BwYEQ33V.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
