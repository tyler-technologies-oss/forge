import{A as p,b as r}from"./iframe-Zk1SR4Vq.js";import{s as c,b as g,g as b}from"./utils-TiAJY-9P.js";import{o as u}from"./style-map-Z54uucyG.js";import{e as y}from"./class-map-CD1TCKq3.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BwpjPesR.js";import"./app-bar-profile-button-dArIDg53.js";import{I as h,e as S}from"./tyler-icons-nXZdNzxe.js";import"./menu-CamMFDWk.js";import"./linear-progress-Do3VWKo6.js";import"./list-CYYanRNl.js";import"./popover-BfXKCPIw.js";import"./overlay-89RDbxb9.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CNas61Yy.js";import"./avatar-C_XRg9kj.js";import"./icon-button-U4y3n_ne.js";import"./focus-indicator-DEh0woC7.js";import"./state-layer-CezKS0dV.js";import"./autocomplete-BMEkHIFo.js";import"./label-D_q06Ogh.js";import"./button-DzHPM5fI.js";import"./button-toggle-group-BDUgkMlQ.js";import"./checkbox-BGTXpwys.js";import"./switch-Bp0mPIkp.js";import"./base-field-Ct5vNJWs.js";import"./text-field-g_CO2Oho.js";import"./backdrop-B0IRqNVE.js";import"./badge-CGg9eZzh.js";import"./banner-DFXvtpVY.js";import"./bottom-sheet-C1cLArre.js";import"./dialog-BkCkoArc.js";import"./button-area-BnhhVoWb.js";import"./calendar-HtIIMBvi.js";import"./card-DdNdR_Mn.js";import"./chip-set-BC6zV0G4.js";import"./circular-progress-CTIGpZDq.js";import"./color-picker-DrDQhow3.js";import"./date-picker-KvzMzEfo.js";import"./date-range-picker-Ce3wJsdE.js";import"./divider-DLdL2RZN.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-BfAud4lD.js";import"./modal-drawer-DgyN-IMO.js";import"./mini-drawer-Bg91uBfo.js";import"./expansion-panel-Duu7O4Jm.js";import"./open-icon-DeUdhZXY.js";import"./file-picker-DZH6FKKU.js";import"./floating-action-button-kGpNDfcJ.js";import"./inline-message-wW24XM3J.js";import"./key-item-_eTCv6CO.js";import"./keyboard-shortcut-p5BNN5CG.js";import"./label-value-DjHFGdMo.js";import"./meter-group-t4TFReJr.js";import"./page-state-DECQz5Rm.js";import"./paginator-DEn7ODpU.js";import"./scaffold-F_aQKixv.js";import"./secret-Bq9QdI7g.js";import"./select-dropdown-DU57iOD-.js";import"./select-COo49lnt.js";import"./skip-link-BZUFseWW.js";import"./slider-BhsZ8IgA.js";import"./split-view-ClaN2Ryj.js";import"./stack-DEQW1E_G.js";import"./stepper-DpxIQCv_.js";import"./table-B1hUXup1.js";import"./tab-bar-nYhfKG9y.js";import"./time-picker-6OSzn-B7.js";import"./timestamp-Dt_mX99-.js";import"./toast-Dlq3UMzN.js";import"./toolbar-CZce7QOP.js";import"./tooltip-BxF0cpAI.js";import"./tree-item-IRz2xO51.js";import"./view-switcher-Jc42wfHF.js";import"./deprecated-icon-button-DKMvV2Ex.js";import"./split-button-BgP9TYTI.js";const m="forge-label-value",w={title:"Components/Label Value",render:e=>{const i=g(e),o=u({...i,width:e.ellipsis?"100px":null});return r`
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
