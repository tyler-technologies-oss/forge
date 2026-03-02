import{b as r}from"./iframe-BlOFKJDS.js";import{g as i}from"./utils-DUpaJ7b_.js";import"./service-adapter-8tADcN_b.js";import"./text-field-DWvKFKKM.js";import"./base-field-ByG2tr7F.js";import"./focus-indicator-DF2HrkuM.js";import"./label-PBJgWwVx.js";import"./index-DTwfV0k0.js";import"./button-CrEyna-l.js";import"./state-layer-D_bEeiyc.js";import"./button-toggle-group-CSYMjEX6.js";import"./checkbox-D6KNXaeb.js";import"./icon-button-CBB1Wyv0.js";import"./tyler-icons-DG1d6qey.js";import"./switch-DfOCriK_.js";import"./time-picker-CHm6ZMIu.js";import"./linear-progress-CYTe6uKP.js";import"./list-By4HPSzV.js";import"./popover-CNAMd9T5.js";import"./overlay-CvFTNDO2.js";import"./skeleton-B7Zw5LdQ.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
