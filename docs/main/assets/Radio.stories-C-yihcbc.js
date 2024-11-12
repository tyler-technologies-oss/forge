import"./lit-element-Dk2-kgKT.js";import{k as b,D as f}from"./lit-html-DZH-Jm0H.js";import{R as d}from"./class-map-D93gIiBE.js";import{s as u}from"./style-map-DxfbqtuX.js";import{b as y,g}from"./utils-CCkBKb7B.js";import"./constants-DjE6emXm.js";import"./label-C3K2Uabu.js";import"./index-Dh0vMUMR.js";import"./button-CbYZUGFb.js";import"./focus-indicator-_fDu4ZqT.js";import"./state-layer-DTKAXCUq.js";import"./button-toggle-group-BJ7gYCrU.js";import"./checkbox-DohAEIBZ.js";import"./icon-button-Bwf4zXUE.js";import"./icon-DHpZ4R73.js";import"./switch-BL3gYf9s.js";const r="forge-radio",$={title:"Components/Radio",render:e=>{const s=y(e),a=s?u(s):f;return b`
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
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...g({tagName:r,exclude:["value","defaultChecked","checked","required","name","labels","form"],controls:{labelPosition:{control:"select",options:["start","end"]}}})},args:{dense:!1,disabled:!1,readonly:!1,labelPosition:"end"}},o={},i={parameters:{controls:{include:["dense","disabled"]}},args:{dense:!1,disabled:!1},render:({dense:e,disabled:s})=>{const a={"forge-radio":!0,"forge-radio--dense":e};return b`
      <div
        role="radiogroup"
        aria-label="Select an option"
        style="display: grid; grid-template-columns: auto auto; inline-size: fit-content; align-items: center;">
        <div class=${d(a)}>
          <input type="radio" name="css-radio" ?disabled=${s} id="css-radio-1" />
        </div>
        <label class="forge-typography--label1" for="css-radio-1">Option 1</label>
        <div class=${d(a)}>
          <input type="radio" name="css-radio" ?disabled=${s} id="css-radio-2" />
        </div>
        <label class="forge-typography--label1" for="css-radio-2">Option 2</label>
        <div class=${d(a)}>
          <input type="radio" name="css-radio" ?disabled=${s} id="css-radio-3" />
        </div>
        <label class="forge-typography--label1" for="css-radio-3">Option 3</label>
      </div>
    `}};var l,n,t;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(t=(n=o.parameters)==null?void 0:n.docs)==null?void 0:t.source}}};var c,p,m;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(m=(p=i.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const v=["Demo","CSSOnly"],V=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:i,Demo:o,__namedExportsOrder:v,default:$},Symbol.toStringTag,{value:"Module"}));export{i as C,o as D,V as R};
