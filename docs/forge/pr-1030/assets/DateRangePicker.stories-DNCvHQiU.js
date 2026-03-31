import{b as i}from"./iframe-DIse7dWG.js";import{g as l}from"./utils-CAFI_ioD.js";import"./service-adapter-8tADcN_b.js";import"./date-range-picker-KDrLPz7x.js";import"./calendar-BIxDZDXS.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./icon-button-DhxJI1TN.js";import"./focus-indicator-ByV7i1_k.js";import"./state-layer-CK5iHsfr.js";import"./tyler-icons-CJFVxose.js";import"./text-field-B_BE1IeA.js";import"./base-field-JSlC1NGq.js";import"./label-B1PNP--5.js";import"./button-BFEOBbvJ.js";import"./button-toggle-group-BzGLvUha.js";import"./checkbox-BQM1WMl0.js";import"./switch-Dn8_XRDj.js";const o="forge-date-range-picker",m={title:"Components/Date Range Picker",render:e=>{const a=e.min?new Date(e.min):void 0,r=e.max?new Date(e.max):void 0;return i`
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
