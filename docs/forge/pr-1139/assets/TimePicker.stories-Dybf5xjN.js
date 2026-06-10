import{b as r}from"./iframe-B4qL4WW8.js";import{g as i}from"./utils-BAJ2NYw0.js";import"./service-adapter-8tADcN_b.js";import"./text-field-_spscdWS.js";import"./base-field-uheUCyyA.js";import"./focus-indicator-CWvPPMO_.js";import"./label-Cez-rt1T.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-KwClblCq.js";import"./state-layer-cKdDztbm.js";import"./button-toggle-group-BxYW3cle.js";import"./checkbox-BLVeyHfZ.js";import"./icon-button-BM3J1fbO.js";import"./tyler-icons-N_dRJhWh.js";import"./switch-nalHzitq.js";import"./time-picker-Kdn5w6bR.js";import"./linear-progress-DLb8lZjg.js";import"./list-MRfQ1ZFc.js";import"./popover-BgA7_RAN.js";import"./overlay-BeM6eaPr.js";import"./skeleton-jvDFel5Y.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
