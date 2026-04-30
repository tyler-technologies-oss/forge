import{b as r}from"./iframe-D8QRU-tV.js";import{g as i}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CcxB30F-.js";import"./base-field-r83kWj0E.js";import"./focus-indicator-azdGC1n3.js";import"./label-CIZlvnGp.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./button-DSNQ_5yA.js";import"./state-layer-Dj8VLfkk.js";import"./button-toggle-group-BvL_7CJd.js";import"./checkbox-DRYMIyoy.js";import"./icon-button-BGlfW1oY.js";import"./tyler-icons-ChHIax3p.js";import"./switch-nItaCm0y.js";import"./time-picker-CpWBOXRP.js";import"./linear-progress-BUmXHJif.js";import"./list-BlR1QDBu.js";import"./popover-yu54Tcdl.js";import"./overlay-CsFRuuOm.js";import"./skeleton-CHpTOPKR.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
