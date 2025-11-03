import{x as r}from"./iframe-D70h1lbg.js";import{g as i}from"./utils-bIwC1Fgv.js";import"./service-adapter-CffG5Lhq.js";import"./time-picker-DtnPpN2R.js";import"./index-5CPwzmQS.js";import"./text-field-BcybyCL8.js";import"./base-field-CtcW35gT.js";import"./focus-indicator-B3Snl-2i.js";import"./label-CwxtoU1o.js";import"./button-Cemxrxqg.js";import"./state-layer-gAgMwMHF.js";import"./button-toggle-group-CS1Zm_2p.js";import"./checkbox-undJ_3l0.js";import"./icon-button-BkLIxU5W.js";import"./icon-kuXwuZAY.js";import"./switch-BQ8V6i8_.js";import"./linear-progress-r0Hzg69v.js";import"./list-Mp0U4v8L.js";import"./popover-BWVazmya.js";import"./overlay-B5pGv-rV.js";import"./skeleton-BSiuL_ME.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
