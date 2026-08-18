import{b as r}from"./iframe-C327hvo9.js";import{g as i}from"./utils-C5IA10r7.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CElGqUjI.js";import"./base-field-COm0Lf_w.js";import"./focus-indicator-CC5ZO39G.js";import"./label-tlgsttVC.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-D95enHi3.js";import"./icon-button-C3w-tJNs.js";import"./state-layer-Wu0zWm6m.js";import"./tyler-icons-BB4gv-aU.js";import"./linear-progress-CsGp1g6o.js";import"./list-CWyJ3w_6.js";import"./popover-m1791iHL.js";import"./overlay-xxnOCE5v.js";import"./skeleton-DFXzpPoH.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
