import{b as r}from"./iframe-C0tv50se.js";import{g as i}from"./utils-QdjzOY7l.js";import"./service-adapter-8tADcN_b.js";import"./text-field-BLBlfai0.js";import"./base-field-BJSvDTbm.js";import"./focus-indicator-CI-XZz-0.js";import"./label-BhjteSIr.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-D3Be4wOV.js";import"./state-layer-RJ83GVyt.js";import"./button-toggle-group-BfEQHVMh.js";import"./checkbox-DuZDGVEn.js";import"./icon-button-B2ttIe-Y.js";import"./tyler-icons-DujtuLyJ.js";import"./switch-DFqa9aoO.js";import"./time-picker-CBslG21s.js";import"./linear-progress-DLb8lZjg.js";import"./list-CAae_Zqa.js";import"./popover-Cbq2Ub2i.js";import"./overlay-Bo-MsksO.js";import"./skeleton-BNhyCQ6_.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
