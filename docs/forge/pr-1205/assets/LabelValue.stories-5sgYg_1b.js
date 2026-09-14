import{A as n,b as r}from"./iframe-DucEJqMh.js";import{s as c,b as g,g as b}from"./utils-DgK06r1C.js";import{o as u}from"./style-map-DQNfgzcs.js";import{e as y}from"./class-map-ZUHeUCXU.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BgvaXQJe.js";import"./app-bar-profile-button-fX9ZjDv7.js";import{I as h,e as S}from"./tyler-icons-gd947w-D.js";import"./menu-DvJrPMIi.js";import"./linear-progress-LQTwNhb5.js";import"./list-BpgKZh9Q.js";import"./popover-CSRiiy_0.js";import"./overlay-B2h4Qxq4.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BqxN4Nno.js";import"./avatar-_tf5MHLL.js";import"./icon-button-7uqnM-R4.js";import"./focus-indicator-DXw8Y8hB.js";import"./state-layer-e2HqliqN.js";import"./autocomplete-9DbKVblF.js";import"./label-D3aO7fYn.js";import"./base-field-Yl7ZFpTq.js";import"./text-field-DwmImSRz.js";import"./backdrop-Cg1c1EAF.js";import"./badge-HX1u50aU.js";import"./banner-BIjw6t0q.js";import"./bottom-sheet-DYTrAbYD.js";import"./dialog-CQnnUwcC.js";import"./button-area-C2gDjNuN.js";import"./button-toggle-group-BbkQqF0J.js";import"./button-DjdHdyPs.js";import"./calendar-DKu8VavH.js";import"./card-BVDhRdRu.js";import"./checkbox-DkSrSeYg.js";import"./chip-set-DRKSe1eZ.js";import"./circular-progress-BGFLsmCQ.js";import"./color-picker-B-J8lPc3.js";import"./date-picker-Ba1AFiAq.js";import"./date-range-picker-DDNz9zlb.js";import"./divider-C6x2Y4zt.js";import"./base-drawer-H_Vclf0e.js";import"./drawer-BjRWfJ_i.js";import"./modal-drawer-BJnmvKZk.js";import"./mini-drawer-DKtSVWkH.js";import"./expansion-panel-BMfbZA6r.js";import"./open-icon-DsPX-oJi.js";import"./file-picker-BQZQBeED.js";import"./floating-action-button-Dq7kJ0r0.js";import"./inline-message-Dc9UAs2N.js";import"./key-item-B1zh2ddO.js";import"./keyboard-shortcut-DuA7lCZT.js";import"./label-value-Cmh0Mn7o.js";import"./option-group-DGjhf330.js";import"./meter-group-ChgfAcaY.js";import"./page-state-YGQrPlJV.js";import"./paginator-BzKCwhei.js";import"./radio-group-CfZe5CKe.js";import"./scaffold-cfEljWVV.js";import"./secret-GHv8cWFw.js";import"./select-dropdown-CnynlgeI.js";import"./select-XcCRrPqv.js";import"./skip-link-RZpiaGRp.js";import"./slider-d_t460Iv.js";import"./split-view-K6JudG8W.js";import"./stack-BJH56hig.js";import"./stepper-s7ej1uiZ.js";import"./switch-C6YllzU8.js";import"./table-ysaB0cvj.js";import"./tab-panel-DkDzUyY8.js";import"./time-picker-BegJpIav.js";import"./timestamp-BsHJehpf.js";import"./toast-B-qyNrwk.js";import"./toolbar-Jn4M9HQj.js";import"./tooltip-CFImliAj.js";import"./tree-item-1HwgtKxt.js";import"./view-switcher-CN47hvM5.js";import"./deprecated-icon-button-DD867ZNa.js";import"./split-button-DY1E7kfz.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${o}>
        <span slot="label">Label</span>
        ${e.empty?r`<span slot="value">n/a</span>`:r`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:m,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},s={},t={...c,render:()=>(h.define([S]),r`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <span slot="label">Name</span>
        <span slot="value">John Doe</span>
      </forge-label-value>
    `)},a={...c,args:{inline:!0}},l={args:{withIcon:!1},render:({inline:e,empty:i,ellipsis:o,withIcon:d,...f})=>{const p=g(f)??{};o&&(p.maxWidth="150px");const v=p?u(p):n;return r`
      <div class=${y({"forge-label-value":!0,"forge-label-value--inline":e,"forge-label-value--empty":i,"forge-label-value--ellipsis":o})} style=${v}>
        ${d?r`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`:n}
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
        <span slot="label">Name</span>
        <span slot="value">John Doe</span>
      </forge-label-value>
    \`;
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    inline: true
  }
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Qe=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,Qe as L,a};
