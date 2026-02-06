import{b as r}from"./iframe-ChYTUqET.js";import{g as i}from"./utils-CIAtqUFR.js";import"./service-adapter-CffG5Lhq.js";import"./text-field-DyRjgvA1.js";import"./base-field-ByuxqtiA.js";import"./focus-indicator-DLoD58zG.js";import"./label-6XplHCdu.js";import"./index-DTwfV0k0.js";import"./button-Ds7w-yh5.js";import"./state-layer-u9rLNX9t.js";import"./button-toggle-group-D1Q-3Cp5.js";import"./checkbox-dR4UZyjy.js";import"./icon-button-DJQ87Z9l.js";import"./tyler-icons-B0WPf66k.js";import"./switch-BeMnyuMU.js";import"./time-picker-bCzkE40B.js";import"./linear-progress-CsYLd0m5.js";import"./list-C8nVQbQz.js";import"./popover-oAFRtu_9.js";import"./overlay-BhwPRyah.js";import"./skeleton-DllEP8un.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
