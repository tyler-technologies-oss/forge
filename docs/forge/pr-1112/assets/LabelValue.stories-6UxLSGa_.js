import{A as p,b as r}from"./iframe-FS6UuRTf.js";import{s as c,b as g,g as b}from"./utils-Dyztg_A4.js";import{o as u}from"./style-map-EJs35e7b.js";import{e as y}from"./class-map-RGHtdqCY.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CftkzL4T.js";import"./app-bar-profile-button-2OwMH6ju.js";import{I as h,e as S}from"./tyler-icons-iDvhFOMC.js";import"./index-DTwfV0k0.js";import"./menu-DYdAcAxp.js";import"./linear-progress-DJCUZyG6.js";import"./list-B6gOTQYv.js";import"./popover-BblH4OjR.js";import"./overlay-Btn1tEyh.js";import"./skeleton-Ctt20BWR.js";import"./avatar-BejPiSXX.js";import"./icon-button-rbnRrweT.js";import"./focus-indicator-DXnp9Plt.js";import"./state-layer-D0PE-_Ks.js";import"./autocomplete-BuJWc3us.js";import"./label-DM98B8Eo.js";import"./button-CbbznlWX.js";import"./button-toggle-group-DtdFckgK.js";import"./checkbox-DJio2xZg.js";import"./switch-C1g5po_j.js";import"./base-field-BJ66MH2R.js";import"./text-field-CENGspUw.js";import"./backdrop-D_yGNC2E.js";import"./badge-kxLtByW9.js";import"./banner-BE6ES9vg.js";import"./bottom-sheet-Ca7i8NLD.js";import"./dialog-Be0VDz-Q.js";import"./button-area-DPg4nXbX.js";import"./calendar-Cq28eMir.js";import"./card-D6VfsD4a.js";import"./chip-set-juYio6FQ.js";import"./circular-progress-CqL7HYv9.js";import"./color-picker-CXuNMOIw.js";import"./date-picker-Dva7a-pX.js";import"./date-range-picker-ZGTBHQtb.js";import"./divider-MVk0ogln.js";import"./base-drawer-BnnNJiqc.js";import"./drawer-Bhr3bs1s.js";import"./modal-drawer-mTx20ZEu.js";import"./mini-drawer-bZpKaAxY.js";import"./expansion-panel-BE8OXyYA.js";import"./open-icon-Cbokgsj5.js";import"./file-picker-fCPyqEsp.js";import"./floating-action-button-BLxc6DuQ.js";import"./inline-message-CrfY1HGc.js";import"./key-item-Dc6X4zSl.js";import"./keyboard-shortcut-CN2LvrRI.js";import"./label-value-BFzJp2nK.js";import"./meter-group-CGTOiE9m.js";import"./page-state-FbD8mDEF.js";import"./paginator-DaZBFqH8.js";import"./scaffold-1Jx5bjjO.js";import"./select-dropdown-Df2NdtKc.js";import"./select-C0tB3Q7o.js";import"./skip-link-CKvK9MD3.js";import"./slider-BMFGnLd0.js";import"./split-view-CGAyKdD1.js";import"./stack-DxVg50Xs.js";import"./stepper-BwS_no-I.js";import"./table-CfR0AIWA.js";import"./tab-bar-BibCdG7A.js";import"./time-picker-CpTvL8Ws.js";import"./toast-NQGS2XQT.js";import"./toolbar-Bf50hayz.js";import"./tooltip-CNBOgnFN.js";import"./tree-item-zW2wCMkM.js";import"./view-switcher-CcYqDgDr.js";import"./deprecated-icon-button-CQKVJAMY.js";import"./split-button-BWO2Hbsw.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${o}>
        <label slot="label">Label</label>
        ${e.empty?r`<span slot="value">n/a</span>`:r`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:m,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},s={},t={...c,render:()=>(h.define([S]),r`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <label slot="label">Name</label>
        <span slot="value">John Doe</span>
      </forge-label-value>
    `)},l={...c,args:{inline:!0}},a={args:{withIcon:!1},render:({inline:e,empty:i,ellipsis:o,withIcon:d,...f})=>{const n=g(f)??{};o&&(n.maxWidth="150px");const v=n?u(n):p;return r`
      <div class=${y({"forge-label-value":!0,"forge-label-value--inline":e,"forge-label-value--empty":i,"forge-label-value--ellipsis":o})} style=${v}>
        ${d?r`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`:p}
        <span class="forge-label-value__label">Status</span>
        <span class="forge-label-value__value"> ${i?"n/a":o?"Lorem ipsum dolor sit, amet consectetur adipisicing elit.":"Active"} </span>
      </div>
    `}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:"{}",...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define([tylIconPerson]);
    return html\`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <label slot="label">Name</label>
        <span slot="value">John Doe</span>
      </forge-label-value>
    \`;
  }
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    inline: true
  }
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    withIcon: false
  },
  render: ({
    inline,
    empty,
    ellipsis,
    withIcon,
    ...args
  }) => {
    const cssVarArgs = getCssVariableArgs(args) ?? {};
    if (ellipsis) {
      cssVarArgs.maxWidth = '150px';
    }
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    const classes = {
      'forge-label-value': true,
      'forge-label-value--inline': inline,
      'forge-label-value--empty': empty,
      'forge-label-value--ellipsis': ellipsis
    };
    return html\`
      <div class=\${classMap(classes)} style=\${style}>
        \${withIcon ? html\`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>\` : nothing}
        <span class="forge-label-value__label">Status</span>
        <span class="forge-label-value__value"> \${empty ? 'n/a' : ellipsis ? 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.' : 'Active'} </span>
      </div>
    \`;
  }
}`,...a.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],We=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:s,Icon:t,Inline:l,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{a as C,s as D,t as I,We as L,l as a};
