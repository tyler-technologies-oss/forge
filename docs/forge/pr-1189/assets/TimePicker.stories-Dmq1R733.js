import{b as r}from"./iframe-D3Oii2TL.js";import{g as i}from"./utils-B3jYbaiS.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CYnraT90.js";import"./base-field-CR_hTikp.js";import"./focus-indicator-BZl6qRLK.js";import"./label-DTIviHOl.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-CSCDv7wg.js";import"./state-layer-RJ83GVyt.js";import"./button-toggle-group-CZruN2gd.js";import"./checkbox-DU0EpUEb.js";import"./icon-button-C1Zmz9J7.js";import"./tyler-icons-CWFKOemj.js";import"./switch-Cw2nKkSw.js";import"./time-picker-Bk2nVnhH.js";import"./linear-progress-DLb8lZjg.js";import"./list-BRTZHC4C.js";import"./popover-88j80EOP.js";import"./overlay-yYpcIpns.js";import"./skeleton-DYD8m2j0.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
