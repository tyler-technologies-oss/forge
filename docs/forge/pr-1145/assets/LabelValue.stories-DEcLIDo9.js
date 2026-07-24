import{A as p,b as r}from"./iframe-ZKsQ3dxk.js";import{s as c,b as g,g as b}from"./utils-Cu3TicFl.js";import{o as u}from"./style-map-BKNJDthy.js";import{e as y}from"./class-map-DmrdWAdp.js";import"./service-adapter-8tADcN_b.js";import"./accordion-D30-8Mvb.js";import"./app-bar-profile-button-CnE6PBrJ.js";import{I as h,e as S}from"./tyler-icons-tW5eMRUE.js";import"./menu-Cz5xb5sT.js";import"./linear-progress-BvuLf7up.js";import"./list-BUojCRje.js";import"./popover-CJE61R5F.js";import"./overlay-BZbN9o6E.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BneGiueD.js";import"./avatar-8UCryvLF.js";import"./icon-button-CfxoQW4h.js";import"./focus-indicator-vJw9eHJN.js";import"./state-layer-DRsbBcDh.js";import"./autocomplete-Cy93V2e-.js";import"./label-BHcEV9Ut.js";import"./base-field-CIqv2hqt.js";import"./text-field-C3KWch7F.js";import"./backdrop-SMwLBDG5.js";import"./badge-CBD69AlR.js";import"./banner-BDvyF1l9.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-CQc1sMZ9.js";import"./button-toggle-group-DYrvrPjk.js";import"./button-_yJ7umJ0.js";import"./calendar-BNZBu6sE.js";import"./card-CZ-3g9yo.js";import"./checkbox-BF4WcT9O.js";import"./chip-set-BGk8KjTw.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-CzGQJ9zn.js";import"./date-picker-CQOhjeje.js";import"./date-range-picker-CGAq0PuI.js";import"./divider-DXLh0Mi6.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-DVi7qOQC.js";import"./open-icon-CyWZw3Np.js";import"./file-picker-RNYZWWqR.js";import"./floating-action-button-4kOneBGA.js";import"./inline-message-Dej6nioH.js";import"./key-item-BJDGiofg.js";import"./keyboard-shortcut-h5c_xTXF.js";import"./label-value-CJDyRgCt.js";import"./meter-group-CbnD3HXe.js";import"./page-state-xtTZreUO.js";import"./paginator-BuSlG_ih.js";import"./radio-group-BOx0_eFM.js";import"./scaffold-l7cEUk27.js";import"./secret-BGL_KPVQ.js";import"./select-dropdown-DCsuvBzq.js";import"./select-1eeA8eni.js";import"./skip-link-BRAZ6Jei.js";import"./slider-BdMxFuX4.js";import"./split-view-CVyswJ4d.js";import"./stack-DYrRnd9D.js";import"./stepper-DSm6lp_l.js";import"./switch-DNykGc5a.js";import"./table-75S0MNRZ.js";import"./tab-bar-DXMSfX6i.js";import"./time-picker-C9_Jwpbs.js";import"./toast-C6gbBfwv.js";import"./toolbar-BDHP5EzM.js";import"./tooltip-BId7sMvb.js";import"./tree-item-0u3N5FMH.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-C-q3Ouz2.js";import"./split-button-DW9vpG7w.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ge=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,Ge as L,a};
