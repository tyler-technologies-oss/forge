import{b as r}from"./iframe-t5tnxelm.js";import{g as i}from"./utils-Jq8-zXrZ.js";import"./service-adapter-CffG5Lhq.js";import"./text-field--7Pvz99l.js";import"./base-field-Bw1_lgcX.js";import"./focus-indicator-Be5X-pqJ.js";import"./label-OKnlCxkv.js";import"./index-DTwfV0k0.js";import"./button-C9RtIPjm.js";import"./state-layer-u9rLNX9t.js";import"./button-toggle-group--lfrxhCI.js";import"./checkbox-DZToHq8O.js";import"./icon-button-DtIeUSSM.js";import"./tyler-icons-B0WPf66k.js";import"./switch-BrYnHsJs.js";import"./time-picker-C3F_XdRm.js";import"./linear-progress-CsYLd0m5.js";import"./list-BQuljFLs.js";import"./popover-oAFRtu_9.js";import"./overlay-BhwPRyah.js";import"./skeleton-DllEP8un.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
