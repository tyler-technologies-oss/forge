import{b as r}from"./iframe-NVT04YET.js";import{g as i}from"./utils-DI4_RuhW.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CfuEIgTP.js";import"./base-field-BiOQ03xs.js";import"./focus-indicator-DEMHE8eL.js";import"./label-pb2rPE8o.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-vBMrWLv1.js";import"./state-layer-cKdDztbm.js";import"./button-toggle-group-BxQ5ovCJ.js";import"./checkbox-r6YOJNp0.js";import"./icon-button-DxB8o4J0.js";import"./tyler-icons-BdYYOvFd.js";import"./switch-eKSwfJDq.js";import"./time-picker-CSSSo2tm.js";import"./linear-progress-DLb8lZjg.js";import"./list-BPri-mi-.js";import"./popover-CgGunS15.js";import"./overlay-BLfIvLYm.js";import"./skeleton-jvDFel5Y.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
