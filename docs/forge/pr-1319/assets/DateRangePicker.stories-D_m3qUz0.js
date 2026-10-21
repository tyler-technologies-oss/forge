import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-Cygt-aqC.js";import{m as i,s as a}from"./utils-C3ow8Ikc.js";import{t as o}from"./date-range-picker-uc5IpADW.js";var s=t({Demo:()=>u,__namedExportsOrder:()=>d,default:()=>l}),c,l,u,d;function f(){return(f=e((()=>{r(),i(),o(),c=`forge-date-range-picker`,l={title:`Components/Date Range Picker`,render:e=>{let t=e.min?new Date(e.min):void 0,r=e.max?new Date(e.max):void 0;return n`
      <forge-date-range-picker
        .min=${t}
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
    `},component:c,parameters:{actions:{disable:!0}},argTypes:{...a({tagName:c,include:[`min`,`max`,`disabled`,`masked`,`showMaskFormat`,`allowInvalidDate`,`showToday`,`showClear`,`disabledDaysOfWeek`],controls:{from:{control:`date`},min:{control:`date`},max:{control:`date`},disabledDaysOfWeek:{control:{type:`multi-select`,labels:{0:`Sun`,1:`Mon`,2:`Tue`,3:`Wed`,4:`Thu`,5:`Fri`,6:`Sat`}},options:[0,1,2,3,4,5,6]}}})},args:{maskFormat:"0`0{/}`0`0{/}`0`0`0`0",disabled:!1,showClear:!0,showToday:!0,showMaskFormat:!0,allowInvalidDate:!1,disabledDaysOfWeek:[0,6],masked:!1}},u={},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d=[`Demo`]})))()}export{u as n,f as r,s as t};