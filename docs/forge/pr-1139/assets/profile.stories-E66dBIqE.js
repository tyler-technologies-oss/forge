import{b as d}from"./iframe-ve2i9uKK.js";import{s as u,g as f}from"./utils-CTbCKdhX.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BG6skR-D.js";import"./app-bar-profile-button-B3izL8ny.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CAJjByD0.js";import"./menu-Bc-7R61m.js";import"./linear-progress-CKPFd0xY.js";import"./list-CdB30bm4.js";import"./popover-Ci879-pj.js";import"./overlay-CRMIZSm6.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-g_Ea1Wjh.js";import"./avatar-Cmoy_e7t.js";import"./icon-button-Cv-NgQH9.js";import"./focus-indicator-qgqoWYPn.js";import"./state-layer-Cnbc18vB.js";import"./autocomplete-ld5YvmqI.js";import"./label-E49Zl4Lf.js";import"./button-DiclZZpC.js";import"./button-toggle-group-BKCA0pD9.js";import"./checkbox-BB4NGfo1.js";import"./switch-DZuFOPav.js";import"./base-field-CO1Mwh93.js";import"./text-field-Bcih_z5x.js";import"./backdrop-DuhijlGd.js";import"./badge-BuAJpt9_.js";import"./banner-CeA8PBCJ.js";import"./bottom-sheet-DdW016G8.js";import"./dialog-CxA04cm7.js";import"./button-area-BYXbavjn.js";import"./calendar-BaDcEigP.js";import"./card-CqZiCloU.js";import"./chip-set-B0LHOywR.js";import"./circular-progress-45kWhMLs.js";import"./color-picker-BchS82n1.js";import"./date-picker-D1_2zdRE.js";import"./date-range-picker-Co8W0pMq.js";import"./divider-DMJ_mLcG.js";import"./base-drawer-DBBe93d7.js";import"./drawer-1zFKHC_i.js";import"./modal-drawer-CYb8qJR2.js";import"./mini-drawer-rpwrWM4L.js";import"./expansion-panel-i3J9Kq3y.js";import"./open-icon-DRojL4M0.js";import"./file-picker-Chl9Va3s.js";import"./floating-action-button-J6GfPLy-.js";import"./inline-message-CzR1CZl4.js";import"./key-item-BbAHBy_G.js";import"./keyboard-shortcut-COtzT89d.js";import"./label-value-CI8WZIke.js";import"./meter-group-DNoK9LAc.js";import"./page-state-DLzWYTpL.js";import"./paginator-U6d-_piI.js";import"./scaffold-D6_2VrU0.js";import"./secret-BdEd7KFQ.js";import"./select-dropdown-2m4nj7ao.js";import"./select-i29xriGr.js";import"./skip-link-DIZ4YmQY.js";import"./slider-DzTwXQ8N.js";import"./split-view-DWYFG5Fw.js";import"./stack-DqNjYC3W.js";import"./stepper-CLS8FRYA.js";import"./table-CSWvqz2Z.js";import"./tab-bar-CWMApWZj.js";import"./time-picker-BDL3gbnM.js";import"./toast-CQ5oXWur.js";import"./toolbar-Bt_F_1V6.js";import"./tooltip-Ceh7eWbN.js";import"./tree-item-CC1DBGHa.js";import"./view-switcher-Ckdngb02.js";import"./deprecated-icon-button-BoQSxzes.js";import"./split-button-OMoIei1U.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
