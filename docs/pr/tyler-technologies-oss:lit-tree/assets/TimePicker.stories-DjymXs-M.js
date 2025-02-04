import"./lit-element-JplMEnZc.js";import{x as p}from"./lit-html-paDGiEfB.js";import{g as l}from"./utils-dxGSIiWA.js";import"./feature-detection-ONR9WHvu.js";import"./time-picker-BCSXR1vG.js";import"./index-BgGCUUFB.js";import"./text-field-jJqOSL3m.js";import"./base-field-Berl2o5-.js";import"./focus-indicator-I_IrwQSK.js";import"./label-0TgDsZHI.js";import"./button-ClwhnaJK.js";import"./state-layer-CxIpCmDW.js";import"./button-toggle-group-SI6kj2fb.js";import"./checkbox-BMGViPZ8.js";import"./icon-button-D5fTQ0k5.js";import"./icon-Ctzrqx63.js";import"./switch-BTIWsPYn.js";import"./linear-progress-DPUjJFYN.js";import"./list-DjbLwyYT.js";import"./popover-C6QnYMTq.js";import"./overlay-D8lPnEIG.js";import"./skeleton-Dfdgg-pt.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
    `,component:t,parameters:{actions:{disable:!0}},argTypes:{...l({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};var r,i,m;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:"{}",...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const a=["Demo"],N=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:a,default:s},Symbol.toStringTag,{value:"Module"}));export{e as D,N as T};
