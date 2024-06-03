import{x as p}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{g as l}from"./utils-CprCEKh8.js";import"./time-picker-DZzm7Dc4.js";import"./index-Dh0vMUMR.js";import"./text-field-BKuxhRPG.js";import"./base-field-AvFiHmn9.js";import"./focus-indicator-jd-AY9Jk.js";import"./label-sj17mrtY.js";import"./button-DIahYMuH.js";import"./state-layer-DzrxdbUp.js";import"./button-toggle-group-BikuhhTp.js";import"./checkbox-D4e4C5g3.js";import"./icon-button-CcYkD_r5.js";import"./icon-Cn5siE75.js";import"./switch-z_rlF74_.js";import"./linear-progress-De0XZzjv.js";import"./list-B8boNWcU.js";import"./popover-Dh31glfv.js";import"./overlay-CRRs1KxA.js";import"./skeleton-CbdcwsWz.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
