import"./lit-element-JplMEnZc.js";import{x as p}from"./lit-html-paDGiEfB.js";import{g as l}from"./utils-u_l7GRPl.js";import"./feature-detection-DRCh51Sa.js";import"./time-picker-DhvD_1p-.js";import"./index-BgGCUUFB.js";import"./text-field-gZN1Bnn-.js";import"./base-field-B0LO9mQV.js";import"./focus-indicator-N8y3p24x.js";import"./label-aTyBFDLq.js";import"./button-C8Y3s8GC.js";import"./state-layer-BM79vS2j.js";import"./button-toggle-group-MNNufVlc.js";import"./checkbox-BtFRAWss.js";import"./icon-button-B45Yg2R2.js";import"./icon-B5R9pr_c.js";import"./switch-O6nuM4w_.js";import"./linear-progress-CqfIuBkR.js";import"./list-B1GChOkL.js";import"./popover-B7EDw8Rs.js";import"./overlay-D-D6lM0z.js";import"./skeleton-D2S3-1Sc.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
