import{b as r}from"./iframe-Ce60v_-f.js";import{g as i}from"./utils-E9-_u7-I.js";import"./service-adapter-8tADcN_b.js";import"./text-field-BheLYwpD.js";import"./base-field-CfQJ5Dx6.js";import"./focus-indicator-Bp7--dbz.js";import"./label-BAtycYFU.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-Cqq0dvKU.js";import"./icon-button-s40OUgVh.js";import"./state-layer-B1dog9AJ.js";import"./tyler-icons-QQy6qJP1.js";import"./linear-progress-BuTzYSPq.js";import"./list-tSsBcS4l.js";import"./popover-bYTsRCvd.js";import"./overlay-BNDDgKF7.js";import"./skeleton-DjMJjvPK.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
