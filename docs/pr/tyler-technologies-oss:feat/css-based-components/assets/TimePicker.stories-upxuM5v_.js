import"./lit-element-Dk2-kgKT.js";import{k as p}from"./lit-html-DZH-Jm0H.js";import{g as l}from"./utils-CmNCmodr.js";import"./constants-DjE6emXm.js";import"./time-picker-DTfvnE6h.js";import"./index-Dh0vMUMR.js";import"./text-field-By0mC--H.js";import"./base-field-CfB2Uzg4.js";import"./focus-indicator-BpCDYqsq.js";import"./label-kORtmqyo.js";import"./button-DJU3J9XV.js";import"./state-layer-DkOkOFSZ.js";import"./button-toggle-group-BMiaMm6c.js";import"./checkbox-7ZtPo8kA.js";import"./icon-button-DSVS47IC.js";import"./icon-DHpZ4R73.js";import"./switch-BDI72jLc.js";import"./linear-progress-BjLGzdmZ.js";import"./list-tzlsEZgh.js";import"./popover-DMO_rraq.js";import"./overlay-oQigVWsx.js";import"./skeleton-AD7XJ-QC.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
