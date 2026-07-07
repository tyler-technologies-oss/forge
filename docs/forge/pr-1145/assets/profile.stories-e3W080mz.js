import{b as d}from"./iframe-B6X6CCJg.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CxetLz_C.js";import"./app-bar-profile-button-DDjeQe7I.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BzkfCrj4.js";import"./menu-C0gq1Dbe.js";import"./linear-progress-dFUODLVX.js";import"./list-BYIyYUj4.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-C_7oIHW1.js";import"./icon-button-DVpILH4C.js";import"./focus-indicator-BndqCjt1.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-BS__WNFp.js";import"./label-CCJpr-qV.js";import"./base-field-DdBHtZ1v.js";import"./text-field-BQW6Jr2_.js";import"./backdrop--ezx6yHr.js";import"./badge-DVM5Oa-e.js";import"./banner-DKVVvtFu.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-CzISkOYz.js";import"./button-toggle-group-D4Ndtp9F.js";import"./button-CDju6yp8.js";import"./calendar-D7y5mzB9.js";import"./card-oa78OT2Y.js";import"./checkbox-gad2aX2u.js";import"./chip-set-C6d5-cqw.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-C-Ou3rIT.js";import"./date-picker-q7xt41VE.js";import"./date-range-picker-COmukZEA.js";import"./divider-YxOd627b.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-p9dU4FUN.js";import"./open-icon-DEET34hX.js";import"./file-picker-CUYZ-byi.js";import"./floating-action-button-DeOJ0Zj0.js";import"./inline-message-1YYbEfHN.js";import"./key-item-CKSyj1m7.js";import"./keyboard-shortcut-C2RIyUTE.js";import"./label-value-CMJEsLJf.js";import"./meter-group-84Czs-cv.js";import"./page-state-BwPC_Hd9.js";import"./paginator-C2uVFwxr.js";import"./radio-group-DN2-UT3f.js";import"./scaffold-BAVRvYZ-.js";import"./secret-BfoZPCD9.js";import"./select-dropdown-DUTLGWF0.js";import"./select-B_M30IgI.js";import"./skip-link-3B47B4zc.js";import"./slider-DScUihYS.js";import"./split-view-C721qiV8.js";import"./stack-BRmnsrL_.js";import"./stepper-C1jWqfz5.js";import"./switch-BluGwhJ1.js";import"./table-BdUiLlei.js";import"./tab-bar-Bq7thDvR.js";import"./time-picker-BQuyEtVB.js";import"./toast-CwPpTlu_.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-yqScK9Fl.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-C41OyYA3.js";import"./split-button-BC8Q9ncv.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
