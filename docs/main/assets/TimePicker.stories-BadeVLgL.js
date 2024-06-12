import{x as p}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{g as l}from"./utils-SjbeXOvg.js";import"./constants-CmaEVTEu.js";import"./time-picker-DARgHsM-.js";import"./index-Dh0vMUMR.js";import"./text-field-DnqY6g8w.js";import"./base-field-NtngDJOB.js";import"./focus-indicator-CexacDHl.js";import"./label-BsLwoMJm.js";import"./button-DqH9YfaW.js";import"./state-layer-DjEoH8hN.js";import"./button-toggle-group-CSWkQPk2.js";import"./checkbox-DJehbw3q.js";import"./icon-button-Cqg7QjNu.js";import"./icon-DdNu5rAq.js";import"./switch-DYQgudGV.js";import"./linear-progress-DkhIk2Qx.js";import"./list-BN1qzEIh.js";import"./popover-D076uhwZ.js";import"./overlay-CmQ6MvbI.js";import"./skeleton-Cpc63rts.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
