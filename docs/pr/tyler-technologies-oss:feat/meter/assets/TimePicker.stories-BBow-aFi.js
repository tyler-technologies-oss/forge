import"./lit-element-JplMEnZc.js";import{x as p}from"./lit-html-paDGiEfB.js";import{g as l}from"./utils-Cisx8TMn.js";import"./feature-detection-DRCh51Sa.js";import"./time-picker-s5WIyZsP.js";import"./index-BmocOEUj.js";import"./text-field-Bqwowxqq.js";import"./base-field-BvJ3aEbv.js";import"./focus-indicator-BvNL19jq.js";import"./label-DD6WOkIX.js";import"./button-Cc7D3D0l.js";import"./state-layer-CG0HAXrj.js";import"./button-toggle-group-BMTqgYYW.js";import"./checkbox-D8XHfmDb.js";import"./icon-button-Byrj13fN.js";import"./icon-PniqSQTM.js";import"./switch-B8UkJq6I.js";import"./linear-progress-BPNzmgXS.js";import"./list-B4vuF0gc.js";import"./popover-Dufij8YF.js";import"./overlay-B3mdiStP.js";import"./skeleton-C-ZOJzmn.js";const t="forge-time-picker",s={title:"Components/Time Picker",render:o=>p`
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
