import{b as d}from"./iframe-DbJiOKlf.js";import{s as u,g as f}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CZrmKHYq.js";import"./app-bar-profile-button-xKmfXOgO.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DLpPoKat.js";import"./menu-Q7s-TX1w.js";import"./linear-progress-DP1CUIRM.js";import"./list-BJFNSxfz.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-pURY7AHn.js";import"./icon-button-CP4kR911.js";import"./focus-indicator-DGXAgHfc.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-Cnf-Iz2s.js";import"./label-BjIh2JMh.js";import"./button-BKBMlaET.js";import"./button-toggle-group-C_ZtL0O7.js";import"./checkbox-R6g2b17z.js";import"./switch-DtMqp_Tp.js";import"./base-field-DOxpzKxB.js";import"./text-field-BArN-FVy.js";import"./backdrop-B_VtJyIN.js";import"./badge-BBY97TqC.js";import"./banner-GS7-PsHG.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-BtbWBLwL.js";import"./calendar-DWCJfEnl.js";import"./card-BkII6Kta.js";import"./chip-set-DUpnHL9J.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-CrRAwGdy.js";import"./date-picker-DXbVY-_7.js";import"./date-range-picker-B_pzL64p.js";import"./divider-Df7xkl_v.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-Bf1b3Erg.js";import"./open-icon-CApzp1hO.js";import"./file-picker-3KrO5d2y.js";import"./floating-action-button-CM7LXoIC.js";import"./inline-message-BK9gijHu.js";import"./key-item-Da3foD0V.js";import"./keyboard-shortcut-DtnEGh5w.js";import"./label-value-BE9wSmbi.js";import"./meter-group-BA1EM9hN.js";import"./page-state-BYBCycIs.js";import"./paginator-DG02xU2F.js";import"./scaffold-D_SIXSFE.js";import"./secret-bcxMtyaD.js";import"./select-dropdown-BuzMDBIT.js";import"./select-DEPdKE3A.js";import"./skip-link-D7itWubC.js";import"./slider-CZhYxp34.js";import"./split-view-BHgUaVAr.js";import"./stack-BuaXNRar.js";import"./stepper-BJbA_XT3.js";import"./table-CdTNyGIh.js";import"./tab-bar-ncTyS4h6.js";import"./time-picker-B356TqwR.js";import"./toast-HcSZ7DfS.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-DFRQ6sE1.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-D9z0PeH3.js";import"./split-button-CuL2eKdA.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
