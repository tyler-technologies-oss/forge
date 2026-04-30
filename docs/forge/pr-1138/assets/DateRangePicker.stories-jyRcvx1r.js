import{b as i}from"./iframe-D8QRU-tV.js";import{g as l}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./date-range-picker-C-00gxpk.js";import"./calendar-DcGpU6V4.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./icon-button-BGlfW1oY.js";import"./focus-indicator-azdGC1n3.js";import"./state-layer-Dj8VLfkk.js";import"./tyler-icons-ChHIax3p.js";import"./text-field-CcxB30F-.js";import"./base-field-r83kWj0E.js";import"./label-CIZlvnGp.js";import"./button-DSNQ_5yA.js";import"./button-toggle-group-BvL_7CJd.js";import"./checkbox-DRYMIyoy.js";import"./switch-nItaCm0y.js";const o="forge-date-range-picker",m={title:"Components/Date Range Picker",render:e=>{const a=e.min?new Date(e.min):void 0,r=e.max?new Date(e.max):void 0;return i`
      <forge-date-range-picker
        .min=${a}
        .max=${r}
        .disabled=${e.disabled}
        .masked=${e.masked}
        .showMaskFormat=${e.showMaskFormat}
        .allowInvalidDate=${e.allowInvalidDate}
        .showToday=${e.showToday}
        .showClear=${e.showClear}
        .disabledDaysOfWeek=${e.disabledDaysOfWeek}
        .locale=${e.locale}
        style="width: 263px">
        <forge-text-field>
          <label for="input-date-range-picker-01">Date</label>
          <input type="text" id="input-date-range-picker-01" autocomplete="off" placeholder="mm/dd/yyyy" />
          <input type="text" id="input-date-range-picker-02" autocomplete="off" placeholder="mm/dd/yyyy" />
        </forge-text-field>
      </forge-date-range-picker>
    `},component:o,parameters:{actions:{disable:!0}},argTypes:{...l({tagName:o,include:["min","max","disabled","masked","showMaskFormat","allowInvalidDate","showToday","showClear","disabledDaysOfWeek"],controls:{from:{control:"date"},min:{control:"date"},max:{control:"date"},disabledDaysOfWeek:{control:{type:"multi-select",labels:{0:"Sun",1:"Mon",2:"Tue",3:"Wed",4:"Thu",5:"Fri",6:"Sat"}},options:[0,1,2,3,4,5,6]}}})},args:{maskFormat:"0`0{/}`0`0{/}`0`0`0`0",disabled:!1,showClear:!0,showToday:!0,showMaskFormat:!0,allowInvalidDate:!1,disabledDaysOfWeek:[0,6],masked:!1}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const d=["Demo"],C=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:d,default:m},Symbol.toStringTag,{value:"Module"}));export{C as D,t as a};
