import{b as r}from"./iframe-DSiuXKYC.js";import{g as i}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CLxkMiwg.js";import"./base-field-CMHwAPor.js";import"./focus-indicator-_cBG-k3e.js";import"./label-C-KSws2A.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./button-qgcYbb6i.js";import"./state-layer-B-p_OOit.js";import"./button-toggle-group-0utxtGfD.js";import"./checkbox-Bi1MmoBJ.js";import"./icon-button-Dh9L0qVB.js";import"./tyler-icons-BKD2Fdn0.js";import"./switch-5k3m-7GO.js";import"./time-picker-BG_Ut2gn.js";import"./linear-progress-BmTkV8LG.js";import"./list-nt8n-WzY.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./skeleton-D_iZGXuR.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
