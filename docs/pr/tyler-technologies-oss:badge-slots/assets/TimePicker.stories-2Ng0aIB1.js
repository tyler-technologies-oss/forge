import"./lit-element-BuSzPo2N.js";import{x as p}from"./lit-html-Ox1a2bD1.js";import{g as l}from"./utils-C9ubTmun.js";import"./feature-detection-CY6TVbRZ.js";import"./time-picker-2LYr3XTv.js";import"./index-CiLSBptl.js";import"./text-field-CGeuarYD.js";import"./base-field-DFQttNW4.js";import"./focus-indicator-Cgfkaa3d.js";import"./label-BM0pESju.js";import"./button-CC-L5W3b.js";import"./state-layer-BVsNuAhs.js";import"./button-toggle-group-5BDyeLck.js";import"./checkbox-CF9fzMIR.js";import"./icon-button-BkG6pY8m.js";import"./icon-Bqgt-0wI.js";import"./switch-ZI6WyDhE.js";import"./linear-progress-CJb_8skk.js";import"./list-DCzhHkfW.js";import"./popover-Bqa_o4zH.js";import"./overlay-D__9laOM.js";import"./skeleton-DocRecw2.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
