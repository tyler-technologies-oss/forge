import{E as h,x as b}from"./iframe-lbQL-3vk.js";import{e as k}from"./class-map-gs-XLN8j.js";import{o as g}from"./style-map-CIaSIl6C.js";import{g as u,a as x}from"./utils-C0eAemYT.js";import"./feature-detection-uS6p5jc8.js";import"./checkbox-DOmkbh7U.js";import"./index-CiLSBptl.js";const{action:y}=__STORYBOOK_MODULE_ACTIONS__,r="forge-checkbox",$=y("forge-checkbox-change"),_={title:"Components/Checkbox",render:e=>{const o=x(e),t=o?g(o):h;return b`
      <forge-checkbox
        .checked=${e.checked}
        .indeterminate=${e.indeterminate}
        .disabled=${e.disabled}
        .required=${e.required}
        .readonly=${e.readonly}
        .dense=${e.dense}
        .labelPosition=${e.labelPosition}
        @change=${$}
        style=${t}>
        ${e.label}
      </forge-checkbox>
    `},component:r,argTypes:{...u({tagName:r,exclude:["defaultChecked","value","form","labels","name"],controls:{labelPosition:{control:"select",options:["start","end"]}}}),label:{control:"text"}},args:{label:"Label",checked:!1,indeterminate:!1,disabled:!1,required:!1,readonly:!1,dense:!1,labelPosition:"end"}},s={},a={parameters:{controls:{include:["checked","indeterminate","disabled","dense"]}},args:{checked:!1,indeterminate:!1,disabled:!1,dense:!1},render:({checked:e,indeterminate:o,disabled:t,dense:p})=>{const f=k({"forge-checkbox":!0,"forge-checkbox--dense":p});return b`
      <label class="forge-typography--label2" style="display: flex; align-items: center;">
        <div class=${f}>
          <input type="checkbox" .checked=${e} .indeterminate=${o} ?disabled=${t} />
          <div class="forge-checkbox__icon"></div>
        </div>
        <span>Check me</span>
      </label>
    `}};var c,l,n;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(n=(l=s.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};var d,i,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(m=(i=a.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const C=["Demo","CSSOnly"],E=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:s,__namedExportsOrder:C,default:_},Symbol.toStringTag,{value:"Module"}));export{E as C,s as D,a};
