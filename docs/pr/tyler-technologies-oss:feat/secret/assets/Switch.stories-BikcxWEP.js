import"./service-adapter-CffG5Lhq.js";import{I as a}from"./icon-8E01u_jy.js";import"./index-5CPwzmQS.js";import{B as n,C as l}from"./tyler-icons-DSFxyJDy.js";import{x as i}from"./iframe-CSGc-9i1.js";import{e as d}from"./class-map-DYGyln6N.js";import{g as f,c as m}from"./utils-CW5S_tZJ.js";import"./switch-D3v_I57m.js";a.define([n,l]);const r="forge-switch",g={title:"Components/Switch",render:c=>{var o=m(r,c);return o.textContent="off/on",o},component:r,parameters:{actions:{disable:!0}},argTypes:{...f({tagName:r,exclude:["icon","form","labels","name","on","defaultOn","selected"],controls:{labelPosition:{control:"select",options:["start","end"]}}})}},e={},s={parameters:{controls:{include:["on","dense","disabled"]}},args:{checked:!1,dense:!1,disabled:!1},render:({checked:c,dense:o,disabled:t})=>i`
      <label class="forge-typography--label2" style="display: flex; align-items: center;">
        <div class=${d({"forge-switch":!0,"forge-switch--dense":o})}>
          <input type="checkbox" switch .checked=${c} ?disabled=${t} />
          <div class="forge-switch__thumb">
            <forge-icon name="close" class="forge-switch__icon forge-switch__icon--off"></forge-icon>
            <forge-icon name="check" class="forge-switch__icon forge-switch__icon--on"></forge-icon>
          </div>
        </div>
        <span>Toggle me</span>
      </label>
    `};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['on', 'dense', 'disabled']
    }
  },
  args: {
    checked: false,
    dense: false,
    disabled: false
  },
  render: ({
    checked,
    dense,
    disabled
  }) => {
    const classes = {
      'forge-switch': true,
      'forge-switch--dense': dense
    };
    return html\`
      <label class="forge-typography--label2" style="display: flex; align-items: center;">
        <div class=\${classMap(classes)}>
          <input type="checkbox" switch .checked=\${checked} ?disabled=\${disabled} />
          <div class="forge-switch__thumb">
            <forge-icon name="close" class="forge-switch__icon forge-switch__icon--off"></forge-icon>
            <forge-icon name="check" class="forge-switch__icon forge-switch__icon--on"></forge-icon>
          </div>
        </div>
        <span>Toggle me</span>
      </label>
    \`;
  }
}`,...s.parameters?.docs?.source}}};const p=["Demo","CSSOnly"],x=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:s,Demo:e,__namedExportsOrder:p,default:g},Symbol.toStringTag,{value:"Module"}));export{s as C,e as D,x as S};
