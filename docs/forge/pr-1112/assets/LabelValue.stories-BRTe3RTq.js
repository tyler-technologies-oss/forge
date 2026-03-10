import{A as p,b as r}from"./iframe-BqpmPwq_.js";import{s as c,b as g,g as b}from"./utils-Dyztg_A4.js";import{o as u}from"./style-map-DSsT6G9H.js";import{e as y}from"./class-map-BwRwiTuv.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BU1Cztks.js";import"./app-bar-profile-button--n3rypGr.js";import{I as h,e as S}from"./tyler-icons-iDvhFOMC.js";import"./index-DTwfV0k0.js";import"./menu-DDzUQVjY.js";import"./linear-progress-DJCUZyG6.js";import"./list-DxoqoHfM.js";import"./popover-BblH4OjR.js";import"./overlay-Btn1tEyh.js";import"./skeleton-Ctt20BWR.js";import"./avatar-CvKEOuDy.js";import"./icon-button-v27EN9qr.js";import"./focus-indicator-BHHgalS6.js";import"./state-layer-D0PE-_Ks.js";import"./autocomplete-BlDK21st.js";import"./label-DK09rgTn.js";import"./button-Bttm48HU.js";import"./button-toggle-group-fRLgIYT2.js";import"./checkbox-HEdstB8E.js";import"./switch-kS9Yl3-l.js";import"./base-field-CpGwF63l.js";import"./text-field-BDwQUTE6.js";import"./backdrop-D_yGNC2E.js";import"./badge-CzDPFYFX.js";import"./banner-VPrSRlrP.js";import"./bottom-sheet-Ca7i8NLD.js";import"./dialog-Be0VDz-Q.js";import"./button-area-Bl4cRS5Z.js";import"./calendar-Bj1ac908.js";import"./card-CoIYVQUN.js";import"./chip-set-hes5nmbh.js";import"./circular-progress-CqL7HYv9.js";import"./color-picker-N_nJurDj.js";import"./date-picker-DHP4YgNB.js";import"./date-range-picker-BU0ZOthR.js";import"./divider-CFdicjKI.js";import"./base-drawer-BnnNJiqc.js";import"./drawer-Bhr3bs1s.js";import"./modal-drawer-mTx20ZEu.js";import"./mini-drawer-bZpKaAxY.js";import"./expansion-panel-fbEqa6VA.js";import"./open-icon-CU8SdVAE.js";import"./file-picker-D9iNplof.js";import"./floating-action-button-CXeBfAqA.js";import"./inline-message-CrfY1HGc.js";import"./key-item-DR4b-UFa.js";import"./keyboard-shortcut-BwrfozYa.js";import"./label-value-BFzJp2nK.js";import"./meter-group-iYlnghzU.js";import"./page-state-FbD8mDEF.js";import"./paginator-Bhedg_4p.js";import"./scaffold-1Jx5bjjO.js";import"./select-dropdown-BZueEZut.js";import"./select-N6QI5bpB.js";import"./skip-link-C4WYYdDd.js";import"./slider-ChK9fPKP.js";import"./split-view-D5yp_aJU.js";import"./stack-DxVg50Xs.js";import"./stepper-BmwfSbtn.js";import"./table-kMRHoJqG.js";import"./tab-bar-LmdSlEk9.js";import"./time-picker-rTrACsUY.js";import"./toast-D5sd-Bnb.js";import"./toolbar-Bf50hayz.js";import"./tooltip-CNBOgnFN.js";import"./tree-item-Csw03lqZ.js";import"./view-switcher-CcYqDgDr.js";import"./deprecated-icon-button-__9UdqlR.js";import"./split-button-D9FHPCu1.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
