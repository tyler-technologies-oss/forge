import{A as p,b as r}from"./iframe-DriYmvez.js";import{s as c,b as g,g as b}from"./utils-BA5-_s-B.js";import{o as u}from"./style-map-igkUgyFI.js";import{e as y}from"./class-map-D-IJXaPU.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DmrjHDdS.js";import"./app-bar-profile-button-CZSZDzCD.js";import{I as h,e as S}from"./tyler-icons-Bwr0J3kB.js";import"./menu-DL5uemw5.js";import"./linear-progress-C_nfyJF6.js";import"./list-B3MPjcuq.js";import"./popover-COK8oi_U.js";import"./overlay-BB80zovl.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-CerfHp_D.js";import"./avatar-BFren0Xn.js";import"./icon-button-3w-6zUmZ.js";import"./focus-indicator-BrbZv0xw.js";import"./state-layer-BAlZ4sKA.js";import"./autocomplete-CAYLO06d.js";import"./label-BxEiOTH9.js";import"./button-DFgZemWW.js";import"./button-toggle-group-CHBa_PC5.js";import"./checkbox-CKn84_oJ.js";import"./switch-QiY0xOLb.js";import"./base-field-Dw-RN5vF.js";import"./text-field-krqlEIb4.js";import"./backdrop-DXl5sJrw.js";import"./badge-9TmoW2PM.js";import"./banner-YC1fGYej.js";import"./bottom-sheet-DM2YRo0u.js";import"./dialog-V0fRmenz.js";import"./button-area-CKYzB8f8.js";import"./calendar-D7fH9wf-.js";import"./card-BFqXM32B.js";import"./chip-set-CFRrbic5.js";import"./circular-progress-DX7Fr9fb.js";import"./color-picker-BHjk8xR_.js";import"./date-picker-BGVEc7sv.js";import"./date-range-picker-BttQqTw3.js";import"./divider-nmR2RwOe.js";import"./base-drawer-P9bFkP7J.js";import"./drawer-DpAOA30P.js";import"./modal-drawer-OghggGdi.js";import"./mini-drawer-CQOKdcEt.js";import"./expansion-panel-Fx01yYaL.js";import"./open-icon-C5qf3WDr.js";import"./file-picker-9sIO3UXy.js";import"./floating-action-button-BilhVipm.js";import"./inline-message-CVU9VwkI.js";import"./key-item-DyE-ER9A.js";import"./keyboard-shortcut-_dDBheLA.js";import"./label-value-MrGFVOH0.js";import"./meter-group-BpXr84wM.js";import"./page-state-g65TNY5P.js";import"./paginator-HTyN4VUL.js";import"./scaffold-BPWJeG4e.js";import"./deprecated-icon-button-CwX5W18o.js";import"./select-dropdown-CPf6bEXU.js";import"./select-D-e9cixU.js";import"./skip-link-pYrFHJMy.js";import"./slider-DlznXgVs.js";import"./split-view-CijZtVe8.js";import"./stack-SvYZVnft.js";import"./stepper-ETSII1q1.js";import"./table-CPqzxjT1.js";import"./tab-bar-CJxc8MgZ.js";import"./time-picker-CHjtAP-S.js";import"./toast-yCGNU-ro.js";import"./toolbar-DC0hxa7h.js";import"./tooltip-DIuICY4U.js";import"./tree-item-Ct3AX4gp.js";import"./view-switcher-Cg31cFFb.js";import"./split-button-CBMPPH4p.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${o}>
        <label slot="label">Label</label>
        ${e.empty?r`<span slot="value">n/a</span>`:r`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:m,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},t={},s={...c,render:()=>(h.define([S]),r`
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
    `}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],ke=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:t,Icon:s,Inline:l,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{a as C,t as D,s as I,ke as L,l as a};
