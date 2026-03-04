import{b as r}from"./iframe-CGNXTVBT.js";import{g as i}from"./utils-BLyw4gKD.js";import"./service-adapter-CoGDs2_3.js";import"./text-field-D0rNA0x8.js";import"./base-field-B3B3UyEM.js";import"./focus-indicator-VaTOwLCu.js";import"./label-D8iUihNG.js";import"./index-DTwfV0k0.js";import"./button-N-IY4KqJ.js";import"./state-layer-n7PzpGlA.js";import"./button-toggle-group-Da2ZoXAH.js";import"./checkbox-BYAGyDdl.js";import"./icon-button-DDH96UYI.js";import"./tyler-icons-DJO2-615.js";import"./switch-BteeO8PC.js";import"./time-picker-IytH4y4w.js";import"./linear-progress-CdLostcG.js";import"./list-DPF6xCfb.js";import"./popover-Duzv0w_S.js";import"./overlay-CCoxAUi3.js";import"./skeleton-pRzfknAa.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
