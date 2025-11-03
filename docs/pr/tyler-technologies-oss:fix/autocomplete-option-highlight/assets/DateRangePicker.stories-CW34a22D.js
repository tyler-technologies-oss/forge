import{x as i}from"./iframe-D70h1lbg.js";import{g as l}from"./utils-bIwC1Fgv.js";import"./service-adapter-CffG5Lhq.js";import"./date-range-picker-EIXEDOZZ.js";import"./calendar-DBFQxkW5.js";import"./index-5CPwzmQS.js";import"./icon-button-BkLIxU5W.js";import"./focus-indicator-B3Snl-2i.js";import"./state-layer-gAgMwMHF.js";import"./icon-kuXwuZAY.js";import"./text-field-BcybyCL8.js";import"./base-field-CtcW35gT.js";import"./label-CwxtoU1o.js";import"./button-Cemxrxqg.js";import"./button-toggle-group-CS1Zm_2p.js";import"./checkbox-undJ_3l0.js";import"./switch-BQ8V6i8_.js";const o="forge-date-range-picker",d={title:"Components/Date Range Picker",render:e=>{const a=e.min?new Date(e.min):void 0,r=e.max?new Date(e.max):void 0;return i`
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
    `},component:o,parameters:{actions:{disable:!0}},argTypes:{...l({tagName:o,include:["min","max","disabled","masked","showMaskFormat","allowInvalidDate","showToday","showClear","disabledDaysOfWeek"],controls:{from:{control:"date"},min:{control:"date"},max:{control:"date"},disabledDaysOfWeek:{control:{type:"multi-select",labels:{0:"Sun",1:"Mon",2:"Tue",3:"Wed",4:"Thu",5:"Fri",6:"Sat"}},options:[0,1,2,3,4,5,6]}}})},args:{maskFormat:"0`0{/}`0`0{/}`0`0`0`0",disabled:!1,showClear:!0,showToday:!0,showMaskFormat:!0,allowInvalidDate:!1,disabledDaysOfWeek:[0,6],masked:!1}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const m=["Demo"],v=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:m,default:d},Symbol.toStringTag,{value:"Module"}));export{v as D,t as a};
