import{b as r}from"./iframe-HlIX8nsI.js";import{g as i}from"./utils-DhPatzMP.js";import"./service-adapter-CoGDs2_3.js";import"./text-field-DXuIdBiY.js";import"./base-field-BqEaAztZ.js";import"./focus-indicator-DO-4oH1N.js";import"./label-YoDu1hYe.js";import"./index-DTwfV0k0.js";import"./button-C32nRzKT.js";import"./state-layer-DNIS1N8s.js";import"./button-toggle-group-C7Z2oquR.js";import"./checkbox-IEt9rg4t.js";import"./icon-button-kXhWo8t5.js";import"./tyler-icons-B1nAV5VC.js";import"./switch-D4m-nLTp.js";import"./time-picker-B4NDrZYV.js";import"./linear-progress-Buvtsnzw.js";import"./list-2JCez8nQ.js";import"./popover-OppO9jQP.js";import"./overlay-CKBuRB0A.js";import"./skeleton-D4yo0sfy.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
