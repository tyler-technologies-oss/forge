import{x as o,E as m}from"./iframe-CxOf2Yik.js";import{g as b,s as g,a as u}from"./utils-CWNZ6DqN.js";import{o as d}from"./style-map-6UN5F9Db.js";import{e as y}from"./class-map-DPgdNXl9.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-BsvBejiM.js";import"./expansion-panel-8TqHUyq-.js";import"./open-icon-pKbfwaP0.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-C2hLIhhf.js";import"./state-layer-BEEsPoZf.js";import"./focus-indicator-6htZ7g-E.js";import{I as h,e as S}from"./icon-Uwxy940_.js";import"./menu-BSSgalM5.js";import"./linear-progress-r0Hzg69v.js";import"./list-CgRXgtVy.js";import"./popover-DE3KaoDh.js";import"./overlay-DbqVLn-W.js";import"./skeleton-BSiuL_ME.js";import"./avatar-BXJoD-HK.js";import"./icon-button-Ca4_lLWu.js";import"./autocomplete-CSOfx9xS.js";import"./label-CCwd-QXp.js";import"./button-DM85ngA_.js";import"./button-toggle-group-D17NnQhn.js";import"./checkbox-o1E4x5is.js";import"./switch-CcSuJni8.js";import"./base-field-CXtcKSyk.js";import"./text-field-CTFCgFRz.js";import"./backdrop-BDRZVysw.js";import"./badge-BG9JrjPZ.js";import"./banner-CSxL561u.js";import"./bottom-sheet-fU2YBxmJ.js";import"./dialog-Dkd2fYmF.js";import"./button-area-DjBqvKCu.js";import"./calendar-CConGmRm.js";import"./card-Bg3pUlFj.js";import"./chip-set-D9HJUKtP.js";import"./circular-progress-_RSm0FGC.js";import"./color-picker-ByBXx9TO.js";import"./date-picker-RtAa41Wd.js";import"./date-range-picker-LWii0j2X.js";import"./divider-NNdF1g4c.js";import"./base-drawer-Co31fV-T.js";import"./drawer-BsGDACAy.js";import"./modal-drawer-CNiXuj6d.js";import"./mini-drawer-DnqVAmGX.js";import"./file-picker-BlO4PQ5B.js";import"./floating-action-button-C-mzOlvW.js";import"./inline-message-e4Sp2zCL.js";import"./key-item-BD--PIdY.js";import"./keyboard-shortcut-rXqqnOKl.js";import"./label-value-BluYnIAQ.js";import"./meter-group-Bpa4Swqg.js";import"./page-state-Cd_K1Ccr.js";import"./paginator-D9VTp9CD.js";import"./scaffold-BrokB2Ba.js";import"./select-dropdown-DD5xrX8B.js";import"./select-Bpm_NGAS.js";import"./skip-link-Dkb5pz_-.js";import"./slider-BmWLLEvD.js";import"./split-view-DPHJ1fqE.js";import"./stack-Ca0GDYK5.js";import"./stepper-u39srSsY.js";import"./table-D8VQ42ex.js";import"./tab-bar-B1AoBsdS.js";import"./time-picker-BBg6yY4S.js";import"./toast-C1t49R6W.js";import"./toolbar-U0axkpKl.js";import"./tooltip-KOXasit9.js";import"./view-switcher-BUh552L0.js";import"./deprecated-icon-button-BiBhn3Zu.js";import"./split-button-qY1gFFcp.js";const c="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=u(e),r=d({...i,width:e.ellipsis?"100px":null});return o`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${r}>
        <label slot="label">Label</label>
        ${e.empty?o`<span slot="value">n/a</span>`:o`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:c,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:c,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},s={},t={...g,render:()=>(h.define([S]),o`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <label slot="label">Name</label>
        <span slot="value">John Doe</span>
      </forge-label-value>
    `)},l={...g,args:{inline:!0}},a={args:{withIcon:!1},render:({inline:e,empty:i,ellipsis:r,withIcon:f,...v})=>{const n=u(v)??{};r&&(n.maxWidth="150px");const p=n?d(n):m;return console.log(p),o`
      <div class=${y({"forge-label-value":!0,"forge-label-value--inline":e,"forge-label-value--empty":i,"forge-label-value--ellipsis":r})} style=${p}>
        ${f?o`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`:m}
        <span class="forge-label-value__label">Status</span>
        <span class="forge-label-value__value"> ${i?"n/a":r?"Lorem ipsum dolor sit, amet consectetur adipisicing elit.":"Active"} </span>
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
      cssVarArgs['maxWidth'] = '150px';
    }
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    console.log(style);
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
}`,...a.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Re=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:s,Icon:t,Inline:l,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{a as C,s as D,t as I,Re as L,l as a};
