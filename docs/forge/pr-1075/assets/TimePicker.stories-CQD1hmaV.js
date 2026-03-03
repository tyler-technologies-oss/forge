import{b as r}from"./iframe-Cyv46XVN.js";import{g as i}from"./utils-DJF5Ajxq.js";import"./service-adapter-8tADcN_b.js";import"./text-field-UfdiVXRn.js";import"./base-field-Ceq62_8W.js";import"./focus-indicator-C-z2W46n.js";import"./label-B2ax5rCu.js";import"./index-DTwfV0k0.js";import"./button-C96CRxyU.js";import"./state-layer-D_bEeiyc.js";import"./button-toggle-group-UdFav8AG.js";import"./checkbox-BhOjWX0A.js";import"./icon-button-DK-pXUTf.js";import"./tyler-icons-DG1d6qey.js";import"./switch-BFpDUx7m.js";import"./time-picker-Cv2kL6ge.js";import"./linear-progress-CYTe6uKP.js";import"./list-D1-mbE3Z.js";import"./popover-CNAMd9T5.js";import"./overlay-CvFTNDO2.js";import"./skeleton-B7Zw5LdQ.js";const t="forge-time-picker",m={title:"Components/Time Picker",render:o=>r`
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
