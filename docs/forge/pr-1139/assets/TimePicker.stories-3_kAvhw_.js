import{b as r}from"./iframe-DBQDPehd.js";import{g as i}from"./utils-CLXqHKRE.js";import"./service-adapter-8tADcN_b.js";import"./text-field-DiL5UZqm.js";import"./base-field-t0AR1qal.js";import"./focus-indicator-Cq1BeKeM.js";import"./label-HmKD9e0G.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-CNMB2VxA.js";import"./state-layer-Cnbc18vB.js";import"./button-toggle-group-BzUydMmM.js";import"./checkbox-DJwaO89W.js";import"./icon-button-DXq9pF36.js";import"./tyler-icons-LxGpdRju.js";import"./switch-CWyUTxTW.js";import"./time-picker-BPs2gAqE.js";import"./linear-progress-CKPFd0xY.js";import"./list-Brm6E8dN.js";import"./popover-i29iOpIS.js";import"./overlay-BOPTnQZl.js";import"./skeleton-g_Ea1Wjh.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
