import{x as p}from"./iframe-BL13dRo5.js";import{g as l}from"./utils-D0zOu5id.js";import"./service-adapter-BykFeYYZ.js";import"./time-picker-oAVtOFZe.js";import"./index-CiLSBptl.js";import"./text-field-DLvU-TyR.js";import"./base-field-Dvpu6FeH.js";import"./focus-indicator-DFzG-d7S.js";import"./label-Dh033gfW.js";import"./button-B31EV2cV.js";import"./state-layer-BRTtEqto.js";import"./button-toggle-group-DuSipylO.js";import"./checkbox-C3rNMB2-.js";import"./icon-button-cJUUKUK2.js";import"./icon-eJOvSyyv.js";import"./switch-DHGFrn8d.js";import"./linear-progress-BTaob5x2.js";import"./list-CDPcagJC.js";import"./popover-BWs500m1.js";import"./overlay-DWLd4_Vp.js";import"./skeleton-fsmWNbya.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
    `,component:t,parameters:{actions:{disable:!0}},argTypes:{...l({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};var r,i,m;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:"{}",...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const a=["Demo"],M=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:a,default:s},Symbol.toStringTag,{value:"Module"}));export{e as D,M as T};
