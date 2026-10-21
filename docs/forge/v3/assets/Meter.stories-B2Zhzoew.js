import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-CebKObJP.js";import{_ as i,a,m as o,s}from"./utils-C3ow8Ikc.js";import{t as c}from"./key-B40H6gt4.js";import{t as l}from"./meter-DA-JOrfl.js";var u=t({Demo:()=>m,Grouped:()=>_,Segmented:()=>h,Tickmarks:()=>g,__namedExportsOrder:()=>v,default:()=>p}),d,f,p,m,h,g,_,v;function y(){return(y=e((()=>{r(),o(),l(),c(),d=`forge-meter`,f=e=>{e.id=`meter`;let t=document.createElement(`label`);t.htmlFor=`meter`,t.textContent=`Label`,e.appendChild(t)},p={title:`Components/Meter`,render:e=>{let t=document.createElement(`forge-meter`);return a(t,e),f(t),t},component:d,subcomponents:{"Meter Group":`forge-meter-group`},argTypes:{...s({tagName:d,exclude:[`percentage`],controls:{value:{control:{type:`number`,step:.1}},min:{control:{type:`number`,step:.1}},max:{control:{type:`number`,step:.1}},low:{control:{type:`number`,step:.1}},high:{control:{type:`number`,step:.1}},optimum:{control:{type:`number`,step:.1}},valueMode:{control:{type:`inline-radio`},options:[`manual`,`percentage`,`value`]},direction:{control:{type:`inline-radio`},options:[`horizontal`,`vertical`]},shape:{control:{type:`inline-radio`},options:[`default`,`rounded`,`squared`]},innerShape:{control:{type:`inline-radio`},options:[`default`,`inherit`]},density:{control:{type:`select`},options:[`small`,`medium`,`large`]},theme:{control:{type:`select`},options:[`default`,`primary`,`secondary`,`tertiary`,`success`,`warning`,`error`,`info`]}}})},args:{value:.5,min:0,max:1,tickmarks:!1,valueMode:`manual`,direction:`horizontal`,shape:`default`,innerShape:`default`,density:`medium`,theme:`default`,muted:!1}},m={},h={render:e=>{let t=document.createElement(`forge-meter`);return a(t,e),f(t),t.setAttribute(`low`,`0.33`),t.setAttribute(`high`,`0.67`),t.setAttribute(`optimum`,`1`),t}},g={...i,render:e=>{let t=document.createElement(`forge-meter`);return a(t,e),f(t),t.setAttribute(`tickmarks`,``),t.style.setProperty(`--forge-meter-tickmarks`,`9`),t}},_={argTypes:{min:{control:{type:`number`,step:.1}},max:{control:{type:`number`,step:.1}},tickmarks:{control:{type:`boolean`}},direction:{control:{type:`inline-radio`},options:[`horizontal`,`vertical`]},shape:{control:{type:`inline-radio`},options:[`default`,`rounded`,`squared`]},innerShape:{control:{type:`inline-radio`},options:[`default`,`inherit`]},density:{control:{type:`select`},options:[`small`,`medium`,`large`]}},args:{min:0,max:1,tickmarks:!1,direction:`horizontal`,shape:`default`,innerShape:`default`,density:`medium`},render:e=>n`
    <forge-meter-group
      id="meter-group"
      .min=${e.min}
      .max=${e.max}
      .tickmarks=${e.tickmarks}
      .direction=${e.direction}
      .density=${e.density}
      .shape=${e.shape}
      .innerShape=${e.innerShape}>
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
  `},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => {
    const element = document.createElement('forge-meter');
    applyArgs(element, args);
    applyLabel(element);
    element.setAttribute('low', '0.33');
    element.setAttribute('high', '0.67');
    element.setAttribute('optimum', '1');
    return element;
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: args => {
    const element = document.createElement('forge-meter');
    applyArgs(element, args);
    applyLabel(element);
    element.setAttribute('tickmarks', '');
    element.style.setProperty('--forge-meter-tickmarks', '9');
    return element;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
  render: args => html\`
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
  \`
}`,..._.parameters?.docs?.source}}},v=[`Demo`,`Segmented`,`Tickmarks`,`Grouped`]})))()}export{g as a,h as i,_ as n,y as o,u as r,m as t};