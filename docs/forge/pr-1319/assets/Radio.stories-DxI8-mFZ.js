import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-Cygt-aqC.js";import{l as a,m as o,s}from"./utils-C3ow8Ikc.js";import{t as c}from"./class-map-DEew1OiS.js";import{t as l}from"./class-map-8zp5OV2u.js";import{r as u,t as d}from"./style-map-C_WKUe4Y.js";import{t as f}from"./radio-BcqxWkZx.js";var p=t({CSSOnly:()=>_,Demo:()=>g,__namedExportsOrder:()=>v,default:()=>h}),m,h,g,_,v;function y(){return(y=e((()=>{i(),l(),d(),o(),f(),m=`forge-radio`,h={title:`Components/Radio`,render:e=>{let t=a(e),i=t?u(t):r;return n`
      <forge-radio
        name="radios"
        value="1"
        .labelPosition=${e.labelPosition}
        .dense=${e.dense}
        .disabled=${e.disabled}
        .defaultChecked=${e.defaultChecked}
        .readonly=${e.readonly}
        style=${i}>
        Option 1
      </forge-radio>
      <forge-radio
        name="radios"
        value="1"
        .labelPosition=${e.labelPosition}
        .dense=${e.dense}
        .disabled=${e.disabled}
        .defaultChecked=${e.defaultChecked}
        .readonly=${e.readonly}
        style=${i}>
        Option 2
      </forge-radio>
      <forge-radio
        name="radios"
        value="1"
        .labelPosition=${e.labelPosition}
        .dense=${e.dense}
        .disabled=${e.disabled}
        .defaultChecked=${e.defaultChecked}
        .readonly=${e.readonly}
        style=${i}>
        Option 3
      </forge-radio>
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...s({tagName:m,exclude:[`value`,`defaultChecked`,`checked`,`required`,`name`,`labels`,`form`],controls:{labelPosition:{control:`select`,options:[`start`,`end`]}}})},args:{dense:!1,disabled:!1,readonly:!1,labelPosition:`end`}},g={},_={parameters:{controls:{include:[`dense`,`disabled`]}},args:{dense:!1,disabled:!1},render:({dense:e,disabled:t})=>{let r={"forge-radio":!0,"forge-radio--dense":e};return n`
      <div
        role="radiogroup"
        aria-label="Select an option"
        style="display: grid; grid-template-columns: auto auto; inline-size: fit-content; align-items: center;">
        <div class=${c(r)}>
          <input type="radio" name="css-radio" ?disabled=${t} id="css-radio-1" />
        </div>
        <label class="forge-typography--label2" for="css-radio-1">Option 1</label>
        <div class=${c(r)}>
          <input type="radio" name="css-radio" ?disabled=${t} id="css-radio-2" />
        </div>
        <label class="forge-typography--label2" for="css-radio-2">Option 2</label>
        <div class=${c(r)}>
          <input type="radio" name="css-radio" ?disabled=${t} id="css-radio-3" />
        </div>
        <label class="forge-typography--label2" for="css-radio-3">Option 3</label>
      </div>
    `}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['dense', 'disabled']
    }
  },
  args: {
    dense: false,
    disabled: false
  },
  render: ({
    dense,
    disabled
  }) => {
    const classes = {
      'forge-radio': true,
      'forge-radio--dense': dense
    };
    return html\`
      <div
        role="radiogroup"
        aria-label="Select an option"
        style="display: grid; grid-template-columns: auto auto; inline-size: fit-content; align-items: center;">
        <div class=\${classMap(classes)}>
          <input type="radio" name="css-radio" ?disabled=\${disabled} id="css-radio-1" />
        </div>
        <label class="forge-typography--label2" for="css-radio-1">Option 1</label>
        <div class=\${classMap(classes)}>
          <input type="radio" name="css-radio" ?disabled=\${disabled} id="css-radio-2" />
        </div>
        <label class="forge-typography--label2" for="css-radio-2">Option 2</label>
        <div class=\${classMap(classes)}>
          <input type="radio" name="css-radio" ?disabled=\${disabled} id="css-radio-3" />
        </div>
        <label class="forge-typography--label2" for="css-radio-3">Option 3</label>
      </div>
    \`;
  }
}`,..._.parameters?.docs?.source}}},v=[`Demo`,`CSSOnly`]})))()}export{y as i,g as n,p as r,_ as t};