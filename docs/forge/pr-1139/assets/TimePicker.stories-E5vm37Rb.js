import{b as r}from"./iframe-B462tM34.js";import{g as i}from"./utils-B2BxP4Jm.js";import"./service-adapter-8tADcN_b.js";import"./text-field-C16EvpkK.js";import"./base-field-f9BFNpOb.js";import"./focus-indicator-BywrCJL-.js";import"./label-vHImcoio.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-D1eX-bu-.js";import"./state-layer-Cnbc18vB.js";import"./button-toggle-group-CSjvn5_J.js";import"./checkbox-CaZa4Kcn.js";import"./icon-button-BP_K86Fp.js";import"./tyler-icons-0HoNRpUy.js";import"./switch-DGvrkd_p.js";import"./time-picker-v0SKTLEa.js";import"./linear-progress-CKPFd0xY.js";import"./list-DaHL3azR.js";import"./popover-0K2ea7s1.js";import"./overlay-56GAWG5z.js";import"./skeleton-g_Ea1Wjh.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
