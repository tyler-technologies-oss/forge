import{b as r}from"./iframe-BGuHuM4N.js";import{g as i}from"./utils-BX30PoUy.js";import"./service-adapter-8tADcN_b.js";import"./text-field-A7miXrSc.js";import"./base-field--bwt2zYx.js";import"./focus-indicator-Dq8EIkxu.js";import"./label-C4Lb4Yov.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./button-BgdhAnEI.js";import"./state-layer-Cnbc18vB.js";import"./button-toggle-group-DanDSH1L.js";import"./checkbox-BbQogrgm.js";import"./icon-button-Bp6oT2oS.js";import"./tyler-icons-B-fG3G81.js";import"./switch-D7bk-dlh.js";import"./time-picker-B1sLm9F3.js";import"./linear-progress-CKPFd0xY.js";import"./list-DfyC6s3p.js";import"./popover-BFACa1rP.js";import"./overlay-DEr28VpI.js";import"./skeleton-g_Ea1Wjh.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
