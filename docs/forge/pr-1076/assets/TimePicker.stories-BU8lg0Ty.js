import{b as r}from"./iframe-BUvWK7Gm.js";import{g as i}from"./utils-D8X1NLZa.js";import"./service-adapter-CoGDs2_3.js";import"./text-field-BFpW9S5W.js";import"./base-field-Cj5xcuNX.js";import"./focus-indicator-DuaWb64U.js";import"./label-CNb-VxA0.js";import"./index-DTwfV0k0.js";import"./button-HjiDhvyP.js";import"./state-layer-CwwoRddA.js";import"./button-toggle-group-CC0eMfsb.js";import"./checkbox-B4E0RTGG.js";import"./icon-button-BsxQaUJP.js";import"./tyler-icons-Dn_DGO8W.js";import"./switch-C39lFNL9.js";import"./time-picker-BtYiVfaU.js";import"./linear-progress-BPDXw63a.js";import"./list-RnOo0JfG.js";import"./popover-BxT30IVE.js";import"./overlay-DPtUw_or.js";import"./skeleton-CXhX8HjP.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
