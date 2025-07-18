import{x as p}from"./iframe-B36M3axR.js";import{g as l}from"./utils-JcRLWv5w.js";import"./service-adapter-BykFeYYZ.js";import"./time-picker-Lj0m-Z8d.js";import"./index-CiLSBptl.js";import"./text-field-mNbxifo0.js";import"./base-field-DkSU8scB.js";import"./focus-indicator-u5r21UtO.js";import"./label-1JbfAEsw.js";import"./button-C9kCF3a-.js";import"./state-layer-BRTtEqto.js";import"./button-toggle-group-UVvL_rAk.js";import"./checkbox-DpCbezAn.js";import"./icon-button-CofNeE0G.js";import"./icon-eJOvSyyv.js";import"./switch-jdpZ6okj.js";import"./linear-progress-BTaob5x2.js";import"./list-CIEcjlwx.js";import"./popover-BWs500m1.js";import"./overlay-DWLd4_Vp.js";import"./skeleton-fsmWNbya.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
