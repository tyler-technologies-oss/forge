import{x as p}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{g as l}from"./utils-CpphmWLJ.js";import"./constants-BMnwgo1j.js";import"./time-picker-CDEV5Y4d.js";import"./index-Dh0vMUMR.js";import"./text-field-piDMR7NH.js";import"./base-field-Db0ByNro.js";import"./focus-indicator-WHVXAnYX.js";import"./label-Ba8gSJXo.js";import"./button-DKp5JmaL.js";import"./state-layer-DfBT0h4a.js";import"./button-toggle-group-CUV8xQR0.js";import"./checkbox-BnMMH_z2.js";import"./icon-button-VlM_yzEM.js";import"./icon-Sxf3JEPH.js";import"./switch-CvJdSirX.js";import"./linear-progress-CvNwXotY.js";import"./list-ClnKymlF.js";import"./popover-BDS33NIt.js";import"./overlay-BEOKbUF9.js";import"./skeleton-CdDf7LSx.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
    `,component:t,parameters:{actions:{disable:!0}},argTypes:{...l({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};var r,i,m;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:"{}",...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const a=["Demo"],N=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:a,default:s},Symbol.toStringTag,{value:"Module"}));export{e as D,N as T};
