import{b as r}from"./iframe-ZebJRd2k.js";import{g as i}from"./utils-DYC_LATD.js";import"./service-adapter-8tADcN_b.js";import"./text-field-ucavXP17.js";import"./base-field-DsCdnF0Y.js";import"./focus-indicator-vAXHGgAC.js";import"./label-f55TS_D7.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-DGtDDiAE.js";import"./icon-button-DCXr5XdP.js";import"./state-layer-mJUCxnSJ.js";import"./tyler-icons-CvAFZSnF.js";import"./linear-progress-Dh__ll_M.js";import"./list-N8ASX7X4.js";import"./popover-DJnfQE5v.js";import"./overlay-CZiEinF4.js";import"./skeleton-q0AxETeF.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
