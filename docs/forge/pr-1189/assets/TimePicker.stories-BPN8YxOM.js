import{b as r}from"./iframe-BzlzSqtu.js";import{g as i}from"./utils-DJhy9_a3.js";import"./service-adapter-8tADcN_b.js";import"./text-field-7NfOlH-V.js";import"./base-field-CSg8-O_c.js";import"./focus-indicator-B2ubMpda.js";import"./label-DVU9uI27.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-CWEBWUbn.js";import"./state-layer-RJ83GVyt.js";import"./button-toggle-group-CJp-qOZz.js";import"./checkbox-GwdS8dPX.js";import"./icon-button-D5gxvJBZ.js";import"./tyler-icons-C0MPM0Nr.js";import"./switch-ZSurewEj.js";import"./time-picker-B2B1KIHx.js";import"./linear-progress-DLb8lZjg.js";import"./list-BuEi7od1.js";import"./popover-Ci8p4n86.js";import"./overlay-BaGRJgMD.js";import"./skeleton-BE0Hflic.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
