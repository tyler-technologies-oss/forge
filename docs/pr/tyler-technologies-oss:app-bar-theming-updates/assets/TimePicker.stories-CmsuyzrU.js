import"./lit-element-B3QVTycr.js";import{x as p}from"./lit-html-CuBe1DX_.js";import{g as l}from"./utils-DXeqrvgL.js";import"./feature-detection-CY6TVbRZ.js";import"./time-picker-BGWaiu8w.js";import"./index-CiLSBptl.js";import"./text-field-BwqsFKuZ.js";import"./base-field-clkE_wGg.js";import"./focus-indicator-NbLDNrYT.js";import"./label-BYO0DIp3.js";import"./button-CutPPNni.js";import"./state-layer-sxQMIn2c.js";import"./button-toggle-group-C9JpSiFv.js";import"./checkbox-DwEe44-q.js";import"./icon-button-4fx-LScl.js";import"./icon-D5yjdXv8.js";import"./switch-Clw9p9oC.js";import"./linear-progress-BTmLtQyy.js";import"./list-DOSD_vEq.js";import"./popover-DBZ1E3cM.js";import"./overlay-8j8D8Fh1.js";import"./skeleton-DtUhqb6H.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
