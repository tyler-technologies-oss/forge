import{A as n,b as r}from"./iframe-xkxJQMA3.js";import{s as c,b as g,g as b}from"./utils-Cc_oRLiJ.js";import{o as u}from"./style-map-CiKfmqPC.js";import{e as y}from"./class-map-BGnUG0WX.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B5YFS3rn.js";import"./app-bar-menu-button-Dk1fkbj-.js";import"./app-bar-profile-button-VQtAflmX.js";import{I as h}from"./icon-CTJHsNpY.js";import"./menu-Be51duky.js";import{i as S}from"./tyler-icons-D62AQmQV.js";import"./linear-progress-BuMeIIdZ.js";import"./list-ip2ib_Bz.js";import"./popover-DoQj6sL6.js";import"./overlay-CnHwB7Zc.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-FmKl34ig.js";import"./list-item-B5Smd2RI.js";import"./avatar-CGWQd0jJ.js";import"./icon-button-Bcp4Vx6c.js";import"./autocomplete-h53yFeSz.js";import"./label-DTGg67i-.js";import"./base-field-Cvd5WuZP.js";import"./focus-indicator-ChAMx-S6.js";import"./text-field-1XWmdId_.js";import"./backdrop-ngk7d2eo.js";import"./badge-Dl-LgDVA.js";import"./banner-Bcn5wHSv.js";import"./bottom-sheet-Bc5g48ar.js";import"./dialog-Bk-hd-_h.js";import"./button-area-rTkxn6yw.js";import"./button-toggle-group-CZyTtF8T.js";import"./button-B533j5XO.js";import"./calendar-B628fXxT.js";import"./card-CStXZYBQ.js";import"./checkbox-M11aOjjs.js";import"./chip-set-DLNJjsSI.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-4Eae0iN2.js";import"./date-picker-BZmI4LPB.js";import"./date-range-picker-DnW1lPOE.js";import"./divider-CifZUp5Y.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-7i1KrNC4.js";import"./open-icon-DFfFTKwM.js";import"./file-picker-Z8H_fcul.js";import"./floating-action-button-BkUC1UBH.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-CJKzhViJ.js";import"./key-item-BSz8YPKM.js";import"./keyboard-shortcut-D9cZyIfR.js";import"./label-value-C0-wovkK.js";import"./listbox-D80IIvP2.js";import"./meter-group-mkmqsxqN.js";import"./page-state-DvaZGddB.js";import"./paginator-BQCz34S-.js";import"./process-stepper-Ma-CqKvR.js";import"./radio-group-0wLjQfa9.js";import"./scaffold-Ca9xBuAs.js";import"./secret-BdNIYxfX.js";import"./option-Bp_cWeeo.js";import"./select-dropdown-J6Pk5Wb-.js";import"./select-DgDHy1xO.js";import"./skip-link-Bcd21Uye.js";import"./slider-Cc3ExHkf.js";import"./split-view-BbGD9SR1.js";import"./stack-Bd7iC-xk.js";import"./stepper-D4xKXArm.js";import"./switch-DHIhuw52.js";import"./table-Cd1JvATj.js";import"./tab-panel-DJfuxWF3.js";import"./time-picker-CwaSQ7ZH.js";import"./timestamp-C_R9ITm5.js";import"./toast-Dl-hDxgv.js";import"./toolbar-CaPjVYmc.js";import"./tooltip-s8I4hRgc.js";import"./tree-item-D0O1Idgb.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-BB5lg2Ok.js";import"./split-button-Cg5HF9W5.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
