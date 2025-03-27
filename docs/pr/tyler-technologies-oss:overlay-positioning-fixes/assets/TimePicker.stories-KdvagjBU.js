import"./lit-element-B3QVTycr.js";import{x as p}from"./lit-html-CuBe1DX_.js";import{g as l}from"./utils-BEyWTXMe.js";import"./feature-detection-C61kIZu7.js";import"./time-picker-CXb5l1ho.js";import"./index-CiLSBptl.js";import"./text-field-BaC_G5Rf.js";import"./base-field-CbTrav_1.js";import"./focus-indicator-B_9E-jM6.js";import"./label-BftBTwPr.js";import"./button-DOA_SM9C.js";import"./state-layer-DA2sYK0k.js";import"./button-toggle-group-JMDAjILZ.js";import"./checkbox-BwLNDz7l.js";import"./icon-button-BgvK8Gih.js";import"./icon-DNSPAaK0.js";import"./switch-B2m0S8OE.js";import"./linear-progress-Brg7kVg_.js";import"./list-Bo9PHw-V.js";import"./popover-Dh1-Do6h.js";import"./overlay-B56HkyOr.js";import"./skeleton-Cfb12itF.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
