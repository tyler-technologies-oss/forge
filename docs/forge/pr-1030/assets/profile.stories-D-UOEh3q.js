import{b as d}from"./iframe-D-oXrMsO.js";import{s as u,g as f}from"./utils-avWsqrTA.js";import"./service-adapter-8tADcN_b.js";import"./accordion-D6Nt3598.js";import"./app-bar-profile-button-JWj7nT4K.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-C2xq4bPT.js";import"./menu-SLoJDfw8.js";import"./linear-progress-DP1CUIRM.js";import"./list-lfGa_37L.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-Bk7ZJnnG.js";import"./icon-button-WNXVSUA1.js";import"./focus-indicator-BV9myOwo.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-DIayJ-Jq.js";import"./label-Cfqq97la.js";import"./button-C8V9VNer.js";import"./button-toggle-group-_VC3XnwD.js";import"./checkbox-Mt0Y7ZFw.js";import"./switch-DRdJ6mb3.js";import"./base-field-D7EuMOip.js";import"./text-field-CPYhoMdn.js";import"./backdrop-B_VtJyIN.js";import"./badge-BadDFl1j.js";import"./banner-DehPJNVu.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-BOXQVZ1O.js";import"./calendar-BIqIlGwD.js";import"./card-zmEb5KAQ.js";import"./chip-set-DoN4TAor.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-C9tPhpma.js";import"./date-picker-CZRRx5Ze.js";import"./date-range-picker-CGjEpPec.js";import"./divider-EcWbT6OE.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-DGDv3lXO.js";import"./open-icon-B4HKh9_V.js";import"./file-picker-BsUoKDeA.js";import"./floating-action-button-CtcbFz5Z.js";import"./inline-message-BK9gijHu.js";import"./key-item-BCqjpYVv.js";import"./keyboard-shortcut-BIaaWeQb.js";import"./label-value-BE9wSmbi.js";import"./meter-group-Cg2308wZ.js";import"./page-state-BYBCycIs.js";import"./paginator-Dc4J96EF.js";import"./scaffold-D_SIXSFE.js";import"./secret-DaYVNTSV.js";import"./select-dropdown-QJxbseYC.js";import"./select-w7iKa16s.js";import"./skip-link-yo_Oc_qg.js";import"./slider-CUrxnhnc.js";import"./split-view-B3LVXdqj.js";import"./stack-BuaXNRar.js";import"./stepper-DRIv0Ox5.js";import"./table-C94f8QpV.js";import"./tab-bar-Cyl3laFt.js";import"./time-picker-CmIB2a-t.js";import"./toast-g2GQnGKS.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-BaeazQel.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-D2BDpEA4.js";import"./split-button-Dlmz-g7b.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
