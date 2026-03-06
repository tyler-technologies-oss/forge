import{b as r}from"./iframe-Nz47_fHD.js";import{g as i}from"./utils-Ba9gsS7G.js";import"./service-adapter-8tADcN_b.js";import"./text-field-B5oPl4dX.js";import"./base-field-CZ7afn2P.js";import"./focus-indicator-B9pIc8ye.js";import"./label-BUhDowKT.js";import"./index-DTwfV0k0.js";import"./button-DCmcEZ2V.js";import"./state-layer-D2ldILW1.js";import"./button-toggle-group-By5RlPye.js";import"./checkbox-qD1ZxiPF.js";import"./icon-button-CfSeSDt7.js";import"./tyler-icons-D4_mmXXb.js";import"./switch-CuFjOXue.js";import"./time-picker-CTw3-m4g.js";import"./linear-progress-BUFrhekn.js";import"./list-Cu8bwlYk.js";import"./popover-Dei7Vx-1.js";import"./overlay-C91thjfI.js";import"./skeleton-D7ds2eUz.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
