import"./lit-element-B3QVTycr.js";import{x as o,E as m}from"./lit-html-CuBe1DX_.js";import{g as C,s as x,b as $}from"./utils-DXeqrvgL.js";import{o as A}from"./style-map-CeP1Mntv.js";import{e as M}from"./class-map-CuXcqkpw.js";import"./feature-detection-CY6TVbRZ.js";import"./accordion-BRn7SW34.js";import"./expansion-panel-Bf3k9a5a.js";import"./index-CiLSBptl.js";import"./app-bar-profile-button-BVLv3bOe.js";import"./state-layer-sxQMIn2c.js";import"./focus-indicator-NbLDNrYT.js";import{I as H}from"./icon-D5yjdXv8.js";import"./menu-D9NLnmlg.js";import{d as L}from"./index-RsKXMDm2.js";import"./linear-progress-BTmLtQyy.js";import"./list-DOSD_vEq.js";import"./popover-DBZ1E3cM.js";import"./overlay-8j8D8Fh1.js";import"./skeleton-DtUhqb6H.js";import"./avatar-BWgToAik.js";import"./icon-button-4fx-LScl.js";import"./autocomplete-D-TdFpNa.js";import"./label-BYO0DIp3.js";import"./button-CutPPNni.js";import"./button-toggle-group-C9JpSiFv.js";import"./checkbox-DwEe44-q.js";import"./switch-Clw9p9oC.js";import"./base-field-clkE_wGg.js";import"./text-field-BwqsFKuZ.js";import"./backdrop-jq8rFG8Z.js";import"./badge-N67hmSaz.js";import"./banner-D4viMWcU.js";import"./bottom-sheet-C-agtKY-.js";import"./dialog-C3DUV3Gv.js";import"./button-area-D5z4Qv2i.js";import"./calendar-BS7cV5QE.js";import"./card-a2QiXPzd.js";import"./chip-set-DKdHKrJ0.js";import"./circular-progress-_R2O5GKK.js";import"./color-picker-NiCjfu7D.js";import"./date-picker-C9-pXBl6.js";import"./date-range-picker-BSksB4-Z.js";import"./divider-Cb0KSfcl.js";import"./base-drawer-D1JU0w69.js";import"./drawer-DaOS-IYi.js";import"./modal-drawer-DhKRuBwR.js";import"./mini-drawer-DqPi7Wyw.js";import"./file-picker-Lrj_0LoL.js";import"./floating-action-button-DpM1uSuo.js";import"./inline-message-BqwREKp3.js";import"./key-item-Buf2jZTh.js";import"./keyboard-shortcut-Cht-19cs.js";import"./label-value-CvLCRz5B.js";import"./meter-group-QEOdWLJM.js";import"./page-state-BPazfpGD.js";import"./paginator-DrKy-SVn.js";import"./scaffold-BHN26cwL.js";import"./select-dropdown-DuumYXHS.js";import"./select-C5MpHAi7.js";import"./skip-link-DS-CmTbk.js";import"./slider-C2umfVsV.js";import"./split-view-BcyiVqBm.js";import"./stack-B6UBpofK.js";import"./stepper-ydsrVuEd.js";import"./table-J8Lbrwec.js";import"./tab-bar-BcTLttPU.js";import"./time-picker-BGWaiu8w.js";import"./toast-BhVYtotM.js";import"./toolbar-D4yu8hpj.js";import"./tooltip-BgQLBWUo.js";import"./view-switcher-qE3Ob8TM.js";import"./deprecated-icon-button-CHiknbON.js";import"./split-button-B0Zrf59V.js";const c="forge-label-value",P={title:"Components/Label Value",render:e=>{const i=$(e),r=A({...i,width:e.ellipsis?"100px":null});return o`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${r}>
        <label slot="label">Label</label>
        ${e.empty?o`<span slot="value">n/a</span>`:o`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:c,parameters:{actions:{disable:!0}},argTypes:{...C({tagName:c,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},s={},t={...x,render:()=>(H.define([L]),o`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <label slot="label">Name</label>
        <span slot="value">John Doe</span>
      </forge-label-value>
    `)},l={...x,args:{inline:!0}},a={args:{withIcon:!1},render:({inline:e,empty:i,ellipsis:r,withIcon:V,...z})=>{const n=$(z)??{};r&&(n.maxWidth="150px");const p=n?A(n):m;return console.log(p),o`
      <div class=${M({"forge-label-value":!0,"forge-label-value--inline":e,"forge-label-value--empty":i,"forge-label-value--ellipsis":r})} style=${p}>
        ${V?o`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`:m}
        <span class="forge-label-value__label">Status</span>
        <span class="forge-label-value__value"> ${i?"n/a":r?"Lorem ipsum dolor sit, amet consectetur adipisicing elit.":"Active"} </span>
      </div>
    `}};var g,u,d;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(d=(u=s.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};var f,v,b;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(b=(v=t.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var y,h,S;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    inline: true
  }
}`,...(S=(h=l.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};var w,I,_;a.parameters={...a.parameters,docs:{...(w=a.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
      cssVarArgs['maxWidth'] = '150px';
    }
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    console.log(style);
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
}`,...(_=(I=a.parameters)==null?void 0:I.docs)==null?void 0:_.source}}};const D=["Demo","Icon","Inline","CSSOnly"],ro=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:s,Icon:t,Inline:l,__namedExportsOrder:D,default:P},Symbol.toStringTag,{value:"Module"}));export{a as C,s as D,t as I,ro as L,l as a};
