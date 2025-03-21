import"./lit-element-B3QVTycr.js";import{x as o,E as m}from"./lit-html-CuBe1DX_.js";import{g as C,s as x,b as $}from"./utils-BeTmMhVX.js";import{o as A}from"./style-map-CeP1Mntv.js";import{e as M}from"./class-map-CuXcqkpw.js";import"./feature-detection-C61kIZu7.js";import"./accordion-DTtjhfte.js";import"./expansion-panel-ZfR_eNfd.js";import"./index-CiLSBptl.js";import"./app-bar-profile-button-1d3AKy3h.js";import"./state-layer-DA2sYK0k.js";import"./focus-indicator-B_9E-jM6.js";import"./badge-DmYwJsoi.js";import{I as H}from"./icon-DNSPAaK0.js";import"./menu-CoZTS0u-.js";import{d as L}from"./index-RsKXMDm2.js";import"./linear-progress-Brg7kVg_.js";import"./list-Bo9PHw-V.js";import"./popover-0XUukIs4.js";import"./overlay-CFvbk99I.js";import"./skeleton-Cfb12itF.js";import"./avatar-CawfXDqL.js";import"./icon-button-BgvK8Gih.js";import"./autocomplete-CTBKvGK7.js";import"./label-DX_PQUsn.js";import"./button-Cye3g7s2.js";import"./button-toggle-group-JMDAjILZ.js";import"./checkbox-BwLNDz7l.js";import"./switch-B2m0S8OE.js";import"./base-field-B1mAVOnC.js";import"./text-field-CEd8gOnG.js";import"./backdrop-UaagznG1.js";import"./banner-B5Ju-BdJ.js";import"./bottom-sheet-CP8M8525.js";import"./dialog-BZ1rPOET.js";import"./button-area-BVBZLdAu.js";import"./calendar-DToEQqIV.js";import"./card-CmSOzucO.js";import"./chip-set-BBO0Yo0Z.js";import"./circular-progress-CbpfkaY8.js";import"./color-picker-CK0Gyhnh.js";import"./date-picker-DRUhx03p.js";import"./date-range-picker-DTqekDmE.js";import"./divider-B48YHESn.js";import"./base-drawer-UQyrssvq.js";import"./drawer-owsZiq0V.js";import"./modal-drawer-DMNToFix.js";import"./mini-drawer-CAhkq0cM.js";import"./file-picker-BIkf71vh.js";import"./floating-action-button-DUUMFA43.js";import"./inline-message-B-l04edk.js";import"./key-item-Drd7rxXP.js";import"./keyboard-shortcut-2NoS7Obq.js";import"./label-value-BkWOzHIE.js";import"./meter-group-B0qUdXfn.js";import"./page-state-CnNv8Q0J.js";import"./paginator-BH2lGCf6.js";import"./scaffold-CWDbFKLY.js";import"./select-dropdown-Xqtu2H2R.js";import"./select-DlJ7FW7W.js";import"./skip-link-sLwxHSrC.js";import"./slider-LZOx81Gr.js";import"./split-view-D95ipcG0.js";import"./stack-CePCofIq.js";import"./stepper-DSolOj6e.js";import"./table-gbBUUq3q.js";import"./tab-bar-XJJt2SOj.js";import"./time-picker-Cj80-tpm.js";import"./toast-77GARm9c.js";import"./toolbar-CM1YCrRV.js";import"./tooltip-CCMKllfO.js";import"./view-switcher-BmplNyU0.js";import"./deprecated-icon-button-B9bIrvAB.js";import"./split-button-dG9CEZj0.js";const c="forge-label-value",P={title:"Components/Label Value",render:e=>{const i=$(e),r=A({...i,width:e.ellipsis?"100px":null});return o`
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
