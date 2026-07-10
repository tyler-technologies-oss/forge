import{A as p,b as r}from"./iframe-DC_N5IcN.js";import{s as c,b as g,g as b}from"./utils-DKoLLPTK.js";import{o as u}from"./style-map-I61V31om.js";import{e as y}from"./class-map-C5osXHh8.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CYnuzJg4.js";import"./app-bar-profile-button-W194oXUx.js";import{I as h,e as S}from"./tyler-icons-BRdXe8nV.js";import"./menu-BpTfx0qo.js";import"./linear-progress-DLb8lZjg.js";import"./list-C9MM0Na1.js";import"./popover-CbRRoZuj.js";import"./overlay-DfNZRYj1.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BOQ63418.js";import"./avatar-BC-YziJB.js";import"./icon-button-DQohdgv8.js";import"./focus-indicator-jaUmRQAW.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-CBA-Hi-U.js";import"./label-CyrlcG4M.js";import"./button-CZW0UC5P.js";import"./button-toggle-group-BJQSg8JY.js";import"./checkbox-r7C9zLrI.js";import"./switch--z0pAjmI.js";import"./base-field-xze3y4FA.js";import"./text-field-B5vK9fdP.js";import"./backdrop-Br-v5NXK.js";import"./badge-DSXp8VjC.js";import"./banner-B62NpYIf.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-C9_5mr9Q.js";import"./calendar-CsfZhSHp.js";import"./card-NvMoFFhf.js";import"./chip-set-DhLnBCRP.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-EWlh_TsF.js";import"./date-picker-CXgpHKr2.js";import"./date-range-picker-C0zcw6bG.js";import"./divider-DZAsJI57.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-CJIc22cs.js";import"./open-icon-DgrJm0RL.js";import"./file-picker-fDH8B7mM.js";import"./floating-action-button-BVrE2D0p.js";import"./inline-message-EO-dHXbB.js";import"./key-item-D7Fu9PuJ.js";import"./keyboard-shortcut-BdN1jDga.js";import"./label-value-C46r41pN.js";import"./meter-group-CmKv-qpG.js";import"./page-state-BeEclPwI.js";import"./paginator-Dn0szu1z.js";import"./scaffold-B-1oYF3d.js";import"./secret-C4ZE4G_5.js";import"./select-dropdown-BX2q-vPb.js";import"./select-7vIn5Mi8.js";import"./skip-link-S3kChz9l.js";import"./slider-BMBGBkWO.js";import"./split-view-CHK8DF70.js";import"./stack-DskzmGQg.js";import"./stepper-DwuFzppq.js";import"./table-ByAWG19O.js";import"./tab-bar-CIVZFOq0.js";import"./time-picker-CwBTm2-R.js";import"./toast-CxWJHMpv.js";import"./toolbar-B86WXwPP.js";import"./tooltip-CiOLdt2p.js";import"./tree-item-C6jME5du.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-DdlA9zCX.js";import"./split-button-D5k4i9tS.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
