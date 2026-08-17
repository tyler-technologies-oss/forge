import{A as p,b as r}from"./iframe-C_-ty6fL.js";import{s as c,b as g,g as b}from"./utils-BGcxM-UF.js";import{o as u}from"./style-map-Ch9RkZxO.js";import{e as y}from"./class-map-CgsGLsz3.js";import"./service-adapter-8tADcN_b.js";import"./accordion-MAATiX3E.js";import"./app-bar-profile-button-COoemxu4.js";import{I as h,e as S}from"./tyler-icons-D9mSLRy4.js";import"./menu-CjTe72q_.js";import"./linear-progress-CsGp1g6o.js";import"./list-DC7JKMAb.js";import"./popover-DYZnCWEK.js";import"./overlay-6K9_GJW8.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CBiQXI5A.js";import"./avatar-IluyZrqh.js";import"./icon-button-C9FFS7_M.js";import"./focus-indicator-D2aoOwWz.js";import"./state-layer-Wu0zWm6m.js";import"./autocomplete-C1O4CziZ.js";import"./label-BHeKTlW4.js";import"./base-field-iqNZmbaE.js";import"./text-field-CFg9xGrE.js";import"./backdrop-3KzDwztH.js";import"./badge-zCFk7F59.js";import"./banner-CBphGk1O.js";import"./bottom-sheet-DmcGxX1L.js";import"./dialog-D9E1kPE3.js";import"./button-area-EwDZ0RHL.js";import"./button-toggle-group-BSI9DP6Q.js";import"./button-D_0nYvW8.js";import"./calendar-BTqk5J9c.js";import"./card-COk2gUDk.js";import"./checkbox-Bgdfqk2y.js";import"./chip-set-DAX24lfa.js";import"./circular-progress-DIduwjig.js";import"./color-picker-BP8zg1aU.js";import"./date-picker-D3K99V7Y.js";import"./date-range-picker-BxoO--wA.js";import"./divider-CZo7glzo.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DV7w1-5L.js";import"./modal-drawer-BwzSP7R6.js";import"./mini-drawer-liQMnkLy.js";import"./expansion-panel-R28_EX7C.js";import"./open-icon-g3bM26yh.js";import"./file-picker-_C-FIMcC.js";import"./floating-action-button-BPDVwd8N.js";import"./inline-message-fj34p3Px.js";import"./key-item-CNGSkFgy.js";import"./keyboard-shortcut-BQbj3zB9.js";import"./label-value-cTsUvwyw.js";import"./meter-group-Cfc6ZBIX.js";import"./page-state-DDjhdZbK.js";import"./paginator-_tU1nHi9.js";import"./radio-group-DEqXjA8X.js";import"./scaffold-CufLEZ-a.js";import"./secret-CuDTYl7X.js";import"./select-dropdown-BhU0S_8v.js";import"./select-23OOIxFK.js";import"./skip-link-BMuQG7xt.js";import"./slider-DsTYji5G.js";import"./split-view-DbnpYREW.js";import"./stack-Bc7kWG9C.js";import"./stepper-CXqbzh1C.js";import"./switch-DWfopykd.js";import"./table-CbeKKlW0.js";import"./tab-panel-D_IjWCaA.js";import"./time-picker-Bor_aKaw.js";import"./timestamp-sz8jqDdj.js";import"./toast-ydcEff9Q.js";import"./toolbar-CF49daLt.js";import"./tooltip-BFJ4vWye.js";import"./tree-item-BMODedYf.js";import"./view-switcher-BSHD_isP.js";import"./deprecated-icon-button-rZUZnjxh.js";import"./split-button-vbF-2qS2.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Ke=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:s,Icon:t,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,s as D,t as I,Ke as L,a};
