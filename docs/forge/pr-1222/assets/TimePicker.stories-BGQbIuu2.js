import{b as r}from"./iframe-BPj94FGh.js";import{g as i}from"./utils-LbM5kS63.js";import"./service-adapter-8tADcN_b.js";import"./text-field-BhRaR8G8.js";import"./base-field-DKvZp4s1.js";import"./focus-indicator-DDCQz0qC.js";import"./label-DntvFisr.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-Bu9eSgpd.js";import"./icon-button-CR83Kg9m.js";import"./state-layer-mJUCxnSJ.js";import"./tyler-icons-D8NJqrYQ.js";import"./linear-progress-Dh__ll_M.js";import"./list-Bog6thhw.js";import"./popover-b8Gx4sac.js";import"./overlay-MMpEd-75.js";import"./skeleton-DP9gcNgN.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
