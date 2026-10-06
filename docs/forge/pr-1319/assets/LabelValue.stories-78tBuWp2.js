import{A as n,b as r}from"./iframe-Bsuj_4wG.js";import{s as c,b as g,g as b}from"./utils-Bq4aulu2.js";import{o as u}from"./style-map-DGIs8k03.js";import{e as y}from"./class-map-DHcizQc8.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DaTLEUTh.js";import"./app-bar-menu-button-DpoLaQIC.js";import"./app-bar-profile-button-CO2AmyjA.js";import{I as h}from"./icon-CCr3iGf2.js";import"./menu-DqZ1Hh63.js";import{i as S}from"./tyler-icons-_o7MAz4c.js";import"./linear-progress-BuMeIIdZ.js";import"./list-B2ijZ_Q_.js";import"./popover-kdG4uISC.js";import"./overlay-BB4_WJc7.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-DHgAi1uJ.js";import"./list-item-D2ojZ1MM.js";import"./avatar-B4t4XLFH.js";import"./icon-button-BRi3tEJf.js";import"./autocomplete-CgOLJLNs.js";import"./label-nfa9NigO.js";import"./base-field-CUFB2h0Q.js";import"./focus-indicator-6vgszVnP.js";import"./text-field-DQXkglfR.js";import"./backdrop-ngk7d2eo.js";import"./badge-DLX7a0ZJ.js";import"./banner-Bv53ZhXP.js";import"./bottom-sheet-CmW01Z9T.js";import"./dialog-CnmiEdKB.js";import"./breadcrumb-overflow-menu-Cl5SGDrd.js";import"./button-area-Bf0x-DkD.js";import"./button-toggle-group-C7kUS4VZ.js";import"./button-DnKmUXer.js";import"./calendar-DFyvcgXc.js";import"./card-CMjIWlyF.js";import"./checkbox-DjJxQCjO.js";import"./chip-set-B4QbOjkj.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-DNGuWfOK.js";import"./date-picker-Dfkdf_6u.js";import"./date-range-picker-CBhon4cj.js";import"./divider-BiWkrst8.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-0TrCyGiO.js";import"./open-icon-B_dytjnf.js";import"./file-picker-CDDXyOWq.js";import"./floating-action-button-DUinKX0l.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-7nncIk_l.js";import"./key-item-4scF8sNv.js";import"./keyboard-shortcut-Cz2iaOHZ.js";import"./label-value-C0-wovkK.js";import"./listbox-DgEpk-G8.js";import"./meter-group-BwQoaRQJ.js";import"./page-state-DvaZGddB.js";import"./paginator-CVwh3Fmf.js";import"./process-stepper-CkE60wRe.js";import"./radio-group-zUU4DfxE.js";import"./scaffold-Ca9xBuAs.js";import"./secret-Bl5efnHT.js";import"./option-iajmwKnE.js";import"./select-dropdown-CyX48eTV.js";import"./select-B9w2iZQH.js";import"./skip-link-CKaPuHtE.js";import"./slider-BJ6MFRQe.js";import"./split-view-X0Bh_3EC.js";import"./stack-CUiSSWZj.js";import"./stepper-CxjOx7FR.js";import"./switch-BJU9dA3M.js";import"./table-1SWIwa4y.js";import"./tab-panel-DAdRk1l2.js";import"./time-picker-B05yCVhA.js";import"./timestamp-C7iP3OzQ.js";import"./toast-DQAMOmsq.js";import"./toolbar-Dwjr8kfj.js";import"./tooltip-BUZUYzwW.js";import"./tree-item-BFiDl7Kw.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-sTHrW3Zv.js";import"./split-button-C7cJupcU.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
