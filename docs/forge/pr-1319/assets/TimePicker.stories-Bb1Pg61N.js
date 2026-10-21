import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-CuAvrKn_.js";import{m as i,s as a}from"./utils-Cppiha4b.js";import{t as o}from"./time-picker-DgZCGLMm.js";import{t as s}from"./text-field-DsU8V09a.js";var c=t({Demo:()=>d,__namedExportsOrder:()=>f,default:()=>u}),l,u,d,f;function p(){return(p=e((()=>{r(),i(),s(),o(),l=`forge-time-picker`,u={title:`Components/Time Picker`,render:e=>n`
    <forge-time-picker
      .allowSeconds=${e.allowSeconds}
      .masked=${e.masked}
      .showMaskFormat=${e.showMaskFormat}
      .use24HourTime=${e.use24HourTime}
      .allowInvalidTime=${e.allowInvalidTime}
      .step=${e.step}
      .allowInput=${e.allowInput}
      .allowDropdown=${e.allowDropdown}
      .showNow=${e.showNow}
      .showHourOptions=${e.showHourOptions}
      .disabled=${e.disabled}>
      <forge-text-field>
        <input id="time-picker" type="text" />
        <label for="time-picker">Time</label>
      </forge-text-field>
    </forge-time-picker>
  `,component:l,parameters:{actions:{disable:!0}},argTypes:{...a({tagName:l,include:[`allowSeconds`,`masked`,`showMaskFormat`,`use24HourTime`,`allowInvalidTime`,`step`,`allowInput`,`allowDropdown`,`showNow`,`showHourOptions`,`disabled`]})},args:{step:30,allowDropdown:!0,allowSeconds:!1,masked:!0,showHourOptions:!0,allowInput:!0}},d={},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{}`,...d.parameters?.docs?.source}}},f=[`Demo`]})))()}export{c as n,p as r,d as t};