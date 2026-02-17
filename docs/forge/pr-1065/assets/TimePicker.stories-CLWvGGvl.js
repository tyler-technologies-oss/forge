import{b as r}from"./iframe-pqTvACNP.js";import{g as i}from"./utils-Cntew3lg.js";import"./service-adapter-CffG5Lhq.js";import"./text-field-gs39rriO.js";import"./base-field-CdA0iQoJ.js";import"./focus-indicator-B_dAHUd_.js";import"./label-Blmy9e6R.js";import"./index-DTwfV0k0.js";import"./button-DIUHasWh.js";import"./state-layer-DGD4bZzf.js";import"./button-toggle-group-CH9NiA1W.js";import"./checkbox-Dv_UGdzf.js";import"./icon-button-B_qVG_it.js";import"./tyler-icons-CBdZU-Tr.js";import"./switch-CicCqkci.js";import"./time-picker-CX-RnTNR.js";import"./linear-progress-CpNoMDP5.js";import"./list-a6IB0DPO.js";import"./popover-D2EVteKl.js";import"./overlay-B2P-gJmC.js";import"./skeleton-C3LWj3F7.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
