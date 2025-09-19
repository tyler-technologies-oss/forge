import{E as l,x as p}from"./iframe-CIxyDGlH.js";import{g as m,s as u,O as c,a as d}from"./utils-D7XrLKwY.js";import{o as b}from"./style-map-l48G0zrc.js";import{e as f,n as v}from"./ref-CqjIMQPV.js";import"./feature-detection-BwPJgXni.js";import"./menu-CioYiqb-.js";import"./linear-progress-CfBpjTvZ.js";import"./list-ucSdTmS4.js";import"./popover-CCIxKg31.js";import"./overlay-B72xXWi5.js";import"./index-5CPwzmQS.js";import"./skeleton-1JRnRe4N.js";import"./icon-FzRol6Tl.js";import"./button-Bjtey6FZ.js";import"./focus-indicator-B9KMEBVK.js";import"./state-layer-CLjAHnoF.js";const s="forge-menu",g={title:"Components/Menu",render:e=>{const a=d(e),i=a?b(a):l;let n=[{label:"Save",value:"save"},{label:"Edit",value:"edit"},{label:"Delete",value:"delete"}];return e.mode==="cascade"&&(n[1]={...n[1],options:[{label:"As New",value:"asNew"},{label:"Overwrite",value:"overwrite"},{label:"More",value:"more",options:[{label:"Option 1",value:"option1"},{label:"Option 2",value:"option2"},{label:"Option 3",value:"option3"}]}]}),p`
      <forge-menu
        .open=${e.open}
        .placement=${e.placement}
        .persistSelection=${e.persistSelection}
        .mode=${e.mode}
        .options=${n}
        style=${i}>
        <forge-button type="button" variant="raised">Menu</forge-button>
      </forge-menu>
    `},component:s,parameters:{actions:{disable:!0}},argTypes:{...m({tagName:s,include:["open","placement","persistSelection","mode"],controls:{placement:{control:"select",options:[...c]},persistSelection:{type:"boolean"},mode:{control:"select",options:["click","cascade"]}}})},args:{open:!1,placement:"bottom-start",persistSelection:!1,mode:"click"}},o={},t={args:{mode:"cascade"}},r={...u,render:()=>{const e=f();return window.requestAnimationFrame(()=>{e.value.options=[{text:"Group 1",options:[{label:"Option 1",value:"option1"},{label:"Option 2",value:"option2"}]},{text:"Group 2",options:[{label:"Option 3",value:"option3"},{label:"Option 4",value:"option4"}]}]}),p`
      <forge-menu ${v(e)}>
        <forge-button type="button" variant="raised">Menu</forge-button>
      </forge-menu>
    `}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    mode: 'cascade'
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const menuRef = createRef<IMenuComponent>();
    window.requestAnimationFrame(() => {
      menuRef.value!.options = [{
        text: 'Group 1',
        options: [{
          label: 'Option 1',
          value: 'option1'
        }, {
          label: 'Option 2',
          value: 'option2'
        }]
      }, {
        text: 'Group 2',
        options: [{
          label: 'Option 3',
          value: 'option3'
        }, {
          label: 'Option 4',
          value: 'option4'
        }]
      }] as IMenuOptionGroup[];
    });
    return html\`
      <forge-menu \${ref(menuRef)}>
        <forge-button type="button" variant="raised">Menu</forge-button>
      </forge-menu>
    \`;
  }
}`,...r.parameters?.docs?.source}}};const O=["Demo","Cascading","Grouped"],I=Object.freeze(Object.defineProperty({__proto__:null,Cascading:t,Demo:o,Grouped:r,__namedExportsOrder:O,default:g},Symbol.toStringTag,{value:"Module"}));export{t as C,o as D,r as G,I as M};
