import{x as r}from"./iframe-BIyc1K6h.js";import{g as i}from"./utils-DsSoWqyO.js";import"./service-adapter-CffG5Lhq.js";import"./time-picker-DL2taxtq.js";import"./index-DTwfV0k0.js";import"./text-field-BiSi1_W8.js";import"./base-field-ZaqEgcso.js";import"./focus-indicator-BDY9XSW3.js";import"./label-lXBGOXft.js";import"./button-BqmI2FOi.js";import"./state-layer-BEEsPoZf.js";import"./button-toggle-group-CGoJPxgX.js";import"./checkbox-Dm9r62TG.js";import"./icon-button-BBXJyImA.js";import"./icon-Uwxy940_.js";import"./switch-BNokJ9J2.js";import"./linear-progress-r0Hzg69v.js";import"./list-BF8RDghp.js";import"./popover-DE3KaoDh.js";import"./overlay-DbqVLn-W.js";import"./skeleton-BSiuL_ME.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
