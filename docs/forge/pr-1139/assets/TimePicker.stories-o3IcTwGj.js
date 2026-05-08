import{b as r}from"./iframe-CXxaXhZf.js";import{g as i}from"./utils-BX30PoUy.js";import"./service-adapter-8tADcN_b.js";import"./text-field-DgdgUj5i.js";import"./base-field-CbZ6BHU0.js";import"./focus-indicator-CsnuHiKZ.js";import"./label-BtczzTD5.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./button-fq-mk_M3.js";import"./state-layer-Cnbc18vB.js";import"./button-toggle-group-CqULfEVX.js";import"./checkbox-rZkS-28r.js";import"./icon-button-HQY-xv8q.js";import"./tyler-icons-DpmKLgjs.js";import"./switch-BzLp-J0o.js";import"./time-picker-CdIENJaO.js";import"./linear-progress-CKPFd0xY.js";import"./list-DDc9y0eC.js";import"./popover-BLJ_ad28.js";import"./overlay-JUy1eq72.js";import"./skeleton-g_Ea1Wjh.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
