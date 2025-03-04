import"./lit-element-JplMEnZc.js";import{x as p}from"./lit-html-paDGiEfB.js";import{g as l}from"./utils-Dm6iQleG.js";import"./feature-detection-DRCh51Sa.js";import"./time-picker-CwlPvxJF.js";import"./index-BmocOEUj.js";import"./text-field-Ccm22BzN.js";import"./base-field-7jt5_xYz.js";import"./focus-indicator-COi7jdIi.js";import"./label-BQDo_6Ok.js";import"./button-CTEnnZLo.js";import"./state-layer-Bf3rUq66.js";import"./button-toggle-group-CgQVCgmR.js";import"./checkbox-BuDarGh4.js";import"./icon-button-DxiF-tf5.js";import"./icon-DB7kP3Ec.js";import"./switch-JIh-AUnA.js";import"./linear-progress-CqfIuBkR.js";import"./list-CHxmoizQ.js";import"./popover-DHJf1hjV.js";import"./overlay-D0uIIChk.js";import"./skeleton-D2S3-1Sc.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
