import{b as r}from"./iframe-Co1TxWa1.js";import{g as i}from"./utils-3yMKERXj.js";import"./service-adapter-8tADcN_b.js";import"./text-field-cm5IL4zd.js";import"./base-field-mtvRK-Y7.js";import"./focus-indicator-D-5vSThe.js";import"./label-CoQ2xHrI.js";import"./index-DTwfV0k0.js";import"./button-DHNtJFdN.js";import"./state-layer-Dr4I3-ea.js";import"./button-toggle-group-B6gbWzm1.js";import"./checkbox-iQjSoNxJ.js";import"./icon-button-Bgrx9pzH.js";import"./tyler-icons-BS8_pNWa.js";import"./switch-HBk0yptu.js";import"./time-picker-CkxYC-aX.js";import"./linear-progress-Cnx_HyUf.js";import"./list-BIFSuh1A.js";import"./popover-C7v8d-bT.js";import"./overlay-CnRxeVdV.js";import"./skeleton-CMBvqwtz.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
  `,component:t,parameters:{actions:{disable:!0}},argTypes:{...i({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const p=["Demo"],y=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:p,default:m},Symbol.toStringTag,{value:"Module"}));export{e as D,y as T};
