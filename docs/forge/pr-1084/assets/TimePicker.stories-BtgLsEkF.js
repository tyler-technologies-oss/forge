import{b as r}from"./iframe-AKpA6l3R.js";import{g as i}from"./utils-B1jcnhxN.js";import"./service-adapter-CoGDs2_3.js";import"./text-field-DZUTAyY5.js";import"./base-field-DR3fEFCy.js";import"./focus-indicator-BE83ekqh.js";import"./label-t2pynm5-.js";import"./index-DTwfV0k0.js";import"./button-BzjmK-iE.js";import"./state-layer-D7Damx7l.js";import"./button-toggle-group-Cw9_c9Ap.js";import"./checkbox-BYMPbMWU.js";import"./icon-button-bvY8HLV6.js";import"./tyler-icons-DRTyRvfU.js";import"./switch-CiRVClWc.js";import"./time-picker-BPci01YS.js";import"./linear-progress-Dnev6XAt.js";import"./list-Dn5vq-0G.js";import"./popover-s3N-XehF.js";import"./overlay-CsYzVqz1.js";import"./skeleton-D35b5pv1.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
  `,component:t,parameters:{actions:{disable:!0}},argTypes:{...i({tagName:t,include:["allowSeconds","masked","showMaskFormat","use24HourTime","allowInvalidTime","step","allowInput","allowDropdown","showNow","showHourOptions","disabled"]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const p=["Demo"],y=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:p,default:m},Symbol.toStringTag,{value:"Module"}));export{e as D,y as T};
