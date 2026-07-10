import{b as r}from"./iframe-Hc2vxO-3.js";import{g as i}from"./utils-Ck-gGzab.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CAx8lM7f.js";import"./base-field-B6Trs6w0.js";import"./focus-indicator-B1FXTb5O.js";import"./label-BQ6Zcfgc.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-izRvq-sn.js";import"./state-layer-CezKS0dV.js";import"./button-toggle-group-COtB5IPL.js";import"./checkbox-BIwL8kgt.js";import"./icon-button-DrvoDOGf.js";import"./tyler-icons-BvDuEu60.js";import"./switch-BxdaZ3zk.js";import"./time-picker-CEL4bzkW.js";import"./linear-progress-Do3VWKo6.js";import"./list-LZCTD_xB.js";import"./popover-DSD9tpUV.js";import"./overlay-sExqbF4-.js";import"./skeleton-ChM8mDa3.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
