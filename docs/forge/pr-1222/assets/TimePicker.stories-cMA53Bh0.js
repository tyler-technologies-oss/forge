import{b as r}from"./iframe-Dql2U7ym.js";import{g as i}from"./utils-Dx9-RsVp.js";import"./service-adapter-8tADcN_b.js";import"./text-field-CHgjtMN3.js";import"./base-field-CajsbtNg.js";import"./focus-indicator-C82PZry3.js";import"./label-PohRN3hn.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-DAN7VozQ.js";import"./icon-button-CsrN_6vz.js";import"./icon-BQY5G9aX.js";import"./linear-progress-kQO48laS.js";import"./list-6il26rgh.js";import"./popover-C21Z74UF.js";import"./overlay-NF8Tg9gz.js";import"./skeleton-ywBvlsHe.js";import"./list-item-h7d83OmT.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
