import{x as p}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{g as l}from"./utils-CtjMBXfT.js";import"./time-picker-DvH926Wn.js";import"./index-Dh0vMUMR.js";import"./text-field-DWUVDvUx.js";import"./base-field-CXwdj0lH.js";import"./focus-indicator-DB3Uau5R.js";import"./label-rCd_TJHf.js";import"./button-BNIBqQee.js";import"./state-layer-7Eqbkxx0.js";import"./button-toggle-group-CnP-ho8N.js";import"./checkbox-Bmwif0Ou.js";import"./icon-button-CrlUtV4j.js";import"./icon-V4IE3JYq.js";import"./switch-jYFmeTKz.js";import"./linear-progress-DMJnsvFA.js";import"./list-CdrMVvEv.js";import"./popover-CVjzxp31.js";import"./overlay-MKQB_VEf.js";import"./skeleton-CpWNVcwu.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
        .disabled=${o.disabled}
      >
        <forge-text-field>
          <input id="time-picker" type="text"  />
          <label for="time-picker">Time</label>
        </forge-text-field>
      </forge-time-picker>
    `,component:t,parameters:{actions:{disable:!0}},argTypes:{...l({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};var r,i,m;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:"{}",...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const a=["Demo"],M=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:a,default:s},Symbol.toStringTag,{value:"Module"}));export{e as D,M as T};
