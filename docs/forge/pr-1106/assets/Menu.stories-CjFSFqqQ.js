import{b as i,A as l}from"./iframe-Nz47_fHD.js";import{s as u,g as m,b as c,O as d}from"./utils-Ba9gsS7G.js";import{o as b}from"./style-map-YtahPS12.js";import{n as f,e as v}from"./ref-0GhgmJo2.js";import"./service-adapter-8tADcN_b.js";import"./menu-Cg3oAYpS.js";import"./linear-progress-BUFrhekn.js";import"./list-Cu8bwlYk.js";import"./popover-Dei7Vx-1.js";import"./overlay-C91thjfI.js";import"./index-DTwfV0k0.js";import"./skeleton-D7ds2eUz.js";import"./tyler-icons-D4_mmXXb.js";import"./button-DCmcEZ2V.js";import"./focus-indicator-B9pIc8ye.js";import"./state-layer-D2ldILW1.js";const s="forge-menu",g={title:"Components/Menu",render:e=>{const a=c(e),p=a?b(a):l,n=[{label:"Save",value:"save"},{label:"Edit",value:"edit"},{label:"Delete",value:"delete"}];return e.mode==="cascade"&&(n[1]={...n[1],options:[{label:"As New",value:"asNew"},{label:"Overwrite",value:"overwrite"},{label:"More",value:"more",options:[{label:"Option 1",value:"option1"},{label:"Option 2",value:"option2"},{label:"Option 3",value:"option3"}]}]}),i`
      <forge-menu
        .open=${e.open}
        .placement=${e.placement}
        .persistSelection=${e.persistSelection}
        .mode=${e.mode}
        .options=${n}
        style=${p}>
        <forge-button type="button" variant="raised">Menu</forge-button>
      </forge-menu>
    `},component:s,parameters:{actions:{disable:!0}},argTypes:{...m({tagName:s,include:["open","placement","persistSelection","mode"],controls:{placement:{control:"select",options:[...d]},persistSelection:{type:"boolean"},mode:{control:"select",options:["click","cascade"]}}})},args:{open:!1,placement:"bottom-start",persistSelection:!1,mode:"click"}},o={},t={args:{mode:"cascade"}},r={...u,render:()=>{const e=v();return window.requestAnimationFrame(()=>{e.value&&(e.value.options=[{text:"Group 1",options:[{label:"Option 1",value:"option1"},{label:"Option 2",value:"option2"}]},{text:"Group 2",options:[{label:"Option 3",value:"option3"},{label:"Option 4",value:"option4"}]}])}),i`
      <forge-menu ${f(e)}>
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
      if (!menuRef.value) {
        return;
      }
      menuRef.value.options = [{
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
