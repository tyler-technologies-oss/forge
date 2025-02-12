import"./lit-element-JplMEnZc.js";import{x as v}from"./lit-html-paDGiEfB.js";import{d as l,g as x,s as A}from"./utils-ColNTF5W.js";import"./feature-detection-DRCh51Sa.js";import"./meter-group-Ben1_Ny6.js";import"./key-item-BpPNVyDg.js";const m="forge-meter",s=t=>{t.id="meter";const e=document.createElement("label");e.htmlFor="meter",e.textContent="Label",t.appendChild(e)},E={title:"Components/Meter",render:t=>{const e=document.createElement("forge-meter");return l(e,t),s(e),e},component:m,subcomponents:{"Meter Group":"forge-meter-group"},argTypes:{...x({tagName:m,exclude:["percentage"],controls:{value:{control:{type:"number",step:.1}},min:{control:{type:"number",step:.1}},max:{control:{type:"number",step:.1}},low:{control:{type:"number",step:.1}},high:{control:{type:"number",step:.1}},optimum:{control:{type:"number",step:.1}},valueMode:{control:{type:"inline-radio"},options:["manual","percentage","value"]},direction:{control:{type:"inline-radio"},options:["horizontal","vertical"]},shape:{control:{type:"inline-radio"},options:["default","rounded","squared"]},innerShape:{control:{type:"inline-radio"},options:["default","inherit"]},density:{control:{type:"select"},options:["small","medium","large"]},theme:{control:{type:"select"},options:["default","primary","secondary","tertiary","success","warning","error","info"]}}})},args:{value:.5,min:0,max:1,tickmarks:!1,valueMode:"manual",direction:"horizontal",shape:"default",innerShape:"default",density:"medium",theme:"default",muted:!1}},r={},o={render:t=>{const e=document.createElement("forge-meter");return l(e,t),s(e),e.setAttribute("low","0.33"),e.setAttribute("high","0.67"),e.setAttribute("optimum","1"),e}},n={...A,render:t=>{const e=document.createElement("forge-meter");return l(e,t),s(e),e.setAttribute("tickmarks",""),e.style.setProperty("--forge-meter-tickmarks","9"),e}},a={argTypes:{min:{control:{type:"number",step:.1}},max:{control:{type:"number",step:.1}},tickmarks:{control:{type:"boolean"}},direction:{control:{type:"inline-radio"},options:["horizontal","vertical"]},shape:{control:{type:"inline-radio"},options:["default","rounded","squared"]},innerShape:{control:{type:"inline-radio"},options:["default","inherit"]},density:{control:{type:"select"},options:["small","medium","large"]}},args:{min:0,max:1,tickmarks:!1,direction:"horizontal",shape:"default",innerShape:"default",density:"medium"},render:t=>v`
      <forge-meter-group
        id="meter-group"
        .min=${t.min}
        .max=${t.max}
        .tickmarks=${t.tickmarks}
        .direction=${t.direction}
        .density=${t.density}
        .shape=${t.shape}
        .innerShape=${t.innerShape}>
        <label slot="label" for="meter-group">Label</label>
        <forge-meter id="meter-1" value="0.25" style="--forge-meter-color: #1E88E5;"></forge-meter>
        <forge-meter id="meter-2" value="0.15" style="--forge-meter-color: #FDD835;"></forge-meter>
        <forge-meter id="meter-3" value="0.35" style="--forge-meter-color: #43A047;"></forge-meter>
      </forge-meter-group>
      <forge-key style="margin-block-start: 8px;">
        <forge-key-item style="--forge-key-item-icon-color: #1E88E5;">
          <label for="meter-1">First</label>
          <span slot="value">25%</span>
        </forge-key-item>
        <forge-key-item style="--forge-key-item-icon-color: #FDD835;">
          <label for="meter-2">Second</label>
          <span slot="value">15%</span>
        </forge-key-item>
        <forge-key-item style="--forge-key-item-icon-color: #43A047;">
          <label for="meter-3">Third</label>
          <span slot="value">35%</span>
        </forge-key-item>
      </forge-key>
    `};var i,p,c;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(c=(p=r.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var d,u,g;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: args => {
    const element = document.createElement('forge-meter');
    applyArgs(element, args);
    applyLabel(element);
    element.setAttribute('low', '0.33');
    element.setAttribute('high', '0.67');
    element.setAttribute('optimum', '1');
    return element;
  }
}`,...(g=(u=o.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var y,f,k;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: args => {
    const element = document.createElement('forge-meter');
    applyArgs(element, args);
    applyLabel(element);
    element.setAttribute('tickmarks', '');
    element.style.setProperty('--forge-meter-tickmarks', '9');
    return element;
  }
}`,...(k=(f=n.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var b,h,S;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  argTypes: {
    min: {
      control: {
        type: 'number',
        step: 0.1
      }
    },
    max: {
      control: {
        type: 'number',
        step: 0.1
      }
    },
    tickmarks: {
      control: {
        type: 'boolean'
      }
    },
    direction: {
      control: {
        type: 'inline-radio'
      },
      options: ['horizontal', 'vertical']
    },
    shape: {
      control: {
        type: 'inline-radio'
      },
      options: ['default', 'rounded', 'squared']
    },
    innerShape: {
      control: {
        type: 'inline-radio'
      },
      options: ['default', 'inherit']
    },
    density: {
      control: {
        type: 'select'
      },
      options: ['small', 'medium', 'large']
    }
  },
  args: {
    min: 0,
    max: 1,
    tickmarks: false,
    direction: 'horizontal',
    shape: 'default',
    innerShape: 'default',
    density: 'medium'
  },
  render: args => {
    return html\`
      <forge-meter-group
        id="meter-group"
        .min=\${args.min}
        .max=\${args.max}
        .tickmarks=\${args.tickmarks}
        .direction=\${args.direction}
        .density=\${args.density}
        .shape=\${args.shape}
        .innerShape=\${args.innerShape}>
        <label slot="label" for="meter-group">Label</label>
        <forge-meter id="meter-1" value="0.25" style="--forge-meter-color: #1E88E5;"></forge-meter>
        <forge-meter id="meter-2" value="0.15" style="--forge-meter-color: #FDD835;"></forge-meter>
        <forge-meter id="meter-3" value="0.35" style="--forge-meter-color: #43A047;"></forge-meter>
      </forge-meter-group>
      <forge-key style="margin-block-start: 8px;">
        <forge-key-item style="--forge-key-item-icon-color: #1E88E5;">
          <label for="meter-1">First</label>
          <span slot="value">25%</span>
        </forge-key-item>
        <forge-key-item style="--forge-key-item-icon-color: #FDD835;">
          <label for="meter-2">Second</label>
          <span slot="value">15%</span>
        </forge-key-item>
        <forge-key-item style="--forge-key-item-icon-color: #43A047;">
          <label for="meter-3">Third</label>
          <span slot="value">35%</span>
        </forge-key-item>
      </forge-key>
    \`;
  }
}`,...(S=(h=a.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};const $=["Demo","Segmented","Tickmarks","Grouped"],_=Object.freeze(Object.defineProperty({__proto__:null,Demo:r,Grouped:a,Segmented:o,Tickmarks:n,__namedExportsOrder:$,default:E},Symbol.toStringTag,{value:"Module"}));export{r as D,a as G,_ as M,o as S,n as T};
