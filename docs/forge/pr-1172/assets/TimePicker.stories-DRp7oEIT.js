import{b as r}from"./iframe-BxUalrPu.js";import{g as i}from"./utils-u3kxOSSj.js";import"./service-adapter-8tADcN_b.js";import"./text-field-DHPPifsF.js";import"./base-field-pLsFNwdW.js";import"./focus-indicator-BT7jGzHM.js";import"./label-Bggcm2-j.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-YDv-pkxN.js";import"./button-toggle-group-LrQ5sMl2.js";import"./checkbox-Ca0Pm52O.js";import"./icon-button-BaryAIec.js";import"./tyler-icons-BqCFNdiX.js";import"./switch-DA5cufmo.js";import"./time-picker-BG4Q23Pz.js";import"./linear-progress-BvuLf7up.js";import"./list-CNlqqAaz.js";import"./popover-C_VdMpUc.js";import"./overlay-B9OExFy4.js";import"./skeleton-e7_Ylra4.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
