import{E as f,x as b}from"./iframe-DP5aPN1v.js";import{e as i}from"./class-map-JBZfYMFy.js";import{o as u}from"./style-map-BQQHjjdW.js";import{g as y,a as g}from"./utils-BMhZCC5f.js";import"./feature-detection-uS6p5jc8.js";import"./label-v2fBLVwj.js";import"./index-CiLSBptl.js";import"./button-DEhPRUdY.js";import"./focus-indicator-BeibAi2h.js";import"./state-layer-C7sW6v-0.js";import"./button-toggle-group-DWRuBNed.js";import"./checkbox-B1PtNwCH.js";import"./icon-button-C-UNXlAt.js";import"./icon-B8CdcxqJ.js";import"./switch-c2I0wwHc.js";const l="forge-radio",$={title:"Components/Radio",render:e=>{const s=g(e),a=s?u(s):f;return b`
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
    `},component:l,parameters:{actions:{disable:!0}},argTypes:{...y({tagName:l,exclude:["value","defaultChecked","checked","required","name","labels","form"],controls:{labelPosition:{control:"select",options:["start","end"]}}})},args:{dense:!1,disabled:!1,readonly:!1,labelPosition:"end"}},o={},d={parameters:{controls:{include:["dense","disabled"]}},args:{dense:!1,disabled:!1},render:({dense:e,disabled:s})=>{const a={"forge-radio":!0,"forge-radio--dense":e};return b`
      <div
        role="radiogroup"
        aria-label="Select an option"
        style="display: grid; grid-template-columns: auto auto; inline-size: fit-content; align-items: center;">
        <div class=${i(a)}>
          <input type="radio" name="css-radio" ?disabled=${s} id="css-radio-1" />
        </div>
        <label class="forge-typography--label2" for="css-radio-1">Option 1</label>
        <div class=${i(a)}>
          <input type="radio" name="css-radio" ?disabled=${s} id="css-radio-2" />
        </div>
        <label class="forge-typography--label2" for="css-radio-2">Option 2</label>
        <div class=${i(a)}>
          <input type="radio" name="css-radio" ?disabled=${s} id="css-radio-3" />
        </div>
        <label class="forge-typography--label2" for="css-radio-3">Option 3</label>
      </div>
    `}};var r,n,t;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:"{}",...(t=(n=o.parameters)==null?void 0:n.docs)==null?void 0:t.source}}};var c,p,m;d.parameters={...d.parameters,docs:{...(c=d.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(m=(p=d.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const v=["Demo","CSSOnly"],j=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:d,Demo:o,__namedExportsOrder:v,default:$},Symbol.toStringTag,{value:"Module"}));export{d as C,o as D,j as R};
