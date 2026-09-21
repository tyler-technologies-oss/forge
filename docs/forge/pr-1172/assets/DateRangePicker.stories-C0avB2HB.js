import{b as l}from"./iframe-BaLQ_A2d.js";import{g as d}from"./utils-CElmhe9Y.js";import"./service-adapter-DlT-lJx7.js";import"./date-range-picker-C_qAOYjd.js";import"./calendar-DYHmb5gP.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./icon-button-IKvoqhNZ.js";import"./tyler-icons-DfIaYIv7.js";import"./text-field-DpRJB-zB.js";import"./base-field-B2hMeS19.js";import"./focus-indicator-BeZvj0X5.js";import"./label-BIsRcMc6.js";const t="forge-date-range-picker",i={title:"Components/Date Range Picker",render:e=>{const o=e.min?new Date(e.min):void 0,r=e.max?new Date(e.max):void 0;return l`
      <forge-date-range-picker
        .min=${o}
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
    `},component:t,parameters:{actions:{disable:!0}},argTypes:{...d({tagName:t,include:["min","max","disabled","masked","showMaskFormat","allowInvalidDate","showToday","showClear","disabledDaysOfWeek"],controls:{from:{control:"date"},min:{control:"date"},max:{control:"date"},disabledDaysOfWeek:{control:{type:"multi-select",labels:{0:"Sun",1:"Mon",2:"Tue",3:"Wed",4:"Thu",5:"Fri",6:"Sat"}},options:[0,1,2,3,4,5,6]}}})},args:{maskFormat:"0`0{/}`0`0{/}`0`0`0`0",disabled:!1,showClear:!0,showToday:!0,showMaskFormat:!0,allowInvalidDate:!1,disabledDaysOfWeek:[0,6],masked:!1}},a={};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:"{}",...a.parameters?.docs?.source}}};const s=["Demo"],g=Object.freeze(Object.defineProperty({__proto__:null,Demo:a,__namedExportsOrder:s,default:i},Symbol.toStringTag,{value:"Module"}));export{g as D,a};
