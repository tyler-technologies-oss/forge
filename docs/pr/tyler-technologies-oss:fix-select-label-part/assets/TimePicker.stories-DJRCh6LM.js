import"./lit-element-B3QVTycr.js";import{x as p}from"./lit-html-CuBe1DX_.js";import{g as l}from"./utils-Do5MGSMS.js";import"./feature-detection-C61kIZu7.js";import"./time-picker-CmHyRFQW.js";import"./index-CiLSBptl.js";import"./text-field-DxXALn2L.js";import"./base-field-BDCxUf4S.js";import"./focus-indicator-DydcbRnf.js";import"./label-W_tr_-w0.js";import"./button-7EoU3XJS.js";import"./state-layer-Y8UVngaT.js";import"./button-toggle-group-BIaWvq7W.js";import"./checkbox-CZ4HhXrD.js";import"./icon-button-DJSm0po0.js";import"./icon-DNSPAaK0.js";import"./switch-CVhsVTET.js";import"./linear-progress-Brg7kVg_.js";import"./list-BEAQdsdb.js";import"./popover-DlgaZ2F2.js";import"./overlay-C2J-mFMD.js";import"./skeleton-Cfb12itF.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
