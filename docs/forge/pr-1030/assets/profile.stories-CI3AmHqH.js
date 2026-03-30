import{b as d}from"./iframe-PUzLLxEB.js";import{s as u,g as f}from"./utils-CAFI_ioD.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Tr8JMVxr.js";import"./app-bar-profile-button-CUFkqHnA.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DcY2CuEe.js";import"./menu-Bl2ieV1g.js";import"./linear-progress-DP1CUIRM.js";import"./list-DQYbIoTP.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-DkhnbUoU.js";import"./icon-button-DeJJPiFP.js";import"./focus-indicator-CMiLXBO9.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-I1VQKfaT.js";import"./label-oHwFUDdN.js";import"./button-BGj66c3W.js";import"./button-toggle-group-BfspGbD2.js";import"./checkbox-DdAXeDFs.js";import"./switch-CRTL5dTh.js";import"./base-field-ZQ8ONQjP.js";import"./text-field-DSRP241_.js";import"./backdrop-B_VtJyIN.js";import"./badge-BTUpDHrO.js";import"./banner-DNdgHP_P.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-QgeaA0TH.js";import"./calendar-DDpghaqx.js";import"./card-DsAucmD6.js";import"./chip-set-Dzv-M6g5.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-CurpS8L3.js";import"./date-picker-DhYX-N94.js";import"./date-range-picker-DR2xW6RR.js";import"./divider-DwMN64G7.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-SXp1j5DZ.js";import"./open-icon-DwPm6vZ6.js";import"./file-picker-Bsb7fM_P.js";import"./floating-action-button-CL3-Lif_.js";import"./inline-message-BK9gijHu.js";import"./key-item-Dzdynbwg.js";import"./keyboard-shortcut-Ck32pDj0.js";import"./label-value-BE9wSmbi.js";import"./meter-group-BwJvhwct.js";import"./page-state-BYBCycIs.js";import"./paginator-CR6qNk5y.js";import"./scaffold-D_SIXSFE.js";import"./secret-DZJzS1p2.js";import"./select-dropdown-CIoAHeJy.js";import"./select-Bo5fc3rf.js";import"./skip-link-CwJYufUL.js";import"./slider-DrIG1lgM.js";import"./split-view-BD6FNhyD.js";import"./stack-BuaXNRar.js";import"./stepper-Cy85o7zL.js";import"./table-tkRDb2eq.js";import"./tab-bar-k1Whfc8L.js";import"./time-picker-u4C2_I4c.js";import"./toast-fxWj1pTV.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-DvNoaFKR.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-DyjZquru.js";import"./split-button-BGXjfBw_.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
