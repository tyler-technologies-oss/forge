import{x as r}from"./iframe-BWh0ylRO.js";import{g as i}from"./utils-BGeMI972.js";import"./service-adapter-CffG5Lhq.js";import"./time-picker-D5L7Gt-1.js";import"./index-5CPwzmQS.js";import"./text-field-CiVqNgE6.js";import"./base-field-WcSKv63v.js";import"./focus-indicator-DtQWBIt4.js";import"./label-RXgsLOUX.js";import"./button-DDeQkqOF.js";import"./state-layer-gAgMwMHF.js";import"./button-toggle-group-CURJMNh-.js";import"./checkbox-DkQufZq1.js";import"./icon-button-B8-Z9yGD.js";import"./icon-kuXwuZAY.js";import"./switch-1M3hzpUW.js";import"./linear-progress-r0Hzg69v.js";import"./list-CTWTY-cx.js";import"./popover-BWVazmya.js";import"./overlay-B5pGv-rV.js";import"./skeleton-BSiuL_ME.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
