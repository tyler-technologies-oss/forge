import{A as n,b as r}from"./iframe-Ce60v_-f.js";import{s as c,b as g,g as b}from"./utils-E9-_u7-I.js";import{o as u}from"./style-map-BUz1CkTX.js";import{e as y}from"./class-map-Cl0H5FBP.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CnZm-K6y.js";import"./app-bar-profile-button-BNvLGhsJ.js";import{I as h,e as S}from"./tyler-icons-QQy6qJP1.js";import"./menu-zI_-gNeq.js";import"./linear-progress-BuTzYSPq.js";import"./list-tSsBcS4l.js";import"./popover-bYTsRCvd.js";import"./overlay-BNDDgKF7.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DjMJjvPK.js";import"./avatar-C7LF3Z_Q.js";import"./icon-button-s40OUgVh.js";import"./focus-indicator-Bp7--dbz.js";import"./state-layer-B1dog9AJ.js";import"./autocomplete-Cw8KtIWT.js";import"./label-BAtycYFU.js";import"./base-field-CfQJ5Dx6.js";import"./text-field-BheLYwpD.js";import"./backdrop-CIiH6Dag.js";import"./badge-BOH3n2xT.js";import"./banner-CwnAI-oM.js";import"./bottom-sheet-CbZ0b--i.js";import"./dialog-D0mbnYjz.js";import"./button-area-BkPr8tTE.js";import"./button-toggle-group-BmkR2IlZ.js";import"./button-CRDfQpBx.js";import"./calendar-D5YuQqI-.js";import"./card-M5cMUYXh.js";import"./checkbox-BDQi2elE.js";import"./chip-set-8-pGi0iM.js";import"./circular-progress-BqNemWjC.js";import"./color-picker-B693nt-O.js";import"./date-picker-DcvAm5Md.js";import"./date-range-picker-ZrKCuSmw.js";import"./divider-BWbyVKK_.js";import"./base-drawer-H_Vclf0e.js";import"./drawer-VrFasrSd.js";import"./modal-drawer-B5TY4Qqi.js";import"./mini-drawer-j_wQw-o8.js";import"./expansion-panel-CaAUr0KD.js";import"./open-icon-C5O7QBme.js";import"./file-picker-p3BFrVar.js";import"./floating-action-button-B2ZjBovy.js";import"./inline-message-Bn0Suvrv.js";import"./key-item-D5TXHike.js";import"./keyboard-shortcut-D86mLEga.js";import"./label-value-BBtWzpWn.js";import"./listbox-DgiMwbxN.js";import"./meter-group-DyVRbYi7.js";import"./page-state-CbLkYdiz.js";import"./paginator-TEYTmTG0.js";import"./radio-group-BFmbcTHj.js";import"./scaffold-DgAVuyRY.js";import"./secret-BjSHOYqm.js";import"./option-BZF4Fqol.js";import"./select-dropdown-W7_rCzCh.js";import"./select-Do1dXFcP.js";import"./skip-link-RT48FQCp.js";import"./slider-Br6D5Jvw.js";import"./split-view-DxDfNJg8.js";import"./stack-BJj2fenZ.js";import"./stepper-CUYiZRPA.js";import"./switch-7MgN0hVZ.js";import"./table-De7eUGOE.js";import"./tab-panel-DkdaykXt.js";import"./time-picker-Cqq0dvKU.js";import"./timestamp-DDvrGAl4.js";import"./toast-D87Me6UN.js";import"./toolbar-DlV02oAk.js";import"./tooltip-Bb9XI6kj.js";import"./tree-item-D-dyzBzd.js";import"./view-switcher-Cke0UXCI.js";import"./deprecated-icon-button-BIvpUPCv.js";import"./split-button-b5_iD7P6.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
