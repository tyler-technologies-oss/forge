import{b as d}from"./iframe-CJhNcN38.js";import{s as u,g as f}from"./utils-TiAJY-9P.js";import"./service-adapter-8tADcN_b.js";import"./accordion-C223_CHM.js";import"./app-bar-profile-button-CAcE_y_s.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DVutJ-sn.js";import"./menu-CerL6tjQ.js";import"./linear-progress-Do3VWKo6.js";import"./list-Bcitl4zM.js";import"./popover-B_b22AUE.js";import"./overlay-B_GK-FD4.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-334I7GYI.js";import"./avatar-BsPn_JPY.js";import"./icon-button-DsngZIug.js";import"./focus-indicator-9EzLjfI_.js";import"./state-layer-CezKS0dV.js";import"./autocomplete-CHnKwkIl.js";import"./label-CFeTXel8.js";import"./button-CV3Or9sw.js";import"./button-toggle-group-BKdoO-gM.js";import"./checkbox-BWzUMQKt.js";import"./switch-D2G0i_3l.js";import"./base-field-CuMLW2-y.js";import"./text-field-CdGWGHG3.js";import"./backdrop-B0IRqNVE.js";import"./badge-Db9mT6c9.js";import"./banner-DIQygI_6.js";import"./bottom-sheet-C1cLArre.js";import"./dialog-BkCkoArc.js";import"./button-area-CX74rpUO.js";import"./calendar-Bp_hi_ox.js";import"./card-B_-12FZ6.js";import"./chip-set-D18nxMVK.js";import"./circular-progress-CTIGpZDq.js";import"./color-picker-2xJnN1KK.js";import"./date-picker-BNqyfpdV.js";import"./date-range-picker-B0n3eREG.js";import"./divider-B4sEvA_D.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-BfAud4lD.js";import"./modal-drawer-DgyN-IMO.js";import"./mini-drawer-Bg91uBfo.js";import"./expansion-panel-DPkymO2T.js";import"./open-icon-DDB4Xydl.js";import"./file-picker-BVe2EFGn.js";import"./floating-action-button-COMMlfno.js";import"./inline-message-wW24XM3J.js";import"./key-item-BhhlKqKG.js";import"./keyboard-shortcut-n6fz62OE.js";import"./label-value-DjHFGdMo.js";import"./meter-group-CiIRfysO.js";import"./page-state-DECQz5Rm.js";import"./paginator-zM6C61P5.js";import"./scaffold-F_aQKixv.js";import"./secret-Cw0DGOj8.js";import"./select-dropdown-1b-1Nn2g.js";import"./select-DAbBW1B2.js";import"./skip-link-B4dl9hvM.js";import"./slider-pVXGJiUZ.js";import"./split-view-DJsuqWGn.js";import"./stack-DEQW1E_G.js";import"./stepper-CTPfg2P9.js";import"./table-BD0mxF7J.js";import"./tab-bar-DdOs-p9E.js";import"./time-picker-BKHeUvei.js";import"./timestamp-CzX5TqO_.js";import"./toast-DYpFP9vw.js";import"./toolbar-DW3QxPcn.js";import"./tooltip-BqbAk_Pe.js";import"./tree-item-DCooE2pO.js";import"./view-switcher-Jc42wfHF.js";import"./deprecated-icon-button-CLWcBPHJ.js";import"./split-button-D6zcVlEf.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
    <forge-app-bar title-text="Profile">
      <forge-app-bar-profile-button
        slot="end"
        @forge-profile-card-profile=${I}
        @forge-profile-card-sign-out=${h}
        .avatarLetterCount=${n}
        .profileButton=${p}
        .profileButtonText=${e}
        .signOutButton=${t}
        .signOutButtonText=${o}
        .fullName=${r}
        .email=${i}
        .open=${a}>
      </forge-app-bar-profile-button>
    </forge-app-bar>
  `,component:s,argTypes:{...f({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...u,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.warn("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return d`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function builder(): HTMLElement {
      const listElement = document.createElement('forge-list');
      listElement.addEventListener('forge-list-item-select', ({
        detail
      }) => {
        console.warn('[profile-card] Selected custom item:', detail.value);
      });
      listElement.style.setProperty('--forge-list-padding', '0');
      listElement.appendChild(document.createElement('forge-divider'));
      listElement.appendChild(buildListItemElement('My Reports', 'assignment', 'reports'));
      listElement.appendChild(buildListItemElement('My Workflow', 'work_outline', 'workflow'));
      listElement.appendChild(buildListItemElement('My Alerts', 'warning', 'alerts'));
      listElement.appendChild(buildListItemElement('My Preferences', 'settings', 'preferences'));
      return listElement;
    }
    function buildListItemElement(text: string, icon: string, value: string): HTMLElement {
      const listItemElement = document.createElement('forge-list-item');
      listItemElement.value = value;
      const iconElement = document.createElement('forge-icon');
      iconElement.slot = 'leading';
      iconElement.name = icon;
      listItemElement.appendChild(iconElement);
      const buttonElement = document.createElement('button');
      buttonElement.type = 'button';
      buttonElement.innerText = text;
      listItemElement.appendChild(buttonElement);
      return listItemElement;
    }
    return html\`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=\${builder}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    \`;
  }
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Kt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Kt as P,m as W};
