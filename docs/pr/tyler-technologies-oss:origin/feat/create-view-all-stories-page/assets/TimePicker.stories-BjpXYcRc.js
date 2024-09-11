import"./lit-element-Dk2-kgKT.js";import{k as p}from"./lit-html-DZH-Jm0H.js";import{g as l}from"./utils-D1kchwVb.js";import"./constants-DjE6emXm.js";import"./time-picker-NT5PMuos.js";import"./index-Dh0vMUMR.js";import"./text-field-DqH-bXsA.js";import"./base-field-BFFwcPMe.js";import"./focus-indicator-_fDu4ZqT.js";import"./label-DfCsGThT.js";import"./button-C5f1g9CL.js";import"./state-layer-DTKAXCUq.js";import"./button-toggle-group-BJ7gYCrU.js";import"./checkbox-D4QiEHwm.js";import"./icon-button-XdSjYqUR.js";import"./icon-DHpZ4R73.js";import"./switch-BteFxJWF.js";import"./linear-progress-CcMix19v.js";import"./list-C2bUECg8.js";import"./popover-tgjxHp7t.js";import"./overlay-DWm8nYOy.js";import"./skeleton-Cs99PVGD.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
