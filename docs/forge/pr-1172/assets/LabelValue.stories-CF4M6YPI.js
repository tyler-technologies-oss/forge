import{A as p,b as r}from"./iframe-DVkCwayn.js";import{s as c,b as g,g as b}from"./utils-DdM9-TOU.js";import{o as u}from"./style-map-BF6zZzkZ.js";import{e as y}from"./class-map-3YYmKfcP.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Bju4UCGb.js";import"./app-bar-profile-button-DFI_vFS2.js";import{I as h,e as S}from"./tyler-icons-Cgf0s-mg.js";import"./menu-Ber7q_hx.js";import"./linear-progress-BvuLf7up.js";import"./list-BXQsrNmJ.js";import"./popover-BlNpEvTu.js";import"./overlay-28eYr5_V.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-e7_Ylra4.js";import"./avatar-Bd2S7TSu.js";import"./icon-button-Bo2inTOg.js";import"./autocomplete-djlZCL5B.js";import"./label-CiukcC95.js";import"./button-CS24bbOS.js";import"./button-toggle-group-DGFvxll2.js";import"./focus-indicator-DhDYsd3D.js";import"./checkbox-DGvqAXro.js";import"./switch-B389hJLx.js";import"./base-field-KxAV97UB.js";import"./text-field-xfFJOiAD.js";import"./backdrop-SMwLBDG5.js";import"./badge-qpaRsKmM.js";import"./banner-CklL7CQk.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-wJUYO31f.js";import"./calendar-Duf0iqiU.js";import"./card-Cz1s75aV.js";import"./chip-set-Bdz2ISmW.js";import"./state-layer-DRsbBcDh.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-BjRBTZNG.js";import"./date-picker-DeB9lMY7.js";import"./date-range-picker-CochveAZ.js";import"./divider-BjwgLGTs.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-Dzu2UNzD.js";import"./open-icon-C63OJEFz.js";import"./file-picker-BRIUhgc5.js";import"./floating-action-button-CQBjHcl5.js";import"./inline-message-Dej6nioH.js";import"./key-item-BJyLa84Z.js";import"./keyboard-shortcut-DhnIfPzf.js";import"./label-value-CJDyRgCt.js";import"./meter-group-DgcMR1kq.js";import"./page-state-xtTZreUO.js";import"./paginator-B8h--4DA.js";import"./scaffold-l7cEUk27.js";import"./secret-CyC8uSRM.js";import"./select-dropdown-BxDVA05v.js";import"./select-DIb25EHS.js";import"./skip-link-B-EM4o_Y.js";import"./slider-DFuOlD2Y.js";import"./split-view-2SeZDF7k.js";import"./stack-DYrRnd9D.js";import"./stepper-MjPaY5jZ.js";import"./table-ORbHM-GU.js";import"./tab-bar-Cy4PunTc.js";import"./time-picker-BRN7WKsh.js";import"./toast-ue0CkcVD.js";import"./toolbar-DdsEVZdr.js";import"./tooltip-CR19x8g7.js";import"./tree-item-C1VSINCT.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-BdEB7zoY.js";import"./split-button-C7o_BGd-.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
