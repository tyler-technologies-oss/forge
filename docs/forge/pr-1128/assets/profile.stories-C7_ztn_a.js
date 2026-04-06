import{b as d}from"./iframe-Iwy1iB1t.js";import{s as u,g as f}from"./utils-xL3kSW0t.js";import"./service-adapter-8tADcN_b.js";import"./accordion-OjJdznQz.js";import"./app-bar-profile-button-BObR8jXA.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BpTi2ebA.js";import"./menu-ID3oIxKG.js";import"./linear-progress-DP1CUIRM.js";import"./list-Bwcy63xk.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-kdzuNrS8.js";import"./icon-button-C8vJba43.js";import"./focus-indicator-rqSK3g6Q.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-Diuool--.js";import"./label-7QAAHmJJ.js";import"./button-z_cqWXdV.js";import"./button-toggle-group-BK8Tm-hG.js";import"./checkbox-BJZTojjd.js";import"./switch-CMWoq4Ov.js";import"./base-field-ChUFdHwX.js";import"./text-field-D5k_v5_t.js";import"./backdrop-B_VtJyIN.js";import"./badge-f42_9lLf.js";import"./banner-BiDN8SPd.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-CDQt8BiV.js";import"./calendar-CaT8WFqE.js";import"./card-CgBk85Ol.js";import"./chip-set-BSZuRTeZ.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-O03OiZyx.js";import"./date-picker-DRxvkLy1.js";import"./date-range-picker-7qfh-JTA.js";import"./divider-BNU8Sw1W.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-DM3diMS9.js";import"./open-icon-CXxhSh4k.js";import"./file-picker-B7aHDd-b.js";import"./floating-action-button-BkeeBeHX.js";import"./inline-message-BK9gijHu.js";import"./key-item--pHIaxiZ.js";import"./keyboard-shortcut-7V52jdHC.js";import"./label-value-BE9wSmbi.js";import"./meter-group-DYm8V7c2.js";import"./page-state-BYBCycIs.js";import"./paginator-BMoLAHi9.js";import"./scaffold-D_SIXSFE.js";import"./secret-CDAHyZ6U.js";import"./select-dropdown-DX86B699.js";import"./select-Cyt0L0Je.js";import"./skip-link-Bct3HpTZ.js";import"./slider-D3rKVIot.js";import"./deprecated-icon-button-BCIneQuX.js";import"./split-view-D6GQ9HcM.js";import"./stack-BuaXNRar.js";import"./stepper-CoWjQRse.js";import"./table-C_g4fskR.js";import"./tab-bar-DlR9pFol.js";import"./time-picker-laEofe0P.js";import"./toast-DUUKcv8-.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-TS31Fyqg.js";import"./view-switcher-DMe6eoCu.js";import"./split-button-Ddbh-3Yi.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],zt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,zt as P,m as W};
