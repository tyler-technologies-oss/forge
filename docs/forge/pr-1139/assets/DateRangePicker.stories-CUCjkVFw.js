import{b as i}from"./iframe-BBqNUtqv.js";import{g as m}from"./utils-BiqwBWR2.js";import"./service-adapter-8tADcN_b.js";import"./date-range-picker-DozOBQAq.js";import"./calendar-DWyjPIig.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./icon-button-ChuE_xy5.js";import"./focus-indicator-CE-2THdp.js";import"./state-layer-Cd1l0S13.js";import"./icon-BeLCtqW2.js";import"./tyler-icons-fQPhzpbf.js";import"./text-field-E1U9wxdR.js";import"./base-field-Di1zrDqT.js";import"./label-DyOrl3sk.js";import"./button-BtXQ1IZV.js";import"./button-toggle-group-Cv8-wtIl.js";import"./checkbox-D6rV2_uo.js";import"./switch-B2rzTqQ2.js";const o="forge-date-range-picker",l={title:"Components/Date Range Picker",render:e=>{const a=e.min?new Date(e.min):void 0,r=e.max?new Date(e.max):void 0;return i`
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
    `},component:o,parameters:{actions:{disable:!0}},argTypes:{...m({tagName:o,include:["min","max","disabled","masked","showMaskFormat","allowInvalidDate","showToday","showClear","disabledDaysOfWeek"],controls:{from:{control:"date"},min:{control:"date"},max:{control:"date"},disabledDaysOfWeek:{control:{type:"multi-select",labels:{0:"Sun",1:"Mon",2:"Tue",3:"Wed",4:"Thu",5:"Fri",6:"Sat"}},options:[0,1,2,3,4,5,6]}}})},args:{maskFormat:"0`0{/}`0`0{/}`0`0`0`0",disabled:!1,showClear:!0,showToday:!0,showMaskFormat:!0,allowInvalidDate:!1,disabledDaysOfWeek:[0,6],masked:!1}},t={};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};const d=["Demo"],F=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:d,default:l},Symbol.toStringTag,{value:"Module"}));export{F as D,t as a};
