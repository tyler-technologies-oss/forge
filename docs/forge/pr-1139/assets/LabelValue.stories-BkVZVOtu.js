import{A as p,b as r}from"./iframe-BBqNUtqv.js";import{s as c,b as g,g as b}from"./utils-BiqwBWR2.js";import{o as u}from"./style-map-D28ERKrd.js";import{e as y}from"./class-map-CEvcAoEA.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BM3yaH2N.js";import"./app-bar-profile-button-DO8LPKFt.js";import"./icon-BeLCtqW2.js";import{I as h,e as S}from"./tyler-icons-fQPhzpbf.js";import"./menu-C2B6p4S0.js";import"./linear-progress-BFUUfMoR.js";import"./list-mhgDPYym.js";import"./popover-By2PcE5Z.js";import"./overlay-CRZNSrJB.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-PgUpsvgP.js";import"./avatar-Moz453hk.js";import"./icon-button-ChuE_xy5.js";import"./focus-indicator-CE-2THdp.js";import"./state-layer-Cd1l0S13.js";import"./autocomplete-BtwNnY1E.js";import"./label-DyOrl3sk.js";import"./button-BtXQ1IZV.js";import"./button-toggle-group-Cv8-wtIl.js";import"./checkbox-D6rV2_uo.js";import"./switch-B2rzTqQ2.js";import"./base-field-Di1zrDqT.js";import"./text-field-E1U9wxdR.js";import"./backdrop-GUiAqIjQ.js";import"./badge-CqO6wuYu.js";import"./banner-R14gwpTb.js";import"./bottom-sheet-BSD_G8bg.js";import"./dialog-DizaH0k4.js";import"./button-area-el9K5A2h.js";import"./calendar-DWyjPIig.js";import"./card-DuBAKo1q.js";import"./chip-set-Cdiyywxr.js";import"./circular-progress-VkQlr-m0.js";import"./color-picker-DfwjXVnJ.js";import"./date-picker-DaTaRv0f.js";import"./date-range-picker-DozOBQAq.js";import"./divider-DWZZxUGY.js";import"./base-drawer-CUYrr1Bq.js";import"./drawer-DQMV3LVJ.js";import"./modal-drawer-CAkQ99Lk.js";import"./mini-drawer-DeJuS1k9.js";import"./expansion-panel-C5OOA5Mj.js";import"./open-icon-BWY2qJ40.js";import"./file-picker-BXm01oVD.js";import"./floating-action-button-CCDlITv3.js";import"./inline-message-D7-4ujiu.js";import"./key-item-C5RAG4gY.js";import"./keyboard-shortcut-d9I0suqy.js";import"./label-value-DXKX2EAH.js";import"./meter-group-CLzNiD8n.js";import"./page-state-YePJ_FiU.js";import"./paginator-B9W7iWIn.js";import"./scaffold-D43obOQJ.js";import"./secret-D7mU6Ite.js";import"./select-dropdown-DBQvAPrO.js";import"./select-C0gNsiPW.js";import"./skip-link-BBQAvDQo.js";import"./slider-BAeTh3lY.js";import"./split-view-BUxuZRNb.js";import"./stack-lN6wfo-4.js";import"./stepper-Rj10A4gQ.js";import"./table-BbR4wIvA.js";import"./view-switcher-3lgs2f7e.js";import"./tab-bar-DSHYiqrO.js";import"./time-picker-fKF6dCq6.js";import"./toast-CpPQrdpP.js";import"./toolbar-BXFK3ZY8.js";import"./tooltip-CtTv4J1q.js";import"./tree-item-CvOWbLnC.js";import"./deprecated-icon-button-CrDvhQFz.js";import"./split-button-DMxrLoLW.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
