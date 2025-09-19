import{x as r}from"./iframe-BnJdS9oE.js";import{g as i}from"./utils-D7XrLKwY.js";import"./feature-detection-BwPJgXni.js";import"./time-picker-PqMxmKNj.js";import"./index-5CPwzmQS.js";import"./text-field-DqRG6OMZ.js";import"./base-field-DVdLvhJA.js";import"./focus-indicator-B9KMEBVK.js";import"./label-73doN4RE.js";import"./button-Bjtey6FZ.js";import"./state-layer-CLjAHnoF.js";import"./button-toggle-group-C96H3ppB.js";import"./checkbox-DYAJ7rMi.js";import"./icon-button-DpLi6_yQ.js";import"./icon-FzRol6Tl.js";import"./switch-WjqoziFM.js";import"./linear-progress-CfBpjTvZ.js";import"./list-ucSdTmS4.js";import"./popover-CCIxKg31.js";import"./overlay-B72xXWi5.js";import"./skeleton-1JRnRe4N.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
