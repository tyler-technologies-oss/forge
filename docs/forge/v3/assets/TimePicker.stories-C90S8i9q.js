import{b as r}from"./iframe-Y92HmdHZ.js";import{g as i}from"./utils-DbbJplVM.js";import"./service-adapter-8tADcN_b.js";import"./text-field-DSbKfCGl.js";import"./base-field-CkmJM5z3.js";import"./focus-indicator-CypHdldK.js";import"./label-DSSUgOwJ.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-DmzHh-TU.js";import"./icon-button-BG-KzVAg.js";import"./state-layer-C4o8tMgM.js";import"./tyler-icons-SWWw4qdQ.js";import"./linear-progress-Dj7Wb6Io.js";import"./list-CSKmw5w_.js";import"./popover-CqxRAdRj.js";import"./overlay-OLurZXLD.js";import"./skeleton-FcTi7X6q.js";import"./list-item-DkeO-h5u.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
  `,component:t,parameters:{actions:{disable:!0}},argTypes:{...i({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const p=["Demo"],_=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:p,default:m},Symbol.toStringTag,{value:"Module"}));export{e as D,_ as T};
