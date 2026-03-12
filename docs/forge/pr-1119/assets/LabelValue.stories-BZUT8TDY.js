import{A as p,b as r}from"./iframe-E0MPjD_W.js";import{s as c,b as g,g as b}from"./utils-Ckg8JNDy.js";import{o as u}from"./style-map-BrTEt72J.js";import{e as y}from"./class-map-gKTPIOYK.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B-GpfEgz.js";import"./app-bar-profile-button-BYRz9wl8.js";import{I as h,e as S}from"./tyler-icons-hEV9SdRe.js";import"./menu-r173F_DK.js";import"./linear-progress-C9rKJPwB.js";import"./list-Dokiv61p.js";import"./popover-BCVIx3D1.js";import"./overlay-Cgb5IAlb.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-7bCDpj6R.js";import"./avatar-B4QFyaa5.js";import"./icon-button-Bc6oVsA8.js";import"./focus-indicator-DAaQEzxM.js";import"./state-layer-D0SSeJ16.js";import"./autocomplete-C78MoyRJ.js";import"./label-6rc0QyL9.js";import"./button-BZE1KUUl.js";import"./button-toggle-group-DKUgvTLL.js";import"./checkbox-GJD21Guw.js";import"./switch-ByEDesx_.js";import"./base-field-OixKx3fo.js";import"./text-field-BiRJUbiq.js";import"./backdrop-Ck2ckKlw.js";import"./badge-XYHrFVaD.js";import"./banner-CPbPkwJZ.js";import"./bottom-sheet-CTDZIrhF.js";import"./dialog-CDD3XYiE.js";import"./button-area-EbzmfHAJ.js";import"./calendar-B-GPEAAG.js";import"./card-kkctYUou.js";import"./chip-set-Bv8rx2wD.js";import"./circular-progress-Ccu7KP3W.js";import"./color-picker-DhyebuO7.js";import"./date-picker-Bl4ILd-n.js";import"./date-range-picker-DkNP1OdI.js";import"./divider-DKHUvd_w.js";import"./base-drawer-DRuppJk6.js";import"./drawer-wME3NLu2.js";import"./modal-drawer-Cpnb3CS7.js";import"./mini-drawer-CF6IVjP9.js";import"./expansion-panel-xnpQpPQB.js";import"./open-icon-CJWxkT_M.js";import"./file-picker-Bi6MoWNP.js";import"./floating-action-button-fbTXQ1Zr.js";import"./inline-message-MDZIyJNO.js";import"./key-item-Dyta4LcB.js";import"./keyboard-shortcut-C9Iu6Gw7.js";import"./label-value-342323er.js";import"./meter-group-B0iS-6ij.js";import"./page-state-BXhyhEYZ.js";import"./paginator--OSb79Xc.js";import"./scaffold-DpCXKOUM.js";import"./select-dropdown-yMG0v_zu.js";import"./select-CqakW8W5.js";import"./skip-link-DOD3p-nB.js";import"./slider-Dc6zTr-y.js";import"./split-view-CEAr0dlG.js";import"./stack-DTbT3KUK.js";import"./stepper-C03m5i-8.js";import"./table-zSOkEG1O.js";import"./tab-bar-Sx3ulCGC.js";import"./time-picker-C3oMF3DA.js";import"./toast-BzctUBSb.js";import"./toolbar-CFdgiwTS.js";import"./tooltip-P-CrpSEv.js";import"./tree-item-BpGCgLob.js";import"./view-switcher-C5b2QH2R.js";import"./deprecated-icon-button-DY3vI_rH.js";import"./split-button-wyGXA5uJ.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${o}>
        <label slot="label">Label</label>
        ${e.empty?r`<span slot="value">n/a</span>`:r`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:m,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},t={},s={...c,render:()=>(h.define([S]),r`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <label slot="label">Name</label>
        <span slot="value">John Doe</span>
      </forge-label-value>
    `)},l={...c,args:{inline:!0}},a={args:{withIcon:!1},render:({inline:e,empty:i,ellipsis:o,withIcon:d,...f})=>{const n=g(f)??{};o&&(n.maxWidth="150px");const v=n?u(n):p;return r`
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
    `}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],ke=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:t,Icon:s,Inline:l,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{a as C,t as D,s as I,ke as L,l as a};
