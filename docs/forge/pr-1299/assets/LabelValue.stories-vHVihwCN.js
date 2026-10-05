import{A as n,b as r}from"./iframe-QHnGQDtP.js";import{s as c,b as g,g as b}from"./utils-BRc3IP6u.js";import{o as u}from"./style-map-D69N4WVg.js";import{e as y}from"./class-map-BTaYBOLy.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Q1HGT5Uz.js";import"./app-bar-menu-button-Cxhb9IKE.js";import"./app-bar-profile-button-CFPQWuoF.js";import{I as h}from"./icon-BWWEOavI.js";import"./menu-CJCj9x9w.js";import{i as S}from"./tyler-icons-_o7MAz4c.js";import"./linear-progress-BuMeIIdZ.js";import"./list-DJaCZBbg.js";import"./popover-DPWANUhZ.js";import"./overlay-ByTJNYJL.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-BdK8ueUU.js";import"./list-item-Ddu71ZoD.js";import"./avatar-DosdD1FJ.js";import"./icon-button-2CdELZX7.js";import"./autocomplete-LQ8sTcZA.js";import"./label-C6PsXbDy.js";import"./base-field-DzunuqQH.js";import"./focus-indicator-Dgurg4EK.js";import"./text-field-DIiKAx27.js";import"./backdrop-ngk7d2eo.js";import"./badge-B4vlFk6b.js";import"./banner-CmPqjF52.js";import"./bottom-sheet-UYOMGK_e.js";import"./dialog-CWUQkKMT.js";import"./button-area-BEE2VWyK.js";import"./button-toggle-group-S7Pa65cF.js";import"./button-C0j7tAEZ.js";import"./calendar-3_lKxM_O.js";import"./card-BMRDEp9B.js";import"./checkbox-B1TSJwlE.js";import"./chip-set-CmRhRBs9.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-YsNCA6AW.js";import"./date-picker-BfkpwHAU.js";import"./date-range-picker-Bggc5owH.js";import"./divider-BRLcTfRH.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-BOjjiTze.js";import"./open-icon-DEd-bgbL.js";import"./file-picker-B7DHLXX4.js";import"./floating-action-button-cTWiIaA2.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-cGe-hmev.js";import"./key-item-e5LPquw-.js";import"./keyboard-shortcut-x3ntbjYJ.js";import"./label-value-C0-wovkK.js";import"./listbox-qdfVdpZd.js";import"./meter-group-DcpO6zio.js";import"./page-state-DvaZGddB.js";import"./paginator-D0B9rSMO.js";import"./process-stepper-G8j88njp.js";import"./radio-group-DBjwwdQv.js";import"./scaffold-Ca9xBuAs.js";import"./secret-PP1sN4BX.js";import"./option-Z4BKmanb.js";import"./select-dropdown-yArpPgI6.js";import"./select-Caj4LuHm.js";import"./skip-link-BrcEqJpl.js";import"./slider-DxNMbrrY.js";import"./split-view-C0s6abOt.js";import"./stack-Bd7iC-xk.js";import"./stepper-D301WCuz.js";import"./switch-WlqxXxRI.js";import"./table-o09BSKia.js";import"./tab-panel-ByVfF3md.js";import"./time-picker-C5RwO2gJ.js";import"./timestamp-CgJeJNh2.js";import"./toast-B_Jdhi5F.js";import"./toolbar-CI1IEgf3.js";import"./tooltip-WIBbVpRv.js";import"./tree-item-mlDOVy4J.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-CK9pwHd8.js";import"./split-button-CFEmczuV.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${o}>
        <span slot="label">Label</span>
        ${e.empty?r`<span slot="value">n/a</span>`:r`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:m,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},t={},s={...c,render:()=>(h.define([S]),r`
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
    `}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],rr=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:t,Icon:s,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,t as D,s as I,rr as L,a};
