import{x as r}from"./iframe-TounFTVn.js";import{g as i}from"./utils-D4P_Rfvb.js";import"./service-adapter-CffG5Lhq.js";import"./time-picker-C19xzNOJ.js";import"./index-5CPwzmQS.js";import"./text-field-Cw4Jb27S.js";import"./base-field-CSZ4CYth.js";import"./focus-indicator-Bg6HJ9xm.js";import"./label-CCBw3HIZ.js";import"./button-D0qBXGrU.js";import"./state-layer-gAgMwMHF.js";import"./button-toggle-group-DqphVeNb.js";import"./checkbox-Bau9iA2W.js";import"./icon-button-CysI0CPp.js";import"./icon-kuXwuZAY.js";import"./switch-BIOLip5M.js";import"./linear-progress-r0Hzg69v.js";import"./list-Cjp395q7.js";import"./popover-BWVazmya.js";import"./overlay-B5pGv-rV.js";import"./skeleton-BSiuL_ME.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
