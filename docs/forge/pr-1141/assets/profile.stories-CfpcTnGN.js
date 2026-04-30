import{b as d}from"./iframe-DXVgdaHV.js";import{s as u,g as f}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BkO4HKer.js";import"./app-bar-profile-button-DbtkH0Fa.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-D7Wh-WTi.js";import"./menu-Mkk5VkWh.js";import"./linear-progress-DP1CUIRM.js";import"./list-nIt3u35n.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-CMerDR1U.js";import"./icon-button-aG6PpZ20.js";import"./focus-indicator-eOXuRaH_.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-U-LGquTk.js";import"./label-kWF2pkD1.js";import"./button-ChtWOQXW.js";import"./button-toggle-group-CsfGtcPH.js";import"./checkbox-DCHzhl3a.js";import"./switch-D1lyLiGC.js";import"./base-field-8ofXaG1m.js";import"./text-field-DV8GpHcb.js";import"./backdrop-B_VtJyIN.js";import"./badge-BKei5KUH.js";import"./banner-OELSDjqh.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-CWfgB23D.js";import"./calendar-DA36vzNM.js";import"./card-21X2i5QI.js";import"./chip-set-DOYZQ8Yf.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-CCFsi33T.js";import"./date-picker-K9PTqzoY.js";import"./date-range-picker-Dxr0WYZ3.js";import"./divider-wdiRtGms.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-5QB7Y-LB.js";import"./open-icon-ChG1l_NL.js";import"./file-picker-DAvNfxvn.js";import"./floating-action-button-CFCfiLUF.js";import"./inline-message-BK9gijHu.js";import"./key-item-DF5WoM96.js";import"./keyboard-shortcut-D2B5SaJa.js";import"./label-value-BE9wSmbi.js";import"./meter-group-BBcrz7rX.js";import"./page-state-BYBCycIs.js";import"./paginator-74BkuZb9.js";import"./scaffold-D_SIXSFE.js";import"./secret-BnCgmdA6.js";import"./select-dropdown-XYdaldqZ.js";import"./select-DonCyXsR.js";import"./skip-link-DTc7553-.js";import"./slider-CzFHkr7G.js";import"./split-view-uQY5e6Q1.js";import"./stack-BuaXNRar.js";import"./stepper-9H6Mm1bs.js";import"./table-DfS9YiRa.js";import"./tab-bar-B1HKrWUQ.js";import"./time-picker-CyAUYH-r.js";import"./toast-DYl6x_zP.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-CraotHns.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-ORLWb0r3.js";import"./split-button-DnqTP7jw.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
