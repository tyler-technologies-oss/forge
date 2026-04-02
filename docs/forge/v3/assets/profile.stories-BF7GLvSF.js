import{b as d}from"./iframe-BXOKh2ua.js";import{s as u,g as f}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-C_HDdJdf.js";import"./app-bar-profile-button-BFhWl85A.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-NX4jhktm.js";import"./menu-CrVXGMb-.js";import"./linear-progress-DP1CUIRM.js";import"./list-DhfDTTAO.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-DrDeWLnF.js";import"./icon-button-LWSA5EEi.js";import"./focus-indicator-BYmmK4Oj.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-D8HmAKD_.js";import"./label-DRc37APs.js";import"./button-DNvYR89W.js";import"./button-toggle-group-B4-HSWqQ.js";import"./checkbox-UxNHEvTr.js";import"./switch-CJtBT1-c.js";import"./base-field-Wpp_ZCpy.js";import"./text-field-C-R3yT-2.js";import"./backdrop-B_VtJyIN.js";import"./badge-B2320xwY.js";import"./banner-Ckqx3Ool.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-Cg22v0B8.js";import"./calendar-ZF3fkhOF.js";import"./card-DGLtuUIr.js";import"./chip-set-C1OH4ApF.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-BMltjsHv.js";import"./date-picker-BoRgTFbp.js";import"./date-range-picker-BYTTwYOi.js";import"./divider-IdpCdoES.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-Be7YKGlB.js";import"./open-icon-DExNnclq.js";import"./file-picker-B_8P5Rbt.js";import"./floating-action-button-CLkRlMPE.js";import"./inline-message-BK9gijHu.js";import"./key-item-CbCaxpKH.js";import"./keyboard-shortcut-BweIjPa_.js";import"./label-value-BE9wSmbi.js";import"./meter-group-DSVvfMXq.js";import"./page-state-BYBCycIs.js";import"./paginator-CZbQdn4E.js";import"./scaffold-D_SIXSFE.js";import"./secret-BjE-SF6A.js";import"./select-dropdown-DdyZV-x5.js";import"./select-Ug3vpB-D.js";import"./skip-link-iwIj_IIj.js";import"./slider-Bu0vVpRB.js";import"./split-view-BAoJEDz3.js";import"./stack-BuaXNRar.js";import"./stepper-5s4Aw-P5.js";import"./table-BZAi1k3E.js";import"./tab-bar-D3iNwS45.js";import"./time-picker-DXkl2uva.js";import"./toast-ByxAyDDk.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-CQQqNGHY.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-X9JKw2Wx.js";import"./split-button-C6Yzey-r.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
