import{b as r}from"./iframe-DbJiOKlf.js";import{g as i}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./text-field-BArN-FVy.js";import"./base-field-DOxpzKxB.js";import"./focus-indicator-DGXAgHfc.js";import"./label-BjIh2JMh.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./button-BKBMlaET.js";import"./state-layer-CK5iHsfr.js";import"./button-toggle-group-C_ZtL0O7.js";import"./checkbox-R6g2b17z.js";import"./icon-button-CP4kR911.js";import"./tyler-icons-DLpPoKat.js";import"./switch-DtMqp_Tp.js";import"./time-picker-B356TqwR.js";import"./linear-progress-DP1CUIRM.js";import"./list-BJFNSxfz.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./skeleton-DtujUGDy.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
