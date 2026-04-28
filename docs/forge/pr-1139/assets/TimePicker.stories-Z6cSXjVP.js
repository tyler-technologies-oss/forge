import{b as r}from"./iframe-BBqNUtqv.js";import{g as i}from"./utils-BiqwBWR2.js";import"./service-adapter-8tADcN_b.js";import"./text-field-E1U9wxdR.js";import"./base-field-Di1zrDqT.js";import"./focus-indicator-CE-2THdp.js";import"./label-DyOrl3sk.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./button-BtXQ1IZV.js";import"./state-layer-Cd1l0S13.js";import"./button-toggle-group-Cv8-wtIl.js";import"./checkbox-D6rV2_uo.js";import"./icon-button-ChuE_xy5.js";import"./icon-BeLCtqW2.js";import"./tyler-icons-fQPhzpbf.js";import"./switch-B2rzTqQ2.js";import"./time-picker-fKF6dCq6.js";import"./linear-progress-BFUUfMoR.js";import"./list-mhgDPYym.js";import"./popover-By2PcE5Z.js";import"./overlay-CRZNSrJB.js";import"./skeleton-PgUpsvgP.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
  `,component:t,parameters:{actions:{disable:!0}},argTypes:{...i({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const p=["Demo"],v=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:p,default:m},Symbol.toStringTag,{value:"Module"}));export{e as D,v as T};
