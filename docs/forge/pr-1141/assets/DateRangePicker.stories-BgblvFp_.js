import{b as i}from"./iframe-BuM4FWjo.js";import{g as l}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./date-range-picker-BY8B8FO8.js";import"./calendar-FB4FMIFk.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./icon-button-XJCCdyMS.js";import"./focus-indicator-BGec47OT.js";import"./state-layer-CK5iHsfr.js";import"./tyler-icons-CQ1wASlo.js";import"./text-field-DanaXTLe.js";import"./base-field-B7X0c9YA.js";import"./label-DwyUBQ-s.js";import"./button-BP0tSqwm.js";import"./button-toggle-group-CyvyFrJ7.js";import"./checkbox-B4GhszCv.js";import"./switch-C7yvX8UL.js";const o="forge-date-range-picker",m={title:"Components/Date Range Picker",render:e=>{const a=e.min?new Date(e.min):void 0,r=e.max?new Date(e.max):void 0;return i`
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
