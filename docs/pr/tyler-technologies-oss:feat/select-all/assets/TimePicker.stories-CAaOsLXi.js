import{x as r}from"./iframe-7ipV3BDo.js";import{g as i}from"./utils-Cqbxq2Mi.js";import"./service-adapter-CffG5Lhq.js";import"./time-picker-DfxqKJo0.js";import"./index-5CPwzmQS.js";import"./text-field-DcMOm7jM.js";import"./base-field-BGvjHugg.js";import"./focus-indicator-DjsWD5XE.js";import"./label-BNvMDYgI.js";import"./button-DlJOcJKO.js";import"./state-layer-gAgMwMHF.js";import"./button-toggle-group-zlB2lfLt.js";import"./checkbox-bElym7Z-.js";import"./icon-button-53qOUJgX.js";import"./icon-kuXwuZAY.js";import"./switch-DnJVNB9d.js";import"./linear-progress-r0Hzg69v.js";import"./list-VFEFruUM.js";import"./popover-BWVazmya.js";import"./overlay-B5pGv-rV.js";import"./skeleton-BSiuL_ME.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
