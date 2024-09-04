import{x as p}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{g as l}from"./utils-DnAZaZRm.js";import"./constants-DjE6emXm.js";import"./time-picker-D5eKlj_9.js";import"./index-Dh0vMUMR.js";import"./text-field-R8sNW8Ph.js";import"./base-field-BB2ajAbv.js";import"./focus-indicator-BpCDYqsq.js";import"./label-BzpargFq.js";import"./button-CoZ69e4-.js";import"./state-layer-DkOkOFSZ.js";import"./button-toggle-group-pGGDU2pF.js";import"./checkbox-Dsowcwzy.js";import"./icon-button-B5lcHsAP.js";import"./icon-DHpZ4R73.js";import"./switch-DwfRMwQ7.js";import"./linear-progress-CVy9jv9h.js";import"./list-ER_0ZOrZ.js";import"./popover-BJdewMbT.js";import"./overlay-DasBtrG-.js";import"./skeleton-AD7XJ-QC.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
