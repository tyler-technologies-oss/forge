import{b as r}from"./iframe-Dv7ymADP.js";import{g as i}from"./utils-BVPd0qDu.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CHKBqYqo.js";import"./base-field-B8QzmuEA.js";import"./focus-indicator-CvCFHXn-.js";import"./label-C0FKjeRN.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-Dpc35oCu.js";import"./state-layer-cKdDztbm.js";import"./button-toggle-group-B3aXqgxr.js";import"./checkbox-BHfrH9La.js";import"./icon-button-Dl2PX17N.js";import"./tyler-icons-BhqRwxeL.js";import"./switch-DFoN4xmj.js";import"./time-picker-ZQhTxs8I.js";import"./linear-progress-DLb8lZjg.js";import"./list-DmQpsFne.js";import"./popover-Bi87EPbu.js";import"./overlay-BWHcAp8O.js";import"./skeleton-jvDFel5Y.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
