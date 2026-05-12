import{b as d}from"./iframe-TpqQ2uGz.js";import{s as u,g as f}from"./utils-C7Mtdcaw.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Cfqj6acS.js";import"./app-bar-profile-button-Cojf6fA2.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Br2O5XA1.js";import"./menu-BTx-l3Ne.js";import"./linear-progress-CKPFd0xY.js";import"./list-XqboNd41.js";import"./popover-DOF56Jav.js";import"./overlay-C_kqG4zZ.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-g_Ea1Wjh.js";import"./avatar-CK5Xlddu.js";import"./icon-button-QnQestmc.js";import"./focus-indicator-DTY-3C7X.js";import"./state-layer-Cnbc18vB.js";import"./autocomplete-DmMMKu4i.js";import"./label-BeWFARXA.js";import"./button-DcebgIPw.js";import"./button-toggle-group-v2p1uXTc.js";import"./checkbox-DrU_9U3f.js";import"./switch-FZyB0Nbu.js";import"./base-field-DWE2hSH6.js";import"./text-field-BYx17-83.js";import"./backdrop-DuhijlGd.js";import"./badge-BGWQCgGE.js";import"./banner-Bxrrt8x1.js";import"./bottom-sheet-DdW016G8.js";import"./dialog-CxA04cm7.js";import"./button-area-DXv8nxrd.js";import"./calendar-DrdVThbC.js";import"./card-DjwY97xN.js";import"./chip-set-Cu3oHhDB.js";import"./circular-progress-45kWhMLs.js";import"./color-picker-C5GP7Zhl.js";import"./date-picker-BuDPxkIh.js";import"./date-range-picker-wAMERO08.js";import"./divider-Ca-xLjIg.js";import"./base-drawer-DBBe93d7.js";import"./drawer-1zFKHC_i.js";import"./modal-drawer-CYb8qJR2.js";import"./mini-drawer-rpwrWM4L.js";import"./expansion-panel-DK3C1ggp.js";import"./open-icon-BEusXDQy.js";import"./file-picker-D9wAZTrl.js";import"./floating-action-button-D5HGN4K4.js";import"./inline-message-CzR1CZl4.js";import"./key-item-oygHgFHk.js";import"./keyboard-shortcut-BbZvTW98.js";import"./label-value-CI8WZIke.js";import"./meter-group-C4Dn8epm.js";import"./page-state-DLzWYTpL.js";import"./paginator-DUEVKrPS.js";import"./scaffold-D6_2VrU0.js";import"./secret-TCC9DlaY.js";import"./select-dropdown-k6KeU2yw.js";import"./select-63pp9qua.js";import"./skip-link-Dyiud5ww.js";import"./slider-B9s-frYC.js";import"./split-view--SmQSYuE.js";import"./stack-DqNjYC3W.js";import"./stepper-D3O7btuy.js";import"./table-bBq7LDR5.js";import"./tab-bar-C63Ub4AQ.js";import"./time-picker-DW8d19Az.js";import"./toast-r6dPNNvm.js";import"./toolbar-Bt_F_1V6.js";import"./tooltip-RMIWfUJ_.js";import"./tree-item-C2BHy4t2.js";import"./view-switcher-Ckdngb02.js";import"./deprecated-icon-button-D_JaScNo.js";import"./split-button-C3yIqTrK.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
