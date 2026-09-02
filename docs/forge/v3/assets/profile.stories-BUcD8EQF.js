import{b as d}from"./iframe-B_lgGbu6.js";import{s as u,g as f}from"./utils-m5ghmQjV.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DUqrBZcm.js";import"./app-bar-profile-button-nnrILrcq.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CEN2klhX.js";import"./menu-CCmwP2o2.js";import"./linear-progress-Dwb4-mcz.js";import"./list-C6iz0ERj.js";import"./popover-t5fdcmFc.js";import"./overlay-B8JeDFYN.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CrysVSv4.js";import"./avatar-BRUM0X3t.js";import"./icon-button-BAkeg8m8.js";import"./focus-indicator-CrcLkhkn.js";import"./state-layer-BHOa6Zo2.js";import"./autocomplete-D5eP0iER.js";import"./label-CTco8L8H.js";import"./base-field-gOSZhYCf.js";import"./text-field-D_cgkpeu.js";import"./backdrop-27v6U1TD.js";import"./badge-DX88RtFX.js";import"./banner-apJYbmmY.js";import"./bottom-sheet-DmCa3GBp.js";import"./dialog-LLA-oPrh.js";import"./button-area-DoI-h4Os.js";import"./button-toggle-group-CPrz_66G.js";import"./button-CKPrXe8X.js";import"./calendar-CFQrs8wE.js";import"./card-QjeOfePN.js";import"./checkbox-VzbOLhwj.js";import"./chip-set-CYV0Vm26.js";import"./circular-progress-CbEv7fNu.js";import"./color-picker-dHWCoUBm.js";import"./date-picker-DDim7rnL.js";import"./date-range-picker-BYFZMMpD.js";import"./divider-DknL7lh0.js";import"./base-drawer-DYk7fD70.js";import"./drawer-BBzTugFU.js";import"./modal-drawer-CLmums_3.js";import"./mini-drawer-Bpy1YQYx.js";import"./expansion-panel-Dp73c8OX.js";import"./open-icon-C0WWHZ_p.js";import"./file-picker-CFA_YxQ4.js";import"./floating-action-button-CJxsr-g_.js";import"./inline-message-C_qyt6_O.js";import"./key-item-DLRR7VaE.js";import"./keyboard-shortcut-Hef5bg0C.js";import"./label-value-D6pRkq1Z.js";import"./meter-group-s7kgVckT.js";import"./page-state-BV5WYMri.js";import"./paginator-BDAo28-M.js";import"./radio-group-BnvR-s_V.js";import"./scaffold-BeSBqG9Y.js";import"./secret-C6XP-E9z.js";import"./select-dropdown-36RxcWoa.js";import"./select-BB-tm_Yc.js";import"./skip-link-D1CoOHCi.js";import"./slider-Bf7E_M0i.js";import"./split-view-D9Jlgq86.js";import"./stack-Bpa8uwy5.js";import"./stepper-Biy4IOeP.js";import"./switch-Bq8c-yo-.js";import"./table-B6aZdG5d.js";import"./tab-panel-BGR6pUzd.js";import"./time-picker-BMbGVygj.js";import"./timestamp-BJM7hDiB.js";import"./toast-BkglXzsC.js";import"./toolbar-Bq_AfmQC.js";import"./tooltip-DkAthYLb.js";import"./tree-item-CFG7KeJm.js";import"./view-switcher-B_SZUlTD.js";import"./deprecated-icon-button-Dqq9iO4v.js";import"./split-button-PjTja2xp.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Yt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Yt as P,m as W};
