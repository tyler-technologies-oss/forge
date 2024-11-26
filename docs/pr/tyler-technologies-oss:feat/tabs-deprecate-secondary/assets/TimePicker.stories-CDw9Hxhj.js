import"./lit-element-CgJqSpuc.js";import{x as p}from"./lit-html-paDGiEfB.js";import{g as l}from"./utils-CUtp3IhO.js";import"./constants-CFf81ck9.js";import"./time-picker-DWKFaUMy.js";import"./index-BmocOEUj.js";import"./text-field-BKExInWn.js";import"./base-field--bFsUcNh.js";import"./focus-indicator-DesOnyyZ.js";import"./label-BLzPDfDj.js";import"./button-CVZhEkBO.js";import"./state-layer-COSQHCpS.js";import"./button-toggle-group-C7b9_lqU.js";import"./checkbox-D0zkkQHe.js";import"./icon-button-DxSYWoFH.js";import"./icon-FszQmWVN.js";import"./switch-BD5yp80V.js";import"./linear-progress-DKZR2TB_.js";import"./list-CZ9CZlmI.js";import"./popover-CFhwSXnG.js";import"./overlay-DUpFUxF7.js";import"./skeleton-RPu_OG0b.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
