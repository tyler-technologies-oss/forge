import"./lit-element-CgJqSpuc.js";import{x as b,E as f}from"./lit-html-paDGiEfB.js";import{e as d}from"./class-map-D55lQyt8.js";import{o as u}from"./style-map-C9nPWcxA.js";import{b as y,g}from"./utils-DzsNAH9x.js";import"./constants-CFf81ck9.js";import"./label-BLzPDfDj.js";import"./index-BmocOEUj.js";import"./button-CVZhEkBO.js";import"./focus-indicator-DesOnyyZ.js";import"./state-layer-COSQHCpS.js";import"./button-toggle-group-C7b9_lqU.js";import"./checkbox-D0zkkQHe.js";import"./icon-button-DxSYWoFH.js";import"./icon-FszQmWVN.js";import"./switch-BD5yp80V.js";const r="forge-radio",$={title:"Components/Radio",render:e=>{const o=y(e),a=o?u(o):f;return b`
      <forge-radio
        name="radios"
        value="1"
        .labelPosition=${e.labelPosition}
        .dense=${e.dense}
        .disabled=${e.disabled}
        .defaultChecked=${e.defaultChecked}
        .readonly=${e.readonly}
        style=${a}>
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
        style=${a}>
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
        style=${a}>
        Option 3
      </forge-radio>
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...g({tagName:r,exclude:["value","defaultChecked","checked","required","name","labels","form"],controls:{labelPosition:{control:"select",options:["start","end"]}}})},args:{dense:!1,disabled:!1,readonly:!1,labelPosition:"end"}},s={},i={parameters:{controls:{include:["dense","disabled"]}},args:{dense:!1,disabled:!1},render:({dense:e,disabled:o})=>{const a={"forge-radio":!0,"forge-radio--dense":e};return b`
      <div
        role="radiogroup"
        aria-label="Select an option"
        style="display: grid; grid-template-columns: auto auto; inline-size: fit-content; align-items: center;">
        <div class=${d(a)}>
          <input type="radio" name="css-radio" ?disabled=${o} id="css-radio-1" />
        </div>
        <label class="forge-typography--label1" for="css-radio-1">Option 1</label>
        <div class=${d(a)}>
          <input type="radio" name="css-radio" ?disabled=${o} id="css-radio-2" />
        </div>
        <label class="forge-typography--label1" for="css-radio-2">Option 2</label>
        <div class=${d(a)}>
          <input type="radio" name="css-radio" ?disabled=${o} id="css-radio-3" />
        </div>
        <label class="forge-typography--label1" for="css-radio-3">Option 3</label>
      </div>
    `}};var l,n,t;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(t=(n=s.parameters)==null?void 0:n.docs)==null?void 0:t.source}}};var c,p,m;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
        <label class="forge-typography--label1" for="css-radio-1">Option 1</label>
        <div class=\${classMap(classes)}>
          <input type="radio" name="css-radio" ?disabled=\${disabled} id="css-radio-2" />
        </div>
        <label class="forge-typography--label1" for="css-radio-2">Option 2</label>
        <div class=\${classMap(classes)}>
          <input type="radio" name="css-radio" ?disabled=\${disabled} id="css-radio-3" />
        </div>
        <label class="forge-typography--label1" for="css-radio-3">Option 3</label>
      </div>
    \`;
  }
}`,...(m=(p=i.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const v=["Demo","CSSOnly"],V=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:i,Demo:s,__namedExportsOrder:v,default:$},Symbol.toStringTag,{value:"Module"}));export{i as C,s as D,V as R};
