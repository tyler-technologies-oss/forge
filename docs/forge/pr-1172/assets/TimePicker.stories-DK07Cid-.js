import{b as r}from"./iframe-Ct7_Im3r.js";import{g as i}from"./utils-YUGVIsXY.js";import"./service-adapter-8tADcN_b.js";import"./text-field-C_N2HQqH.js";import"./base-field-CCo-4VS7.js";import"./focus-indicator-CrKoG3Nd.js";import"./label-DIaGplDT.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-CseKomli.js";import"./button-toggle-group-aLPXvlfd.js";import"./checkbox-D9bMPwhq.js";import"./icon-button-Bl0BWpRR.js";import"./tyler-icons-DHcFYUo8.js";import"./switch-DwqAQuQf.js";import"./time-picker-BOq4W6P_.js";import"./linear-progress-BvuLf7up.js";import"./list-BZX3BfXR.js";import"./popover-mByQYqA1.js";import"./overlay-B4lWdMx2.js";import"./skeleton-e7_Ylra4.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
