import{b as r}from"./iframe-CskTT7ts.js";import{g as i}from"./utils-CbU1ENex.js";import"./service-adapter-CffG5Lhq.js";import"./text-field-ZtSDIfll.js";import"./base-field-B9Bc2PKe.js";import"./focus-indicator-D-lQFdGQ.js";import"./label-DrJN2C5E.js";import"./index-DTwfV0k0.js";import"./button-BABmEJ_8.js";import"./state-layer-DGD4bZzf.js";import"./button-toggle-group-zaT0zJiE.js";import"./checkbox-DELXRA72.js";import"./icon-button-zpl7wQaZ.js";import"./tyler-icons-CBdZU-Tr.js";import"./switch-zkh9rIQ8.js";import"./time-picker-Cj4YS3Pd.js";import"./linear-progress-CpNoMDP5.js";import"./list-DLtw5epo.js";import"./popover-D2EVteKl.js";import"./overlay-B2P-gJmC.js";import"./skeleton-C3LWj3F7.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
