import{b as r}from"./iframe-ClGmR9ML.js";import{g as i}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./text-field-Dqz3fgEC.js";import"./base-field-83n_qEkW.js";import"./focus-indicator-BpIQOnul.js";import"./label-CJfGDViV.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./button-DZleSkHk.js";import"./state-layer-CUeokLWr.js";import"./button-toggle-group-gz-cK6Ln.js";import"./checkbox-9QmVkWlY.js";import"./icon-button-BTDWQ4c3.js";import"./tyler-icons-C6sewHdg.js";import"./switch-Bnvfo3NB.js";import"./time-picker-DHlssDzc.js";import"./linear-progress-mfaOyWFY.js";import"./list-B_nEKClZ.js";import"./popover-Drh8MX47.js";import"./overlay-d7QE-4pI.js";import"./skeleton-BtsO4Ege.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
