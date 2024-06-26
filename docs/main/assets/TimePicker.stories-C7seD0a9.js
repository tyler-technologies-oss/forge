import{x as p}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{g as l}from"./utils-Dtr3SQvK.js";import"./constants-ngK8be3i.js";import"./time-picker-BO9TeJfY.js";import"./index-Dh0vMUMR.js";import"./text-field-C2sV2q9w.js";import"./base-field-CdQ37kwO.js";import"./focus-indicator-C4Z5XP1c.js";import"./label-BSpLsvKH.js";import"./button-GqT3ELiS.js";import"./state-layer-BisR_hRI.js";import"./button-toggle-group-BCHiADOy.js";import"./checkbox-BCGc4uqs.js";import"./icon-button-DNIpFQC2.js";import"./icon-DHVNhAh1.js";import"./switch-BtH834SF.js";import"./linear-progress-5Vpr-9_G.js";import"./list-w9uxrOZD.js";import"./popover-CnzyzWS6.js";import"./overlay-D7ruZE35.js";import"./skeleton-Cvltx7WE.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
