import{b as r}from"./iframe-IbY4Oy7g.js";import{g as i}from"./utils-D5x2rMta.js";import"./service-adapter-8tADcN_b.js";import"./text-field-DjKMWryZ.js";import"./base-field-B8M5Rbwm.js";import"./focus-indicator-em7j0z3w.js";import"./label-CFO2X73D.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-BUCVRh9N.js";import"./button-toggle-group-BdfvY4f-.js";import"./checkbox-BWQKNjit.js";import"./icon-button-CW3AgSAX.js";import"./tyler-icons-D3PVExpf.js";import"./switch-BHLx_rJf.js";import"./time-picker-Box2Q7RX.js";import"./linear-progress-Bb0VsHdX.js";import"./list-BEvrgVXU.js";import"./popover-BG4-Pyu8.js";import"./overlay-BRsNG1-Q.js";import"./skeleton-Bv38rDCU.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
