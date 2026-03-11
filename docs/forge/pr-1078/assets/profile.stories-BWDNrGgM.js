import{b as d}from"./iframe-1u9wRnNk.js";import{s as u,g as f}from"./utils-DQ34OAOC.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CC4RxBwX.js";import"./app-bar-profile-button-DnTuJfjy.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DdbCLFCE.js";import"./menu-BTJri1lH.js";import"./linear-progress-DP1CUIRM.js";import"./list-Boy0Lri8.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-RCnc2Ge3.js";import"./icon-button-B78lZmMn.js";import"./focus-indicator-Nvt4dqBV.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-CClnjb7Q.js";import"./label-B3XLMC7F.js";import"./button-9C-yiDRS.js";import"./button-toggle-group-C_1USqcb.js";import"./checkbox-B23DYIto.js";import"./switch-D7d43D8D.js";import"./base-field-EKpX4Hm5.js";import"./text-field-Dzq9B0pc.js";import"./backdrop-B_VtJyIN.js";import"./badge-CXL2BH2t.js";import"./banner-CZbnhRLS.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-SkAI6LPH.js";import"./calendar-Cn_yg-p_.js";import"./card-r1Z0hUbK.js";import"./chip-set-7c9hBDO9.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-BEwmjzCq.js";import"./date-picker-B8Mvjt7R.js";import"./date-range-picker-nmd94csW.js";import"./divider-DSi0ElUE.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-l6DPzsUh.js";import"./open-icon-Db-GBHaK.js";import"./file-picker-MVD7UuqO.js";import"./floating-action-button-dUEQdej2.js";import"./inline-message-BK9gijHu.js";import"./key-item-NnkmujcG.js";import"./keyboard-shortcut-DlzvDW49.js";import"./label-value-BE9wSmbi.js";import"./meter-group-yDfSN_P_.js";import"./page-state-BYBCycIs.js";import"./paginator-CQoflFoL.js";import"./scaffold-D_SIXSFE.js";import"./select-dropdown-C-cqzS_j.js";import"./select-D06RUd3i.js";import"./skip-link-D7MQRkBx.js";import"./slider-Wv0unuq5.js";import"./split-view-Cb9RK3Uh.js";import"./stack-BuaXNRar.js";import"./stepper-CMdDgWQ7.js";import"./table-XsDtCVOr.js";import"./tab-bar-cOyU4x3k.js";import"./time-picker-W34bfTMp.js";import"./toast-y6IJlQ34.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-CiDTn8GA.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-BReaDVUO.js";import"./split-button-BgF57afa.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Ut=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Ut as P,m as W};
