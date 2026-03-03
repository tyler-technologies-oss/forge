import{b as r}from"./iframe-BJoIjGP7.js";import{g as i}from"./utils-DlRR_6up.js";import"./service-adapter-CoGDs2_3.js";import"./text-field-Bcd69DcX.js";import"./base-field-CJNUJxZl.js";import"./focus-indicator-D1CeImek.js";import"./label-Dgyq1CIh.js";import"./index-DTwfV0k0.js";import"./button-Dgz3L8XP.js";import"./state-layer-CwwoRddA.js";import"./button-toggle-group-CwOE63C0.js";import"./checkbox-AWV5368s.js";import"./icon-button-D_JhKJdr.js";import"./tyler-icons-Dn_DGO8W.js";import"./switch-HtibWHBE.js";import"./time-picker-C8XgScfg.js";import"./linear-progress-BPDXw63a.js";import"./list-BmIuUSdG.js";import"./popover-BxT30IVE.js";import"./overlay-DPtUw_or.js";import"./skeleton-CXhX8HjP.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
