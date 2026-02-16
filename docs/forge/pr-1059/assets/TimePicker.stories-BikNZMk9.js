import{b as r}from"./iframe-DJjcbq_V.js";import{g as i}from"./utils-DLgMzbe-.js";import"./service-adapter-CffG5Lhq.js";import"./text-field-D8YLrsia.js";import"./base-field-CzAzD6GG.js";import"./focus-indicator-C1PYYHEZ.js";import"./label-Bm4GhQDq.js";import"./index-DTwfV0k0.js";import"./button-CXwy5ujG.js";import"./state-layer-u9rLNX9t.js";import"./button-toggle-group-CFn3HCmg.js";import"./checkbox-D6Zij9MX.js";import"./icon-button-D1ZIJ0nO.js";import"./tyler-icons-B0WPf66k.js";import"./switch-CL_AzG3S.js";import"./time-picker-BWzjK8_T.js";import"./linear-progress-CsYLd0m5.js";import"./list-DuOTxUU5.js";import"./popover-zm7hjeEB.js";import"./overlay-BhwPRyah.js";import"./skeleton-DllEP8un.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
