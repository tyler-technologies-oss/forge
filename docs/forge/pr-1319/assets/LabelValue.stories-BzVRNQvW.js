import{A as n,b as r}from"./iframe-Doaa3Kdk.js";import{s as c,b as g,g as b}from"./utils-C8_-3lrC.js";import{o as u}from"./style-map-7Yr-sdwa.js";import{e as y}from"./class-map-CsjCCn6c.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Dq6gaTuh.js";import"./app-bar-menu-button-BI3-6Nbs.js";import"./app-bar-profile-button-CYjUw1jw.js";import{I as h}from"./icon-ozIZoPIz.js";import"./menu-CX3Zlgon.js";import{i as S}from"./tyler-icons-NVf08gHb.js";import"./linear-progress-BuMeIIdZ.js";import"./list-BGzEP44Z.js";import"./popover-K4jtrW_G.js";import"./overlay-DNJXwLw8.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-CC97axfM.js";import"./list-item-MbhLyvqr.js";import"./avatar-dCcjkuLa.js";import"./icon-button-Ck8_ypsD.js";import"./autocomplete-D7k4YWRD.js";import"./label-BOpEXGDh.js";import"./base-field-DX5e91B5.js";import"./focus-indicator-D4pryyUP.js";import"./text-field-CNwTSEf7.js";import"./backdrop-ngk7d2eo.js";import"./badge-CM5voPsO.js";import"./banner-CofdR0KH.js";import"./bottom-sheet-CH7RXbzd.js";import"./dialog-B2ssQpdh.js";import"./breadcrumb-overflow-menu-D1b5zGow.js";import"./button-area-DtLpw-_5.js";import"./button-toggle-group-BJqA20sx.js";import"./button-BsMnzWz3.js";import"./calendar-VPeJtWAd.js";import"./card-DwPfAMk0.js";import"./checkbox-CRSkxL3h.js";import"./chip-set-D-lmWwOv.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-DRYwZzHk.js";import"./date-picker-BJpOYU92.js";import"./date-range-picker-DP3OJrfb.js";import"./divider-JZ_ptvWl.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-BBWAoecH.js";import"./open-icon-CFItYUrW.js";import"./file-picker-C0K8SsId.js";import"./floating-action-button-BwAR3kUn.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-BkP6kXGa.js";import"./key-item-B7WUakp2.js";import"./keyboard-shortcut-CEKCD8s9.js";import"./label-value-C0-wovkK.js";import"./listbox-BBVim-EX.js";import"./meter-group-CgQ7-Ky0.js";import"./page-state-DvaZGddB.js";import"./paginator-DIauSFAN.js";import"./process-stepper-C-Zo0kfd.js";import"./radio-group-DHeoS_Gf.js";import"./scaffold-Ca9xBuAs.js";import"./secret-DLIvxLGQ.js";import"./option-BwVWcwOm.js";import"./select-dropdown-CdUODfb8.js";import"./select-CJ6dOpu1.js";import"./skip-link-C_GLmhdr.js";import"./slider-BiBjMheJ.js";import"./split-view-B56sc0LN.js";import"./stack-BAhihQL5.js";import"./stepper-BbWX5NT7.js";import"./switch-BNgZHKR-.js";import"./table-Dg2XF4pw.js";import"./tab-panel-BQs--9ZD.js";import"./time-picker-CraE9zB1.js";import"./timestamp-DlemHXde.js";import"./toast-_AgZqPeU.js";import"./toolbar-CTtntFiQ.js";import"./tooltip-BZoCBE_e.js";import"./tree-item--Oih3Grz.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-BcaXIqLC.js";import"./split-button-DN6FTMHy.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],or=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:t,Icon:s,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,t as D,s as I,or as L,a};
