import{b as r}from"./iframe-DVkCwayn.js";import{g as i}from"./utils-DdM9-TOU.js";import"./service-adapter-8tADcN_b.js";import"./text-field-xfFJOiAD.js";import"./base-field-KxAV97UB.js";import"./focus-indicator-DhDYsd3D.js";import"./label-CiukcC95.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-CS24bbOS.js";import"./button-toggle-group-DGFvxll2.js";import"./checkbox-DGvqAXro.js";import"./icon-button-Bo2inTOg.js";import"./tyler-icons-Cgf0s-mg.js";import"./switch-B389hJLx.js";import"./time-picker-BRN7WKsh.js";import"./linear-progress-BvuLf7up.js";import"./list-BXQsrNmJ.js";import"./popover-BlNpEvTu.js";import"./overlay-28eYr5_V.js";import"./skeleton-e7_Ylra4.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
  `,component:t,parameters:{actions:{disable:!0}},argTypes:{...i({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const p=["Demo"],y=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:p,default:m},Symbol.toStringTag,{value:"Module"}));export{e as D,y as T};
