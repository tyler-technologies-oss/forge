import"./feature-detection-uS6p5jc8.js";import{I as m,B as g,C as p}from"./icon-B8CdcxqJ.js";import"./index-CiLSBptl.js";import{x as h}from"./iframe-DhM-QRJr.js";import{e as u}from"./class-map-CADbIxYD.js";import{g as _,c as b}from"./utils-DgY0_5Rf.js";import"./switch-Bt2bdQXJ.js";m.define([g,p]);const r="forge-switch",y={title:"Components/Switch",render:c=>{var o=b(r,c);return o.textContent="off/on",o},component:r,parameters:{actions:{disable:!0}},argTypes:{..._({tagName:r,exclude:["icon","form","labels","name","on","defaultOn","selected"],controls:{labelPosition:{control:"select",options:["start","end"]}}})}},e={},s={parameters:{controls:{include:["on","dense","disabled"]}},args:{checked:!1,dense:!1,disabled:!1},render:({checked:c,dense:o,disabled:f})=>h`
      <label class="forge-typography--label2" style="display: flex; align-items: center;">
        <div class=${u({"forge-switch":!0,"forge-switch--dense":o})}>
          <input type="checkbox" switch .checked=${c} ?disabled=${f} />
          <div class="forge-switch__thumb">
            <forge-icon name="close" class="forge-switch__icon forge-switch__icon--off"></forge-icon>
            <forge-icon name="check" class="forge-switch__icon forge-switch__icon--on"></forge-icon>
          </div>
        </div>
        <span>Toggle me</span>
      </label>
    `};var t,a,n;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:"{}",...(n=(a=e.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};var l,i,d;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(d=(i=s.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};const w=["Demo","CSSOnly"],I=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:s,Demo:e,__namedExportsOrder:w,default:y},Symbol.toStringTag,{value:"Module"}));export{s as C,e as D,I as S};
