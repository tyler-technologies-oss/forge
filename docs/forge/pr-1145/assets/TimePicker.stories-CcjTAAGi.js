import{b as r}from"./iframe-CihVPDBI.js";import{g as i}from"./utils-DujU4KjQ.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CgdMkVPv.js";import"./base-field-DAyDeHei.js";import"./focus-indicator-CDSo70_c.js";import"./label-CCJpr-qV.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./time-picker-BiFVejYV.js";import"./icon-button-CaCbWj6y.js";import"./state-layer-CKPcsXao.js";import"./tyler-icons-D7rrSs48.js";import"./linear-progress-dFUODLVX.js";import"./list-Dc0H_xEv.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./skeleton-BxrGynUp.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
