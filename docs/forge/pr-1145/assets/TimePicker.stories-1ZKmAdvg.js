import{b as r}from"./iframe-CKUxNUwK.js";import{g as i}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./text-field-C441wqBF.js";import"./base-field-F3pN73hA.js";import"./focus-indicator-Dxwlqb8p.js";import"./label-BtKA7SuN.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./button-Cxvu7MX1.js";import"./state-layer-B-p_OOit.js";import"./button-toggle-group-BWY8bXSY.js";import"./checkbox-zoLOzW2l.js";import"./icon-button-XyjzE-XO.js";import"./tyler-icons-Cl-vuQBY.js";import"./switch-BX-_PPXh.js";import"./time-picker-CqKd-Vhd.js";import"./linear-progress-BmTkV8LG.js";import"./list-6Gz7jq_7.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./skeleton-D_iZGXuR.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
