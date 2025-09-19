import{x as p}from"./iframe-DsjXCw-m.js";import{g as l}from"./utils-ByWQ95He.js";import"./feature-detection-uS6p5jc8.js";import"./time-picker-JojiWUZ3.js";import"./index-CiLSBptl.js";import"./text-field-CIHsEan0.js";import"./base-field-7hlMWjmp.js";import"./focus-indicator-BeibAi2h.js";import"./label-v2fBLVwj.js";import"./button-DEhPRUdY.js";import"./state-layer-C7sW6v-0.js";import"./button-toggle-group-DWRuBNed.js";import"./checkbox-B1PtNwCH.js";import"./icon-button-C-UNXlAt.js";import"./icon-B8CdcxqJ.js";import"./switch-c2I0wwHc.js";import"./linear-progress-2PahUgVv.js";import"./list-CkPu5vu3.js";import"./popover-CjB4Fwlr.js";import"./overlay-CewVvJzX.js";import"./skeleton-C4EH8VF8.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
