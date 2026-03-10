import{b as r}from"./iframe-FS6UuRTf.js";import{g as i}from"./utils-Dyztg_A4.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CENGspUw.js";import"./base-field-BJ66MH2R.js";import"./focus-indicator-DXnp9Plt.js";import"./label-DM98B8Eo.js";import"./index-DTwfV0k0.js";import"./button-CbbznlWX.js";import"./state-layer-D0PE-_Ks.js";import"./button-toggle-group-DtdFckgK.js";import"./checkbox-DJio2xZg.js";import"./icon-button-rbnRrweT.js";import"./tyler-icons-iDvhFOMC.js";import"./switch-C1g5po_j.js";import"./time-picker-CpTvL8Ws.js";import"./linear-progress-DJCUZyG6.js";import"./list-B6gOTQYv.js";import"./popover-BblH4OjR.js";import"./overlay-Btn1tEyh.js";import"./skeleton-Ctt20BWR.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
