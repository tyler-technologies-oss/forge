import{b as r}from"./iframe-C8qvgkWs.js";import{g as i}from"./utils-DJhy9_a3.js";import"./service-adapter-8tADcN_b.js";import"./text-field-BMUiCuoX.js";import"./base-field-C3884F-h.js";import"./focus-indicator-Bw-He_Dx.js";import"./label-B17fuSeR.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-Df4PRT3k.js";import"./state-layer-RJ83GVyt.js";import"./button-toggle-group-7CGqyLTH.js";import"./checkbox-BlrXuvPQ.js";import"./icon-button-DYY8bfWG.js";import"./tyler-icons-mQAAeURf.js";import"./switch-CuQRF9i0.js";import"./time-picker-n-uNTDT8.js";import"./linear-progress-DLb8lZjg.js";import"./list-JHtz7INH.js";import"./popover-DaDXCC47.js";import"./overlay-yq4T8o0m.js";import"./skeleton-TYHSOg_u.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
