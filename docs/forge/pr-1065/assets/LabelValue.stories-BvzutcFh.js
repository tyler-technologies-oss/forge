import{A as p,b as r}from"./iframe-CskTT7ts.js";import{s as c,b as g,g as b}from"./utils-CbU1ENex.js";import{o as u}from"./style-map-eJzqLCWt.js";import{e as y}from"./class-map-BEnfG2gi.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-D8n3fbCt.js";import"./expansion-panel-huBiB0DZ.js";import"./open-icon-BIuINibX.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-BoTxVLz8.js";import"./state-layer-DGD4bZzf.js";import"./focus-indicator-D-lQFdGQ.js";import{I as h,e as S}from"./tyler-icons-CBdZU-Tr.js";import"./menu-C6nMW0Tz.js";import"./linear-progress-CpNoMDP5.js";import"./list-DLtw5epo.js";import"./popover-D2EVteKl.js";import"./overlay-B2P-gJmC.js";import"./skeleton-C3LWj3F7.js";import"./avatar-CdkzLDyt.js";import"./icon-button-zpl7wQaZ.js";import"./autocomplete-6hIApqmg.js";import"./label-DrJN2C5E.js";import"./button-BABmEJ_8.js";import"./button-toggle-group-zaT0zJiE.js";import"./checkbox-DELXRA72.js";import"./switch-zkh9rIQ8.js";import"./base-field-B9Bc2PKe.js";import"./text-field-ZtSDIfll.js";import"./backdrop-CaFxRXEM.js";import"./badge-DbymPG3K.js";import"./banner-BAJ5SISV.js";import"./bottom-sheet-9RBhFU7Z.js";import"./dialog-CGP43TQA.js";import"./button-area-CApymC4g.js";import"./calendar-BvR3wgP6.js";import"./card-_1qFMg5x.js";import"./chip-set-bUWYBRUk.js";import"./circular-progress-C2aFmJj-.js";import"./color-picker-CzZGmap-.js";import"./date-picker-DNCPrlT6.js";import"./date-range-picker-oW4s5-P0.js";import"./divider-Dq-Slgl_.js";import"./base-drawer-CNdRFpRQ.js";import"./drawer-D79-TANn.js";import"./modal-drawer-DO8CNRCC.js";import"./mini-drawer-CPIvZj6f.js";import"./file-picker-MGvN7yMx.js";import"./floating-action-button-vPlyWO4R.js";import"./inline-message-kV-z6eDt.js";import"./key-item-BLr4yy4J.js";import"./keyboard-shortcut-48xwLAq2.js";import"./label-value-CmUo1iy-.js";import"./meter-group-BDGN-sMF.js";import"./page-state-CSOfrMln.js";import"./paginator-BPp8UVAe.js";import"./scaffold-CspBWUuL.js";import"./select-dropdown-Ca3Dg-uQ.js";import"./select-CXl_kzzN.js";import"./skip-link-DJ8nj4wc.js";import"./slider-CdxGdWQd.js";import"./split-view-DTztODcl.js";import"./stack-B5sNQmDm.js";import"./stepper-XlHrKuYI.js";import"./table-yzjJGpe6.js";import"./tab-bar-DalGZ9xP.js";import"./time-picker-Cj4YS3Pd.js";import"./toast-6Vom5Gl0.js";import"./toolbar-DM62Euqg.js";import"./tooltip-DxbQteKS.js";import"./tree-item-BhyCeE2C.js";import"./view-switcher-BguW3JYm.js";import"./deprecated-icon-button-BHAeF3fK.js";import"./split-button-D3oQNDfu.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${o}>
        <label slot="label">Label</label>
        ${e.empty?r`<span slot="value">n/a</span>`:r`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:m,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:m,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},s={},t={...c,render:()=>(h.define([S]),r`
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
}`,...a.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],We=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:s,Icon:t,Inline:l,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{a as C,s as D,t as I,We as L,l as a};
