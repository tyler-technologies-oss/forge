import{b as r}from"./iframe-DUO6sR7Q.js";import{g as i}from"./utils-JlLG_A5T.js";import"./service-adapter-8tADcN_b.js";import"./text-field-Cg3eNHke.js";import"./base-field-CV5FpTVG.js";import"./focus-indicator-CkQ_SLjY.js";import"./label-DQRW0Ixj.js";import"./index-DTwfV0k0.js";import"./button-CGLAKewe.js";import"./state-layer-D0PE-_Ks.js";import"./button-toggle-group-SwNncGNw.js";import"./checkbox-_NlP9yGR.js";import"./icon-button-DYBsyh42.js";import"./tyler-icons-iDvhFOMC.js";import"./switch-ye0kRd8e.js";import"./time-picker-BtDLaNi1.js";import"./linear-progress-DJCUZyG6.js";import"./list-DLoQA8Md.js";import"./popover-BblH4OjR.js";import"./overlay-Btn1tEyh.js";import"./skeleton-Ctt20BWR.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
