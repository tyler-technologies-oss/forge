import{b as r}from"./iframe-1amZ02A4.js";import{g as i}from"./utils-s6uih_-r.js";import"./service-adapter-CoGDs2_3.js";import"./text-field-Dij8M865.js";import"./base-field-BKgwQlzN.js";import"./focus-indicator-C5TEsO7E.js";import"./label-bKp8WFBS.js";import"./index-DTwfV0k0.js";import"./button-YbSFJWqY.js";import"./state-layer-DFBFTfpT.js";import"./button-toggle-group-CCsqyC6G.js";import"./checkbox-DZ8Y-EwU.js";import"./icon-button-DIbOVWXo.js";import"./tyler-icons-CzoCbVaa.js";import"./switch-CR8fKfBF.js";import"./time-picker-CA7-xOny.js";import"./linear-progress-DSeJSqzy.js";import"./list-7b1y5hwO.js";import"./popover-uUF2Q5pH.js";import"./overlay-xfWlPvUl.js";import"./skeleton-CfBVzZbg.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
