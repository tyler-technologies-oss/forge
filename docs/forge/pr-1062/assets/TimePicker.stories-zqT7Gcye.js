import{b as r}from"./iframe-D_XTYtAY.js";import{g as i}from"./utils-B4-1L4nS.js";import"./service-adapter-CffG5Lhq.js";import"./text-field-DIfSpkga.js";import"./base-field-7rhCs8J8.js";import"./focus-indicator-C7XSB6Sy.js";import"./label-DNpP6IAS.js";import"./index-DTwfV0k0.js";import"./button-tk2k35KC.js";import"./state-layer-u9rLNX9t.js";import"./button-toggle-group-DSo8ka4o.js";import"./checkbox-KhBzXMBe.js";import"./icon-button-CIFJv6NF.js";import"./tyler-icons-B0WPf66k.js";import"./switch-BTLwmygM.js";import"./time-picker-C7AEMNWG.js";import"./linear-progress-CsYLd0m5.js";import"./list-BE5yoamR.js";import"./popover-oAFRtu_9.js";import"./overlay-BhwPRyah.js";import"./skeleton-DllEP8un.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
