import{b as r}from"./iframe-D3ywNwM8.js";import{g as i}from"./utils-DI4_RuhW.js";import"./service-adapter-8tADcN_b.js";import"./text-field-Dy5AkmIq.js";import"./base-field-_ogFqgFi.js";import"./focus-indicator-L8jLY3bP.js";import"./label-DSKa9dGD.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-jbDXhbVx.js";import"./state-layer-cKdDztbm.js";import"./button-toggle-group-D3b7Fof0.js";import"./checkbox-BULrRoA1.js";import"./icon-button-C-gmku5F.js";import"./tyler-icons-B-oGyIaD.js";import"./switch-CNr0V07u.js";import"./time-picker-C8Q9ORQC.js";import"./linear-progress-DLb8lZjg.js";import"./list-Drs8GpbO.js";import"./popover-CwCOnS6V.js";import"./overlay-CHo1bjNa.js";import"./skeleton-jvDFel5Y.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
