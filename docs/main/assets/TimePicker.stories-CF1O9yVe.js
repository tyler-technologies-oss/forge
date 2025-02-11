import"./lit-element-JplMEnZc.js";import{x as p}from"./lit-html-paDGiEfB.js";import{g as l}from"./utils-C88LhX2J.js";import"./feature-detection-DRCh51Sa.js";import"./time-picker-2HBM3hHF.js";import"./index-BmocOEUj.js";import"./text-field-MG0_C6OX.js";import"./base-field-CbuLpnbp.js";import"./focus-indicator-6buR07aw.js";import"./label-DgR2r6B9.js";import"./button-s6uPnjdF.js";import"./state-layer-CajKShBb.js";import"./button-toggle-group-D-qt8D-J.js";import"./checkbox-gHqdAOUL.js";import"./icon-button-IEfXmPFn.js";import"./icon-DB7kP3Ec.js";import"./switch-DnQGwTVS.js";import"./linear-progress-CqfIuBkR.js";import"./list-CpSCpOXb.js";import"./popover-CvqbaTJt.js";import"./overlay-DpaCc3Uf.js";import"./skeleton-D2S3-1Sc.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
