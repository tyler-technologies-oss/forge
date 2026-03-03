import{b as r}from"./iframe-B1rDg3rc.js";import{g as i}from"./utils-dyGV7reF.js";import"./service-adapter-CoGDs2_3.js";import"./text-field-BnrBzcaJ.js";import"./base-field-66zVG-BA.js";import"./focus-indicator-O36tFu3y.js";import"./label-Cfrg3nW3.js";import"./index-DTwfV0k0.js";import"./button-BwyCbBt8.js";import"./state-layer-CwwoRddA.js";import"./button-toggle-group-BE18Gts3.js";import"./checkbox-CvcwHomn.js";import"./icon-button-COOy05Xm.js";import"./tyler-icons-Dn_DGO8W.js";import"./switch-DrX5-08d.js";import"./time-picker-tSl2RII9.js";import"./linear-progress-BPDXw63a.js";import"./list-DF2pFjlE.js";import"./popover-BxT30IVE.js";import"./overlay-DPtUw_or.js";import"./skeleton-CXhX8HjP.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
