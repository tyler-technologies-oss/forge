import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CuAvrKn_.js";import{l as a,m as o,s}from"./utils-Cppiha4b.js";import{t as c}from"./class-map-DEew1OiS.js";import{t as l}from"./class-map-8zp5OV2u.js";import{r as u,t as d}from"./style-map-C_WKUe4Y.js";import{t as f}from"./checkbox-DxQPzWzP.js";var p=t({CSSOnly:()=>y,Demo:()=>v,__namedExportsOrder:()=>b,default:()=>_}),m,h,g,_,v,y,b;function x(){return(x=e((()=>{i(),l(),d(),o(),f(),{action:m}=__STORYBOOK_MODULE_ACTIONS__,h=`forge-checkbox`,g=m(`forge-checkbox-change`),_={title:`Components/Checkbox`,render:e=>{let t=a(e),i=t?u(t):r;return n`
      <forge-checkbox
        .checked=${e.checked}
        .indeterminate=${e.indeterminate}
        .disabled=${e.disabled}
        .required=${e.required}
        .readonly=${e.readonly}
        .dense=${e.dense}
        .labelPosition=${e.labelPosition}
        @change=${g}
        style=${i}>
        ${e.label}
      </forge-checkbox>
    `},component:h,argTypes:{...s({tagName:h,exclude:[`defaultChecked`,`value`,`form`,`labels`,`name`],controls:{labelPosition:{control:`select`,options:[`start`,`end`]}}}),label:{control:`text`}},args:{label:`Label`,checked:!1,indeterminate:!1,disabled:!1,required:!1,readonly:!1,dense:!1,labelPosition:`end`}},v={},y={parameters:{controls:{include:[`checked`,`indeterminate`,`disabled`,`dense`]}},args:{checked:!1,indeterminate:!1,disabled:!1,dense:!1},render:({checked:e,indeterminate:t,disabled:r,dense:i})=>{let a=c({"forge-checkbox":!0,"forge-checkbox--dense":i});return n`
      <label class="forge-typography--label2" style="display: flex; align-items: center;">
        <div class=${a}>
          <input type="checkbox" .checked=${e} .indeterminate=${t} ?disabled=${r} />
          <div class="forge-checkbox__icon"></div>
        </div>
        <span>Check me</span>
      </label>
    `}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['checked', 'indeterminate', 'disabled', 'dense']
    }
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    dense: false
  },
  render: ({
    checked,
    indeterminate,
    disabled,
    dense
  }) => {
    const classes = classMap({
      'forge-checkbox': true,
      'forge-checkbox--dense': dense
    });
    return html\`
      <label class="forge-typography--label2" style="display: flex; align-items: center;">
        <div class=\${classes}>
          <input type="checkbox" .checked=\${checked} .indeterminate=\${indeterminate} ?disabled=\${disabled} />
          <div class="forge-checkbox__icon"></div>
        </div>
        <span>Check me</span>
      </label>
    \`;
  }
}`,...y.parameters?.docs?.source}}},b=[`Demo`,`CSSOnly`]})))()}export{x as i,p as n,v as r,y as t};