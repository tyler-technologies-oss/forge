import{b as r}from"./iframe-CJhNcN38.js";import{g as i}from"./utils-TiAJY-9P.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CdGWGHG3.js";import"./base-field-CuMLW2-y.js";import"./focus-indicator-9EzLjfI_.js";import"./label-CFeTXel8.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-CV3Or9sw.js";import"./state-layer-CezKS0dV.js";import"./button-toggle-group-BKdoO-gM.js";import"./checkbox-BWzUMQKt.js";import"./icon-button-DsngZIug.js";import"./tyler-icons-DVutJ-sn.js";import"./switch-D2G0i_3l.js";import"./time-picker-BKHeUvei.js";import"./linear-progress-Do3VWKo6.js";import"./list-Bcitl4zM.js";import"./popover-B_b22AUE.js";import"./overlay-B_GK-FD4.js";import"./skeleton-334I7GYI.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
  `,component:t,parameters:{actions:{disable:!0}},argTypes:{...i({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const p=["Demo"],g=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:p,default:m},Symbol.toStringTag,{value:"Module"}));export{e as D,g as T};
