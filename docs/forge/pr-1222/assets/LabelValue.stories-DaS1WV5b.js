import{A as n,b as r}from"./iframe-CSIdYrZJ.js";import{s as c,b as g,g as b}from"./utils-CL5ue9IV.js";import{o as u}from"./style-map-BfSygJjt.js";import{e as y}from"./class-map-D6T1Y6D0.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BjTSqfO8.js";import"./app-bar-menu-button-z7jWlLxN.js";import"./app-bar-profile-button-eteLot7q.js";import{I as h}from"./icon-D0ZxlEvQ.js";import"./menu-BYkMwpRl.js";import{i as S}from"./tyler-icons-BSgf1RSL.js";import"./linear-progress-kQO48laS.js";import"./list-DlI3fnDe.js";import"./popover-o0o6y1Gd.js";import"./overlay-C1ZJYdef.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-EUyK87zq.js";import"./list-item-Dby-tdmr.js";import"./avatar-bb5PVuJ_.js";import"./icon-button-RYDssO7r.js";import"./autocomplete-XFrvtvL1.js";import"./label-BOLaqKZc.js";import"./base-field-CFZKx8zr.js";import"./focus-indicator-Da-r1W3d.js";import"./text-field-C5XkiU4l.js";import"./backdrop-C9lBlb_d.js";import"./badge-D3Q04J38.js";import"./banner-SJDp0s89.js";import"./bottom-sheet-uFNq9NzU.js";import"./dialog-DZ0jhAl1.js";import"./button-area-BHQgludf.js";import"./button-toggle-group-BSTAcSXy.js";import"./button-DCvaMBF6.js";import"./calendar-CPmI1-a5.js";import"./card-Q8geSosK.js";import"./checkbox-TAUAIiTt.js";import"./chip-set-sihMPc5A.js";import"./state-layer-CZIH5add.js";import"./circular-progress-CfoxEQ_B.js";import"./color-picker-C4IddSiB.js";import"./date-picker-ey3n0FY-.js";import"./date-range-picker-jSjD3spc.js";import"./divider-C3Bc89ld.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-6XaMN4pJ.js";import"./modal-drawer-B7CU3QM4.js";import"./mini-drawer-Dj8wQkgb.js";import"./expansion-panel-LYbFtMEz.js";import"./open-icon-Cr7aZ4m7.js";import"./file-picker-DqqhFYyP.js";import"./floating-action-button-BmG51IN7.js";import"./inline-message-BKecgmUf.js";import"./kbd-DaxYzKDU.js";import"./key-item-DjLGZjQf.js";import"./keyboard-shortcut-XXptfkk2.js";import"./label-value-06gdOjV6.js";import"./meter-group-BwTZGGLL.js";import"./page-state-DdcxjGPv.js";import"./paginator-CvWFNQrl.js";import"./radio-group-DVd9gRQy.js";import"./scaffold-ua4VSBPI.js";import"./secret-Ch_uQdS8.js";import"./select-dropdown-BaTKvB6z.js";import"./select-CdnIVU71.js";import"./skip-link-DrPq12Dl.js";import"./slider-DCeMrx6C.js";import"./split-view-DgVqb2ik.js";import"./stack-CzasDS03.js";import"./stepper-VfJ513Nv.js";import"./switch-BXjjbs66.js";import"./table-POwo77IT.js";import"./tab-panel-foF_Y5OA.js";import"./time-picker-DEdOA6LR.js";import"./timestamp-DZjGyhwW.js";import"./toast-DB77gEhG.js";import"./toolbar-D-Vo5x4Q.js";import"./tooltip-pr1nZvAZ.js";import"./tree-item-SDUE-6I1.js";import"./view-switcher-B1N5uMXB.js";import"./deprecated-icon-button-DOQ2iNHR.js";import"./split-button-C_MwjRCH.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ye=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:t,Icon:s,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,t as D,s as I,Ye as L,a};
