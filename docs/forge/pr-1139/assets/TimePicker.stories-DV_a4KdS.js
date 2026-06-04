import{b as r}from"./iframe-Cw7KEIxV.js";import{g as i}from"./utils-Bhs_gPRq.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CuEilQaG.js";import"./base-field-DfpgISva.js";import"./focus-indicator-8tlC_kG5.js";import"./label-H9_kqpx1.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-D0S5f0pR.js";import"./state-layer-Cnbc18vB.js";import"./button-toggle-group-TutWxXkU.js";import"./checkbox-D7Egrepk.js";import"./icon-button-DMbE_Gq7.js";import"./tyler-icons-BkylKoYy.js";import"./switch-bw6IQb5b.js";import"./time-picker-CVA73Vfh.js";import"./linear-progress-CKPFd0xY.js";import"./list-BLbp3BZn.js";import"./popover-C3RcZ0IP.js";import"./overlay-BxCKAaVb.js";import"./skeleton-g_Ea1Wjh.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
