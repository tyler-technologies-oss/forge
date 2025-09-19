import{x as o,E as m}from"./iframe-BciiVb0K.js";import{g as b,s as g,a as u}from"./utils-D7XrLKwY.js";import{o as d}from"./style-map-Djxu7jNR.js";import{e as y}from"./class-map-BifhVgB1.js";import"./feature-detection-BwPJgXni.js";import"./accordion-DewnkRfw.js";import"./expansion-panel-BUfwVSJ6.js";import"./index-5CPwzmQS.js";import"./app-bar-profile-button-gxpXoadJ.js";import"./state-layer-CLjAHnoF.js";import"./focus-indicator-B9KMEBVK.js";import{I as h,e as S}from"./icon-FzRol6Tl.js";import"./menu-CioYiqb-.js";import"./linear-progress-CfBpjTvZ.js";import"./list-ucSdTmS4.js";import"./popover-CCIxKg31.js";import"./overlay-B72xXWi5.js";import"./skeleton-1JRnRe4N.js";import"./avatar-DhTK7l8z.js";import"./icon-button-DpLi6_yQ.js";import"./autocomplete-B1FrCjfl.js";import"./label-73doN4RE.js";import"./button-Bjtey6FZ.js";import"./button-toggle-group-C96H3ppB.js";import"./checkbox-DYAJ7rMi.js";import"./switch-WjqoziFM.js";import"./base-field-DVdLvhJA.js";import"./text-field-DqRG6OMZ.js";import"./backdrop-uKV88UE6.js";import"./badge-CLz-L9Je.js";import"./banner-B9AGOWqC.js";import"./bottom-sheet-uQt0svWI.js";import"./dialog-CYY7E81K.js";import"./button-area-CyLBxpnc.js";import"./calendar-T0WD8t_P.js";import"./card-D9hC1-P3.js";import"./chip-set-DulgInB8.js";import"./circular-progress-Dih7K_6W.js";import"./color-picker-DRQcKKVY.js";import"./date-picker-BfahCCs1.js";import"./date-range-picker-DXPaVzXb.js";import"./divider-BXP9Ondm.js";import"./base-drawer-BHAH5ckk.js";import"./drawer-DSWr6wim.js";import"./modal-drawer-Cxt7ntIm.js";import"./mini-drawer-BAJSYwdd.js";import"./file-picker-D40GCFNb.js";import"./floating-action-button-BMYMk_3v.js";import"./inline-message-Bbte0O1S.js";import"./key-item-C0jo7JEw.js";import"./keyboard-shortcut-CDvIh3ZR.js";import"./label-value-BkhC4aHj.js";import"./meter-group-vToSBBUr.js";import"./page-state-C5yaja5I.js";import"./paginator-E1-Ev5po.js";import"./scaffold-CwOy6RR7.js";import"./select-dropdown-Du1d_a8s.js";import"./select-CJYQS9kr.js";import"./skip-link-k1_M2gBN.js";import"./slider-7FGCWCSZ.js";import"./split-view-D1fCEp8P.js";import"./stack-C3jLvSVi.js";import"./stepper-vvbxIg4W.js";import"./table-GIlIYoBK.js";import"./tab-bar-DdL2OpRI.js";import"./time-picker-PqMxmKNj.js";import"./toast-03iTv5n6.js";import"./toolbar-BtzJRWgQ.js";import"./tooltip-DcL6iv1E.js";import"./view-switcher-C2ZLZ4UU.js";import"./deprecated-icon-button--kS5FpP2.js";import"./split-button-XqnzyKsl.js";const c="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=u(e),r=d({...i,width:e.ellipsis?"100px":null});return o`
      <forge-label-value .empty=${e.empty} .ellipsis=${e.ellipsis} .inline=${e.inline} style=${r}>
        <label slot="label">Label</label>
        ${e.empty?o`<span slot="value">n/a</span>`:o`<span slot="value">A simple value</span>`}
      </forge-label-value>
    `},component:c,parameters:{actions:{disable:!0}},argTypes:{...b({tagName:c,exclude:["dense"]})},args:{empty:!1,ellipsis:!1,inline:!1}},s={},t={...g,render:()=>(h.define([S]),o`
      <forge-label-value>
        <forge-icon name="person" slot="icon"></forge-icon>
        <label slot="label">Name</label>
        <span slot="value">John Doe</span>
      </forge-label-value>
    `)},l={...g,args:{inline:!0}},a={args:{withIcon:!1},render:({inline:e,empty:i,ellipsis:r,withIcon:f,...v})=>{const n=u(v)??{};r&&(n.maxWidth="150px");const p=n?d(n):m;return console.log(p),o`
      <div class=${y({"forge-label-value":!0,"forge-label-value--inline":e,"forge-label-value--empty":i,"forge-label-value--ellipsis":r})} style=${p}>
        ${f?o`<svg class="forge-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Forge design system logo</title>
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z" />
            </svg>`:m}
        <span class="forge-label-value__label">Status</span>
        <span class="forge-label-value__value"> ${i?"n/a":r?"Lorem ipsum dolor sit, amet consectetur adipisicing elit.":"Active"} </span>
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
}`,...a.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],Je=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:a,Demo:s,Icon:t,Inline:l,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{a as C,s as D,t as I,Je as L,l as a};
