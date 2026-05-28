import{b as r}from"./iframe-DiyFpT_N.js";import{g as i}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./text-field-BDc0vQUb.js";import"./base-field-hiw8ZerQ.js";import"./focus-indicator-CPbWJ5fd.js";import"./label-DtNP5tP5.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./button-DRoqxLxi.js";import"./state-layer-B-p_OOit.js";import"./button-toggle-group-72M3IPsB.js";import"./checkbox-pfhy_b0j.js";import"./icon-button-D_bEUO2t.js";import"./tyler-icons-BYAinj_X.js";import"./switch-BqPpIzt0.js";import"./time-picker-Ds9ip1jp.js";import"./linear-progress-BmTkV8LG.js";import"./list-D6a3NnYI.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./skeleton-D_iZGXuR.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
