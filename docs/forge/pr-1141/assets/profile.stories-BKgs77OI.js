import{b as d}from"./iframe-qrTYC28H.js";import{s as u,g as f}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B8vKfh4S.js";import"./app-bar-profile-button-BZjeqZGS.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BTrO61hO.js";import"./menu-DNXQAPYC.js";import"./linear-progress-DP1CUIRM.js";import"./list-B3KmqnLg.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-CaINGEzk.js";import"./icon-button-uSx5OiOe.js";import"./focus-indicator-vUUtrhtF.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-DvMR59Ql.js";import"./label-DPNgrkYK.js";import"./button-Dfr9Zl55.js";import"./button-toggle-group-uoLOQRiD.js";import"./checkbox-Dv3yxNvu.js";import"./switch-Cnim86P2.js";import"./base-field-DkMo3UOA.js";import"./text-field-Bv0Vur9s.js";import"./backdrop-B_VtJyIN.js";import"./badge-Bsz1yXPc.js";import"./banner-48aomtZg.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-Dfmsb90w.js";import"./calendar-Bn4i0kwh.js";import"./card-7npDK6w8.js";import"./chip-set-a8p6EEI2.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-1mumlq_Z.js";import"./date-picker-D0s1M0D9.js";import"./date-range-picker-Do5h9_nV.js";import"./divider-C8MqOMGp.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-BV6QWHsW.js";import"./open-icon-D4m84teu.js";import"./file-picker-DfKEv-hg.js";import"./floating-action-button-Cphod7Qt.js";import"./inline-message-BK9gijHu.js";import"./key-item-CiHV1Nun.js";import"./keyboard-shortcut-Du5yMGIS.js";import"./label-value-BE9wSmbi.js";import"./meter-group-BHka-Gm8.js";import"./page-state-BYBCycIs.js";import"./paginator-BhC9Wt7N.js";import"./scaffold-D_SIXSFE.js";import"./secret-DSokEfRL.js";import"./select-dropdown-KQi8tlAw.js";import"./select-B18fOOCv.js";import"./skip-link-Cq4ZoST3.js";import"./slider-CU7t5l6Z.js";import"./split-view-gBgreRoE.js";import"./stack-BuaXNRar.js";import"./stepper-CnltWg-8.js";import"./table-Ci4DPJ17.js";import"./tab-bar-qlYDBBs_.js";import"./time-picker-iwUl5w9R.js";import"./toast-Cqu0Qnww.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-C4yBvZWV.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-BGenDZrc.js";import"./split-button-CBgcZR4W.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
