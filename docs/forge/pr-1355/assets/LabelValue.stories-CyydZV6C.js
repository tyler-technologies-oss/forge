import{A as n,b as r}from"./iframe-B2G4zKPj.js";import{s as c,b as g,g as b}from"./utils-2_OYILP2.js";import{o as u}from"./style-map-eDl7Fh05.js";import{e as y}from"./class-map-BsyfRX0P.js";import"./service-adapter-8tADcN_b.js";import"./accordion-RGp8mPk9.js";import"./app-bar-menu-button-Dg0OuAkc.js";import"./app-bar-profile-button-Feak5l3S.js";import{I as h}from"./icon-CzY8gUKj.js";import"./menu-DG9z46vu.js";import{i as S}from"./tyler-icons-6f2n3B-C.js";import"./linear-progress-BNAgl3n6.js";import"./list-CWBEI486.js";import"./popover-l-fAYctd.js";import"./overlay-DWH89yjz.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-HIoiQfSw.js";import"./list-item-Cy6LxyEf.js";import"./avatar-DkBn85xu.js";import"./icon-button-Dd9p4EqL.js";import"./autocomplete-Llo7YDQM.js";import"./label-D1p99XXI.js";import"./base-field-i1QPAbu6.js";import"./focus-indicator-bDn075UK.js";import"./text-field-CStdahpR.js";import"./backdrop-ngk7d2eo.js";import"./badge-fRwJYFgL.js";import"./banner-DDO6bPot.js";import"./bottom-sheet-CMrbJygg.js";import"./dialog-DoQxHo6b.js";import"./button-area-BCuUtls4.js";import"./button-toggle-group-DYu0eIwt.js";import"./button-CrQUc-I0.js";import"./calendar-BDLG8XWU.js";import"./card-DeaTEzB2.js";import"./checkbox-BAoyAqJd.js";import"./chip-set-CEmIH3lk.js";import"./state-layer-oVncPkRT.js";import"./circular-progress-BAYLkjmK.js";import"./color-picker-BBvykwO2.js";import"./date-picker-CwA54Kus.js";import"./date-range-picker-BA4jnfo9.js";import"./divider-Bq2uY91e.js";import"./base-drawer-CRoTqCXm.js";import"./drawer-B-CimXk8.js";import"./modal-drawer-CrxWsVl8.js";import"./mini-drawer-Bt5EnS2p.js";import"./expansion-panel-B3DguqGf.js";import"./open-icon-DI7x5dkm.js";import"./file-picker-BQzVOfoK.js";import"./floating-action-button-DR0locxF.js";import"./inline-message-XoyeymbY.js";import"./kbd-CqzH-ZC6.js";import"./key-item-DyJ-fk19.js";import"./keyboard-shortcut-CpNbfXPl.js";import"./label-value-C0-wovkK.js";import"./listbox-CSMOe6-m.js";import"./meter-group-DJf2_PRS.js";import"./page-state-DvaZGddB.js";import"./paginator-BWLFOZDN.js";import"./process-stepper-f6nhD94P.js";import"./radio-group-CSGkvXVs.js";import"./scaffold-Ca9xBuAs.js";import"./secret-Bntkjl2I.js";import"./option-group-CNQVuVA6.js";import"./select-dropdown-lAUiWRBT.js";import"./select-DXofdOy4.js";import"./skip-link-DmnI0S7d.js";import"./slider-zzop_Pan.js";import"./split-view-Ch3jCkrq.js";import"./stack-p3E4so40.js";import"./stepper-CHxbeSa3.js";import"./switch-DsxJTttj.js";import"./table-BHGAoQfB.js";import"./tab-panel-ALJksaB0.js";import"./time-picker-CzcPht0z.js";import"./timestamp-DnL64eQh.js";import"./toast-IEztLA5v.js";import"./toolbar-C4ep4NAp.js";import"./tooltip-DdRl_dqo.js";import"./tree-item-Bhiswv9K.js";import"./view-switcher-BSXTg3U6.js";import"./deprecated-icon-button-xCVUjACm.js";import"./split-button-DFZU8YjP.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
