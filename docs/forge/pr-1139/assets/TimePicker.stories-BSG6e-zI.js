import{b as r}from"./iframe-VEfyHWkW.js";import{g as i}from"./utils-BX30PoUy.js";import"./service-adapter-8tADcN_b.js";import"./text-field-Bib6mwff.js";import"./base-field-BHMDuxhn.js";import"./focus-indicator-wqDlsb_E.js";import"./label-DfBB20aY.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./button-C2C39vE8.js";import"./state-layer-Cnbc18vB.js";import"./button-toggle-group-BSUSg7i_.js";import"./checkbox-CkPWqzNQ.js";import"./icon-button-C-tZnLZ9.js";import"./tyler-icons-DXmxhIwE.js";import"./switch-ouNxs7Nk.js";import"./time-picker-DEtMaql2.js";import"./linear-progress-CKPFd0xY.js";import"./list-CeiFAVN-.js";import"./popover-BS-OVdsI.js";import"./overlay-D2sOlsKa.js";import"./skeleton-g_Ea1Wjh.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
