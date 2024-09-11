import"./constants-DjE6emXm.js";import{I as f}from"./icon-DHpZ4R73.js";import"./index-Dh0vMUMR.js";import{w as g,x as p}from"./index-ByifSpfC.js";import"./lit-element-Dk2-kgKT.js";import{k as h}from"./lit-html-DZH-Jm0H.js";import{R as _}from"./class-map-D93gIiBE.js";import{c as u,g as b}from"./utils-D1kchwVb.js";import"./switch-BteFxJWF.js";f.define([g,p]);const t="forge-switch",w={title:"Components/Switch",render:r=>{var o=u(t,r);return o.textContent="off/on",o},component:t,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:t,exclude:["icon","form","labels","name"],controls:{labelPosition:{control:"select",options:["start","end"]}}})}},e={},s={parameters:{controls:{include:["on","dense","disabled"]}},args:{on:!1,dense:!1,disabled:!1},render:({on:r,dense:o,disabled:m})=>h`
      <label class="forge-typography--label1" style="display: flex; align-items: center;">
        <div class=${_({"forge-switch":!0,"forge-switch--dense":o})}>
          <input type="checkbox" switch .checked=${r} ?disabled=${m} />
          <div class="forge-switch__thumb">
            <forge-icon name="close" class="forge-switch__icon forge-switch__icon--off"></forge-icon>
            <forge-icon name="check" class="forge-switch__icon forge-switch__icon--on"></forge-icon>
          </div>
        </div>
        <span>Toggle me</span>
      </label>
    `};var c,a,n;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(n=(a=e.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};var i,l,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['on', 'dense', 'disabled']
    }
  },
  args: {
    on: false,
    dense: false,
    disabled: false
  },
  render: ({
    on,
    dense,
    disabled
  }) => {
    const classes = {
      'forge-switch': true,
      'forge-switch--dense': dense
    };
    return html\`
      <label class="forge-typography--label1" style="display: flex; align-items: center;">
        <div class=\${classMap(classes)}>
          <input type="checkbox" switch .checked=\${on} ?disabled=\${disabled} />
          <div class="forge-switch__thumb">
            <forge-icon name="close" class="forge-switch__icon forge-switch__icon--off"></forge-icon>
            <forge-icon name="check" class="forge-switch__icon forge-switch__icon--on"></forge-icon>
          </div>
        </div>
        <span>Toggle me</span>
      </label>
    \`;
  }
}`,...(d=(l=s.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const y=["Demo","CSSOnly"],D=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:s,Demo:e,__namedExportsOrder:y,default:w},Symbol.toStringTag,{value:"Module"}));export{s as C,e as D,D as S};
