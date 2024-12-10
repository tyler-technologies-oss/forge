import{a as h}from"./chunk-D5ZWXAHU-CGElDDNX.js";import"./lit-element-CgJqSpuc.js";import{x as b,E as k}from"./lit-html-paDGiEfB.js";import{e as g}from"./class-map-D55lQyt8.js";import{o as u}from"./style-map-C9nPWcxA.js";import{b as x,g as y}from"./utils-BYbK8YLU.js";import"./constants-CFf81ck9.js";import"./checkbox-BavEIv2Q.js";import"./index-BmocOEUj.js";const t="forge-checkbox",$=h("forge-checkbox-change"),C={title:"Components/Checkbox",render:e=>{const o=x(e),r=o?u(o):k;return b`
      <forge-checkbox
        .checked=${e.checked}
        .indeterminate=${e.indeterminate}
        .disabled=${e.disabled}
        .required=${e.required}
        .readonly=${e.readonly}
        .dense=${e.dense}
        .labelPosition=${e.labelPosition}
        @change=${$}
        style=${r}>
        ${e.label}
      </forge-checkbox>
    `},component:t,argTypes:{...y({tagName:t,exclude:["defaultChecked","value","form","labels","name"],controls:{labelPosition:{control:"select",options:["start","end"]}}}),label:{control:"text"}},args:{label:"Label",checked:!1,indeterminate:!1,disabled:!1,required:!1,readonly:!1,dense:!1,labelPosition:"end"}},s={},a={parameters:{controls:{include:["checked","indeterminate","disabled","dense"]}},args:{checked:!1,indeterminate:!1,disabled:!1,dense:!1},render:({checked:e,indeterminate:o,disabled:r,dense:p})=>{const f=g({"forge-checkbox":!0,"forge-checkbox--dense":p});return b`
      <label class="forge-typography--label2" style="display: flex; align-items: center;">
        <div class=${f}>
          <input type="checkbox" .checked=${e} .indeterminate=${o} ?disabled=${r} />
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
}`,...(m=(i=a.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const v=["Demo","CSSOnly"],j=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:s,__namedExportsOrder:v,default:C},Symbol.toStringTag,{value:"Module"}));export{j as C,s as D,a};
