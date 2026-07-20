import{A as p,b as r}from"./iframe-BzlzSqtu.js";import{s as c,b as g,g as b}from"./utils-DJhy9_a3.js";import{o as u}from"./style-map-BpIn207L.js";import{e as y}from"./class-map-D0cx6itd.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B7edwTU-.js";import"./app-bar-profile-button-BE7ovXX-.js";import{I as h,e as S}from"./tyler-icons-C0MPM0Nr.js";import"./menu-DCcpJcs1.js";import"./linear-progress-DLb8lZjg.js";import"./list-BuEi7od1.js";import"./popover-Ci8p4n86.js";import"./overlay-BaGRJgMD.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BE0Hflic.js";import"./avatar-CBh3ICum.js";import"./icon-button-D5gxvJBZ.js";import"./focus-indicator-B2ubMpda.js";import"./state-layer-RJ83GVyt.js";import"./autocomplete-Cl0S1EFS.js";import"./label-DVU9uI27.js";import"./button-CWEBWUbn.js";import"./button-toggle-group-CJp-qOZz.js";import"./checkbox-GwdS8dPX.js";import"./switch-ZSurewEj.js";import"./base-field-CSg8-O_c.js";import"./text-field-7NfOlH-V.js";import"./backdrop-Br-v5NXK.js";import"./badge-B6pdBg_i.js";import"./banner-D9oNdFuq.js";import"./bottom-sheet-CYPNqcjy.js";import"./dialog-BAAkdPx4.js";import"./button-area-BmOa6WaU.js";import"./calendar-BWSUqCJd.js";import"./card-D94hhuCx.js";import"./chip-set-DLzr5L-e.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-C9rFup6K.js";import"./date-picker-UsteW1cY.js";import"./date-range-picker-6Tjw52i0.js";import"./divider-U4ZHxLfA.js";import"./base-drawer-DgtNmrYs.js";import"./drawer-BD1OwPL1.js";import"./modal-drawer-BSNPPupX.js";import"./mini-drawer-DLEI9OBr.js";import"./expansion-panel-O6G_XurC.js";import"./open-icon-CemT6_Au.js";import"./file-picker-CPfCeLvj.js";import"./floating-action-button-CR_fWac2.js";import"./inline-message-EO-dHXbB.js";import"./key-item-BPxMng8x.js";import"./keyboard-shortcut-BbSPyLfN.js";import"./label-value-C46r41pN.js";import"./meter-group-X-nOWWcj.js";import"./page-state-BeEclPwI.js";import"./paginator-CvZUjsgF.js";import"./scaffold-B-1oYF3d.js";import"./secret-CxbciRvj.js";import"./select-dropdown-KccT4nNA.js";import"./select-jvZemQ-9.js";import"./skip-link-Dn1FwxWb.js";import"./slider-B9N4tcK5.js";import"./split-view-C4qg2kRN.js";import"./stack-DskzmGQg.js";import"./stepper-C36eIFze.js";import"./table-BlqHJXxY.js";import"./tab-bar-tkQRP9g9.js";import"./time-picker-B2B1KIHx.js";import"./toast-Xc7sWdQT.js";import"./toolbar-CrsK9Ito.js";import"./tooltip-BDnyo0UY.js";import"./tree-item-CC_cz0Qr.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-CnX1bfTm.js";import"./split-button-orCClE2x.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
    `)},a={...c,args:{inline:!0}},l={args:{withIcon:!1},render:({inline:e,empty:i,ellipsis:o,withIcon:d,...f})=>{const n=g(f)??{};o&&(n.maxWidth="150px");const v=n?u(n):p;return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],qe=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,qe as L,a};
