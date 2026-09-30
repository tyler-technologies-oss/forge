import{A as n,b as r}from"./iframe-3UUTJgvy.js";import{s as c,b as g,g as b}from"./utils-BUwrw5lO.js";import{o as u}from"./style-map-Bd7m4KTb.js";import{e as y}from"./class-map-Dli6-7pD.js";import"./service-adapter-8tADcN_b.js";import"./accordion-D5RbUHav.js";import"./app-bar-menu-button-1CiALXW3.js";import"./app-bar-profile-button-BLPqUQ1d.js";import{I as h}from"./icon-aW4TmUba.js";import"./menu-BT-lDu_m.js";import{i as S}from"./tyler-icons-CA7Bw7CG.js";import"./linear-progress-kQO48laS.js";import"./list-DJeCxiYa.js";import"./popover-CZN9KQv2.js";import"./overlay-C1VCwoHu.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DKwtbTm9.js";import"./list-item-Cur4DZAE.js";import"./avatar-CUDVkILd.js";import"./icon-button-Co9D746x.js";import"./autocomplete-HztifWZK.js";import"./label-B2Y1jFr3.js";import"./base-field-Cc5e0id5.js";import"./focus-indicator-DfyOOFaI.js";import"./text-field-BdKTgEWN.js";import"./backdrop-C9lBlb_d.js";import"./badge-BaKvZRLh.js";import"./banner-9CuVnbC5.js";import"./bottom-sheet-DYN7w_p5.js";import"./dialog-thBFnlfL.js";import"./button-area-BnmllXCK.js";import"./button-toggle-group-C4N3qzmg.js";import"./button-DH6t8nYG.js";import"./calendar-DY96ERvZ.js";import"./card-BOaGdFbO.js";import"./checkbox-B-mT5VdM.js";import"./chip-set-Dp3YObFi.js";import"./state-layer-CZIH5add.js";import"./circular-progress-CfoxEQ_B.js";import"./color-picker-CihbpsHu.js";import"./date-picker-AOt5O_WK.js";import"./date-range-picker-B-dNmH1m.js";import"./divider-BI9tW1qT.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-6XaMN4pJ.js";import"./modal-drawer-B7CU3QM4.js";import"./mini-drawer-Dj8wQkgb.js";import"./expansion-panel--_gLVO8b.js";import"./open-icon-DcGzml4q.js";import"./file-picker-CHw0BQhR.js";import"./floating-action-button-wzxQPbzt.js";import"./inline-message-BKecgmUf.js";import"./kbd-NxJFxEcB.js";import"./key-item-8xuZfYUr.js";import"./keyboard-shortcut-7nvHNiWG.js";import"./label-value-06gdOjV6.js";import"./meter-group-CPW5t8EL.js";import"./page-state-DdcxjGPv.js";import"./paginator-CnjETXcG.js";import"./process-stepper-BB2stbFs.js";import"./radio-group-BaQvU3iO.js";import"./scaffold-ua4VSBPI.js";import"./secret-BnVY4wA4.js";import"./select-dropdown-DrVg23YJ.js";import"./select-DTvC0Ash.js";import"./skip-link-IAxZZ9ok.js";import"./slider-CXmbBvkG.js";import"./split-view-BDpcSaeA.js";import"./stack-CzasDS03.js";import"./stepper-B7nFEHoG.js";import"./switch-CpWcjskA.js";import"./table-CZoVgADs.js";import"./tab-panel-CDuzGElt.js";import"./time-picker-D3R8ZnWG.js";import"./timestamp-DTY3Ua8D.js";import"./toast-DId5oN2y.js";import"./toolbar-Ddg2nt1F.js";import"./tooltip-BHVODbPX.js";import"./tree-item-Beru7x2e.js";import"./view-switcher-B1N5uMXB.js";import"./deprecated-icon-button-mHDl57l3.js";import"./split-button-r9t3VfEW.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ze=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:t,Icon:s,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,t as D,s as I,Ze as L,a};
