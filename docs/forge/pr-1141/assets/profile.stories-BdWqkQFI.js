import{b as d}from"./iframe-B7ISy-Z8.js";import{s as u,g as f}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BRC8BZ0F.js";import"./app-bar-profile-button-ChaA-SNh.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BKl8G81U.js";import"./menu-BuIe3CwH.js";import"./linear-progress-DP1CUIRM.js";import"./list-IDaZg38l.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-BGClYZB0.js";import"./icon-button-Bj7s7JCf.js";import"./focus-indicator-BWBykkMf.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-CIFEJAv8.js";import"./label-1fKQR1wl.js";import"./button-j7Lk9QTq.js";import"./button-toggle-group-CVKjwfUu.js";import"./checkbox-BZobJlVI.js";import"./switch-Dj5odUU2.js";import"./base-field-FojAOllZ.js";import"./text-field-BT6RuHFJ.js";import"./backdrop-B_VtJyIN.js";import"./badge-CEdI5gOi.js";import"./banner-B2nG3FcL.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-xghbIkZK.js";import"./calendar-DyQ6zmtF.js";import"./card-JBozch0K.js";import"./chip-set-DN38c5q_.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-PDr_qVrL.js";import"./date-picker-aoSuyE0G.js";import"./date-range-picker-VpPhfd8R.js";import"./divider-DR61_nfi.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel--36EdadW.js";import"./open-icon-CytoevY5.js";import"./file-picker-C52M0OJV.js";import"./floating-action-button-DN6E8hZG.js";import"./inline-message-BK9gijHu.js";import"./key-item-DFODZ-Pw.js";import"./keyboard-shortcut-DytuiozW.js";import"./label-value-BE9wSmbi.js";import"./meter-group-ByqSHufg.js";import"./page-state-BYBCycIs.js";import"./paginator-C5wD6mMp.js";import"./scaffold-D_SIXSFE.js";import"./secret-CscP_V38.js";import"./select-dropdown-C8EDUJRY.js";import"./select-BHdzRqob.js";import"./skip-link-Dcy7ZuHJ.js";import"./slider-GqX2r1LH.js";import"./split-view-BfzfMdmx.js";import"./stack-BuaXNRar.js";import"./stepper-4Nr19XSU.js";import"./table-CmqQUGTa.js";import"./tab-bar-C9W8KkAG.js";import"./time-picker-BdefNlTQ.js";import"./toast-Dt5EYPzV.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-JWZqP4uy.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-Curu3hkp.js";import"./split-button-DRYJETHh.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
