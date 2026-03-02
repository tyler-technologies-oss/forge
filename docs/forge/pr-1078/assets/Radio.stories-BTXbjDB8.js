import{b as l,A as n}from"./iframe-CqmBxxxw.js";import{e as d}from"./class-map-CzloGBZg.js";import{o as t}from"./style-map-B8hZhTlf.js";import{g as c,b as p}from"./utils-BQsOXphk.js";import"./service-adapter-CoGDs2_3.js";import"./label-AubqXluV.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./button-DX_DhTaU.js";import"./focus-indicator-BGIlkLsU.js";import"./state-layer-CDycYdPe.js";import"./button-toggle-group-D_Dzo2at.js";import"./checkbox-Bv0J0WTO.js";import"./icon-button-CRjf1LQA.js";import"./tyler-icons-D-59dOyn.js";import"./switch-DLphmdNU.js";const r="forge-radio",m={title:"Components/Radio",render:e=>{const o=p(e),a=o?t(o):n;return l`
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
    `},component:r,parameters:{actions:{disable:!0}},argTypes:{...c({tagName:r,exclude:["value","defaultChecked","checked","required","name","labels","form"],controls:{labelPosition:{control:"select",options:["start","end"]}}})},args:{dense:!1,disabled:!1,readonly:!1,labelPosition:"end"}},s={},i={parameters:{controls:{include:["dense","disabled"]}},args:{dense:!1,disabled:!1},render:({dense:e,disabled:o})=>{const a={"forge-radio":!0,"forge-radio--dense":e};return l`
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
    `}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};const b=["Demo","CSSOnly"],z=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:i,Demo:s,__namedExportsOrder:b,default:m},Symbol.toStringTag,{value:"Module"}));export{i as C,s as D,z as R};
