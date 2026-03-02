import{A as p,b as r}from"./iframe-CqmBxxxw.js";import{s as c,b as g,g as b}from"./utils-BQsOXphk.js";import{o as u}from"./style-map-B8hZhTlf.js";import{e as y}from"./class-map-CzloGBZg.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-CqMi06dt.js";import"./expansion-panel-Dv8zOBvR.js";import"./open-icon-Ppa_qRd_.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./app-bar-profile-button-BlWLmQYm.js";import"./state-layer-CDycYdPe.js";import"./focus-indicator-BGIlkLsU.js";import{I as h,e as S}from"./tyler-icons-D-59dOyn.js";import"./menu-BTcl7HkI.js";import"./linear-progress-DAF_c_Qg.js";import"./list-DTk5X6mh.js";import"./popover-DVUMrAH6.js";import"./overlay-CeKA2Vs0.js";import"./skeleton-BEzRyBrd.js";import"./avatar-C2qvkq1x.js";import"./icon-button-CRjf1LQA.js";import"./autocomplete-CegGfmLJ.js";import"./label-AubqXluV.js";import"./button-DX_DhTaU.js";import"./button-toggle-group-D_Dzo2at.js";import"./checkbox-Bv0J0WTO.js";import"./switch-DLphmdNU.js";import"./base-field-aEi7nshb.js";import"./text-field-BIGWGZBU.js";import"./backdrop-JQaHonK5.js";import"./badge-Bm2snKF_.js";import"./banner-DgosgY5h.js";import"./bottom-sheet-gC932635.js";import"./dialog-CMWG5v4z.js";import"./button-area-K02tIhA8.js";import"./calendar-BCEf_K1j.js";import"./card-CNCcq8o5.js";import"./chip-set-DBn6xXLh.js";import"./circular-progress-DvgFMT2P.js";import"./color-picker-CZRUznW_.js";import"./date-picker-u7KDKqx-.js";import"./date-range-picker-9e_gOFJf.js";import"./divider-B_OILhdX.js";import"./base-drawer-CgGVTosj.js";import"./drawer-CBK_snqa.js";import"./modal-drawer-B4G239H3.js";import"./mini-drawer-BLOTeDXk.js";import"./file-picker-D9NtBj-D.js";import"./floating-action-button-ssC_pXGx.js";import"./inline-message-aYzonakd.js";import"./key-item-C8tRJA5Y.js";import"./keyboard-shortcut-DzM9x902.js";import"./label-value-I-fyl3XO.js";import"./meter-group-YGymspQ1.js";import"./page-state-CiJNOtHF.js";import"./paginator-DH_pIg2D.js";import"./scaffold-DRWrbyLH.js";import"./select-dropdown-CUdZEGmO.js";import"./select-CUQ1S5RC.js";import"./skip-link-BkzvSbdd.js";import"./slider-BGv9hqya.js";import"./split-view-Bx4P3DOK.js";import"./stack-hYrAUTOo.js";import"./stepper-BTUXdC6E.js";import"./table-hhP3uOpY.js";import"./tab-bar-Co-yglDg.js";import"./time-picker-C27N63_e.js";import"./toast-BHWKLxmZ.js";import"./toolbar-CJhTaBYA.js";import"./tooltip-D6IG9xiN.js";import"./tree-item-BWiB__lk.js";import"./view-switcher-pdDr6yH3.js";import"./deprecated-icon-button-CdFBe4s0.js";import"./split-button-nqtOs812.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
