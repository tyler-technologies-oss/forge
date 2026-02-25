import{b as r,A as n}from"./iframe-CvOKOd3F.js";import{e as i}from"./class-map-DXUaajGX.js";import{o as t}from"./style-map-D9Aeadbf.js";import{g as c,b as p}from"./utils-zCyTXnrZ.js";import"./service-adapter-CoGDs2_3.js";import"./label-DjhrjYcA.js";import"./index-DTwfV0k0.js";import"./button-Bi90NRzP.js";import"./focus-indicator-D4rjhUva.js";import"./state-layer-D7Damx7l.js";import"./button-toggle-group-BVIytbZM.js";import"./checkbox-DW8QQYdx.js";import"./icon-button-dDjQtfj0.js";import"./tyler-icons-DRTyRvfU.js";import"./switch-DReLaeSi.js";const l="forge-radio",m={title:"Components/Radio",render:e=>{const s=p(e),a=s?t(s):n;return r`
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
    `},component:l,parameters:{actions:{disable:!0}},argTypes:{...c({tagName:l,exclude:["value","defaultChecked","checked","required","name","labels","form"],controls:{labelPosition:{control:"select",options:["start","end"]}}})},args:{dense:!1,disabled:!1,readonly:!1,labelPosition:"end"}},o={},d={parameters:{controls:{include:["dense","disabled"]}},args:{dense:!1,disabled:!1},render:({dense:e,disabled:s})=>{const a={"forge-radio":!0,"forge-radio--dense":e};return r`
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
    `}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};const b=["Demo","CSSOnly"],x=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:d,Demo:o,__namedExportsOrder:b,default:m},Symbol.toStringTag,{value:"Module"}));export{d as C,o as D,x as R};
