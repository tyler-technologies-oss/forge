import"./lit-element-BuSzPo2N.js";import{E as f,x as b}from"./lit-html-Ox1a2bD1.js";import{e as d}from"./class-map-D3FxRsP9.js";import{o as u}from"./style-map-CeIg-cuG.js";import{g as y,b as g}from"./utils-C9ubTmun.js";import"./feature-detection-CY6TVbRZ.js";import"./label-BM0pESju.js";import"./index-CiLSBptl.js";import"./button-CC-L5W3b.js";import"./focus-indicator-Cgfkaa3d.js";import"./state-layer-BVsNuAhs.js";import"./button-toggle-group-5BDyeLck.js";import"./checkbox-CF9fzMIR.js";import"./icon-button-BkG6pY8m.js";import"./icon-Bqgt-0wI.js";import"./switch-ZI6WyDhE.js";const r="forge-radio",$={title:"Components/Radio",render:e=>{const o=g(e),a=o?u(o):f;return b`
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
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...y({tagName:r,exclude:["value","defaultChecked","checked","required","name","labels","form"],controls:{labelPosition:{control:"select",options:["start","end"]}}})},args:{dense:!1,disabled:!1,readonly:!1,labelPosition:"end"}},s={},i={parameters:{controls:{include:["dense","disabled"]}},args:{dense:!1,disabled:!1},render:({dense:e,disabled:o})=>{const a={"forge-radio":!0,"forge-radio--dense":e};return b`
      <div
        role="radiogroup"
        aria-label="Select an option"
        style="display: grid; grid-template-columns: auto auto; inline-size: fit-content; align-items: center;">
        <div class=${d(a)}>
          <input type="radio" name="css-radio" ?disabled=${o} id="css-radio-1" />
        </div>
        <label class="forge-typography--label2" for="css-radio-1">Option 1</label>
        <div class=${d(a)}>
          <input type="radio" name="css-radio" ?disabled=${o} id="css-radio-2" />
        </div>
        <label class="forge-typography--label2" for="css-radio-2">Option 2</label>
        <div class=${d(a)}>
          <input type="radio" name="css-radio" ?disabled=${o} id="css-radio-3" />
        </div>
        <label class="forge-typography--label2" for="css-radio-3">Option 3</label>
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
}`,...(m=(p=i.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const v=["Demo","CSSOnly"],V=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:i,Demo:s,__namedExportsOrder:v,default:$},Symbol.toStringTag,{value:"Module"}));export{i as C,s as D,V as R};
