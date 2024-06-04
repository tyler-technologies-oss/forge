import{x as m}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{g as s}from"./utils-bUMJf83p.js";import"./date-range-picker-DYpemHTF.js";import"./calendar-B0GiPQD3.js";import"./index-Dh0vMUMR.js";import"./icon-button-CrlUtV4j.js";import"./focus-indicator-DB3Uau5R.js";import"./state-layer-7Eqbkxx0.js";import"./icon-V4IE3JYq.js";import"./text-field-DWUVDvUx.js";import"./base-field-CXwdj0lH.js";import"./label-rCd_TJHf.js";import"./button-BNIBqQee.js";import"./button-toggle-group-CnP-ho8N.js";import"./checkbox-Bmwif0Ou.js";import"./switch-jYFmeTKz.js";const o="forge-date-range-picker",n={title:"Components/Date Range Picker",render:e=>{const l=e.min?new Date(e.min):void 0,d=e.max?new Date(e.max):void 0;return m`
    <forge-date-range-picker
      .min=${l}
      .max=${d}
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
    `},component:o,parameters:{actions:{disable:!0}},argTypes:{...s({tagName:o,include:["min","max","disabled","masked","showMaskFormat","allowInvalidDate","showToday","showClear","disabledDaysOfWeek"],controls:{from:{control:"date"},min:{control:"date"},max:{control:"date"},disabledDaysOfWeek:{control:{type:"multi-select",labels:{0:"Sun",1:"Mon",2:"Tue",3:"Wed",4:"Thu",5:"Fri",6:"Sat"}},options:[0,1,2,3,4,5,6]}}})},args:{maskFormat:"0`0{/}`0`0{/}`0`0`0`0",disabled:!1,showClear:!0,showToday:!0,showMaskFormat:!0,allowInvalidDate:!1,disabledDaysOfWeek:[0,6],masked:!1}},t={};var a,r,i;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(i=(r=t.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};const p=["Demo"],M=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:p,default:n},Symbol.toStringTag,{value:"Module"}));export{M as D,t as a};