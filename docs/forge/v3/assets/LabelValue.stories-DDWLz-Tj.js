import{A as n,b as r}from"./iframe-OKJOnn65.js";import{s as c,b as g,g as b}from"./utils-DqCQojVn.js";import{o as u}from"./style-map-SzPyW2OI.js";import{e as y}from"./class-map-8OXVK6QY.js";import"./service-adapter-8tADcN_b.js";import"./accordion-1Wb_5jme.js";import"./app-bar-menu-button-C5Ej8WRa.js";import"./app-bar-profile-button-CmW-_7h2.js";import{I as h}from"./icon-kMesbXGR.js";import"./menu-S-LzcTKH.js";import{i as S}from"./tyler-icons-_o7MAz4c.js";import"./linear-progress-BuMeIIdZ.js";import"./list-DniZS3dz.js";import"./popover-BMhk1re9.js";import"./overlay-9hcj7XWo.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-BCR8jCNf.js";import"./list-item-NCG5mfvg.js";import"./avatar-BD9OiFwz.js";import"./icon-button-NPCdlZc1.js";import"./autocomplete-CWDXghWg.js";import"./label-Bl7KteXW.js";import"./base-field-CUfsciqC.js";import"./focus-indicator-CILpCuRH.js";import"./text-field-Bd9kQUjl.js";import"./backdrop-ngk7d2eo.js";import"./badge-D7ByaKb1.js";import"./banner-Dj_yicYL.js";import"./bottom-sheet-C_13ai4K.js";import"./dialog-Bk_ymvZl.js";import"./button-area-DEc-Y5NJ.js";import"./button-toggle-group-DaSyTry0.js";import"./button-JBPpIXzS.js";import"./calendar-DiKz6ASn.js";import"./card-DIztIszQ.js";import"./checkbox-C8C3ZEET.js";import"./chip-set-BjblqTHO.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-BRkTX426.js";import"./date-picker-9TMg5NlR.js";import"./date-range-picker-CRU5UBGP.js";import"./divider-C7NPqQ_p.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-CaXumgMV.js";import"./open-icon-DQO8ZpC6.js";import"./file-picker-DDbL7eje.js";import"./floating-action-button-BswSsqCa.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-BYOFOnuE.js";import"./key-item-DtrNivLq.js";import"./keyboard-shortcut-PHWl3_TT.js";import"./label-value-C0-wovkK.js";import"./listbox-DkEwpF-v.js";import"./meter-group-C0XHcbF1.js";import"./page-state-DvaZGddB.js";import"./paginator-Du_WMkyQ.js";import"./process-stepper-DWmT4YH7.js";import"./radio-group-ChPOIDQB.js";import"./scaffold-Ca9xBuAs.js";import"./secret-Csuc8QZ7.js";import"./option-BIFfXZ-2.js";import"./select-dropdown-BUFtyu3X.js";import"./select-CYu1Y41G.js";import"./skip-link-DjYIvV0v.js";import"./slider-D-X1ZtdA.js";import"./split-view-R8xqalnw.js";import"./stack-BNz3vfmV.js";import"./stepper-DbtBrf1W.js";import"./switch-BhTs4Wa_.js";import"./table-6j8XgImK.js";import"./tab-panel-C-4sLZyC.js";import"./time-picker-CBuR4WRJ.js";import"./timestamp-6Xy2Capg.js";import"./toast-vKxcNGGA.js";import"./toolbar-DuLLCExW.js";import"./tooltip-Brrj6zMM.js";import"./tree-item-ueSn6bxD.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-CpreS6D-.js";import"./split-button-B9U9XQqs.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Icon","Inline","CSSOnly"],rr=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:l,Demo:t,Icon:s,Inline:a,__namedExportsOrder:I,default:w},Symbol.toStringTag,{value:"Module"}));export{l as C,t as D,s as I,rr as L,a};
