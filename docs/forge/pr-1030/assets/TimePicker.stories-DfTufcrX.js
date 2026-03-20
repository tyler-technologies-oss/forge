import{b as r}from"./iframe-DriYmvez.js";import{g as i}from"./utils-BA5-_s-B.js";import"./service-adapter-8tADcN_b.js";import"./text-field-krqlEIb4.js";import"./base-field-Dw-RN5vF.js";import"./focus-indicator-BrbZv0xw.js";import"./label-BxEiOTH9.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./button-DFgZemWW.js";import"./state-layer-BAlZ4sKA.js";import"./button-toggle-group-CHBa_PC5.js";import"./checkbox-CKn84_oJ.js";import"./icon-button-3w-6zUmZ.js";import"./tyler-icons-Bwr0J3kB.js";import"./switch-QiY0xOLb.js";import"./time-picker-CHjtAP-S.js";import"./linear-progress-C_nfyJF6.js";import"./list-B3MPjcuq.js";import"./popover-COK8oi_U.js";import"./overlay-BB80zovl.js";import"./skeleton-CerfHp_D.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
