import{b as r}from"./iframe-BK3r3gy1.js";import{g as i}from"./utils-ZPyYhNMY.js";import"./service-adapter-8tADcN_b.js";import"./text-field-Cel5Wjfj.js";import"./base-field-DWygkCL_.js";import"./focus-indicator-BBtCjyD8.js";import"./label-BfNTkqXX.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./button-558tNDpa.js";import"./state-layer-Kw6pmYRH.js";import"./button-toggle-group-B_NQutYT.js";import"./checkbox-Czva33aP.js";import"./icon-button-Mxsm8Q6s.js";import"./icon-CXw8uXM_.js";import"./tyler-icons-uU9Yd7lf.js";import"./switch-AGgnckDO.js";import"./time-picker-DbRN0xjg.js";import"./linear-progress-D8EbdkBB.js";import"./list-CRxpAe8T.js";import"./popover-HtFB3a_u.js";import"./overlay-B3G4TIM3.js";import"./skeleton-CAo0Ux7j.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
  `,component:t,parameters:{actions:{disable:!0}},argTypes:{...i({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const p=["Demo"],v=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:p,default:m},Symbol.toStringTag,{value:"Module"}));export{e as D,v as T};
