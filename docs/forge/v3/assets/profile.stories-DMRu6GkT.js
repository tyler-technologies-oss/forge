import{b as d}from"./iframe-Mn2yrZLF.js";import{s as u,g as f}from"./utils-to_g9TuQ.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BxkGWr9j.js";import"./app-bar-profile-button-GdyaO2oC.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-tLrSflW5.js";import"./menu-BZ2svB4a.js";import"./linear-progress-Do3VWKo6.js";import"./list-ub7XwfpU.js";import"./popover-wpSlFi1q.js";import"./overlay-CizHeCMh.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BGwEdhX-.js";import"./avatar-dXIrHSY7.js";import"./icon-button-Brku5vTm.js";import"./focus-indicator-C6a41ErI.js";import"./state-layer-CezKS0dV.js";import"./autocomplete-BTOOCXJb.js";import"./label-Du9ipTdU.js";import"./button-DjsNiStc.js";import"./button-toggle-group-VmWRlqup.js";import"./checkbox-Dl_LKvF_.js";import"./switch-Du10BOCe.js";import"./base-field-DDbx8vUb.js";import"./text-field-B9jAZNVw.js";import"./backdrop-B0IRqNVE.js";import"./badge-fF-h-Dz5.js";import"./banner-Cv-8Tbau.js";import"./bottom-sheet-C1cLArre.js";import"./dialog-BkCkoArc.js";import"./button-area-5EmfCDTw.js";import"./calendar-Bs36rCDK.js";import"./card-jpdoE-1f.js";import"./chip-set-Ca8JcFgx.js";import"./circular-progress-CTIGpZDq.js";import"./color-picker-CxOEBj4M.js";import"./date-picker-xzr7cNv5.js";import"./date-range-picker-BlY-84Xy.js";import"./divider-BjmrEbgW.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-BfAud4lD.js";import"./modal-drawer-DgyN-IMO.js";import"./mini-drawer-Bg91uBfo.js";import"./expansion-panel-Vlfk3vBk.js";import"./open-icon-DFQ9wbkF.js";import"./file-picker-BR-l7LHY.js";import"./floating-action-button-CtIy0LTo.js";import"./inline-message-wW24XM3J.js";import"./key-item-BodEahfy.js";import"./keyboard-shortcut-BUCW7v9n.js";import"./label-value-DjHFGdMo.js";import"./meter-group-DBHJxXCv.js";import"./page-state-DECQz5Rm.js";import"./paginator-k7ylA-K3.js";import"./scaffold-F_aQKixv.js";import"./secret-BFBAk3et.js";import"./select-dropdown-MCiItmmy.js";import"./select-DA3ogvPH.js";import"./skip-link-SeftTiyS.js";import"./slider-yddW-KFM.js";import"./split-view-CvFEqifG.js";import"./stack-DEQW1E_G.js";import"./stepper-B2tvLL3E.js";import"./table-Ce52M2IE.js";import"./tab-panel-CkpS4NFV.js";import"./time-picker-Ca5oreEh.js";import"./timestamp-CFrxhwAO.js";import"./toast-Bq8tSzJW.js";import"./toolbar-1D0XcUff.js";import"./tooltip-Dp0E-wmq.js";import"./tree-item-nTy9H8Yd.js";import"./view-switcher-Jc42wfHF.js";import"./deprecated-icon-button-dUsmKUrm.js";import"./split-button-CP7eC3_r.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
