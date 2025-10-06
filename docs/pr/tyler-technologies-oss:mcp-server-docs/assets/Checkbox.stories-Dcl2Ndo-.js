import{E as d,x as c}from"./iframe-BWh0ylRO.js";import{e as i}from"./class-map-CYjmrQxO.js";import{o as m}from"./style-map-Dat-_dW8.js";import{g as b,a as p}from"./utils-BGeMI972.js";import"./service-adapter-CffG5Lhq.js";import"./checkbox-DkQufZq1.js";import"./index-5CPwzmQS.js";const{action:f}=__STORYBOOK_MODULE_ACTIONS__,r="forge-checkbox",h=f("forge-checkbox-change"),k={title:"Components/Checkbox",render:e=>{const o=p(e),t=o?m(o):d;return c`
      <forge-checkbox
        .checked=${e.checked}
        .indeterminate=${e.indeterminate}
        .disabled=${e.disabled}
        .required=${e.required}
        .readonly=${e.readonly}
        .dense=${e.dense}
        .labelPosition=${e.labelPosition}
        @change=${h}
        style=${t}>
        ${e.label}
      </forge-checkbox>
    `},component:r,argTypes:{...b({tagName:r,exclude:["defaultChecked","value","form","labels","name"],controls:{labelPosition:{control:"select",options:["start","end"]}}}),label:{control:"text"}},args:{label:"Label",checked:!1,indeterminate:!1,disabled:!1,required:!1,readonly:!1,dense:!1,labelPosition:"end"}},s={},a={parameters:{controls:{include:["checked","indeterminate","disabled","dense"]}},args:{checked:!1,indeterminate:!1,disabled:!1,dense:!1},render:({checked:e,indeterminate:o,disabled:t,dense:l})=>{const n=i({"forge-checkbox":!0,"forge-checkbox--dense":l});return c`
      <label class="forge-typography--label2" style="display: flex; align-items: center;">
        <div class=${n}>
          <input type="checkbox" .checked=${e} .indeterminate=${o} ?disabled=${t} />
          <div class="forge-checkbox__icon"></div>
        </div>
        <span>Check me</span>
      </label>
    `}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const g=["Demo","CSSOnly"],v=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:s,__namedExportsOrder:g,default:k},Symbol.toStringTag,{value:"Module"}));export{v as C,s as D,a};
