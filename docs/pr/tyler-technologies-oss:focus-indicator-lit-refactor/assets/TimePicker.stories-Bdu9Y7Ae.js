import{x as p}from"./iframe-Cqs95LDf.js";import{g as l}from"./utils-D0zOu5id.js";import"./service-adapter-BykFeYYZ.js";import"./time-picker-MF3w1TEx.js";import"./index-CiLSBptl.js";import"./text-field-DpXPd0el.js";import"./base-field-Ci6votMZ.js";import"./focus-indicator-DoAi9By9.js";import"./label-DSbs6spH.js";import"./button-C8oqjrq6.js";import"./state-layer-BRTtEqto.js";import"./button-toggle-group-BalQXvu-.js";import"./checkbox-CkpXn7kA.js";import"./icon-button-Cc-POQpg.js";import"./icon-eJOvSyyv.js";import"./switch-5f4KoIm0.js";import"./linear-progress-BTaob5x2.js";import"./list-CwxN3dUl.js";import"./popover-BWs500m1.js";import"./overlay-DWLd4_Vp.js";import"./skeleton-fsmWNbya.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
    `,component:t,parameters:{actions:{disable:!0}},argTypes:{...l({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};var r,i,m;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:"{}",...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const a=["Demo"],M=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:a,default:s},Symbol.toStringTag,{value:"Module"}));export{e as D,M as T};
