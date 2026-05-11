import{b as d}from"./iframe-DBQDPehd.js";import{s as u,g as f}from"./utils-CLXqHKRE.js";import"./service-adapter-8tADcN_b.js";import"./accordion-EpRWe2rn.js";import"./app-bar-profile-button-D4gFAzCI.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-LxGpdRju.js";import"./menu-CSJmzzut.js";import"./linear-progress-CKPFd0xY.js";import"./list-Brm6E8dN.js";import"./popover-i29iOpIS.js";import"./overlay-BOPTnQZl.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-g_Ea1Wjh.js";import"./avatar-DdKRSQBv.js";import"./icon-button-DXq9pF36.js";import"./focus-indicator-Cq1BeKeM.js";import"./state-layer-Cnbc18vB.js";import"./autocomplete-DrBzVi-9.js";import"./label-HmKD9e0G.js";import"./button-CNMB2VxA.js";import"./button-toggle-group-BzUydMmM.js";import"./checkbox-DJwaO89W.js";import"./switch-CWyUTxTW.js";import"./base-field-t0AR1qal.js";import"./text-field-DiL5UZqm.js";import"./backdrop-DuhijlGd.js";import"./badge-CG_vLefz.js";import"./banner-B50hs4z4.js";import"./bottom-sheet-DdW016G8.js";import"./dialog-CxA04cm7.js";import"./button-area-JgRFiQqt.js";import"./calendar-MvQQAfJk.js";import"./card-DMK9EkAw.js";import"./chip-set-CxQIpRM_.js";import"./circular-progress-45kWhMLs.js";import"./color-picker-QJx9dRud.js";import"./date-picker-BmgvuTAw.js";import"./date-range-picker-DbT7u9jk.js";import"./divider-9fuHI5Xm.js";import"./base-drawer-DBBe93d7.js";import"./drawer-1zFKHC_i.js";import"./modal-drawer-CYb8qJR2.js";import"./mini-drawer-rpwrWM4L.js";import"./expansion-panel-CuaEtt6x.js";import"./open-icon-B_pdMswj.js";import"./file-picker-D6Mkmng-.js";import"./floating-action-button-DZJcwFL4.js";import"./inline-message-CzR1CZl4.js";import"./key-item-0gEDeOFJ.js";import"./keyboard-shortcut-lODed06F.js";import"./label-value-CI8WZIke.js";import"./meter-group-BPpYdmYp.js";import"./page-state-DLzWYTpL.js";import"./paginator-CdgQ07uw.js";import"./scaffold-D6_2VrU0.js";import"./secret--O14uQXc.js";import"./select-dropdown-xYrqBvkF.js";import"./select-CCxYgk0J.js";import"./skip-link-Da1FHveK.js";import"./slider-Bod1DtPw.js";import"./split-view-BYA7PkzN.js";import"./stack-DqNjYC3W.js";import"./stepper-dC7WX_4J.js";import"./table-Ct2QHxEV.js";import"./tab-bar-CyOTn5fB.js";import"./time-picker-BPs2gAqE.js";import"./toast-B0k8fG4l.js";import"./toolbar-Bt_F_1V6.js";import"./tooltip-CNmoJrtS.js";import"./tree-item-CCpXfPLi.js";import"./view-switcher-Ckdngb02.js";import"./deprecated-icon-button-DBKnCEeh.js";import"./split-button-BjbrPrew.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
