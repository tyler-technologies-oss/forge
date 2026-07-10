import{b as r}from"./iframe-DMB8y2Lk.js";import{g as i}from"./utils-CqVN-aYX.js";import"./service-adapter-8tADcN_b.js";import"./text-field-IZlwEFX7.js";import"./base-field-BMt88HlZ.js";import"./focus-indicator-Z65mqrHe.js";import"./label-CtOXRnEQ.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-Ccg6qbzQ.js";import"./icon-button-CuvVCAic.js";import"./state-layer-DRsbBcDh.js";import"./tyler-icons-q3qt_rXj.js";import"./linear-progress-BvuLf7up.js";import"./list-Dpozo5Vs.js";import"./popover-DGXtkWZ2.js";import"./overlay-gLArHX3C.js";import"./skeleton-CxWWXsKD.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
  `,component:t,parameters:{actions:{disable:!0}},argTypes:{...i({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const l=["Demo"],O=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:l,default:m},Symbol.toStringTag,{value:"Module"}));export{e as D,O as T};
