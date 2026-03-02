import{b as r}from"./iframe-CqmBxxxw.js";import{g as i}from"./utils-BQsOXphk.js";import"./service-adapter-CoGDs2_3.js";import"./text-field-BIGWGZBU.js";import"./base-field-aEi7nshb.js";import"./focus-indicator-BGIlkLsU.js";import"./label-AubqXluV.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./button-DX_DhTaU.js";import"./state-layer-CDycYdPe.js";import"./button-toggle-group-D_Dzo2at.js";import"./checkbox-Bv0J0WTO.js";import"./icon-button-CRjf1LQA.js";import"./tyler-icons-D-59dOyn.js";import"./switch-DLphmdNU.js";import"./time-picker-C27N63_e.js";import"./linear-progress-DAF_c_Qg.js";import"./list-DTk5X6mh.js";import"./popover-DVUMrAH6.js";import"./overlay-CeKA2Vs0.js";import"./skeleton-BEzRyBrd.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
