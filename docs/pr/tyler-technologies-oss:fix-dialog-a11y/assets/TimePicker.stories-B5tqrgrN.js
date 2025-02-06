import"./lit-element-JplMEnZc.js";import{x as p}from"./lit-html-paDGiEfB.js";import{g as l}from"./utils-CRqZ3wfJ.js";import"./feature-detection-ONR9WHvu.js";import"./time-picker-BDl8Gc0T.js";import"./index-BmocOEUj.js";import"./text-field-DHXYud3A.js";import"./base-field-BSRSGQL0.js";import"./focus-indicator-R2otSvsR.js";import"./label-BOjkkgiS.js";import"./button-vPgaRyW5.js";import"./state-layer-B7GOb8iB.js";import"./button-toggle-group-Cft-ohT1.js";import"./checkbox-e65WGDEs.js";import"./icon-button-DfODsaKD.js";import"./icon-B5S0VGIT.js";import"./switch-BRBW-vzp.js";import"./linear-progress-DPUjJFYN.js";import"./list-DndFp_bX.js";import"./popover-Dq2OmXS_.js";import"./overlay-DAcircNE.js";import"./skeleton-Dfdgg-pt.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
