import{A as n,b as r}from"./iframe-CGF9490j.js";import{s as c,b as g,g as b}from"./utils-cbnKSSEt.js";import{o as u}from"./style-map-cEBdjqsX.js";import{e as y}from"./class-map-C-Xl3VxB.js";import"./service-adapter-DlT-lJx7.js";import"./accordion-DTaALSMd.js";import"./app-bar-menu-button-DVmUUxYf.js";import"./app-bar-profile-button-CK07oWjB.js";import{I as h,i as S}from"./tyler-icons-CM84cyec.js";import"./menu-BoRK6ol3.js";import"./linear-progress-Du-Ntegu.js";import"./list-EiOoI77I.js";import"./popover-CBkkBxnw.js";import"./overlay-iu-_ABPF.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-ZvFpE85R.js";import"./list-item-BwYEQ33V.js";import"./avatar-B7h22bVK.js";import"./icon-button-D1wmfd79.js";import"./autocomplete-f3l_Be1N.js";import"./label-CtoUkODo.js";import"./base-field-D8CxI0Jj.js";import"./focus-indicator-BuzCXwAm.js";import"./text-field-V39Mt-6S.js";import"./backdrop-e4rWKi0D.js";import"./badge-BfXwQdqa.js";import"./banner-YIL7yTpX.js";import"./bottom-sheet-C2SvqPsM.js";import"./dialog-CGeB4Flg.js";import"./button-area-DypEoyMu.js";import"./button-toggle-group-DM1kvl4T.js";import"./button-X-BaipNf.js";import"./calendar-WFRAhrnZ.js";import"./card-BggT-zBh.js";import"./checkbox-BjuLW923.js";import"./chip-set-DRKXmCcP.js";import"./state-layer-BcVD1OXH.js";import"./circular-progress-QjF0OwOx.js";import"./color-picker-8FRnVfhI.js";import"./date-picker-Bm3aEs4x.js";import"./date-range-picker-BHqkBcOg.js";import"./divider-BzjCc6TM.js";import"./base-drawer-C3RB7KRX.js";import"./drawer-C4w9_Owc.js";import"./modal-drawer-CG9TO9xg.js";import"./mini-drawer-B5rmf2t_.js";import"./expansion-panel-BFvy7dNk.js";import"./open-icon-BDuGFBPz.js";import"./file-picker-qieYJaGv.js";import"./floating-action-button-Uitf1v_W.js";import"./inline-message-D6TY8UzG.js";import"./key-item-Crc6qGSt.js";import"./keyboard-shortcut-CKpUL8EG.js";import"./label-value-Cs0_BMQ9.js";import"./listbox-dTvndwx1.js";import"./meter-group-uB9uJbQT.js";import"./page-state-C_fu_Hm3.js";import"./paginator-BlGZB6YS.js";import"./radio-group-zePoHbkV.js";import"./scaffold-C8LskKFX.js";import"./secret-Bh82KRH-.js";import"./option-BA9lA4Kv.js";import"./select-dropdown-GzGT9sXo.js";import"./select-B1TRBwRF.js";import"./skip-link-Da6pvf55.js";import"./slider-CtDPa1iV.js";import"./split-view-CNoae3vm.js";import"./stack-Grf8E1p3.js";import"./stepper-Puq66nUQ.js";import"./switch-1aMvoHy8.js";import"./table-D4yIvrTD.js";import"./tab-panel-BZ5MTAj5.js";import"./time-picker-BCZ6_qqy.js";import"./timestamp-BZgNY179.js";import"./toast-dpHRnoIj.js";import"./toolbar-D4s_V7c3.js";import"./tooltip-u84XDAZH.js";import"./tree-item-4BCjKdRf.js";import"./view-switcher-Cw3vuBIn.js";import"./deprecated-icon-button-BoJt1vt9.js";import"./split-button-CjgQw8tq.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ye=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:t,Icon:s,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,t as D,s as I,Ye as L,a};
