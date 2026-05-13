import{b as r}from"./iframe-DYu_YUNV.js";import{g as i}from"./utils-qcABQWBJ.js";import"./service-adapter-8tADcN_b.js";import"./text-field-BCq8hCIx.js";import"./base-field-DwrgASMZ.js";import"./focus-indicator-DYCNHTNB.js";import"./label-DqvVA4Ut.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-DYXzaptD.js";import"./state-layer-Cnbc18vB.js";import"./button-toggle-group-CqU02Llq.js";import"./checkbox-BPHMFZ31.js";import"./icon-button-DK0S2Dk5.js";import"./tyler-icons-BR2D-RGM.js";import"./switch-B5DttFku.js";import"./time-picker-CIXGq1WJ.js";import"./linear-progress-CKPFd0xY.js";import"./list-B6v9krCw.js";import"./popover-CZwG_Uov.js";import"./overlay-CQSkmT4F.js";import"./skeleton-g_Ea1Wjh.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
