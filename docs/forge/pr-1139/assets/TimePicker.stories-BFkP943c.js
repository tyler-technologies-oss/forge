import{b as r}from"./iframe-6gafHklC.js";import{g as i}from"./utils-Cl3lyYep.js";import"./service-adapter-8tADcN_b.js";import"./text-field-Ugz_STLH.js";import"./base-field-pDXaXR5W.js";import"./focus-indicator-hqe8KJwu.js";import"./label-B1sJ7Bei.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-CAQv7mVT.js";import"./state-layer-cKdDztbm.js";import"./button-toggle-group-DRtcgfym.js";import"./checkbox-CwIzzMdX.js";import"./icon-button-BegYxAOA.js";import"./tyler-icons-DzcTIhOC.js";import"./switch-BFthGsVb.js";import"./time-picker-BAm4l1Wp.js";import"./linear-progress-DLb8lZjg.js";import"./list-C36IZ85R.js";import"./popover-DcPFwGot.js";import"./overlay-DZC8FH2Q.js";import"./skeleton-jvDFel5Y.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
