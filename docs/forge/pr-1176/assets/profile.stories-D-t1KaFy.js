import{b as d}from"./iframe-B5kixTUA.js";import{s as u,g as f}from"./utils-C2rEPPUi.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BCKp9Kya.js";import"./app-bar-profile-button-DWSBefYW.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BIZLfBgS.js";import"./menu-CpXkTirk.js";import"./linear-progress-Do3VWKo6.js";import"./list-CEdkemxi.js";import"./popover-PP0PBtnE.js";import"./overlay-B5Gi9o4o.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BE_elVrP.js";import"./avatar-BgaRou0X.js";import"./icon-button-CLEGMrxU.js";import"./focus-indicator-C4H0Z-Oe.js";import"./state-layer-CezKS0dV.js";import"./autocomplete-GNhPAuu9.js";import"./label-B2DgDty_.js";import"./button-D8CfmJ6z.js";import"./button-toggle-group-Cc8RdE5a.js";import"./checkbox-DY7NS6Tz.js";import"./switch-j6pTSyQO.js";import"./base-field-CS3WuGUd.js";import"./text-field-CeMW75GH.js";import"./backdrop-B0IRqNVE.js";import"./badge-DdFGbGwL.js";import"./banner-DLEd223L.js";import"./bottom-sheet-C1cLArre.js";import"./dialog-BkCkoArc.js";import"./button-area-BC_xO8r5.js";import"./calendar-DY4hyF0a.js";import"./card-B1htjsqM.js";import"./chip-set-CznXWDAh.js";import"./circular-progress-CTIGpZDq.js";import"./color-picker-COiGVyO-.js";import"./date-picker-CuASCnBz.js";import"./date-range-picker-zKwi6Obk.js";import"./divider-D0pR_yH7.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-BfAud4lD.js";import"./modal-drawer-DgyN-IMO.js";import"./mini-drawer-Bg91uBfo.js";import"./expansion-panel-12G-UUro.js";import"./open-icon-CiMQEe_g.js";import"./file-picker-qhg412GA.js";import"./floating-action-button-DHxU-K6m.js";import"./inline-message-wW24XM3J.js";import"./key-item-BvAyCkf5.js";import"./keyboard-shortcut-nCWBOT-k.js";import"./label-value-DjHFGdMo.js";import"./meter-group-AhY0Pf0G.js";import"./page-state-DECQz5Rm.js";import"./paginator-CukHv0Ua.js";import"./scaffold-F_aQKixv.js";import"./secret-B8qsstVU.js";import"./select-dropdown-DgRn7wLd.js";import"./select-DBTkOZqs.js";import"./skip-link-S_vNpRsX.js";import"./slider-wheOO1aZ.js";import"./split-view-CSHw2XX_.js";import"./stack-DEQW1E_G.js";import"./stepper-CBPKPKoc.js";import"./table-C7dLdrc-.js";import"./tab-bar-DuZi8V5M.js";import"./time-picker-C9f4QEud.js";import"./timestamp-Co-SSk74.js";import"./toast-YwPmCRHI.js";import"./toolbar-BJ8vbzNM.js";import"./tooltip-C3Plx4lp.js";import"./tree-item-CISLuQ3e.js";import"./view-switcher-Jc42wfHF.js";import"./deprecated-icon-button-Bu_eWg58.js";import"./split-button-BtA1b9Ak.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
