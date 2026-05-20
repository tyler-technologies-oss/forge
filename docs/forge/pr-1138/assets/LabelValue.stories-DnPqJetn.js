import{A as p,b as r}from"./iframe-ClGmR9ML.js";import{s as c,b as g,g as b}from"./utils-GdTrqNrR.js";import{o as u}from"./style-map-CU6AnQJw.js";import{e as y}from"./class-map-BoNhngJK.js";import"./service-adapter-8tADcN_b.js";import"./accordion-qgSKss-H.js";import"./app-bar-profile-button-DJ5WceCy.js";import{I as h,e as S}from"./tyler-icons-C6sewHdg.js";import"./menu-BqSO2mOe.js";import"./linear-progress-mfaOyWFY.js";import"./list-B_nEKClZ.js";import"./popover-Drh8MX47.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BtsO4Ege.js";import"./avatar-DdD-9PHi.js";import"./icon-button-BTDWQ4c3.js";import"./focus-indicator-BpIQOnul.js";import"./state-layer-CUeokLWr.js";import"./autocomplete-CM2WTLKD.js";import"./label-CJfGDViV.js";import"./button-DZleSkHk.js";import"./button-toggle-group-gz-cK6Ln.js";import"./checkbox-9QmVkWlY.js";import"./switch-Bnvfo3NB.js";import"./base-field-83n_qEkW.js";import"./text-field-Dqz3fgEC.js";import"./backdrop-B-u3npFo.js";import"./badge-DVlScodB.js";import"./banner-7P6NxKR1.js";import"./bottom-sheet-DOcWw--n.js";import"./dialog-uczvtxT1.js";import"./button-area-DXel3LTJ.js";import"./calendar-B1SyuKzf.js";import"./card-fafw8SWZ.js";import"./chip-set-DWBTzXq6.js";import"./circular-progress-DhyLGCcW.js";import"./color-picker-DfYyxfRx.js";import"./date-picker-COHGF912.js";import"./date-range-picker-b5VjUDct.js";import"./divider-Bmu8vAUK.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-DkxTDhj5.js";import"./modal-drawer-Cm-EtuRe.js";import"./mini-drawer-CMMNfkHz.js";import"./expansion-panel-B5WC0GGF.js";import"./open-icon-CzT4oZ2c.js";import"./file-picker-CSLIC2hD.js";import"./floating-action-button-dVQuh1UX.js";import"./inline-message-uXSkm0K0.js";import"./key-item-DCNf3dxi.js";import"./keyboard-shortcut-BD56o8oO.js";import"./label-value-kvRz9-RB.js";import"./meter-group-Cs3KXK5o.js";import"./page-state-COgvxgN-.js";import"./paginator-D4iMlsZQ.js";import"./scaffold-ALuq0Bgn.js";import"./secret-CC7f6WY3.js";import"./select-dropdown-ylQhgkZo.js";import"./select-BSyd0QSC.js";import"./skip-link-B_r6k6Xa.js";import"./slider-BHjsui9Y.js";import"./split-view-BCg2Z7VP.js";import"./stack-DGYl-onA.js";import"./stepper-BxgyOjMh.js";import"./table-CMk8QwSJ.js";import"./tab-bar-CNVpaYep.js";import"./time-picker-DHlssDzc.js";import"./toast-DvnHQVf5.js";import"./toolbar-Bxqi4dGz.js";import"./tooltip-Cdv6aXTQ.js";import"./tree-item-B4Ojjol5.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-CH9bKY2l.js";import"./split-button-mmwglkXb.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
