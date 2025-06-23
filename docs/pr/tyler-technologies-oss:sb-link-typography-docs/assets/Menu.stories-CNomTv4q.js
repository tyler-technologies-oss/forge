import{E as O,x as v}from"./iframe-CmPrhNEs.js";import{g as S,s as y,O as M,a as w}from"./utils-gw6R9s7u.js";import{o as A}from"./style-map-CJX1Xp8j.js";import{e as C,n as G}from"./ref-lEc37PHb.js";import"./feature-detection-CY6TVbRZ.js";import"./menu-C8rNUMJM.js";import"./linear-progress-CJb_8skk.js";import"./list-DCzhHkfW.js";import"./popover-BUd5kSDj.js";import"./overlay-CmLQVoKV.js";import"./index-CiLSBptl.js";import"./skeleton-DocRecw2.js";import"./icon-ANstxuR5.js";import"./button-DKtxCkrw.js";import"./focus-indicator-Cgfkaa3d.js";import"./state-layer-BVsNuAhs.js";const s="forge-menu",_={title:"Components/Menu",render:e=>{const a=w(e),g=a?A(a):O;let n=[{label:"Save",value:"save"},{label:"Edit",value:"edit"},{label:"Delete",value:"delete"}];return e.mode==="cascade"&&(n[1]={...n[1],options:[{label:"As New",value:"asNew"},{label:"Overwrite",value:"overwrite"},{label:"More",value:"more",options:[{label:"Option 1",value:"option1"},{label:"Option 2",value:"option2"},{label:"Option 3",value:"option3"}]}]}),v`
      <forge-menu
        .open=${e.open}
        .placement=${e.placement}
        .persistSelection=${e.persistSelection}
        .mode=${e.mode}
        .options=${n}
        style=${g}>
        <forge-button type="button" variant="raised">Menu</forge-button>
      </forge-menu>
    `},component:s,parameters:{actions:{disable:!0}},argTypes:{...S({tagName:s,include:["open","placement","persistSelection","mode"],controls:{placement:{control:"select",options:[...M]},persistSelection:{type:"boolean"},mode:{control:"select",options:["click","cascade"]}}})},args:{open:!1,placement:"bottom-start",persistSelection:!1,mode:"click"}},o={},t={args:{mode:"cascade"}},r={...y,render:()=>{const e=C();return window.requestAnimationFrame(()=>{e.value.options=[{text:"Group 1",options:[{label:"Option 1",value:"option1"},{label:"Option 2",value:"option2"}]},{text:"Group 2",options:[{label:"Option 3",value:"option3"},{label:"Option 4",value:"option4"}]}]}),v`
      <forge-menu ${G(e)}>
        <forge-button type="button" variant="raised">Menu</forge-button>
      </forge-menu>
    `}};var p,i,l;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(l=(i=o.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var m,u,c;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    mode: 'cascade'
  }
}`,...(c=(u=t.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};var d,b,f;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(f=(b=r.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};const $=["Demo","Cascading","Grouped"],Y=Object.freeze(Object.defineProperty({__proto__:null,Cascading:t,Demo:o,Grouped:r,__namedExportsOrder:$,default:_},Symbol.toStringTag,{value:"Module"}));export{t as C,o as D,r as G,Y as M};
