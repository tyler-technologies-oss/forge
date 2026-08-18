import{b as r}from"./iframe-B0vKBzPk.js";import{g as i}from"./utils-QCscRJfA.js";import"./service-adapter-8tADcN_b.js";import"./text-field-VqH1ZQ4i.js";import"./base-field-sYTOEQ1U.js";import"./focus-indicator-Bw8FAg-e.js";import"./label-Ca7MhaHs.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./time-picker-BGFLiwdA.js";import"./icon-button-MtKQF9Cm.js";import"./state-layer-Wu0zWm6m.js";import"./tyler-icons-Dp432aHk.js";import"./linear-progress-CsGp1g6o.js";import"./list-CVzTbD2g.js";import"./popover-gwjvAjf-.js";import"./overlay-CqP4w4-f.js";import"./skeleton-B5JliGtP.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
