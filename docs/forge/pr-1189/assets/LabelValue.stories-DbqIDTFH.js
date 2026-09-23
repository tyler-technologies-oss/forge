import{A as n,b as r}from"./iframe-DhPPATOI.js";import{s as c,b as g,g as b}from"./utils-BUEgyQuR.js";import{o as u}from"./style-map-CcP_kdqL.js";import{e as y}from"./class-map-CEQgffN4.js";import"./service-adapter-gy1PbA1l.js";import"./accordion-CVxNcXqO.js";import"./app-bar-menu-button-DD6-mDnN.js";import"./app-bar-profile-button-kCSUMpdG.js";import{I as h,i as S}from"./icon-DaCKLlYs.js";import"./menu-BDuuGK0D.js";import"./linear-progress-BGu4ylYb.js";import"./list-BQeID-EI.js";import"./popover-B6Lyp91L.js";import"./overlay-DnA59UKB.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-D0Kw-TGm.js";import"./list-item-Czcdb5bP.js";import"./avatar-Db8N8ihi.js";import"./icon-button-C2v-Sinx.js";import"./autocomplete-DKzqKby3.js";import"./label-D4E_mm-6.js";import"./base-field-Mwf4T1kF.js";import"./focus-indicator-Cy6URCXv.js";import"./text-field-BWtqe7xr.js";import"./backdrop-Cme44_g_.js";import"./badge-C-_a_oin.js";import"./banner-CyikUPby.js";import"./bottom-sheet-KuMRRU4q.js";import"./dialog-DGghfkK0.js";import"./button-area-IAVzIT9I.js";import"./button-toggle-group-D3kaTgcy.js";import"./button-D5tK2bf-.js";import"./calendar-B1HggwMd.js";import"./card-xZjk_lrn.js";import"./checkbox-Bgp1tKl-.js";import"./chip-set-DW8HxT5C.js";import"./state-layer-D75fz-rw.js";import"./circular-progress-D4RaVrYZ.js";import"./color-picker-2UOSVK_F.js";import"./date-picker-Bvgn5KHz.js";import"./date-range-picker-BG_WQ2GV.js";import"./divider-DrBQytg-.js";import"./base-drawer-BL5lye2C.js";import"./drawer-lU6k92RL.js";import"./modal-drawer-BZ72iO8w.js";import"./mini-drawer-OoNkqIRy.js";import"./expansion-panel-B0kFDtRV.js";import"./open-icon-CD6pRoqI.js";import"./file-picker-3iTwqp6j.js";import"./floating-action-button-DFWyBCJn.js";import"./inline-message-BPZn-wv9.js";import"./key-item-Bw2Delzo.js";import"./keyboard-shortcut--lvwNh3B.js";import"./label-value-Arz5rsAk.js";import"./meter-group-CKWk1yE2.js";import"./page-state-DpE8pwA_.js";import"./paginator-CywmcBMW.js";import"./radio-group-DrtVHBVn.js";import"./scaffold-BVJBr1z1.js";import"./secret-CxwwCYfT.js";import"./select-dropdown-B-Jd_TaC.js";import"./select-Z-fll7Bu.js";import"./skip-link-Cnc6ikzR.js";import"./slider-CSqmYK-c.js";import"./split-view-BDb1aCjJ.js";import"./stack-k5bE-KTo.js";import"./stepper-Dvw9sdHr.js";import"./switch-BdWbb_wW.js";import"./table-4QhGonzI.js";import"./tab-panel-CLq4K60J.js";import"./time-picker-BNX7fr4c.js";import"./timestamp-fCuepr5Y.js";import"./toast-DIupd_v2.js";import"./toolbar-7MtW3mBN.js";import"./tooltip-BJ-I3FD9.js";import"./tree-item-Bxz-ijwX.js";import"./view-switcher-BCdzMvcV.js";import"./deprecated-icon-button-Ddu9MTiL.js";import"./split-button-DtXi3ffH.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ue=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,Ue as L,a};
