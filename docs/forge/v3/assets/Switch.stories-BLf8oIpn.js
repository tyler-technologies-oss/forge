import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-CebKObJP.js";import{m as i,o as a,s as o}from"./utils-C3ow8Ikc.js";import{t as s}from"./class-map-DEew1OiS.js";import{t as c}from"./class-map-8zp5OV2u.js";import{o as l,t as u}from"./icon-DTQwimRS.js";import{O as d,t as f,y as p}from"./tyler-icons-CLXzO0Q_.js";import{t as m}from"./switch-C3lkQaq3.js";var h=t({CSSOnly:()=>y,Demo:()=>v,__namedExportsOrder:()=>b,default:()=>_}),g,_,v,y,b;function x(){return(x=e((()=>{u(),f(),r(),c(),i(),m(),l.define([p,d]),g=`forge-switch`,_={title:`Components/Switch`,render:e=>{let t=a(g,e);return t.textContent=`off/on`,t},component:g,parameters:{actions:{disable:!0}},argTypes:{...o({tagName:g,exclude:[`icon`,`form`,`labels`,`name`,`on`,`defaultOn`,`selected`],controls:{labelPosition:{control:`select`,options:[`start`,`end`]}}})}},v={},y={parameters:{controls:{include:[`on`,`dense`,`disabled`]}},args:{checked:!1,dense:!1,disabled:!1},render:({checked:e,dense:t,disabled:r})=>n`
      <label class="forge-typography--label2" style="display: flex; align-items: center;">
        <div class=${s({"forge-switch":!0,"forge-switch--dense":t})}>
          <input type="checkbox" switch .checked=${e} ?disabled=${r} />
          <div class="forge-switch__thumb">
            <forge-icon name="close" class="forge-switch__icon forge-switch__icon--off"></forge-icon>
            <forge-icon name="check" class="forge-switch__icon forge-switch__icon--on"></forge-icon>
          </div>
        </div>
        <span>Toggle me</span>
      </label>
    `},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['on', 'dense', 'disabled']
    }
  },
  args: {
    checked: false,
    dense: false,
    disabled: false
  },
  render: ({
    checked,
    dense,
    disabled
  }) => {
    const classes = {
      'forge-switch': true,
      'forge-switch--dense': dense
    };
    return html\`
      <label class="forge-typography--label2" style="display: flex; align-items: center;">
        <div class=\${classMap(classes)}>
          <input type="checkbox" switch .checked=\${checked} ?disabled=\${disabled} />
          <div class="forge-switch__thumb">
            <forge-icon name="close" class="forge-switch__icon forge-switch__icon--off"></forge-icon>
            <forge-icon name="check" class="forge-switch__icon forge-switch__icon--on"></forge-icon>
          </div>
        </div>
        <span>Toggle me</span>
      </label>
    \`;
  }
}`,...y.parameters?.docs?.source}}},b=[`Demo`,`CSSOnly`]})))()}export{x as i,v as n,h as r,y as t};