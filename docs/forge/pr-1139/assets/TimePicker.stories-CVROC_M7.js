import{b as r}from"./iframe-BYO1bXoJ.js";import{g as i}from"./utils-CJ7ikJXH.js";import"./service-adapter-8tADcN_b.js";import"./text-field-DckKtu6K.js";import"./base-field-DB0sHKTX.js";import"./focus-indicator-DqIVBzGS.js";import"./label-CyCZ1UCZ.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./button-veE_5Z_L.js";import"./state-layer-7HWBWBQu.js";import"./button-toggle-group-N0k30em1.js";import"./checkbox-B-0yZncB.js";import"./icon-button-BImepwl9.js";import"./tyler-icons-7uX1bPDw.js";import"./switch-DecUR8kn.js";import"./time-picker-Dy29saUm.js";import"./linear-progress-DEYvX0ZE.js";import"./list-CUmFk2WX.js";import"./popover-CuKDZ7_o.js";import"./overlay-D9banag4.js";import"./skeleton-g_Ea1Wjh.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
