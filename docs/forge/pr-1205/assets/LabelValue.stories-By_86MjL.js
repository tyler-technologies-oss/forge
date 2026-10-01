import{A as n,b as r}from"./iframe-BsWNYj34.js";import{s as c,b as g,g as b}from"./utils-DkXHK9oa.js";import{o as u}from"./style-map-Be_PXAFo.js";import{e as y}from"./class-map-Bo5d0TOS.js";import"./service-adapter-8tADcN_b.js";import"./accordion-C6ao4EhU.js";import"./app-bar-menu-button-BTh7rlBG.js";import"./app-bar-profile-button-BN4iSukw.js";import{I as h}from"./icon-BUxeVNUp.js";import"./menu-Bh9SI4ea.js";import{i as S}from"./tyler-icons-D62AQmQV.js";import"./linear-progress-BuMeIIdZ.js";import"./list-DRNq441o.js";import"./popover-Dlk7E9HG.js";import"./overlay-Cf6QOhOg.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BlJfl3pU.js";import"./list-item-DedBsUVI.js";import"./avatar-DkcDFkeW.js";import"./icon-button-Csig8kiH.js";import"./autocomplete-Dm5z513T.js";import"./label-4k9r-Qn3.js";import"./base-field-DZXXPrI8.js";import"./focus-indicator-Bk7H1xfH.js";import"./text-field-BSJIXTpk.js";import"./backdrop-ngk7d2eo.js";import"./badge-C4OPzmQY.js";import"./banner-BGyv3iY1.js";import"./bottom-sheet-BEAK8IOK.js";import"./dialog-C4E5MayG.js";import"./button-area-B3IFehQI.js";import"./button-toggle-group-D9_VQRRc.js";import"./button-CtcS03YF.js";import"./calendar-BsymnUPU.js";import"./card-DkzXc1IY.js";import"./checkbox-CLo5fYIE.js";import"./chip-set-Bz3yABRx.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-H94OCY-1.js";import"./date-picker-DxEI2jHB.js";import"./date-range-picker-eK5w9-ib.js";import"./divider-Cmk3s280.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-BGJNt33U.js";import"./open-icon-IVeTfib_.js";import"./file-picker-BXfFNVfE.js";import"./floating-action-button-BDPUnYok.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-C44u2d7L.js";import"./key-item-BNwqht-o.js";import"./keyboard-shortcut-D8EYddO3.js";import"./label-value-C0-wovkK.js";import"./listbox-D4mRABlT.js";import"./meter-group-CtYb9oU0.js";import"./page-state-DvaZGddB.js";import"./paginator-BfqjPAY_.js";import"./process-stepper-HWDRv281.js";import"./radio-group-OYJH5zYu.js";import"./scaffold-Ca9xBuAs.js";import"./secret-Bbz0OcjG.js";import"./option-Cy1-rc0E.js";import"./select-dropdown-CZqsN6Fs.js";import"./select-HmDDw0Qu.js";import"./skip-link-BcgGo4hu.js";import"./slider-C2cLtmca.js";import"./split-view-YUDK9oYA.js";import"./stack-Bd7iC-xk.js";import"./stepper-BSiPPjLY.js";import"./switch-BRJRVWBB.js";import"./table-BER0ReRP.js";import"./tab-panel-DNZ73mhU.js";import"./time-picker-C9NkIxOM.js";import"./timestamp-CnvbvGtP.js";import"./toast-JEv--8LH.js";import"./toolbar-M4wgHqgc.js";import"./tooltip-vxqZR3qG.js";import"./tree-item-Dh9RQzK9.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-BkVtAq31.js";import"./split-button-BrWekVhd.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
