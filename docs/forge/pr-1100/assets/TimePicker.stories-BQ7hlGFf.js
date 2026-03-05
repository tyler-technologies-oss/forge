import{b as r}from"./iframe-Of55AveD.js";import{g as i}from"./utils-BUOWcVje.js";import"./service-adapter-CoGDs2_3.js";import"./text-field-BKKZGKSr.js";import"./base-field-CKScdACj.js";import"./focus-indicator-D5E0TroM.js";import"./label-DRM0PBI9.js";import"./index-DTwfV0k0.js";import"./button-C3nGcbUo.js";import"./state-layer-n7PzpGlA.js";import"./button-toggle-group-B8pkXL-h.js";import"./checkbox--WiA-4gP.js";import"./icon-button-QrExihdR.js";import"./tyler-icons-B4xXB1kz.js";import"./switch-5gc7gkpa.js";import"./time-picker-CDl4GRsY.js";import"./linear-progress-CdLostcG.js";import"./list-DJwD6pYe.js";import"./popover-C9ytRj8r.js";import"./overlay-BayhLl23.js";import"./skeleton-pRzfknAa.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
