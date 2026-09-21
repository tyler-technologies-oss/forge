import{b as i,A as l}from"./iframe-DQLkTsj5.js";import{s as u,g as m,b as c,O as d}from"./utils-RooUwGan.js";import{o as b}from"./style-map-DmjQRv9U.js";import{n as f,e as v}from"./ref-DGfk93r-.js";import"./service-adapter-DlT-lJx7.js";import"./menu-Cx7fFLhB.js";import"./linear-progress-VpC6qUWa.js";import"./list-nmWb3pVb.js";import"./popover-TR9PPKD2.js";import"./overlay-DGZ2XdhX.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CwILcSG1.js";import"./tyler-icons-DPuUJ4cJ.js";import"./list-item-DEpPizi1.js";import"./button-DT_Na7FY.js";const s="forge-menu",g={title:"Components/Menu",render:e=>{const a=c(e),p=a?b(a):l,n=[{label:"Save",value:"save"},{label:"Edit",value:"edit"},{label:"Delete",value:"delete"}];return e.mode==="cascade"&&(n[1]={...n[1],options:[{label:"As New",value:"asNew"},{label:"Overwrite",value:"overwrite"},{label:"More",value:"more",options:[{label:"Option 1",value:"option1"},{label:"Option 2",value:"option2"},{label:"Option 3",value:"option3"}]}]}),i`
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
