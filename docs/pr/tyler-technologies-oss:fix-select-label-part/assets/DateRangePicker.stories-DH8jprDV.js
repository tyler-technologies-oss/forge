import"./lit-element-B3QVTycr.js";import{x as d}from"./lit-html-CuBe1DX_.js";import{g as s}from"./utils-Do5MGSMS.js";import"./feature-detection-C61kIZu7.js";import"./date-range-picker-DubEfnI8.js";import"./calendar-Bv8ksB_u.js";import"./index-CiLSBptl.js";import"./icon-button-DJSm0po0.js";import"./focus-indicator-DydcbRnf.js";import"./state-layer-Y8UVngaT.js";import"./icon-DNSPAaK0.js";import"./text-field-DxXALn2L.js";import"./base-field-BDCxUf4S.js";import"./label-W_tr_-w0.js";import"./button-7EoU3XJS.js";import"./button-toggle-group-BIaWvq7W.js";import"./checkbox-CZ4HhXrD.js";import"./switch-CVhsVTET.js";const o="forge-date-range-picker",n={title:"Components/Date Range Picker",render:e=>{const l=e.min?new Date(e.min):void 0,m=e.max?new Date(e.max):void 0;return d`
      <forge-date-range-picker
        .min=${l}
        .max=${m}
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
    `},component:o,parameters:{actions:{disable:!0}},argTypes:{...s({tagName:o,include:["min","max","disabled","masked","showMaskFormat","allowInvalidDate","showToday","showClear","disabledDaysOfWeek"],controls:{from:{control:"date"},min:{control:"date"},max:{control:"date"},disabledDaysOfWeek:{control:{type:"multi-select",labels:{0:"Sun",1:"Mon",2:"Tue",3:"Wed",4:"Thu",5:"Fri",6:"Sat"}},options:[0,1,2,3,4,5,6]}}})},args:{maskFormat:"0`0{/}`0`0{/}`0`0`0`0",disabled:!1,showClear:!0,showToday:!0,showMaskFormat:!0,allowInvalidDate:!1,disabledDaysOfWeek:[0,6],masked:!1}},t={};var a,r,i;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:"{}",...(i=(r=t.parameters)==null?void 0:r.docs)==null?void 0:i.source}}};const p=["Demo"],S=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:p,default:n},Symbol.toStringTag,{value:"Module"}));export{S as D,t as a};
